import { IconButton, Row } from 'components';
import { TIMELINE_MAX_ZOOM, TIMELINE_MIN_ZOOM } from './TimelineConstants';
import { useProject } from 'hooks';
import { MdZoomIn, MdZoomOut, MdOutlineTimer } from 'react-icons/md';

const TimelineToolbar = ({zoom, setZoom, showEstimatedDuration, setShowEstimatedDuration}) => {

    const {project} = useProject();

    return (
        <Row>
            <IconButton
                onClick={() => setZoom(Math.min(TIMELINE_MAX_ZOOM, zoom * 2))}
                icon={<MdZoomIn />}
                title='Zoom in'
            />
            <IconButton
                onClick={() => setZoom(Math.max(TIMELINE_MIN_ZOOM, zoom * 0.5))}
                icon={<MdZoomOut />}
                title='Zoom out'
            />
            {
                project.estimatedLengthInSeconds !== 0 &&
                <IconButton
                    onClick={() => {setShowEstimatedDuration(!showEstimatedDuration)}}
                    icon={<MdOutlineTimer />}
                    title={showEstimatedDuration ? 'Hide target duration indicator' : 'Show target duration indicator'}
                />
            }
        </Row>
    );
}
 
export default TimelineToolbar;