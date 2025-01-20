import { useAlerts, useFragments } from 'hooks';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FragmentGrid from './fragment-grid/FragmentGrid';
import { Column, Row } from 'components';
import Toolbar from './toolbar/Toolbar';
import ReadAll from './read-all/ReadAll';
import Timeline from './timeline/Timeline';

const Project = ({...props}) => {

    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const projectId = searchParams.get('id');

    const toolBarHeight = 55;
    const timelineHeight = 120;
    const timelineToolsHeight = 55;
    const [readAllWidth, setReadAllWidth] = useState(350);
    const [showReadAllPanel, setShowReadAllPanel] = useState(true);

    const {
        fetchFragments,
        createFragment,
        updateFragmentOnTimelineStatus,
        updateFragmentShortDescription,
        updateFragmentLongDescription,
        updateFragmentDuration,
        moveFragment,
        deleteFragment,
        fragments,
        loading,
        error,
        setError} = useFragments();
    const {addAlert} = useAlerts();

    useEffect(() => {
        if (projectId === null) {
            navigate('/404');
        }
    }, [projectId, navigate]);

    useEffect(() => {
        fetchFragments(projectId);
    }, [fetchFragments, projectId]);

    useEffect(() => {
        if (error) {
            addAlert(error, 'error');
            setError(null);
        }
    }, [setError, error, addAlert]);

    if (loading) {
        return (
            <div>
                Loading...
            </div>
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
            />
            <Row
                style={{
                    gap: 0,
                }}
            >
                {showReadAllPanel &&                
                    <ReadAll
                        fragments={fragments}
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
                    }}
                >
                    <Timeline
                        timelineHeight={timelineHeight}
                        timelineToolsHeight={timelineToolsHeight}
                        fragments={fragments}
                        {...props}
                    />
                    <FragmentGrid
                        fragmentGridHeight={`calc(100vh - var(--navbar-height) - ${toolBarHeight}px - ${timelineHeight + timelineToolsHeight}px)`}
                        fragments={fragments}
                        createFragment={createFragment}
                        updateFragmentOnTimelineStatus={updateFragmentOnTimelineStatus}
                        updateFragmentShortDescription={updateFragmentShortDescription}
                        updateFragmentLongDescription={updateFragmentLongDescription}
                        updateFragmentDuration={updateFragmentDuration}
                        deleteFragment={deleteFragment}
                        projectId={projectId}
                        moveFragment={moveFragment}
                        {...props}
                    />
                </Column>
            </Row>
        </Column>
    );
}
 
export default Project;