import { Card, Column, Container, DroppableItem, Row, Typography } from 'components';
import FragmentCard from './FragmentCard';
import { closestCorners, DndContext, DragOverlay, MouseSensor, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useState } from 'react';
import NewCard from './NewCard';
import { restrictOnlyFragments } from 'utils';

const FragmentGrid = (
    {
        fragmentGridHeight,
        fragments,
        setFragments,
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

    const handleDragEnd = async (e) => {

        setActiveId(null)
        const {active, over} = e;

        if (!active || !over) {return;}

        if (active.id === 'new-card') {
            // TODO: Card creation logic here
            setFragments(prev => prev.filter(f => f.id !== 'new-card'));
            setNewCards([newCard]);
            return;
        }

        if (active.id !== over.id) {
            const movedFragment = fragments.find(f => f.id === active.id);
            const overFragment = fragments.find(f => f.id === over.id);
            const newPosition = overFragment.position;

            moveFragment(movedFragment, newPosition);
        }
    }

    const handleDragOver = (e) => {
        const {active, over} = e;

        if (!active || !over) {return;}

        const activeContainer = active.data.current.sortable.containerId;
        const overContainer = over.data.current.sortable.containerId;

        if (activeContainer === 'create-card' && overContainer === 'fragment-grid') {
            if (fragments.filter(f => f.id === 'new-card').length === 0) {
                setFragments(prev => [...prev, newCard]);
                setNewCards([]);  
            }
        }

        if (overContainer === 'create-card' && active.id === 'new-card') {
            setFragments(prev => prev.filter(f => f.id !== 'new-card'));
            setNewCards([newCard]);
        }
    }

    const handleDragCancel = (e) => {
        const {active} = e;

        if (active.id === 'new-card') {
            // TODO: Card creation logic here
            setFragments(prev => prev.filter(f => f.id !== 'new-card'));
            setNewCards([newCard]);
            return;
        }
    }

    const handleDragStart = (e) => {
        setActiveId(e.active.id);
    }

    const [newCard, setNewCard] = useState({id: 'new-card', shortDescription: 'New Card'});
    const [newCards, setNewCards] = useState([newCard]);

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
                <DroppableItem
                    id='fragment-grid'
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
                            // flex: '1 1 0',
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

                        {}
                    </Container>
                </DroppableItem>
                <DroppableItem
                    id='create-card'
                    items={newCards}
                >
                    <Column
                        style={{
                            width: 'fit-content',
                            padding: '5rem 2rem',
                            height: fragmentGridHeight,
                            borderLeft: '1px solid var(--main-gray)',
                            alignItems: 'center',
                            gap: '3rem',
                        }}
                    >
                        <Typography
                            fontSize='medium'
                        >
                            Your fragment is ready!
                        </Typography>
                        <Typography
                            style={{width: '400px', textAlign: 'center'}}
                            color='label'
                        >
                            To save it, simply click and hold the card,
                            drag it to any spot on the fragment grid on
                            the left, and release. Once the card is
                            dropped onto the grid, it will be saved
                            in the position where it was dropped.
                        </Typography>  
                        <Container
                            style={{
                                width: 450,
                                height: 250,
                                borderRadius: 10,
                                border: '1px dashed var(--primary-color)'
                            }}
                        >
                            {newCards.map(f => (
                                <NewCard
                                    key={f.id}
                                    activeId={activeId}
                                    fragment={f}
                                />
                            ))}
                        </Container>
                    </Column>
                </DroppableItem>
            </Row>
            <DragOverlay>
                {activeId ? 
                    <Card
                        style={{
                            width: '400px',
                            maxWidth: '90vw',
                            height: '200px',
                            padding: '2rem',
                            gap: '1rem',
                            justifyContent: 'space-between',
                            border: '1px solid var(--primary-color)',
                        }}
                    >
                         <Column
                        style={{
                            gap:'0.2rem',
                            flex: 1,
                            display: '-webkit-box',
                            WebkitLineClamp: '3',
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            cursor: 'move',
                        }}
                    >
                        <Row style={{justifyContent: 'space-between'}}>
                            <Typography fontSize='extrasmall' color='label'>
                                Short description
                            </Typography>
                        </Row>
                        <Typography>
                            TODO: Add correct information
                        </Typography>
                    </Column>
                    </Card>
                    :
                    null
                }
            </DragOverlay>
        </DndContext>
    );
}
 
export default FragmentGrid;