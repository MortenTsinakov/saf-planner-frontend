import { createContext, useCallback, useState } from "react";
import { fetchSharedProjectFragmentsService, fetchSharedProjectImageService, fetchSharedProjectService } from "services";

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
    
        const value = {
            project,
            fragments,
            fetchSharedProject,
            fetchImage,
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