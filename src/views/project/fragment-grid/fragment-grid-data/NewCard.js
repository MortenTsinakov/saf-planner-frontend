import { Card, Column, Row, SortableItem, Typography } from 'components';
import { NEW_FRAGMENT_ID } from '../FragmentGridConstants';
import { useProjectStore } from 'stores';

const NewCard = ({fragment}) => {

    const {activeId} = useProjectStore();

    return (
        <SortableItem
            id={NEW_FRAGMENT_ID}
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
                        gap: '0.8rem',
                        justifyContent: 'space-between',
                    }}
                    data-testid={'new-card'}
                    >
                    <Column
                        style={{
                            gap:'0.2rem',
                            flex: 1,
                            cursor: 'move',
                        }}
                    >
                        <Row style={{justifyContent: 'space-between'}}>
                            <Typography fontSize='extrasmall' color='label'>
                                Short description
                            </Typography>
                        </Row>
                        <Typography
                            style={{
                                display: '-webkit-box',
                                WebkitLineClamp: '3',
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                            }}
                        >
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
                                title={label.description}
                            />
                        ))}
                    </Row>
                </Card>
            )}
        </SortableItem>
    );
}
 
export default NewCard;