import { Column, Divider, DropdownMenu, IconButton, Row, TextButton, TickBox } from 'components';
import Label from 'components/ui/labels/Label';
import { useState } from 'react';
import { MdOutlineFilterAlt } from 'react-icons/md';
import { useProjectStore } from 'stores';

const ApplyFilters = ({style}) => {

    // const {project, filters, applyFilter, removeFilter} = useProjectStore();
    const project = useProjectStore((state) => state.project);
    const filters = useProjectStore((state) => state.filters);
    const applyFilter = useProjectStore((state) => state.applyFilter);
    const removeFilter = useProjectStore((state) => state.removeFilter);
    const resetFilters = useProjectStore((state) => state.resetFilters);
    const [filterMenuIsOpen, setFilterMenuIsOpen] = useState(false);

    const handleSelectLabelClick = (labelId) => {
        if (filters.includes(labelId)) {
            removeFilter(labelId);
        } else {
            applyFilter(labelId);
        }
    }

    const handleResetFilters = () => {
        resetFilters();
    }

    return (
        <Column
            style={{position: 'relative'}}
        >
            <IconButton
                icon={<MdOutlineFilterAlt />}
                style={{
                    ...style,
                    color: filters.length > 0 && 'var(--color-error)'
                }}
                onClick={() => setFilterMenuIsOpen(!filterMenuIsOpen)}
            />
            {
                filterMenuIsOpen &&
                <DropdownMenu
                    alignedBy='left'
                    style={{
                        padding: '2rem',
                        width: '250px',
                        maxHeight: '500px',
                        overflow: 'auto',
                    }}
                    onMouseLeave={() => setFilterMenuIsOpen(false)}
                >
                    {
                        filters.length > 0 &&
                        <Column style={{width: '100%'}}>
                            <TextButton
                                onClick={handleResetFilters}
                            >
                                Remove filters
                            </TextButton>
                            <Divider />
                        </Column>
                    }
                    {project.labels.map(label => (
                        <Row
                            key={label.id}
                            style={{justifyContent: 'space-between', width: '100%'}}
                        >
                            <Label
                                color={label.color}
                            >
                                {label.description}
                            </Label>
                            <TickBox
                                size='2.5rem'
                                selected={filters.includes(label.id)}
                                onClick={() => handleSelectLabelClick(label.id)}
                            />
                        </Row>
                    ))}
                </DropdownMenu>
            }
        </Column>
    );
}
 
export default ApplyFilters;