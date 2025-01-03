import { useCallback, useState } from 'react';
import { createProjectService, deleteProjectService, fetchUserProjectsService, updateProjectDescriptionService, updateProjectEstimatedLengthService, updateProjectTitleService } from 'services';

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
            setError(err.response?.data?.message || "Fetching user projects failed");
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

    const validateProjectEstimatedLength = useCallback((estLen) => {
        return (estLen >= 0);
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
        if (!validateProjectEstimatedLength(estimatedLengthInSeconds)) {
            setError("Project's estimated length cannot be a negative value");
            return false;
        }
        try {
            setError(null);
            const response = await createProjectService(title, description, estimatedLengthInSeconds);
            setUserProjects((prev) => [response, ...prev]);
            return true;
        } catch (err) {
            setError(err.response?.data?.message || "Creating project failed");
            return false;
        };
    }, [validateProjectTitle, validateProjectEstimatedLength]);

    /**
     * Update project title.
     * If updating succeeded return true, else false.
     */
    const updateProjectTitle = async (projectId, title) => {
        try {
            setError(null);
            const response = await updateProjectTitleService(projectId, title);
            const currProjects = userProjects.filter((proj) => proj.id !== projectId);
            setUserProjects([response, ...currProjects]);
            return true;
        } catch (err) {
            setError(err.response?.data?.message || "Updating project title failed");
            return false;
        }
    }

    /**
     * Update project description.
     * If updating succeeded return true, else false.
     */
    const updateProjectDescription = async (projectId, description) => {
        try {
            setError(null);
            const response = await updateProjectDescriptionService(projectId, description);
            const currProjects = userProjects.filter((proj) => proj.id !== projectId);
            setUserProjects([response, ...currProjects]);
            return true;
        } catch (err) {
            setError(err.response?.data?.message || "Updating project description failed");
            return false;
        }
    }

    /**
     * Update project's estimated length.
     * If update succeeded return true, else false.
     */
    const updateProjectEstimatedLength = async (projectId, estimatedLengthInSeconds) => {
        if (!validateProjectEstimatedLength(estimatedLengthInSeconds)) {
            setError("Project's estimated length cannot be a negative value");
            return false
        }
        try {
            setError(null);
            const response = await updateProjectEstimatedLengthService(projectId, estimatedLengthInSeconds);
            const currProjects = userProjects.filter((proj) => proj.id !== projectId);
            setUserProjects([response, ...currProjects]);
            return true;
        } catch (err) {
            setError(err.response?.data?.message || "Updating project's estimated length failed");
            return false;
        }
    }

    /**
     * Delete project with given id.
     * Return true if deletion was successful, else false.
     */
    const deleteProject = useCallback(async (project) => {
        try {
            const response = await deleteProjectService(project.id);
            setUserProjects((prev) => prev.filter(proj => proj.id !== response.projectId));
            return true;
        } catch (err) {
            setError(err.response?.data?.message || "Deleting project failed");
            return false;
        }
    }, []);

    return {
        fetchUserProjects,
        createProject,
        updateProjectTitle,
        updateProjectDescription,
        updateProjectEstimatedLength,
        deleteProject,
        userProjects,
        loading,
        error,
        setError,
    };

}