import { Loading } from "components";
import { useAlerts } from "hooks";
import { useSharedProject } from "hooks/useSharedProject";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SharedProject = () => {

    // Initialize view
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const projectId = searchParams.get('projectId');

    const {fetchSharedProject, project, fragments, error, setError, loading} = useSharedProject();
    const {addAlert} = useAlerts();

    useEffect(() => {
        if (projectId === null) {
            navigate('/404');
        }
    }, [projectId, navigate]);

    useEffect(() => {
        fetchSharedProject(projectId);
        
    }, [fetchSharedProject, projectId]);

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
        <div>
            {project.title}
            {fragments.map(f => (
                f.shortDescription
            ))}
        </div>
    );
}
 
export default SharedProject;