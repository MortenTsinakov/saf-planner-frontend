import { createContext, useCallback, useState } from "react";
import { commentFragmentService, deleteCommentService, editCommentService, fetchSharedProjectFragmentsService, fetchSharedProjectImageService, fetchSharedProjectService } from "services";

const SharedProjectContext = createContext();

export const SharedProjectProvider = ({children}) => {
        const [project, setProject] = useState(null);
        const [fragments, setFragments] = useState([]);
    
        const [error, setError] = useState(null);
        const [loading, setLoading] = useState(true);
        const images = new Map();
    
        const fetchImage = async (projectId, imageId) => {        
            if (images.has(imageId)) {
                return images.get(imageId);
            }
        
            try {
                setError(null);
                const imageBlob = await fetchSharedProjectImageService(projectId, imageId);
                images.set(imageId, imageBlob);
                return imageBlob;
            } catch (err) {
                setError(err.response?.data?.message || "Fetching image failed");
            }
        }
    
        const fetchSharedProject = useCallback(async (projectId) => {
            try {
                setError(null);
                setLoading(true);
                const [projectResponse, fragmentsResponse] = await Promise.all([
                            fetchSharedProjectService(projectId),
                            fetchSharedProjectFragmentsService(projectId),
                        ]);
                setProject(projectResponse);
                setFragments(fragmentsResponse);
            } catch (err) {
                setError(err.response?.data?.message || "Fetching shared project failed");
            } finally {
                setLoading(false);
            }
        }, []);

        const commentFragment = useCallback(async (fragmentId, content) => {
            try {
                setError(null);
                const response = await commentFragmentService(fragmentId, content);
                const updatedFragments = [...fragments.map(f => f.id !== fragmentId ? f : {...f, comments: [response, ...f.comments]})];
                setFragments(updatedFragments);
                return true;
            } catch (err) {
                setError(err.response?.data?.message || "Commenting fragment failed");
                return false;
            }
        }, [fragments]);

        const editComment = useCallback(async (fragmentId, commentId, content) => {
            try {
                setError(null);
                const response = await editCommentService(commentId, content);
                const updatedFragments = [...fragments.map(
                    f => f.id !== fragmentId
                    ? f
                    : {...f, comments: [response, ...f.comments.filter(c => c.id !== commentId)]}
                )];
                setFragments(updatedFragments);
                return true;
            } catch (err) {
                setError(err.response?.data?.message || "Editing fragment failed");
                return false;
            }
        }, [fragments]);

        const deleteComment = useCallback(async (fragmentId, commentId) => {
            try {
                setError(null);
                const response = await deleteCommentService(commentId);
                const updatedFragments = [...fragments.map(
                    f => f.id !== fragmentId
                    ? f
                    : {...f, comments: [...f.comments.filter(c => c.id !== response.id)]}
                )];
                setFragments(updatedFragments);
                return true;
            } catch (err) {
                setError(err.response?.data?.message || "Deleting fragment failed");
                return false;
            }
        }, [fragments]);
    
        const value = {
            project,
            fragments,
            fetchSharedProject,
            fetchImage,
            commentFragment,
            editComment,
            deleteComment,
            error,
            setError,
            loading,
        }

        return (
            <SharedProjectContext.Provider value={value}>
                {children}
            </SharedProjectContext.Provider>
        );
}

export default SharedProjectContext;