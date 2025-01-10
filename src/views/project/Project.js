import { useAlerts, useFragments } from 'hooks';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FragmentGrid from './fragment-grid/FragmentGrid';
import { Column, Row } from 'components';
import Toolbar from './toolbar/Toolbar';
import ReadAll from './read-all/ReadAll';
import Timeline from './timeline/Timeline';

const Project = (props) => {

    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const projectId = searchParams.get('id');

    const {
        fetchFragments,
        updateFragmentOnTimelineStatus,
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
            <Toolbar />
            <Row
                style={{
                    gap: 0,
                    flex: 1,
                }}
            >
                <ReadAll {...props} />
                <Column
                    style={{
                        gap: 0,
                        flex: 1,
                    }}
                >
                    <Timeline fragments={fragments} {...props} />
                    <FragmentGrid
                        fragments={fragments}
                        updateFragmentOnTimelineStatus={updateFragmentOnTimelineStatus}
                        projectId={projectId}
                        {...props}
                    />
                </Column>
            </Row>
        </Column>
    );
}
 
export default Project;