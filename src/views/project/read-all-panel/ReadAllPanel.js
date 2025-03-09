import { Column, Divider, IconButton, Row, Typography } from 'components';
import { useState } from 'react';
import { MdArrowLeft, MdArrowRight, MdClose } from 'react-icons/md';
import { useProjectStore } from 'stores';

const ReadAllPanel = ({readAllPanelSettings, setReadAllPanelSettings, filteredFragments}) => {

    const {project} = useProjectStore();

    const [isResizing, setIsResizing] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const iconStyle = {
        fontSize: '3rem',
    };

    const handleResizeClick = (e) => {
        e.preventDefault();
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        setIsResizing(true);
    }

    const handleMouseMove = (e) => {
        const width = e.clientX;
        setReadAllPanelSettings({
            ...readAllPanelSettings,
            width: width,
        })
    }

    const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        setIsResizing(false);
    }

    const handleClosePanel = () => {
        setReadAllPanelSettings({
            ...readAllPanelSettings,
            isOpen: false,
        });
    }

    if (!readAllPanelSettings.isOpen) {
        return;
    }

    return (
        <Row
            style={{
                backgroundColor: 'var(--background-color-medium)',
                width: readAllPanelSettings.width,
                minWidth: '250px',
                overflowY: 'auto',
                gap: 0,
            }}
            data-testid='read-all'
        >
            
            <Column
                style={{
                    padding: '4rem 2rem 4rem 2rem',
                    flex: 1,
                    overflowY: 'auto',
                }}
            >
                <Row
                    style={{
                        justifyContent: 'end',
                    }}
                >
                    <IconButton
                        icon={<MdClose />}
                        onClick={handleClosePanel}
                        style={iconStyle}
                    />
                </Row>
                <Typography></Typography>
                {
                filteredFragments.length > 0 
                ?
                <Column style={{gap:'2rem'}}>
                <Typography fontSize='medium'>{project.title}</Typography>
                <Divider />
                {
                filteredFragments.map(f => (
                    f.onTimeline &&
                    <Column
                        key={f.id}
                        data-testid='fragment'
                    >
                        <Typography>
                            {f.longDescription}
                        </Typography>
                    </Column>
                ))}
                </Column>
                :
                <Typography>No fragments to display...</Typography>
                }
            </Column>
            <Column
                onMouseDown={(e) => handleResizeClick(e)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                    width: '5px',
                    borderRight: (isHovered || isResizing) ? '5px solid var(--primary-color)' : '1px solid var(--main-gray)',
                    cursor: 'col-resize',
                }}
                data-testid='resize-handle'
            />
        </Row>
    );
}
 
export default ReadAllPanel;