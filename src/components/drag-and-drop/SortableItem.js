import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableItem = ({id, children, activeId}) => {

    const {attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({
        id,
        animateLayoutChanges: () => false,
    });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        visibility: activeId === id ? 'hidden' : 'visible',
    }


    return (
        <div
            className="sortable"
            ref={setNodeRef}
            style={style}
        >
            {children({listeners, attributes, isDragging})}
        </div>
    );
}
 
export default SortableItem;