import { useAlerts } from 'hooks';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Column, ErrorFallback, Loading, Row } from 'components';
import Toolbar from './toolbar/Toolbar';
import ReadAllPanel from './read-all-panel/ReadAllPanel';
import Timeline from './timeline/Timeline';
import { useProjectStore } from 'stores';
import MainPanel from './main-panel/MainPanel';
import { ErrorBoundary } from 'react-error-boundary';
import Scriptwriter from './scriptwriter/Scriptwriter';

const Project = () => {

    const projectModes = Object.freeze({
        PLAN_MODE: 0,
        SCRIPWRITER_MODE: 1,
    })

    const mainPanelViews = Object.freeze({
        FRAGMENT_GRID: 0,
        PRESENTATION: 1,
    });

    // Hooks
    const fetchProject = useProjectStore((state) => state.fetchProject);
    const loading = useProjectStore((state) => state.loading);
    const error = useProjectStore((state) => state.error);
    const filters = useProjectStore((state) => state.filters);
    const fragments = useProjectStore((state) => state.fragments);
    const filteredFragments = useProjectStore((state) => state.filteredFragments);
    const setFilteredFragments = useProjectStore((state) => state.setFilteredFragments);
    const {addAlert} = useAlerts();

    // Initialize view
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const projectId = searchParams.get('projectId');

    // Fragment filters
    const [hideNonTimelineFragments, setHideNonTimelineFragments] = useState(false);
    const [selectedFragmentIdx, setSelectedFragmentIdx] = useState(fragments.length > 0 ? fragments[0].id : null);
    // A hack to avoid using state variable inside an expensive useEffect that
    // would run every time the user changes active fragment.
    const selectedFragmentIdxRef = useRef(null);

    // Current project mode
    const [projectMode, setProjectMode] = useState(projectModes.PLAN_MODE);

    // View in the main panel
    const [mainPanelView, setMainPanelView] = useState(mainPanelViews.FRAGMENT_GRID);

    // Settings for panels
    const [readAllPanelSettings, setReadAllPanelSettings] = useState({width: 350, isOpen: true});
    const [timelinePanelSettings, setTimelinePanelSettings] = useState({isOpen: true});

    useEffect(() => {
        fetchProject(projectId);
        
    }, [fetchProject, projectId]);

    // Filter fragments according to set filters
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
                    }
                }
            }
            return filteredFragments;
        }
        
        setFilteredFragments(filterFragments());
    }, [filters, fragments, setFilteredFragments]);

    // If selected fragment is filtered out, set a new fragment as selected
    useEffect(() => {
        console.log("Selecting new fragment");
        const selectFragmentFromFiltered = () => {
            if (filteredFragments.find(f => f.id === selectedFragmentIdxRef.current)) {
                return;
            }
            if (filteredFragments.length > 0) {
                setSelectedFragmentIdx(filteredFragments[0].id);
            }
        }
        selectFragmentFromFiltered();
    }, [filteredFragments]);

    useEffect(() => {
        selectedFragmentIdxRef.current = selectedFragmentIdx;
    }, [selectedFragmentIdx]);

    useEffect(() => {
        if (error) {
            if (error.status === 404) {
                navigate('/404');
            }
    
            addAlert(error.message, 'error');
        }
    }, [error, addAlert, navigate]);

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
                    <Scriptwriter />
                }
            </Column>
        </ErrorBoundary>
    );
}
 
export default Project;