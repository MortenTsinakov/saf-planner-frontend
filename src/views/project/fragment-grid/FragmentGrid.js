import { Container, DroppableSortable, Typography } from 'components';
import FragmentCard from './FragmentCard';
import { closestCorners, DndContext, MouseSensor, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';

const FragmentGrid = (
    {
        fragmentGridHeight,
        fragments,
        createFragment,
        updateFragmentOnTimelineStatus,
        updateFragmentShortDescription,
        updateFragmentLongDescription,
        updateFragmentDuration,
        deleteFragment,
        ...props}) => 
    {

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(MouseSensor),
        useSensor(TouchSensor),
    );

    const handleDragEnd = async (e) => {

        const {active, over} = e;

        // TODO: Save changes to backend, you can use the following logic in
        // in the hook.

        if (active.id !== over.id) {
            const movedFragment = fragments.find(f => f.id === active.id);
            const overFragment = fragments.find(f => f.id === over.id);

            const previousPosition = movedFragment.position;
            const newPosition = overFragment.position;

            if (movedFragment.position < overFragment.position) {
                const updatedFragments = fragments.map(f => {
                    if (f.id === movedFragment.id) {
                        f.position = newPosition;
                        return f;
                    }
                    if (f.position < previousPosition || f.position > newPosition) {
                        return f;
                    }
                    f.position -= 1;
                    return f;
                });
                console.log(updatedFragments);
            } else {
                const updatedFragments = fragments.map(f => {
                    if (f.id === movedFragment.id) {
                        f.position = newPosition;
                        return f;
                    }
                    if (f.position > previousPosition || f.position < newPosition) {
                        return f;
                    }
                    f.position += 1;
                    return f;
                });
                console.log(updatedFragments);
            }
        }
    }

    const fragmentIds = fragments.map(f => f.id);

    return (
        <DndContext
            modifiers={[restrictToParentElement]}
            collisionDetection={closestCorners}
            sensors={sensors}
            onDragEnd={handleDragEnd}
        >
            <DroppableSortable
                id='fragment-grid'
                items={fragmentIds}
            >
                <Container
                    style={{
                        padding: '2rem',
                        gap: '1.5rem',
                        flexWrap: 'wrap',
                        justifyContent: 'start',
                        maxHeight: fragmentGridHeight,
                        overflow: 'auto',
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
            </DroppableSortable>
        </DndContext>
    );
}
 
export default FragmentGrid;