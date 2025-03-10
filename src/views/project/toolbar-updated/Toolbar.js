import { Divider, IconButton, Row } from "components";
import { MdAutoStories, MdGridView, MdImage, MdLibraryBooks, MdTv, MdViewTimeline } from "react-icons/md";
import { useProjectStore } from "stores";
import ApplyFilters from "./ApplyFilters";

const Toolbar = ({
    readAllPanelSettings,
    setReadAllPanelSettings,
    timelinePanelSettings,
    setTimelinePanelSettings,
    imagePanelSettings,
    setImagePanelSettings,
    filters,
    setFilters,
    mainPanelViews,
    mainPanelView,
    setMainPanelView,
}) => {

    const {project, sidebarState, setSidebarState} = useProjectStore();

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

    const changeViewToPresentation = () => {
        setSidebarState({
            ...sidebarState,
            open: false,
        });
        setMainPanelView(mainPanelViews.PRESENTATION);
    }

    const changeViewToFragmentGrid = () => {
        setMainPanelView(mainPanelViews.FRAGMENT_GRID);
    }

    return (
        <Row
            style={{
                height: 55,
                alignItems: 'center',
                paddingLeft: '1rem',
                borderBottom: '1px solid var(--main-gray)',
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
            {
                mainPanelView === mainPanelViews.FRAGMENT_GRID &&
                <IconButton
                    icon={<MdTv />}
                    style={iconStyle}
                    onClick={changeViewToPresentation}
                />
            }
            {
                mainPanelView === mainPanelViews.PRESENTATION &&
                <IconButton
                    icon={<MdGridView />}
                    style={iconStyle}
                    onClick={changeViewToFragmentGrid}
                />
            }
            <Divider horizontal={false} />
            {
                project.labels.length > 0 &&
                <ApplyFilters
                    filters={filters}
                    setFilters={setFilters}
                    style={iconStyle}
                />
            }
        </Row>
    );
}
 
export default Toolbar;