import { Divider, IconButton, Row } from "components";
import { MdKeyboard, MdLightbulb, MdLinearScale, MdSettings, MdShare } from "react-icons/md";
import { useProjectStore } from "stores";
import ApplyFilters from "./ApplyFilters";
import { useState } from "react";
import ShareProject from "../share_project/ShareProject";
import { useNavigate } from "react-router-dom";
import PlanModeToolbar from "./mode-toolbars/PlanModeToolbar";
import ScriptwriterModeToolbar from "./mode-toolbars/ScriptwriterModeToolbar";

const Toolbar = ({
    readAllPanelSettings,
    setReadAllPanelSettings,
    timelinePanelSettings,
    setTimelinePanelSettings,
    scriptEditorSettings,
    setScriptEditorSettings,
    filters,
    setFilters,
    mainPanelViews,
    mainPanelView,
    setMainPanelView,
    hideNonTimelineFragments,
    setHideNonTimelineFragments,
    projectModes,
    projectMode,
    setProjectMode,
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
                {
                    projectMode === projectModes.SCRIPTWRITER_MODE &&
                    <IconButton
                        style={iconStyle}
                        icon={<MdLightbulb />}
                        title="Switch to planning mode"
                        onClick={() => setProjectMode(projectModes.PLAN_MODE)}
                    />
                }
                {
                    projectMode === projectModes.PLAN_MODE &&
                    <IconButton
                        style={iconStyle}
                        icon={<MdKeyboard />}
                        title="Switch to scriptwriter mode"
                        onClick={() => setProjectMode(projectModes.SCRIPTWRITER_MODE)}
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
                <Divider horizontal={false} />
                {
                    projectMode === projectModes.PLAN_MODE &&
                    <PlanModeToolbar
                        mainPanelView={mainPanelView}
                        mainPanelViews={mainPanelViews}
                        iconStyle={iconStyle}
                        toggleReadAllPanel={toggleReadAllPanel}
                        toggleTimelinePanel={toggleTimelinePanel}
                        changeViewToPresentation={changeViewToPresentation}
                        changeViewToFragmentGrid={changeViewToFragmentGrid}
                    />
                }
                {
                    projectMode === projectModes.SCRIPTWRITER_MODE &&
                    <ScriptwriterModeToolbar
                        iconStyle={iconStyle}
                        scriptEditorSettings={scriptEditorSettings}
                        setScriptEditorSettings={setScriptEditorSettings}
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