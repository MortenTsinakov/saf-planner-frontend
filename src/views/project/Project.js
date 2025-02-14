import { useAlerts } from 'hooks';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FragmentGrid from './fragment-grid/FragmentGrid';
import { Column, Loading, Row } from 'components';
import Toolbar from './toolbar/Toolbar';
import ReadAll from './read-all/ReadAll';
import Timeline from './timeline/Timeline';
import { TIMELINE_HEIGHT } from './timeline/TimelineConstants';
import { useProjectStore } from 'stores';
import Presentation from './presentation/Presentation';

const Project = ({...props}) => {

    const views = Object.freeze({
        FRAGMENT_GRID: 0,
        PRESENTATION: 1,
    });

    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const projectId = searchParams.get('projectId');

    const toolBarHeight = 55;
    const [readAllWidth, setReadAllWidth] = useState(350);
    const [showReadAllPanel, setShowReadAllPanel] = useState(false);
    const [currentView, setCurrentView] = useState(views.FRAGMENT_GRID);

    const { fetchProject, loading, error, setError } = useProjectStore();
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

    return (
        <Column
            style={{
                height: 'calc(100vh - var(--navbar-height)',
                width: '100%',
                gap: 0,
            }}
        >
            <Toolbar
                height={toolBarHeight}
                showReadAllPanel={showReadAllPanel}
                setShowReadAllPanel={setShowReadAllPanel}
                views={views}
                currentView={currentView}
                setCurrentView={setCurrentView}
            />
            <Row
                style={{
                    gap: 0,
                    height: '100%',
                }}
            >
                {showReadAllPanel &&                
                    <ReadAll
                        readAllWidth={readAllWidth}
                        setReadAllWidth={setReadAllWidth}
                        readAllHeight={`calc(100vh - var(--navbar-height) - ${toolBarHeight}px)`}
                        {...props}
                    />
                }
                {
                    currentView === views.FRAGMENT_GRID &&
                    <Column
                        style={{
                            gap: 0,
                            flex: 1,
                            width: '100%',
                            overflow: 'auto',
                        }}
                    >
                        <Timeline
                            {...props}
                        />
                        <FragmentGrid
                            fragmentGridHeight={`calc(100vh - var(--navbar-height) - ${toolBarHeight}px - ${TIMELINE_HEIGHT}px)`}
                            projectId={projectId}
                            {...props}
                        />
                    </Column>
                }
                {
                    currentView === views.PRESENTATION &&
                    <Presentation {...props}/>
                }
            </Row>
        </Column>
    );
}
 
export default Project;