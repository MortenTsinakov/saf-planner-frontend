import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';

const DroppableSortable = ({id, items, children}) => {

    return (
        <SortableContext
            id={id}
            className='sortable-context'
            items={items}
            strategy={rectSortingStrategy}
        >
            {children}
        </SortableContext>
    );
}
 
export default DroppableSortable;