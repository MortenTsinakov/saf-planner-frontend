import { Column, Typography } from 'components';
import { PIXELS_PER_SECOND, ZOOM_TO_INTERVAL } from 'constants/Constants';

const TimelineMarkings = ({currentDuration, zoom}) => {

    const intervalInSeconds = ZOOM_TO_INTERVAL[zoom];
    const nrOfMarkings = Math.ceil(currentDuration / intervalInSeconds);
    const markings = Array.from({length: nrOfMarkings}, (_, index) => ({
        time: index * intervalInSeconds,
    }));

    return (
        <Column
            className="timeline-markings"
            style={{
                minWidth: currentDuration * PIXELS_PER_SECOND * zoom, 
                width: currentDuration * PIXELS_PER_SECOND * zoom,
                maxWidth: currentDuration * PIXELS_PER_SECOND * zoom,
                display: 'flex',
                borderTop: '1px solid gray',
                paddingBottom: '20px',
            }}
        >
            {markings.map((mark) => (
                <Column
                    key={mark.time}
                    style={{
                        gap: 0,
                    }}
                >
                    <Column
                        style={{
                            height: mark.time % 60 === 0 ? 20 : 10,
                            width: intervalInSeconds * PIXELS_PER_SECOND * zoom,
                            borderLeft: `1px solid gray`
                        }}
                    >
                    </Column>
                    <Typography
                        color={mark.time % 60 === 0 ? '' : 'label'}
                        style={{
                            fontSize: '1.5rem',
                            transform: 'translate(-8px)'
                        }}
                    >
                        {mark.time % 60 === 0 ? `${mark.time / 60} min`: mark.time % 60}
                    </Typography>
                </Column>
            ))}
        </Column>
    );
}
 
export default TimelineMarkings;