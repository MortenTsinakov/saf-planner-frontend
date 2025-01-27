import { useAlerts, useProject } from 'hooks';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FragmentGrid from './fragment-grid/FragmentGrid';
import { Column, Loading, Row } from 'components';
import Toolbar from './toolbar/Toolbar';
import ReadAll from './read-all/ReadAll';
import Timeline from './timeline/Timeline';
import { TIMELINE_HEIGHT } from './timeline/TimelineConstants';

const Project = ({...props}) => {

    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const projectId = searchParams.get('id');

    const toolBarHeight = 55;
    const [readAllWidth, setReadAllWidth] = useState(350);
    const [showReadAllPanel, setShowReadAllPanel] = useState(false);
    const [showCreateFragmentPanel, setShowCreateFragmentPanel] = useState(false);

    const {fetchProject, loading, error, setError} = useProject();
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
            addAlert(error, 'error');
            setError(null);
        }
    }, [setError, error, addAlert]);

    if (loading) {
        return (
            <Loading />
        );
    }

    return (
        <Column
            style={{
                height: '100%',
                width: '100%',
                gap: 0,
            }}
        >
            <Toolbar
                height={toolBarHeight}
                showReadAllPanel={showReadAllPanel}
                setShowReadAllPanel={setShowReadAllPanel}
                showCreateFragmentPanel={showCreateFragmentPanel}
                setShowCreateFragmentPanel={setShowCreateFragmentPanel}
            />
            <Row
                style={{
                    gap: 0,
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
                        showCreateFragmentPanel={showCreateFragmentPanel}
                        setShowCreateFragmentPanel={setShowCreateFragmentPanel}
                        projectId={projectId}
                        {...props}
                    />
                </Column>
            </Row>
        </Column>
    );
}
 
export default Project;