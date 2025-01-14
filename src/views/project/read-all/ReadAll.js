import { Column, Row, Typography } from 'components';
import { useState } from 'react';

const ReadAll = ({fragments, readAllHeight, readAllWidth, setReadAllWidth, ...props}) => {

    const [isResizing, setIsResizing] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleResizeClick = (e) => {
        e.preventDefault();
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        setIsResizing(true);
    }

    const handleMouseMove = (e) => {
        const newSize = e.clientX;
        setReadAllWidth(newSize);
    }

    const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        setIsResizing(false);
    }

    return (
        <Row
            style={{
                backgroundColor: 'var(--background-color-medium)',
                width: readAllWidth,
                minWidth: '250px',
                height: readAllHeight,
                overflowY: 'auto',
            }}
        >
            <Column
                style={{
                    padding: '4rem 2rem',
                    flex: 1,
                }}
            >
                <Typography></Typography>
                {
                fragments.length > 0 
                ?
                fragments.map(f => (
                    <Column
                        key={f.id}
                    >
                        <Typography>
                            {f.longDescription}
                        </Typography>
                    </Column>
                ))
                :
                <Typography>This project has no fragments yet...</Typography>
                }
            </Column>
            <Column
                onMouseDown={(e) => handleResizeClick(e)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                    // backgroundColor: (isResizing || isHovered) ? 'var(--primary-color)' : 'var(--main-gray)',
                    height: readAllHeight,
                    width: '5px',
                    borderRight: (isHovered || isResizing) ? '5px solid var(--primary-color)' : '1px solid var(--main-gray)',
                    cursor: 'col-resize',
                }}
            />
        </Row>
    );
}
 
export default ReadAll;