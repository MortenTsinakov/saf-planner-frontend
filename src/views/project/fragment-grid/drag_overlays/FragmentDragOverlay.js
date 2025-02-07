import { Card, Column, IconButton, Row, Typography } from 'components';
import { MdAccessTime, MdMoreHoriz } from 'react-icons/md';

const FragmentDragOverlay = ({fragment}) => {

    const iconStyle = {
        fontSize: '2.2rem',
        margin: 0,
        padding: 0,
        alignItems: 'center',
    };

    return (
        <Card
            style={{
                width: '400px',
                maxWidth: '90vw',
                height: '200px',
                padding: '2rem',
                gap: '0.8rem',
                justifyContent: 'space-between'
            }}
        >
            <Row
                style={{height: '2rem', gap: '1rem', justifyContent: 'space-between'}}
            >
                <IconButton
                    icon={<MdMoreHoriz />}
                    style={iconStyle}
                />
                <IconButton
                    style={{
                        fontSize: '2.5rem',
                        margin: 0,
                        padding: 0,
                        alignItems: 'center',
                        color: fragment.onTimeline ? 'var(--text-color)' : 'var(--main-gray)'
                    }}
                    icon={<MdAccessTime />}
                />
            </Row>
            <Column
                style={{
                    gap:'0.2rem',
                    flex: 1,
                    display: '-webkit-box',
                    WebkitLineClamp: '3',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    cursor: 'move',
                }}
            >
                <Row style={{justifyContent: 'space-between'}}>
                    <Typography fontSize='extrasmall' color='label'>
                        Short description
                    </Typography>
                </Row>
                <Typography>
                    {fragment.shortDescription}
                </Typography>
            </Column>
            <Row style={{overflow: 'hidden'}}>
                {fragment.labels.map(label => (
                    <div
                        style={{
                            height: 15,
                            width: 15,
                            backgroundColor: label.color,
                            borderRadius: '50%'
                        }}
                    />
                ))}
            </Row>
        </Card>
    );
}
 
export default FragmentDragOverlay;