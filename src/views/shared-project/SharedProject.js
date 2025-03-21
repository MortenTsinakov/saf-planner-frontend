import { Column, Loading, Row } from "components";
import { useAlerts } from "hooks";
import { useSharedProject } from "hooks/useSharedProject";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SharedProjectLongDescriptions from "./shared-project-data/SharedProjectLongDescriptions";
import SharedProjectShortDescriptions from "./shared-project-data/SharedProjectShortDescriptions";

const SharedProject = () => {

    // Initialize view
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const projectId = searchParams.get('projectId');

    const {fetchSharedProject, project, fragments, error, setError, loading} = useSharedProject();
    const {addAlert} = useAlerts();

    const [activeFragmentIdx, setActiveFragmentIdx] = useState(0);

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

    useEffect(() => {
        const handleKeyDown = (event) => {
            event.preventDefault();
            let newIndex;
            switch (event.key) {
                case "ArrowUp":
                    newIndex = Math.max(0, activeFragmentIdx - 1);
                    setActiveFragmentIdx(newIndex);
                    break;
                case "ArrowDown":
                    newIndex = Math.min(activeFragmentIdx + 1, fragments.length - 1);
                    setActiveFragmentIdx(newIndex);
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [fragments.length, setActiveFragmentIdx, activeFragmentIdx]);

    if (loading) {
        return (
            <Loading />
        );
    }

    return (
        <Row
            style={{
                maxHeight: 'calc(100vh - var(--navbar-height))',
                overflow: 'hidden',
            }}
        >
            <SharedProjectShortDescriptions
                fragments={fragments}
                activeFragmentIdx={activeFragmentIdx}
                setActiveFragmentIdx={setActiveFragmentIdx}
            />
            <SharedProjectLongDescriptions
                project={project}
                fragments={fragments}
                activeFragmentIdx={activeFragmentIdx}
                setActiveFragmentIdx={setActiveFragmentIdx}
            />
            <Column
                style={{
                    flex: 0.25,
                    border: '1px dashed gray',
                    alignItems: 'center',
                }}
            >
                Images
            </Column>
            <Column
                style={{
                    flex: 0.25,
                    border: '1px dashed gray',
                    alignItems: 'center',
                }}
            >
                Comments
            </Column>
        </Row>
    );
}
 
export default SharedProject;