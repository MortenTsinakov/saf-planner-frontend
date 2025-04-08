import { useAlerts } from 'hooks';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Column, ErrorFallback, Loading, Row } from 'components';
import Toolbar from './toolbar/Toolbar';
import ReadAllPanel from './read-all-panel/ReadAllPanel';
import Timeline from './timeline/Timeline';
import { useProjectStore } from 'stores';
import MainPanel from './main-panel/MainPanel';
import { ErrorBoundary } from 'react-error-boundary';
import Scriptwriter from './scriptwriter/Scriptwriter';

const Project = ({...props}) => {

    const projectModes = Object.freeze({
        PLAN_MODE: 0,
        SCRIPWRITER_MODE: 1,
    })

    const mainPanelViews = Object.freeze({
        FRAGMENT_GRID: 0,
        PRESENTATION: 1,
    });

    // Initialize view
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const projectId = searchParams.get('projectId');

    // Fragment filters
    const [hideNonTimelineFragments, setHideNonTimelineFragments] = useState(false);
    const [selectedFragmentIdx, setSelectedFragmentIdx] = useState(0);

    // Current project mode
    const [projectMode, setProjectMode] = useState(projectModes.PLAN_MODE);

    // View in the main panel
    const [mainPanelView, setMainPanelView] = useState(mainPanelViews.FRAGMENT_GRID);

    // Settings for panels
    const [readAllPanelSettings, setReadAllPanelSettings] = useState({width: 350, isOpen: true});
    const [timelinePanelSettings, setTimelinePanelSettings] = useState({isOpen: true});
    const [scriptEditorSettings, setScriptEditorSettings] = useState({'mode': 'header', 'theme': 'light', 'zoom': 1, "tipsAreOpen": true});

    // Hooks
    const { fetchProject, loading, error, setError, fragments, filters, setFilteredFragments } = useProjectStore();
    const {addAlert} = useAlerts();

    useEffect(() => {
        if (projectId === null) {
            navigate('/404');
        }
    }, [projectId, navigate]);

    useEffect(() => {
        fetchProject(projectId);
        
    }, [fetchProject, projectId]);

    useEffect(() => {
        if (error) {
            if (error.status === 404) {
                navigate('/404');
            } 
            addAlert(error.message, 'error');
            setError(null);
        }
    }, [setError, error, addAlert, navigate]);

    
    useEffect(() => {
        const filterFragments = () => {
            if (filters.length === 0) {
                return fragments.filter(f => f.onTimeline);
            }
            
            let filteredFragments = [];
            
            for (const fragment of fragments) {
                if (!fragment.onTimeline) {
                    continue;
                }
                for (const label of fragment.labels) {
                    if (filters.includes(label.id)) {
                        filteredFragments.push(fragment);
                        break;
                    }
                }
            }

            return filteredFragments;
        }
        
        setFilteredFragments(filterFragments());
        setSelectedFragmentIdx(0);
    }, [filters, fragments, setFilteredFragments])


    if (loading) {
        return (
            <Column
                style={{
                    height: 'calc(100vh - var(--navbar-height))',
                }}
            >
                <Loading />
            </Column>
        );
    }
    

    return (
        <ErrorBoundary fallback={<ErrorFallback />}>
            <Column
                style={{
                    height: 'calc(100vh - var(--navbar-height))',
                    width: '100%',
                    gap: 0,
                }}
            >
                <Toolbar
                    readAllPanelSettings={readAllPanelSettings}
                    setReadAllPanelSettings={setReadAllPanelSettings}
                    timelinePanelSettings={timelinePanelSettings}
                    setTimelinePanelSettings={setTimelinePanelSettings}
                    scriptEditorSettings={scriptEditorSettings}
                    setScriptEditorSettings={setScriptEditorSettings}
                    mainPanelViews={mainPanelViews}
                    mainPanelView={mainPanelView}
                    setMainPanelView={setMainPanelView}
                    hideNonTimelineFragments={hideNonTimelineFragments}
                    setHideNonTimelineFragments={setHideNonTimelineFragments}
                    projectModes={projectModes}
                    projectMode={projectMode}
                    setProjectMode={setProjectMode}
                />
                {
                    projectMode === projectModes.PLAN_MODE &&
                    <Row
                        style={{
                            overflow: 'hidden',
                            height: 'inherit',
                            width: '100%',
                            gap:0,
                        }}
                    >
                        <ReadAllPanel
                            readAllPanelSettings={readAllPanelSettings}
                            setReadAllPanelSettings={setReadAllPanelSettings}
                            selectedFragmentIdx={selectedFragmentIdx}
                        />
                        <Row style={{flex: 1, gap: 0}}>
                            <Column
                                style={{width: '100%'}}
                            >
                                <Timeline
                                    timelinePanelSettings={timelinePanelSettings}
                                    setTimelinePanelSettings={setTimelinePanelSettings}
                                    selectedFragmentIdx={selectedFragmentIdx}
                                    setSelectedFragmentIdx={setSelectedFragmentIdx}
                                />
                                <MainPanel
                                    mainPanelViews={mainPanelViews}
                                    mainPanelView={mainPanelView}
                                    selectedFragmentIdx={selectedFragmentIdx}
                                    hideNonTimelineFragments={hideNonTimelineFragments}
                                />
                            </Column>
                        </Row>
                    </Row>
                }
                {
                    projectMode === projectModes.SCRIPTWRITER_MODE &&
                    <Scriptwriter
                        scriptEditorSettings={scriptEditorSettings}
                        setScriptEditorSettings={setScriptEditorSettings}
                    />
                }
            </Column>
        </ErrorBoundary>
    );
}
 
export default Project;