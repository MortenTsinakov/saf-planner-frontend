import { useAlerts } from 'hooks';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FragmentGrid from './fragment-grid/FragmentGrid';
import { Column, Loading, Row } from 'components';
import Toolbar from './toolbar-updated/Toolbar';
import ReadAllPanel from './read-all-panel/ReadAllPanel';
import Timeline from './timeline-updated/Timeline';
import { useProjectStore } from 'stores';
import Presentation from './presentation/Presentation';

const Project = ({...props}) => {

    const mainPanelViews = Object.freeze({
        FRAGMENT_GRID: 0,
        PRESENTATION: 1,
    });

    // const toolbarTypes = Object.freeze({
    //     REGULAR: 0,
    //     LABEL: 1,
    // });

    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const projectId = searchParams.get('projectId');

    // const toolBarHeight = 55;
    // const [currentView, setCurrentView] = useState(views.FRAGMENT_GRID);
    // const [toolbarType, setToolbarType] = useState(toolbarTypes.LABEL);
    const [filters, setFilters] = useState([]);
    const [selectedFragmentIdx, setSelectedFragmentIdx] = useState(0);
    const [mainPanelView, setMainPanelView] = useState(mainPanelViews.FRAGMENT_GRID);

    const [readAllPanelSettings, setReadAllPanelSettings] = useState({width: 350, isOpen: true});
    const [timelinePanelSettings, setTimelinePanelSettings] = useState({isOpen: true});
    const [imagePanelSettings, setImagePanelSettings] = useState({isOpen: true});

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
            return fragments;
        }

        let filteredFragments = [];

        for (const fragment of fragments) {
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
                imagePanelSettings={imagePanelSettings}
                setImagePanelSettings={setImagePanelSettings}
                filters={filters}
                setFilters={setFilters}
                mainPanelViews={mainPanelViews}
                mainPanelView={mainPanelView}
                setMainPanelView={setMainPanelView}
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
                        {
                            mainPanelView === mainPanelViews.FRAGMENT_GRID &&
                            <FragmentGrid
                                filteredFragments={filteredFragments}
                                selectedFragmentIdx={selectedFragmentIdx}
                            />
                        }
                        {
                            mainPanelView === mainPanelViews.PRESENTATION &&
                            <Presentation fragment={filteredFragments[selectedFragmentIdx]} />
                        }
                    </Column>
                </Row>
            </Row>
        </Column>
    );
}
 
export default Project;