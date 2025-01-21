import { Container, SortableContextWrapper, Row, Typography } from 'components';
import FragmentCard from './FragmentCard';
import { closestCorners, DndContext, DragOverlay, MouseSensor, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useState } from 'react';
import { restrictOnlyFragments } from 'utils';
import CreateFragment from './CreateFragment';
import CreateFragmentDragOverlay from './drag_overlays/CreateFragmentDragOverlay';
import FragmentDragOverlay from './drag_overlays/FragmentDragOverlay';
import { FRAGMENT_GRID_ID, NEW_FRAGMENT_ID, NEW_FRAGMENT_PANEL_ID } from 'constants/Constants';
import { useAlerts } from 'hooks';

/**
 * Grid that displays project fragments.
 * It's also possible to add new fragments on the grid.
 */
const FragmentGrid = (
    {
        fragmentGridHeight,
        fragments,
        setFragments,
        showCreateFragmentPanel,
        setShowCreateFragmentPanel,
        createFragment,
        updateFragmentOnTimelineStatus,
        updateFragmentShortDescription,
        updateFragmentLongDescription,
        updateFragmentDuration,
        moveFragment,
        deleteFragment,
        ...props}) => 
    {

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(MouseSensor),
        useSensor(TouchSensor),
    );

    const [activeId, setActiveId] = useState(null);
    const {addAlert} = useAlerts();

    /**
     * Handle moving a fragment inside the fragment grid.
     */
    const handleMovementInFragmentGrid = async(active, over) => {
        if (active.id !== over.id) {
            const movedFragment = fragments.find(f => f.id === active.id);
            const overFragment = fragments.find(f => f.id === over.id);
            const newPosition = overFragment.position;

            moveFragment(movedFragment, newPosition);
        }
    } 

    /**
     * Handle dropping the newly created fragment.
     * If the fragment is dropped onto the fragment grid, it will be saved
     * to the database. Otherwise it will be returned to it's initial position.
     */
    const handleFragmentCreationDrop = async (active, over) => {
        if (active.data.current.sortable.containerId === NEW_FRAGMENT_PANEL_ID) {
            setNewCards(newCards.filter(f => f.id === NEW_FRAGMENT_ID));
            return;
        } else if (over.data.current.sortable.containerId === FRAGMENT_GRID_ID) {
            const newCard = fragments.find(f => f.id === NEW_FRAGMENT_ID);
            const overCard = fragments.find(f => f.id === over.id);
            const data = {
                shortDescription: newCard.shortDescription.trim(),
                longDescription: newCard.longDescription.trim(),
                durationInSeconds: newCard.durationInSeconds <= 0 ? 5 : newCard.durationInSeconds,
                onTimeline: newCard.onTimeline,
                position: overCard.position || fragments.length,
                projectId: props.projectId,
            }
            setFragments(prev => prev.filter(f => f.id !== NEW_FRAGMENT_ID));
            const fragmentCreatedSuccessfully = await createFragment(data);
            if (fragmentCreatedSuccessfully) {
                addAlert("Fragment created", "success");
                setShowCreateFragmentPanel(false);
            }
            return;
        }
        setFragments(prev => prev.filter(f => f.id !== NEW_FRAGMENT_ID));
        setNewCards([...fragments.filter(f => f.id === NEW_FRAGMENT_ID), ...newCards.filter(f => f.id === NEW_FRAGMENT_ID)]);
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

        console.log(active, over);

        if (!active || !over) {return;}

        const activeContainer = active.data.current?.sortable.containerId;
        const overContainer = active.data.current?.sortable.containerId;

        if (!activeContainer || !overContainer) {return;}

        if (active.id !== NEW_FRAGMENT_ID && activeContainer === FRAGMENT_GRID_ID && overContainer === FRAGMENT_GRID_ID) {
            handleMovementInFragmentGrid(active, over);
        }

        if (active.id === NEW_FRAGMENT_ID) {
            handleFragmentCreationDrop(active, over);
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

        if (activeContainer === NEW_FRAGMENT_PANEL_ID && overContainer === FRAGMENT_GRID_ID) {
            if (fragments.filter(f => f.id === NEW_FRAGMENT_ID).length === 0) {
                setFragments(prev => [...prev, ...newCards.filter(f => f.id === NEW_FRAGMENT_ID)]);
                setNewCards([]);
            }
        }

        if (overContainer === NEW_FRAGMENT_PANEL_ID && active.id === NEW_FRAGMENT_ID) {
            setFragments(prev => prev.filter(f => f.id !== NEW_FRAGMENT_ID));
        }
    }

    /**
     * Handle what happens to the fragment being dragged when the
     * dragging is cancelled
     */
    const handleDragCancel = (e) => {
        const {active} = e;
        setActiveId(null);

        if (active.id === NEW_FRAGMENT_ID) {
            setNewCards(fragments.filter(f => f.id === NEW_FRAGMENT_ID));
            setFragments(prev => prev.filter(f => f.id !== NEW_FRAGMENT_ID));
            return;
        }
    }

    /**
     * Set which fragment is being dragged. It's mainly necessary
     * for drag overlays.
     */
    const handleDragStart = (e) => {
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
            if (newCards.length > 0) {
                fragment = newCards.find(f => f.id === NEW_FRAGMENT_ID);
            } else {
                fragment = fragments.find(f => f.id === NEW_FRAGMENT_ID);
            }
            return <CreateFragmentDragOverlay fragment={fragment}/> 
        }

        const fragment = fragments.find(f =>  f.id === activeId);
        return <FragmentDragOverlay fragment={fragment}/> 
    }

    /**
     * A list of newly created cards. There should always be a single card
     * in the array, but the dnd-kit Sortable needs a list.
     */
    const [newCards, setNewCards] = useState([]);

    return (
        <DndContext
            modifiers={[restrictOnlyFragments]}
            collisionDetection={closestCorners}
            sensors={sensors}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDragCancel={handleDragCancel}
            onDragStart={handleDragStart}
        >
            <Row>
                <SortableContextWrapper
                    id={FRAGMENT_GRID_ID}
                    items={fragments}
                >
                    <Container
                        style={{
                            padding: '2rem',
                            gap: '1.5rem',
                            flexWrap: 'wrap',
                            justifyContent: 'start',
                            alignContent: 'flex-start',
                            maxHeight: fragmentGridHeight,
                            overflow: 'auto',
                            flex: '1 1 0',
                        }}
                    >
                        {
                            fragments.length === 0
                            ?
                            <Typography
                                data-testid='no-fragments-error-message'
                            >
                                This project has no fragments yet...
                            </Typography>
                            :
                            fragments.map(f => (
                                <FragmentCard
                                    key={f.id}
                                    activeId={activeId}
                                    fragment={f}
                                    createFragment={createFragment}
                                    updateFragmentOnTimelineStatus={updateFragmentOnTimelineStatus}
                                    updateFragmentShortDescription={updateFragmentShortDescription}
                                    updateFragmentLongDescription={updateFragmentLongDescription}
                                    updateFragmentDuration={updateFragmentDuration}
                                    deleteFragment={deleteFragment}
                                    {...props}
                                />
                            ))
                        }
                    </Container>
                    </SortableContextWrapper>
                        {
                            showCreateFragmentPanel
                            &&
                            <CreateFragment
                                activeId={activeId}
                                newCards={newCards}
                                setNewCards={setNewCards}
                                createFragment={createFragment}
                                fragmentGridHeight={fragmentGridHeight}
                                setShowCreateFragmentPanel={setShowCreateFragmentPanel}
                            />
                        }
            </Row>
            <DragOverlay>
                {getDragOverlay()}
            </DragOverlay>
        </DndContext>
    );
}
 
export default FragmentGrid;