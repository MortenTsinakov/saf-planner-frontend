import { Divider, IconButton, Row } from "components";
import { MdAutoStories, MdGridView, MdLinearScale, MdOutlineModeComment, MdSettings, MdShare, MdTv, MdViewTimeline } from "react-icons/md";
import { useProjectStore } from "stores";
import ApplyFilters from "./ApplyFilters";
import { useState } from "react";
import ShareProject from "../share_project/ShareProject";
import { useNavigate } from "react-router-dom";

const Toolbar = ({
    readAllPanelSettings,
    setReadAllPanelSettings,
    timelinePanelSettings,
    setTimelinePanelSettings,
    filters,
    setFilters,
    mainPanelViews,
    mainPanelView,
    setMainPanelView,
    hideNonTimelineFragments,
    setHideNonTimelineFragments,
}) => {

    const {project, sidebarState, setSidebarState} = useProjectStore();
    const [shareProject, setShareProject] = useState(false);
    const navigate = useNavigate();

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

    const toggleNonTimelineFragments = () => {
        setHideNonTimelineFragments(!hideNonTimelineFragments);
    }

    const handleShareProjectClick = () => {
        setShareProject(true);
    }

    const handleSettingsClick = () => {
        navigate(`/project-settings?projectId=${project.id}`);
    }

    return (
        <Row
            style={{
                height: 55,
                alignItems: 'center',
                paddingLeft: '1rem',
                paddingRight: '1rem',
                borderBottom: '1px solid var(--main-gray)',
                justifyContent: 'space-between',
            }}
        >
            <Row
                style={{
                    height: '100%',
                    alignItems: 'center'
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
                <IconButton
                    style={{
                        ...iconStyle,
                        color: hideNonTimelineFragments && 'var(--color-error)'
                    }}
                    icon={<MdLinearScale />}
                    title={hideNonTimelineFragments ? 'Show fragments that are not on timeline' : 'Hide fragments that are not on timeline'}
                    onClick={toggleNonTimelineFragments}
                />
                {
                    project.labels.length > 0 &&
                    <ApplyFilters
                        filters={filters}
                        setFilters={setFilters}
                        style={iconStyle}
                    />
                }
            </Row>
            <Row>
                <IconButton
                    style={iconStyle}
                    icon={<MdShare />}
                    title='Share project'
                    onClick={handleShareProjectClick}
                />
                <IconButton
                    style={iconStyle}
                    icon={<MdOutlineModeComment />}
                    title='Read comments'
                />
                <IconButton
                    style={iconStyle}
                    icon={<MdSettings />}
                    title="Project settings"
                    onClick={handleSettingsClick}
                />
            </Row>

            {
                shareProject
                &&
                <ShareProject
                    setModalIsOpen={setShareProject}
                />
            }
        </Row>
    );
}
 
export default Toolbar;