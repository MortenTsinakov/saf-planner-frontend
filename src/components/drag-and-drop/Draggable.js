import { useDraggable } from '@dnd-kit/core';

const Draggable = ({id, children}) => {

    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id,
    });
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 1,
        cursor: 'move',
    } : undefined;

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            className="draggable"
        >
            {children({listeners, attributes})}
        </div>
    );
}
 
export default Draggable;