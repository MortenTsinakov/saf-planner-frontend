import { IconButton, Row } from 'components';
import { TIMELINE_MAX_ZOOM, TIMELINE_MIN_ZOOM } from 'constants/Constants';
import { MdZoomIn, MdZoomOut } from 'react-icons/md';

const TimelineToolbar = ({zoom, setZoom}) => {
    return (
        <Row>
            <IconButton
                onClick={() => setZoom(Math.min(TIMELINE_MAX_ZOOM, zoom * 2))}
                icon={<MdZoomIn />}
            />
            <IconButton
                onClick={() => setZoom(Math.max(TIMELINE_MIN_ZOOM, zoom * 0.5))}
                icon={<MdZoomOut />}
            />
        </Row>
    );
}
 
export default TimelineToolbar;