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

    const fragments = useProjectStore((state) => state.fragments);
    const createFragment = useProjectStore((state) => state.createFragment);
    const moveFragment = useProjectStore((state) => state.moveFragment);
    const sidebarState = useProjectStore((state) => state.sidebarState);
    const setSidebarState = useProjectStore((state) => state.setSidebarState);
    const activeId = useProjectStore((state) => state.activeId);
    const setActiveId = useProjectStore((state) => state.setActiveId);
    const newFragments = useProjectStore((state) => state.newFragments);
    const setNewFragments = useProjectStore((state) => state.setNewFragments);
    const filteredFragments = useProjectStore((state) => state.filteredFragments);

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
        if (newFragments.length === 0 || activeId === null) {
            return;
        }

        if (!over) {
            setActiveId(null);
            setSidebarState({ ...sidebarState, open: true});
            return;
        }

        const overCard = fragments.find(f => f.id === over.id);
        const newFragment = newFragments[0];
        const fragment = {
            shortDescription: newFragment.shortDescription.trim(),
            longDescription: newFragment.longDescription.trim(),
            durationInSeconds: newFragment.durationInSeconds <= 0 ? 5 : newFragment.durationInSeconds,
            onTimeline: newFragment.onTimeline,
            position: overCard ? overCard.position : fragments.length + 1,
            projectId: newFragment.projectId,
        }
        const labels = newFragment.labels;

        setSidebarState({ content: null, open: false});
        const successfulCreation = await createFragment(fragment, labels);
        if (successfulCreation) {
            addAlert("Fragment created", "success");
            setNewFragments([]);
        } else {
            setNewFragments([newFragment]);
            setSidebarState({ content: sidebarStates.CREATE_FRAGMENT, open: true});
        }

        setActiveId(null);
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
        console.log(active, over);
        if (!active || !over) {
            setSidebarState({ ...sidebarState, open: true});
            setActiveId(null);
            return;
        }

        if (active.id === NEW_FRAGMENT_ID) {
            /**
             * Handle newly created fragment drop.
             * If it's hovering over itself or the panel (somehow?) then just
             * open the panel again. ActiveId is set to null in the end of this
             * function. Everything should be set to their original positions.
             */
            if (over.id === NEW_FRAGMENT_ID || over.id === NEW_FRAGMENT_PANEL_ID) {
                handleFragmentCreationDrop({id: FRAGMENT_GRID_ID})
            } else {
                handleFragmentCreationDrop(over);
            }
        } else {
            /**
             * Handle existing fragment drop.
             * If it's not hovering over another existing fragment then
             * do nothing.
             */
            if (over.id !== FRAGMENT_GRID_ID && active.id !== over.id) {
                handleMovementInFragmentGrid(active, over);
            }
        }

        setActiveId(null);
    }

    /**
     * Handle what happens to the fragment being dragged when the
     * dragging is cancelled
     */
    const handleDragCancel = (e) => {
        const {active} = e;
        setActiveId(null);
        
        if (active.id === NEW_FRAGMENT_ID) {
            setSidebarState({...sidebarState, open: true});
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
     * Change the style of the empty fragment grid when the
     * first fragment created is hovered above the grid.
     */
    const handleDragOver = (e) => {
        const {active, over} = e;
        console.log(active, over);

        if (!active || !over) {return;}

        if (active.id === NEW_FRAGMENT_ID && over.id === FRAGMENT_GRID_ID) {
            setFirstFragmentHovering(true);
        } else {
            setFirstFragmentHovering(false);
        }
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
            onDragCancel={handleDragCancel}
            onDragOver={handleDragOver}
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
                                    paddingBottom: 300,
                                }}
                            >
                                {fragments.map(f => (
                                    (f.onTimeline || !hideNonTimelineFragments) &&
                                    <FragmentCard
                                        key={f.id}
                                        fragment={f}
                                        isFiltered={filteredFragments.includes(f)}
                                        isSelected={filteredFragments.length > 0 && f.id === selectedFragmentIdx}
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