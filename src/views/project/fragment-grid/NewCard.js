import { Card, Column, Row, SortableItem, Typography } from 'components';

const NewCard = ({fragment, activeId}) => {
    return (
        <SortableItem
            id={'new-card'}
            key={fragment.id}
            activeId={activeId}
        >
            {({attributes, listeners}) => (
                <Card
                    {...attributes}
                    {...listeners}
                    style={{
                        width: '400px',
                        maxWidth: '90vw',
                        height: '200px',
                        padding: '2rem',
                        gap: '1rem',
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
                </Card>
            )}
        </SortableItem>
    );
}
 
export default NewCard;