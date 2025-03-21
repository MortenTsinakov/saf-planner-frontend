import { useCallback, useState } from 'react';
import { createProjectService, deleteProjectService, fetchSharedProjectsService, fetchUserProjectsService, shareProjectService, updateProjectDescriptionService, updateProjectEstimatedLengthService, updateProjectTitleService } from 'services';
import { updateLabelService } from 'services/label/LabelService';

/**
 * Hook for operations with projects
 */
export const useProjects = () => {

    const [userProjects, setUserProjects] = useState([]);
    const [sharedProjects, setSharedProjects] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Fetch all user projects and shared projects from the server.
     */
    const fetchAllProjects = useCallback(async () => {
        try {
            setError(null);
            setLoading(true);
            const [userProjectsResponse, sharedProjectsResponse] = await Promise.all([
                        fetchUserProjectsService(),
                        fetchSharedProjectsService(),
                    ]);
            setUserProjects(userProjectsResponse);
            setSharedProjects(sharedProjectsResponse);
        } catch (err) {
            setError(err.response?.data?.message || "Fetching projects failed");
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
     * Return the created project on success,
     * else null.
     */
    const createProject = useCallback(async (title, description, estimatedLengthInSeconds) => {
        if (!validateProjectTitle(title)) {
            setError('Project title cannot be blank');
            return null;
        }
        if (!validateProjectEstimatedLength(estimatedLengthInSeconds)) {
            setError("Project's estimated length cannot be a negative value");
            return null;
        }
        try {
            setError(null);
            const response = await createProjectService(title, description, estimatedLengthInSeconds);
            setUserProjects((prev) => [response, ...prev]);
            return response;
        } catch (err) {
            setError(err.response?.data?.message || "Creating project failed");
            return null;
        };
    }, [validateProjectTitle, validateProjectEstimatedLength]);

    /**
     * Update project title.
     * If updating succeeded return true, else false.
     */
    const updateProjectTitle = useCallback(async (projectId, title) => {
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
    }, [userProjects]);

    /**
     * Update project description.
     * If updating succeeded return true, else false.
     */
    const updateProjectDescription = useCallback(async (projectId, description) => {
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
    }, [userProjects]);

    /**
     * Update project's estimated length.
     * If update succeeded return true, else false.
     */
    const updateProjectEstimatedLength = useCallback(async (projectId, estimatedLengthInSeconds) => {
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
    }, [userProjects, validateProjectEstimatedLength]);

    /**
     * Update project label
     * Return true if label update was successful, otherwise false
     */
    const updateLabel = useCallback(async (projectId, labelId, description, color) => {
        try {
            setError(null);
            const response = await updateLabelService(labelId, description, color);
            setUserProjects(prev => prev.map(proj => 
                proj.id !== projectId
                ?
                proj
                :
                {
                    ...proj,
                    labels: proj.labels.map(label => label.id === labelId ? response : label),
                }
            ));
            return true
        } catch (err) {
            setError(err.response?.data?.message || "Updating label failed");
            return false;
        }
    }, []);

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

    /**
     * Share project with another user.
     * Return true if the project was successfully shared, else false
     */
    const shareProject = useCallback(async (project, user) => {
        try {
            await shareProjectService(project.id, user.id);
            return true;
        } catch (err) {
            setError(err.response?.data?.message || "Sharing project failed");
            return false;
        }
    }, []);

    return {
        fetchAllProjects,
        createProject,
        updateProjectTitle,
        updateProjectDescription,
        updateProjectEstimatedLength,
        updateLabel,
        deleteProject,
        shareProject,
        userProjects,
        sharedProjects,
        loading,
        error,
        setError,
    };

}