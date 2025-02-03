import { createContext, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { attachLabeltoFragmentService, createFragmentService,
         createLabelService,
         deleteFragmentService,
         fetchFragmentsService,
         fetchProjectByIdService,
         moveFragmentService,
         removeLabelFromFragmentService,
         updateFragmentDurationService,
         updateFragmentLongDescriptionService,
         updateFragmentOnTimelineStatusService,
         updateFragmentShortDescriptionService } from 'services';

const ProjectContext = createContext();

export const ProjectProvider = ({children}) => {

    const [project, setProject] = useState(null);
    const [fragments, setFragments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const SidePanelStates = Object.freeze({
        CREATE_FRAGMENT: 0,
        EDIT_FRAGMENT: 1,
        EDIT_SHORT_DESCRIPTION: 2,
        EDIT_LONG_DESCRIPTION: 3,
        EDIT_DURATION: 4,
        CREATE_LABEL: 5,
    });
    const [sidePanelState, setSidePanelState] = useState(null);
    const [sidePanelIsOpen, setSidePanelIsOpen] = useState(false);
    // Id of the fragment being dragged
    const [activeId, setActiveId] = useState(null);
    // A list of a SINGLE card - the card being created at the moment
    const [newCards, setNewCards] = useState([]);
    const [fragmentToEdit, setFragmentToEdit] = useState(null);

    /**
     * Fetch project from the server.
     * 
     * Fetches:
     *  - project information
     *  - fragments for the project
     */
    const fetchProject = useCallback(async (projectId) => {
        try {
            setLoading(true);
            setError(null);
            
            const [projectResponse, fragmentsResponse] = await Promise.all([
                fetchProjectByIdService(projectId),
                fetchFragmentsService(projectId),
            ]);

            setProject(projectResponse);
            setFragments(fragmentsResponse);
        } catch (err) {
            if (err.status === 404) {
                navigate('/404');
            } else {
                setError(err.response?.data?.message || "Fetching project failed");
            }
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    const incrementFragmentPositions = useCallback((prev, position) => {
        prev.forEach(f => {
            if (f.position >= position) {
                f.position += 1;
            }
        });
        return prev;
    }, []);

    const decrementFragmentPositions = useCallback((prev, position) => {
        prev.forEach(f => {
            if (f.position >= position) {
                f.position -= 1;
            }
        });
        return prev;
    }, []);

    /**
     * Create new fragment
     */
    const createFragment = useCallback(async (fragment) => {
        try {
            setError(null);
            const response = await createFragmentService(fragment);
            setFragments(prev => [...incrementFragmentPositions(prev, response.position)]);
            setFragments(prev => [...prev, response].sort((a, b) => {return a.position - b.position}));
            return true;
        } catch (err) {
            setError(err.response?.data?.message || "Creating fragment failed");
            return false;
        }
    }, [incrementFragmentPositions]);

    /**
     * Update fragment on timeline status
     */
    const updateFragmentOnTimelineStatus = useCallback(async (fragment, onTimeline) => {
        try {
            setError(null);
            const response = await updateFragmentOnTimelineStatusService(fragment.id, onTimeline);
            setFragments(f => f.map((item) => (item.id === fragment.id ? response : item)));
        } catch (err) {
            setError(err.response?.data?.message || "Updating fragment failed");
        }
    }, []);

    /**
     * Update fragment's short description
     */
    const updateFragmentShortDescription = useCallback(async (fragment, shortDescription) => {
        try {
            setError(null);
            const response = await updateFragmentShortDescriptionService(fragment.id, shortDescription);
            setFragments(f => f.map((item) => (item.id === fragment.id ? response : item)));
            setFragmentToEdit(response);
            return true;
        } catch (err) {
            setError(err.response?.data?.message || "Updating fragment failed");
            return false;
        }
    }, []);

    /**
     * Update fragment's long description
     */
    const updateFragmentLongDescription = useCallback(async (fragment, longDescription) => {
        try {
            setError(null);
            const response = await updateFragmentLongDescriptionService(fragment.id, longDescription);
            setFragments(f => f.map((item) => (item.id === fragment.id ? response : item)));
            setFragmentToEdit(response);
            return true;
        } catch (err) {
            setError(err.response?.data?.message || "Updating fragment failed");
            return false;
        }
    }, []);

    /**
     * Update fragment's duration (in seconds)
     */
    const updateFragmentDuration = useCallback(async (fragment, durationInSeconds) => {
        try {
            setError(null);
            const response = await updateFragmentDurationService(fragment.id, durationInSeconds);
            setFragments(f => f.map((item) => (item.id === fragment.id ? response : item)));
            setFragmentToEdit(response);
            return true;
        } catch (err) {
            setError(err.response?.data?.message || "Updating fragment failed");
            return false;
        }
    }, []);

    const moveFragmentOptimistically = useCallback((fragment, newPosition) => {
        const previousPosition = fragment.position;
        const updatedFragments = [...fragments]

        const [movedFragment] = updatedFragments.splice(previousPosition - 1, 1);
        updatedFragments.splice(newPosition - 1, 0, movedFragment);

        return updatedFragments.map((f, index) => ({
            ...f,
            position: index + 1
        }));
    }, [fragments]);

    /**
     * Move fragment to new position
     */
    const moveFragment = useCallback(async (fragment, newPosition) => {
        if (fragment.position === newPosition) {
            setError("Fragment is already in the requested position", "error");
            return;
        }
        if (newPosition > fragments.length) {
            setError("Invalid position for moving the fragment", "error");
            return;
        }
        const oldState = [...fragments];
        setFragments(moveFragmentOptimistically(fragment, newPosition));
        try {
            setError(null);
            await moveFragmentService(fragment.id, newPosition);
        } catch (err) {
            setError(err);
            setFragments(oldState);
        }
    }, [fragments, moveFragmentOptimistically]);

    /**
     * Delete fragment.
     * Return true if fragment was successfully deleted, else false.
     */
    const deleteFragment = useCallback(async (fragment) => {
        try {
            setError(null);
            await deleteFragmentService(fragment.id);
            setFragments(prev => decrementFragmentPositions(prev.filter((f) => f.id !== fragment.id), fragment.position));
            return true;
        } catch (err) {
            setError(err.response?.data?.message || "Deleting fragment failed");
            return false;
        }
    }, [decrementFragmentPositions]);

    const createLabel = useCallback(async (proj, description, color) => {
        try {
            setError(null);
            const response = await createLabelService(proj.id, description, color);
            setProject(prev => ({
                ...prev,
                labels: [...prev.labels, response]
            }));
            return true;
        } catch (err) {
            setError(err);
            return false;
        }
    }, []);

    const attachLabelToFragment = useCallback(async (labelId, fragmentId) => {
        try {
            setError(null);
            const response = await attachLabeltoFragmentService(labelId, fragmentId);
            setFragments(prev => prev.map(fragment => {
                if (fragment.id !== fragmentId) {
                    return fragment
                }
                return {
                    ...fragment,
                    labels: [...fragment.labels, response]
                }
            }));
            setFragmentToEdit(prev => ({
                ...prev,
                labels: [...prev.labels, response]
            }))
            return true;
        } catch (err) {
            setError(err);
            return false;
        }
    }, []);

    const removeLabelFromFragment = useCallback(async (labelId, fragmentId) => {
        try {
            setError(null);
            const response = await removeLabelFromFragmentService(labelId, fragmentId);
            setFragments(prev => prev.map(fragment => {
                if (fragment.id !== response.fragmentId) {
                    return fragment;
                }
                return {
                    ...fragment,
                    labels: fragment.labels.filter(label => label.id !== response.labelId)
                }
            }));
            setFragmentToEdit(prev => ({
                ...prev,
                labels: prev.labels.filter(l => l.id !== labelId)
            }));
            return true;
        } catch (err) {
            setError(err);
            return false;
        }
    }, []);

    const value = {
        project,
        fetchProject,
        fragments,
        createLabel,
        attachLabelToFragment,
        removeLabelFromFragment,
        setFragments,
        fragmentToEdit,
        setFragmentToEdit,
        activeId,
        setActiveId,
        newCards,
        setNewCards,
        SidePanelStates,
        sidePanelState,
        setSidePanelState,
        sidePanelIsOpen,
        setSidePanelIsOpen,
        createFragment,
        updateFragmentOnTimelineStatus,
        updateFragmentShortDescription,
        updateFragmentLongDescription,
        updateFragmentDuration,
        moveFragment,
        deleteFragment,
        loading,
        error,
        setError,
    }

    return (
        <ProjectContext.Provider value={value}>
            {children}
        </ProjectContext.Provider>
    )
}

export default ProjectContext;