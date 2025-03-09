import { IconButton, Row } from "components";
import { MdAutoStories, MdImage, MdLibraryBooks, MdViewTimeline } from "react-icons/md";

const Toolbar = ({
    readAllPanelSettings,
    setReadAllPanelSettings,
    timelinePanelSettings,
    setTimelinePanelSettings,
    imagePanelSettings,
    setImagePanelSettings,
}) => {

    const iconStyle = {
        fontSize: '3rem',
    };

    const toggleReadAllPanel = () => {
        setReadAllPanelSettings({
            ...readAllPanelSettings,
            isOpen: !readAllPanelSettings.isOpen,
        });
    }

    const toggleTimelinePanel = () => {
        setTimelinePanelSettings({
            ...timelinePanelSettings,
            isOpen: !timelinePanelSettings.isOpen,
        });
    }

    const toggleImagePanel = () => {
        setImagePanelSettings({
            ...imagePanelSettings,
            isOpen: !imagePanelSettings.isOpen,
        });
    }

    return (
        <Row
            style={{
                height: 55,
                alignItems: 'center',
                paddingLeft: '1rem'
            }}
        >
            <IconButton
                icon={<MdAutoStories />}
                style={iconStyle}
                onClick={toggleReadAllPanel}
            />
            <IconButton
                icon={<MdViewTimeline />}
                style={iconStyle}
                onClick={toggleTimelinePanel}
            />
            <IconButton
                icon={<MdImage />}
                style={iconStyle}
                onClick={toggleImagePanel}
            />
        </Row>
    );
}
 
export default Toolbar;