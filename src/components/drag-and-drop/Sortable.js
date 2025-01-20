import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const Sortable = ({id, children}) => {

    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({
        id,
        animateLayoutChanges: () => false,
    });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }


    return (
        <div
            className="sortable"
            ref={setNodeRef}
            style={style}
        >
            {children({listeners, attributes})}
        </div>
    );
}
 
export default Sortable;