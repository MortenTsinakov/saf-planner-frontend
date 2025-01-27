import { PIXELS_PER_SECOND } from './TimelineConstants';
import './TimelineItem.css';


const TimelineItem = ({fragment, zoom}) => {
    return (
        <div
            className="timeline-item"
            style={{
                width: `${fragment.durationInSeconds * zoom * PIXELS_PER_SECOND}px`,
                minWidth: `${fragment.durationInSeconds * zoom * PIXELS_PER_SECOND}px`,
                maxWidth: `${fragment.durationInSeconds * zoom * PIXELS_PER_SECOND}px`,
            }}
            data-testid='timeline-item'
        />
    );
}
 
export default TimelineItem;