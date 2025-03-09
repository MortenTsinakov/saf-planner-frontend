import { useAlerts } from 'hooks';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FragmentGrid from './fragment-grid/FragmentGrid';
import { Column, Loading, Row } from 'components';
import Toolbar from './toolbar-updated/Toolbar';
import ReadAllPanel from './read-all-panel/ReadAllPanel';
import Timeline from './timeline-updated/Timeline';
import { TIMELINE_HEIGHT } from './timeline/TimelineConstants';
import { useProjectStore } from 'stores';
import Presentation from './presentation/Presentation';
import LabelTimeline from './presentation/presentation-data/LabelTimeline';

const Project = ({...props}) => {

    // const views = Object.freeze({
    //     FRAGMENT_GRID: 0,
    //     PRESENTATION: 1,
    // });

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
        let totalLength = 0;

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
            />
            <Row
                style={{
                    overflow: 'hidden',
                    height: 'inherit',
                    gap:0
                }}
            >
                <ReadAllPanel
                    readAllPanelSettings={readAllPanelSettings}
                    setReadAllPanelSettings={setReadAllPanelSettings}
                    filteredFragments={filteredFragments}
                />
                <Row style={{flex: 1, gap: 0}}>
                    <Column
                        
                    >
                        <Timeline
                            timelinePanelSettings={timelinePanelSettings}
                            setTimelinePanelSettings={setTimelinePanelSettings}
                            filteredFragments={filteredFragments}
                            filters={filters}
                        />
                        <FragmentGrid
                            filteredFragments={filteredFragments}
                        />
                    </Column>
                    <div
                        style={{
                            minWidth: 350,
                            backgroundColor: 'blue'
                        }}
                    >
                        Images
                    </div>
                </Row>
            </Row>
        </Column>
        // <Column
        //     style={{
        //         height: 'calc(100vh - var(--navbar-height)',
        //         width: '100%',
        //         gap: 0,
        //     }}
        // >
        //     <Toolbar
        //         height={toolBarHeight}
        //         showReadAllPanel={showReadAllPanel}
        //         setShowReadAllPanel={setShowReadAllPanel}
        //         views={views}
        //         currentView={currentView}
        //         setCurrentView={setCurrentView}
        //         filters={filters}
        //         setFilters={setFilters}
        //     />
        //     <Row
        //         style={{
        //             gap: 0,
        //             height: '100%',
        //         }}
        //     >
        //         {showReadAllPanel &&                
        //             <ReadAll
        //                 readAllWidth={readAllWidth}
        //                 setReadAllWidth={setReadAllWidth}
        //                 readAllHeight={`calc(100vh - var(--navbar-height) - ${toolBarHeight}px)`}
        //                 fragments={filteredFragments}
        //                 {...props}
        //             />
        //         }
        //         {
        //             currentView === views.FRAGMENT_GRID &&
        //             <Column
        //                 style={{
        //                     gap: 0,
        //                     flex: 1,
        //                     width: '100%',
        //                     overflow: 'auto',
        //                 }}
        //             >
        //                 {
        //                     toolbarType === toolbarTypes.REGULAR &&
        //                     <Timeline
        //                         filteredFragments={filteredFragments}
        //                         {...props}
        //                     />
        //                 }
        //                 {
        //                     toolbarType === toolbarTypes.LABEL &&
        //                     <LabelTimeline
        //                         filters={filters}
        //                         filteredFragments={filteredFragments}
        //                         // selectedFragment={selectedFragment}
        //                         selectedFragment={2}
        //                         {...props}
        //                     />
        //                 }
        //                 <FragmentGrid
        //                     fragmentGridHeight={`calc(100vh - var(--navbar-height) - ${toolBarHeight}px - ${TIMELINE_HEIGHT}px)`}
        //                     projectId={projectId}
        //                     filteredFragments={filteredFragments}
        //                     {...props}
        //                 />
        //             </Column>
        //         }
        //         {
        //             currentView === views.PRESENTATION &&
        //             <Presentation
        //                 presentationViewHeight={`calc(100vh - var(--navbar-height) - ${toolBarHeight}px`}
        //                 filters={filters}
        //                 filteredFragments={filteredFragments}
        //                 {...props}
        //             />
        //         }
        //     </Row>
        // </Column>
    );
}
 
export default Project;