import { Card, Column, Row, Typography } from 'components';

const CreateFragmentDragOverlay = ({fragment}) => {
    return (
        <Card
            style={{
                width: '400px',
                maxWidth: '90vw',
                height: '200px',
                padding: '2rem',
                gap: '0.8rem',
                justifyContent: 'space-between',
            }}
            data-testid={'new-card'}
        >
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
 
export default CreateFragmentDragOverlay;