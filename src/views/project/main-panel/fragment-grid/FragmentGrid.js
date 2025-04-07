import { Container, SortableContextWrapper, Row, Typography, Column, TextButton, IconButton } from 'components';
import { DndContext, DragOverlay, MouseSensor, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useState } from 'react';
import { restrictOnlyFragments } from 'utils';
import CreateFragmentDragOverlay from './drag_overlays/CreateFragmentDragOverlay';
import FragmentDragOverlay from './drag_overlays/FragmentDragOverlay';
import { FRAGMENT_GRID_ID, NEW_FRAGMENT_ID, NEW_FRAGMENT_PANEL_ID } from './FragmentGridConstants';
import { useAlerts } from 'hooks';
import { MdAdd, MdAddBox } from 'react-icons/md';
import FragmentCard from './fragment-grid-data/FragmentCard';
import FragmentGridSidebar from './fragment-grid-data/FragmentGridSidebar';
import useProjectStore from 'stores/useProjectStore';
import { possibleSidebarStates } from './fragment-grid-data/SidebarStates';

/**
 * Grid that displays project fragments.
 * It's also possible to add new fragments on the grid.
 */
const FragmentGrid = ({
    selectedFragmentIdx, 
    hideNonTimelineFragments, 
    ...props
}) => {
    const sidebarStates = possibleSidebarStates;
    const {
        fragments,
        setFragments, 
        createFragment,
        moveFragment,
        sidebarState,
        setSidebarState, 
        activeId, 
        setActiveId, 
        newFragments, 
        setNewFragments,
        filteredFragments,
    } = useProjectStore();

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(MouseSensor),
        useSensor(TouchSensor),
    );

    const [firstFragmentHovering, setFirstFragmentHovering] = useState(false);
    const {addAlert} = useAlerts();

    const handleCreateFragmentClick = () => {
        setSidebarState({content: sidebarStates.CREATE_FRAGMENT, open: true});
    }

    /**
     * Handle moving a fragment inside the fragment grid.
     */
    const handleMovementInFragmentGrid = async(active, over) => {

        if (active.id !== over.id) {
            const movedFragment = fragments.find(f => f.id === active.id);
            const overFragment = fragments.find(f => f.id === over.id);

            if (!movedFragment || !overFragment) {
                return;
            }

            const newPosition = overFragment.position;

            moveFragment(movedFragment, newPosition);
        }
    } 

    /**
     * Handle dropping the newly created fragment.
     * If the fragment is dropped onto the fragment grid, it will be saved
     * to the database. Otherwise it will be returned to it's initial position.
     */
    const handleFragmentCreationDrop = async (over) => {
        // New fragment is dragged over fragment grid but not over an existing fragment
        if (over.id === FRAGMENT_GRID_ID) {
            const newFragment = newFragments.find(f => f.id === NEW_FRAGMENT_ID) || fragments.find(f => f.id === NEW_FRAGMENT_ID);
            const fragment = {
                shortDescription: newFragment.shortDescription.trim(),
                longDescription: newFragment.longDescription.trim(),
                durationInSeconds: newFragment.durationInSeconds <= 0 ? 5 : newFragment.durationInSeconds,
                onTimeline: newFragment.onTimeline,
                position: fragments.length + 1,
                projectId: newFragment.projectId,
            }
            const labels = newFragment.labels
            setFragments([...fragments.filter(f => f.id !== NEW_FRAGMENT_ID)]);
            const fragmentCreatedSuccessfully = await createFragment(fragment, labels);
            if (fragmentCreatedSuccessfully) {
                addAlert("Fragment created", "success");
                setSidebarState({content: null, open: false});
            }
            return;
        }

        // Fragment is dragged over an existing fragment
        if (over.data.current.sortable.containerId === FRAGMENT_GRID_ID) {
            const newFragment = fragments.find(f => f.id === NEW_FRAGMENT_ID);
            const overCard = fragments.find(f => f.id === over.id);
            const fragment = {
                shortDescription: newFragment.shortDescription.trim(),
                longDescription: newFragment.longDescription.trim(),
                durationInSeconds: newFragment.durationInSeconds <= 0 ? 5 : newFragment.durationInSeconds,
                onTimeline: newFragment.onTimeline,
                position: overCard.position || fragments.length,
                projectId: newFragment.projectId,
            }
            const labels = newFragment.labels;
            setFragments([...fragments.filter(f => f.id !== NEW_FRAGMENT_ID)]);
            const fragmentCreatedSuccessfully = await createFragment(fragment, labels);
            if (fragmentCreatedSuccessfully) {
                addAlert("Fragment created", "success");
                setSidebarState({content: null, open: false});
            }
            return;
        }

        // Fragment is not over a fragment grid at all - reset
        // setFragments([...fragments.filter(f => f.id !== NEW_FRAGMENT_ID)]);
        // setNewFragments([...fragments.filter(f => f.id === NEW_FRAGMENT_ID, ...newFragments.filter(f => f.id === NEW_FRAGMENT_ID))]);
        setSidebarState({...sidebarState, open: true});
    }

    /**
     * Decide what to do when a fragment is dropped.
     * There are two types of fragments:
     *     - Newly created ones
     *     - Previously created fragments
     * The appropriate function is called depending on the type of fragment and
     * where it's dropped.
     */
    const handleDragEnd = async ({active, over}) => {
        setActiveId(null);

        if (!active) {return;};

        // Fragment is not over any container
        if (!over) {
            // If dragged fragment is from the fragment grid
            if (active.id !== NEW_FRAGMENT_ID) {
                return;
            }

            // If dragged fragment is a newly created fragment - reset
            setFragments([...fragments.filter(f => f.id !== active.id)]);
            const initialState = [...fragments.filter(f => f.id === activeId), ...newFragments.filter(f => f.id === activeId)];
            setNewFragments(initialState);
            setSidebarState({...sidebarState, open: true});

            return;
        }

        const activeContainer = active.data.current?.sortable.containerId;
        const overContainer = active.data.current?.sortable.containerId;

        if (!activeContainer || !overContainer) {
            return;
        }

        if (active.id !== NEW_FRAGMENT_ID && activeContainer === FRAGMENT_GRID_ID && overContainer === FRAGMENT_GRID_ID) {
            handleMovementInFragmentGrid(active, over);
        }

        if (active.id === NEW_FRAGMENT_ID) {
            handleFragmentCreationDrop(over);
        }
    }

    /**
     * Handle the situation when a newly created fragment is dargged
     * around. If it's hanging over the fragment grid, it's added to the fragments
     * to display the correct transforms on drag.
     */
    const handleDragOver = (e) => {
        const {active, over} = e;

        if (!active || !over) {return;}

        const activeContainer = active.data.current?.sortable.containerId;
        const overContainer = over.data.current?.sortable.containerId;

        if (!activeContainer || !overContainer) {return;}

        if (active.id === NEW_FRAGMENT_ID && over.id === FRAGMENT_GRID_ID) {
            setFirstFragmentHovering(true);
        } else {
            setFirstFragmentHovering(false);
        }

        if (activeContainer === NEW_FRAGMENT_PANEL_ID && overContainer === FRAGMENT_GRID_ID) {
            if (fragments.filter(f => f.id === NEW_FRAGMENT_ID).length === 0) {
                setFragments([...fragments, ...newFragments.filter(f => f.id === NEW_FRAGMENT_ID)]);
                setNewFragments([]);
            }
        }

        if (overContainer === NEW_FRAGMENT_PANEL_ID && active.id === NEW_FRAGMENT_ID) {
            setFragments([...fragments.filter(f => f.id !== NEW_FRAGMENT_ID)]);
        }
    }

    /**
     * Handle what happens to the fragment being dragged when the
     * dragging is cancelled
     */
    const handleDragCancel = (e) => {
        const {active} = e;
        setActiveId(null);
        setSidebarState({...sidebarState, open: true});

        if (active.id === NEW_FRAGMENT_ID) {
            setNewFragments([...fragments.filter(f => f.id === NEW_FRAGMENT_ID)]);
            setFragments([...fragments.filter(f => f.id !== NEW_FRAGMENT_ID)]);
            return;
        }
    }

    /**
     * Set which fragment is being dragged. It's mainly necessary
     * for drag overlays.
     */
    const handleDragStart = (e) => {
        setSidebarState({...sidebarState, open: false});
        setActiveId(e.active.id);
    }

    /**
     * Get the correct drag overlay depending whether a previously
     * created fragment is dragged or a newly created fragment is dragged.
     */
    const getDragOverlay = () => {
        if (!activeId) {return null};

        if (activeId === NEW_FRAGMENT_ID) {
            let fragment;
            if (newFragments.length > 0) {
                fragment = newFragments.find(f => f.id === NEW_FRAGMENT_ID);
            } else {
                fragment = fragments.find(f => f.id === NEW_FRAGMENT_ID);
            }
            return <CreateFragmentDragOverlay fragment={fragment}/> 
        }

        const fragment = fragments.find(f =>  f.id === activeId);
        return <FragmentDragOverlay fragment={fragment}/> 
    }

    return (
        <DndContext
            modifiers={[restrictOnlyFragments]}
            sensors={sensors}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDragCancel={handleDragCancel}
            onDragStart={handleDragStart}
        >
            <div
                style={{
                    position: 'relative',
                    overflow: 'hidden',
                    height: '100%',
                }}
            >
            <Row 
                style={{
                    height: 'inherit',
                    overflowY: 'auto',
                }}
            >
                <SortableContextWrapper
                    id={FRAGMENT_GRID_ID}
                    items={fragments}
                > 
                {({setNodeRef}) =>                 
                    <Container
                        ref={setNodeRef}
                        style={{
                            alignItems: 'flex-start',
                            width: '100%',
                        }}
                    >
                        {
                            fragments.length === 0
                            ?
                            <Container
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '100%',
                                    width: '100%',
                                    bacakgroundColor: 'blue',
                                }}
                            >
                                <Column
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: '80%',
                                        width: '80%',
                                        borderRadius: '50px',
                                        border: `1px dashed ${firstFragmentHovering ? 'var(--primary-color)' : 'gray'}`,
                                    }}
                                    data-testid='empty-fragment-grid'
                                >
                                    <Typography
                                        fontSize='medium'
                                        style={{textAlign: 'center'}}
                                    >
                                        This project has no fragments yet...
                                    </Typography>
                                    {
                                        !sidebarState.open &&
                                        <TextButton
                                            onClick={handleCreateFragmentClick}
                                            style={{display: 'flex', alignContent:'center', gap: '5px'}}
                                        >
                                            {<MdAdd/>} Create new fragment
                                        </TextButton>
                                    }
                                    {
                                        sidebarState.open &&
                                        <Typography color='label'>
                                            Once you have filled in the
                                            details, drop the fragment card
                                            here
                                        </Typography>
                                    }
                                </Column>
                            </Container>
                            :
                            <Container
                                style={{
                                    gap: '1.5rem',
                                    padding: '2rem',
                                    flexWrap: 'wrap',
                                    justifyContent: 'start',
                                    alignContent: 'flex-start',
                                    overflow: 'auto',
                                    flex: '1 1 0',
                                    height: '100%',
                                }}
                            >
                                {fragments.map(f => (
                                    (f.onTimeline || !hideNonTimelineFragments) &&
                                    <FragmentCard
                                        key={f.id}
                                        fragment={f}
                                        isFiltered={filteredFragments.includes(f)}
                                        isSelected={filteredFragments.length > 0 && f.id === filteredFragments[selectedFragmentIdx].id}
                                        {...props}
                                    />
                                ))}
                            </Container>
                        }
                    </Container>
                }
                    </SortableContextWrapper>

                {
                    fragments.length > 0 &&
                    <Column
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            justifyContent: 'end',
                            alignItems: 'end',
                        }}
                    >
                        <IconButton
                            onClick={handleCreateFragmentClick}
                            icon={<MdAddBox />}
                            style={{
                                color: 'var(--primary-color)',
                                fontSize: '8rem',
                            }}
                        />
                    </Column>
                } 
            </Row>
            </div>
            <FragmentGridSidebar {...props}/>
            <DragOverlay>
                {getDragOverlay()}
            </DragOverlay>
        </DndContext>
    );
}
 
export default FragmentGrid;