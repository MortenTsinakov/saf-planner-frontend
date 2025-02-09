import { Column, Container, Row, Typography } from 'components';
import { PIXELS_PER_SECOND, ZOOM_TO_INTERVAL } from '../TimelineConstants';

const TimelineMarkings = ({maxTimelineWidth, zoom}) => {

    const intervalInSeconds = ZOOM_TO_INTERVAL[zoom];    
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
                position: 'relative',
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
        </Column>
    );
}
 
export default TimelineMarkings;