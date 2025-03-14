import { useAlerts } from 'hooks';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Column, Loading, Row } from 'components';
import Toolbar from './toolbar/Toolbar';
import ReadAllPanel from './read-all-panel/ReadAllPanel';
import Timeline from './timeline/Timeline';
import { useProjectStore } from 'stores';
import MainPanel from './main-panel/MainPanel';

const Project = ({...props}) => {

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
    const [filters, setFilters] = useState([]);
    const [hideNonTimelineFragments, setHideNonTimelineFragments] = useState(false);
    const [selectedFragmentIdx, setSelectedFragmentIdx] = useState(0);

    // View in the main panel
    const [mainPanelView, setMainPanelView] = useState(mainPanelViews.FRAGMENT_GRID);

    // Settings for panels
    const [readAllPanelSettings, setReadAllPanelSettings] = useState({width: 350, isOpen: true});
    const [timelinePanelSettings, setTimelinePanelSettings] = useState({isOpen: true});

    // Hooks
    const { fetchProject, loading, error, setError, fragments } = useProjectStore();
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

    if (loading) {
        return (
            <Loading />
        );
    }

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

    const filteredFragments = filterFragments();

    return (
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
                filters={filters}
                setFilters={setFilters}
                mainPanelViews={mainPanelViews}
                mainPanelView={mainPanelView}
                setMainPanelView={setMainPanelView}
                hideNonTimelineFragments={hideNonTimelineFragments}
                setHideNonTimelineFragments={setHideNonTimelineFragments}
            />
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
                    filteredFragments={filteredFragments}
                    selectedFragmentIdx={selectedFragmentIdx}
                />
                <Row style={{flex: 1, gap: 0}}>
                    <Column
                        style={{width: '100%'}}
                    >
                        <Timeline
                            timelinePanelSettings={timelinePanelSettings}
                            setTimelinePanelSettings={setTimelinePanelSettings}
                            filteredFragments={filteredFragments}
                            filters={filters}
                            selectedFragmentIdx={selectedFragmentIdx}
                            setSelectedFragmentIdx={setSelectedFragmentIdx}
                        />
                        <MainPanel
                            mainPanelViews={mainPanelViews}
                            mainPanelView={mainPanelView}
                            filteredFragments={filteredFragments}
                            selectedFragmentIdx={selectedFragmentIdx}
                            hideNonTimelineFragments={hideNonTimelineFragments}
                        />
                    </Column>
                </Row>
            </Row>
        </Column>
    );
}
 
export default Project;