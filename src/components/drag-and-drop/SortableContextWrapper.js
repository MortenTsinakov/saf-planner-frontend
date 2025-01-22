import { rectSortingStrategy, SortableContext, useSortable } from '@dnd-kit/sortable';

const SortableContextWrapper = ({id, items, children}) => {

    const {setNodeRef} = useSortable({id});

    return (
        <SortableContext
            id={id}
            className='sortable-context'
            items={items}
            strategy={rectSortingStrategy}
        >
            {children({setNodeRef})}
        </SortableContext>
    );
}
 
export default SortableContextWrapper;