import { useDroppable } from '@dnd-kit/core';

const Droppable = ({id, ...props}) => {

    const {setNodeRef} = useDroppable({
        id,
    });

    return (
        <div
            className='droppable'
            ref={setNodeRef}
        >
            {props.children}
        </div>
    );
}
 
export default Droppable;