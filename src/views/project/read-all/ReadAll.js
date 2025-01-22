import { Column, Row, Typography } from 'components';
import { useProject } from 'hooks';
import { useState } from 'react';

const ReadAll = ({readAllHeight, readAllWidth, setReadAllWidth}) => {

    const {fragments} = useProject();

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
                gap: 0,
            }}
            data-testid='read-all'
        >
            <Column
                style={{
                    padding: '4rem 2rem 4rem 2rem',
                    flex: 1,
                    overflowY: 'scroll',
                }}
            >
                <Typography></Typography>
                {
                fragments.length > 0 
                ?
                fragments.map(f => (
                    <Column
                        key={f.id}
                        data-testid='fragment'
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
                    height: readAllHeight,
                    width: '5px',
                    borderRight: (isHovered || isResizing) ? '5px solid var(--primary-color)' : '1px solid var(--main-gray)',
                    cursor: 'col-resize',
                }}
                data-testid='resize-handle'
            />
        </Row>
    );
}
 
export default ReadAll;