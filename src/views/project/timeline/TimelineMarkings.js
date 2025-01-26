import { Column, Container, Row, Typography } from 'components';
import { PIXELS_PER_SECOND, ZOOM_TO_INTERVAL, TIMELINE_ITEM_HEIGHT, TIMELINE_MARKING_HEIGHT } from './TimelineConstants';
import { useProject } from 'hooks';

const TimelineMarkings = ({maxTimelineWidth, showEstimatedDuration, zoom}) => {

    const {project} = useProject();

    const intervalInSeconds = ZOOM_TO_INTERVAL[zoom];
    
    const estimatedDuration = project.estimatedLengthInSeconds ? project.estimatedLengthInSeconds : 0;
    const nrOfMarkings = Math.ceil((maxTimelineWidth / PIXELS_PER_SECOND / zoom) / intervalInSeconds);
    
    const markings = Array.from({length: nrOfMarkings}, (_, index) => ({
        time: index * intervalInSeconds,
    }));

    return (
        <Column
            className="timeline-markings"
            style={{
                borderTop: '1px solid gray',
                paddingBottom: '20px',
                height: 80,
                position: 'relative'
            }}
        >
            <Container>
                {markings.map((mark) => (
                    <Row
                        key={mark.time}
                    >
                        <Column
                            style={{gap:0}}
                        >
                            <Column
                                style={{
                                    height: mark.time % 60 === 0 ? 20 : 10,
                                    width: intervalInSeconds * PIXELS_PER_SECOND * zoom,
                                    borderLeft: `1px solid gray`,
                                }}
                            >
                            </Column>
                            <Typography
                                color={mark.time % 60 === 0 ? '' : 'label'}
                                style={{
                                    fontSize: '1.5rem',
                                    transform: 'translate(-10px)'
                                }}
                            >
                                {mark.time % 60 === 0 ? `${mark.time / 60} min`: mark.time % 60}
                            </Typography>
                        </Column>
                    </Row>
                ))}
            </Container>
            { showEstimatedDuration && project.estimatedLengthInSeconds !== 0 &&                
                <Column
                    style={{
                        border: '2px solid var(--color-error)',
                        width: 'fit-content', 
                        height: 'fit-content', 
                        padding: '2px 10px', 
                        borderRadius: '10px', 
                        marginLeft: estimatedDuration * PIXELS_PER_SECOND * zoom,
                        transform: 'translate(-50%, 10px)',
                    }}
                >
                    <Column
                        style={{
                            width: '2px', 
                            height: TIMELINE_ITEM_HEIGHT + TIMELINE_MARKING_HEIGHT - 2, 
                            backgroundColor: 'var(--color-error)', 
                            position: 'absolute', 
                            transform: `translate(52px, -${TIMELINE_ITEM_HEIGHT + TIMELINE_MARKING_HEIGHT}px)`
                        }} 
                    />
                    <Typography
                        fontSize='extrasmall'
                        style={{
                            textWrap: 'nowrap',
                            color: 'var(--text-color',
                        }}
                    >
                        Target Duration
                    </Typography>
                </Column>
            }
        </Column>
    );
}
 
export default TimelineMarkings;