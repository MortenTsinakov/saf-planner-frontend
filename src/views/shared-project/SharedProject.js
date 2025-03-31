import { Loading, Row } from "components";
import { useAlerts, useSharedProject } from "hooks";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SharedProjectLongDescriptions from "./shared-project-data/SharedProjectLongDescriptions";
import SharedProjectShortDescriptions from "./shared-project-data/SharedProjectShortDescriptions";
import SharedProjectImages from "./shared-project-data/SharedProjectImages";
import SharedProjectComments from "./shared-project-actions/SharedProjectComments";
import EditComment from "./shared-project-actions/EditComment";
import DeleteComment from "./shared-project-actions/DeleteComment";

const SharedProject = () => {

    // Initialize view
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const projectId = searchParams.get('projectId');

    const {fetchSharedProject, fragments, error, setError, loading} = useSharedProject();
    const {addAlert} = useAlerts();

    const [activeFragmentIdx, setActiveFragmentIdx] = useState(0);
    const [commentToEdit, setCommentToEdit] = useState(null);
    const [commentToDelete, setCommentToDelete] = useState(null);

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
            if (event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA") {
                return;
            }
            if (commentToEdit !== null || commentToDelete !== null) {
                return;
            }
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
    }, [fragments.length, setActiveFragmentIdx, activeFragmentIdx, commentToEdit, commentToDelete]);

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
                    activeFragmentIdx={activeFragmentIdx}
                    setActiveFragmentIdx={setActiveFragmentIdx}
                />
                <SharedProjectLongDescriptions
                    activeFragmentIdx={activeFragmentIdx}
                    setActiveFragmentIdx={setActiveFragmentIdx}
                />
                <SharedProjectImages
                    activeFragmentIdx={activeFragmentIdx}
                />
                <SharedProjectComments
                    activeFragmentIdx={activeFragmentIdx}
                    setCommentToEdit={setCommentToEdit}
                    setCommentToDelete={setCommentToDelete}
                />
                {
                    commentToEdit !== null
                    &&
                    <EditComment
                        comment={commentToEdit}
                        setCommentToEdit={setCommentToEdit}
                        fragmentId={fragments[activeFragmentIdx].id}
                    />
                }
                {
                    commentToDelete !== null
                    &&
                    <DeleteComment
                        comment={commentToDelete}
                        setCommentToDelete={setCommentToDelete}
                        fragmentId={fragments[activeFragmentIdx].id}
                    />
                }
        </Row>
    );
}
 
export default SharedProject;