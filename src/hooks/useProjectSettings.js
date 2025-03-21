import { useCallback, useState } from 'react'
import { createLabelService, deleteLabelService, fetchProjectByIdService, stopSharingProjectService, updateLabelService, updateProjectDescriptionService, updateProjectEstimatedLengthService, updateProjectTitleService } from 'services';

export const useProjectSettings = () => {

    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /**
     * Fetch project with given id
     */
    const fetchProject = useCallback(async (projectId) => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetchProjectByIdService(projectId);
            setProject(response);
        } catch (err) {
            setError(err.response?.data?.message || "Fetching project failed");
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Update project title.
     * If updating succeeded return true, else false.
     */
    const updateProjectTitle = useCallback(async (projectId, title) => {
        try {
            setError(null);
            const response = await updateProjectTitleService(projectId, title);
            setProject(response);
            return true;
        } catch (err) {
            setError(err.response?.data?.message || "Updating project title failed");
            return false;
        }
    }, []);

    /**
     * Update project description.
     * If updating succeeded return true, else false.
     */
    const updateProjectDescription = useCallback(async (projectId, description) => {
        try {
            setError(null);
            const response = await updateProjectDescriptionService(projectId, description);
            setProject(response);
            return true;
        } catch (err) {
            setError(err.response?.data?.message || "Updating project description failed");
            return false;
        }
    }, []);

    const validateProjectEstimatedLength = useCallback((estLen) => {
        return (estLen >= 0);
    }, []);

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
            setProject(response);
            return true;
        } catch (err) {
            setError(err.response?.data?.message || "Updating project's estimated length failed");
            return false;
        }
    }, [validateProjectEstimatedLength]);

    /**
     * Create new label
     */
    const createLabel = useCallback(async (projectId, description, color) => {
        try {
            setError(null);
            const response = await createLabelService(projectId, description, color);
            setProject({
                ...project,
                labels: [...project.labels, response],
            });
            return true;
        } catch (err) {
            setError(err);
            return false;
        }
    }, [project]);

    const updateLabel = useCallback(async (labelId, description, color) => {
        try {
            setError(null);
            const response = await updateLabelService(labelId, description, color);
            setProject({
                ...project,
                labels: project.labels.map(l => {
                    if (l.id !== response.id) {
                        return l
                    }
                    return response;
                }),
            });
            return true;
        } catch (err) {
            setError(err);
            return false;
        }
    }, [project]);

    /**
     * Delete label from project
     */
    const deleteLabel = useCallback(async (labelId) => {
        try {
            setError(null);
            const response = await deleteLabelService(labelId);
            setProject({
                ...project,
                labels: project.labels.filter(l => l.id !== response.labelId),
            });
            return true;
        } catch (err) {
            setError(err.response?.data?.message || "Updating project's estimated length failed");
            return false;
        }
    }, [project]);

    const stopSharingProject = useCallback(async (projectId, userId) => {
        try {
            setError(null);
            const response = await stopSharingProjectService(projectId, userId);
            setProject({
                ...project,
                sharedWith: project.sharedWith.filter(s => s.id !== response.userId)
            });
        } catch (err) {
            setError(err.response?.data?.message || "Failed to stop sharing the project");
        }
    }, [project]);

    return {
        fetchProject,
        project,
        updateProjectTitle,
        updateProjectDescription,
        updateProjectEstimatedLength,
        createLabel,
        updateLabel,
        deleteLabel,
        stopSharingProject,
        loading,
        error,
        setError,
    };
}