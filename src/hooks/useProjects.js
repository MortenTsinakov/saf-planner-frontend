import { useCallback, useState } from 'react';
import { createProjectService, deleteProjectService, fetchUserProjectsService } from 'services';

/**
 * Hook for operations with projects
 */
export const useProjects = () => {

    const [userProjects, setUserProjects] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Fetch all user projects from the server
     */
    const fetchUserProjects = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetchUserProjectsService();
            setUserProjects(response);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Helper function for validating project title.
     */
    const validateProjectTitle = useCallback((title) => {
        return (title !== null && title !== '');
    }, []);

    /**
     * Create a new project.
     * Return true if the project was successfully saved to database,
     * else false.
     */
    const createProject = useCallback(async (title, description, estimatedLengthInSeconds) => {
        if (!validateProjectTitle(title)) {
            setError('Project title cannot be blank');
            return false;
        }
        try {
            setError(null);
            const response = await createProjectService(title, description, estimatedLengthInSeconds);
            setUserProjects((prev) => [response, ...prev]);
            return true;
        } catch (err) {
            setError(err.message);
            return false;
        };
    }, [validateProjectTitle]);

    /**
     * Delete project with given id.
     * Return true if deletion was successful, else false.
     */
    const deleteProject = useCallback(async (projectId) => {
        try {
            const response = await deleteProjectService(projectId);
            setUserProjects((prev) => prev.filter(proj => proj.id !== response.projectId));
            return true;
        } catch (err) {
            setError(err.message);
            return false;
        }
    }, []);

    return {
        fetchUserProjects,
        createProject,
        deleteProject,
        userProjects,
        loading,
        error,
        setError,
    };

}