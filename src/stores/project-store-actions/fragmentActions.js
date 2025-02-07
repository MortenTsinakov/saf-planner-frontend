import { attachLabelsToFragmentService, createFragmentService, deleteFragmentService, moveFragmentService, updateFragmentDurationService, updateFragmentLongDescriptionService, updateFragmentOnTimelineStatusService, updateFragmentShortDescriptionService } from 'services';

const incrementFragmentPositions = (prev, position) => {
    prev.forEach(f => {
        if (f.position >= position) {
            f.position += 1;
        }
    });
    return prev;
};

const decrementFragmentPositions = (prev, position) => {
    prev.forEach(f => {
        if (f.position >= position) {
            f.position -= 1;
        }
    });
    return prev;
};

/**
 * Create new fragment
 */
export const createFragment = (get, set) => async (fragment, labels) => {
    try {
        set({ error: null});

        const labelIds = labels.map(l => l.id);

        const fragmentResponse = await createFragmentService(fragment);
        const labelResponse = await attachLabelsToFragmentService(labelIds, fragmentResponse.id);

        const newFragment = {
            ...fragmentResponse,
            labels: labelResponse,
        }

        let fragments = [...get().fragments]
        fragments = incrementFragmentPositions(fragments, fragment.position);
        fragments = [...fragments, newFragment].sort((a, b) => {return a.position - b.position});
        
        set({ fragments: fragments });
        return true;
    } catch (err) {
        set({error: {message: err.response?.data?.message || "Creating fragment failed"}, status: err.status});
        return false;
    }
};

/**
 * Update fragment on timeline status
 */
export const updateFragmentOnTimelineStatus = (get, set) => async (fragment, onTimeline) => {
    try {
        set({error: null});
        const response = await updateFragmentOnTimelineStatusService(fragment.id, onTimeline);
        const fragments = [...get().fragments.map(f => f.id === fragment.id ? response : f)];
        set({ fragments: fragments });
    } catch (err) {
        set({error: {message: err.response?.data?.message || "Updating fragment failed", status: err.status}});
    }
};

/**
 * Update fragment's short description
 */
export const updateFragmentShortDescription = (get, set) => async (fragment, shortDescription) => {
    try {
        set({ error: null });
        const response = await updateFragmentShortDescriptionService(fragment.id, shortDescription);
        const fragments = [...get().fragments.map(f => f.id === fragment.id ? response : f)];
        set({ fragments : fragments, fragmentToEdit: response });
        return true;
    } catch (err) {
        set({error: {message: err.response?.data?.message || "Updating fragment failed", status: err.status }});
        return false;
    }
};

/**
 * Update fragment's long description
 */
export const updateFragmentLongDescription = (get, set) => async (fragment, longDescription) => {
    try {
        set({ error: null });
        const response = await updateFragmentLongDescriptionService(fragment.id, longDescription);
        const fragments = [...get().fragments.map(f => f.id === fragment.id ? response : f)];
        set({ fragments: fragments, fragmentToEdit: response });
        return true;
    } catch (err) {
        set({error: {message: err.response?.data?.message || "Updating fragment failed", status: err.status }});
        return false;
    }
};

/**
 * Update fragment's duration (in seconds)
 */
export const updateFragmentDuration = (get, set) => async (fragment, durationInSeconds) => {
    try {
        set({error: null});
        const response = await updateFragmentDurationService(fragment.id, durationInSeconds);
        const fragments = [...get().fragments.map(f => f.id === fragment.id ? response : f)];
        set({ fragments : fragments, fragmentToEdit: response });
        return true;
    } catch (err) {
        set({error: {message: err.response?.data?.message || "Updating fragment failed", status: err.status }});
        return false;
    }
};

const moveFragmentOptimistically = (fragments, fragment, newPosition) => {
    const previousPosition = fragment.position;
    const updatedFragments = [...fragments]

    const [movedFragment] = updatedFragments.splice(previousPosition - 1, 1);
    updatedFragments.splice(newPosition - 1, 0, movedFragment);

    return updatedFragments.map((f, index) => ({
        ...f,
        position: index + 1
    }));
};

/**
 * Move fragment to new position
 */
export const moveFragment = (get, set) => async (fragment, newPosition) => {
    if (fragment.position === newPosition) {
        set({ error: {message: "Fragment is already in the requested position", status: null}});
        return;
    }
    const fragments = [...get().fragments]
    if (newPosition > fragments.length) {
        set({ error: {message: "Invalid position for moving the fragment", status: null}});
        return;
    }
    const oldState = [...fragments];
    set({ fragments: moveFragmentOptimistically(fragments, fragment, newPosition)});
    try {
        set({error: null});
        await moveFragmentService(fragment.id, newPosition);
    } catch (err) {
        set({error: err, fragments: oldState});
    }
};

/**
 * Delete fragment.
 * Return true if fragment was successfully deleted, else false.
 */
export const deleteFragment =  (get, set) => async (fragment) => {
    try {
        set({error: null});
        await deleteFragmentService(fragment.id);
        let fragments = [...get().fragments.filter(f => f.id !== fragment.id)];
        fragments = decrementFragmentPositions(fragments, fragment.position);
        set({ fragments: fragments})
        return true;
    } catch (err) {
        set({error: {message: err.response?.data?.message || "Deleting fragment failed", status: err.status}});
        return false;
    }
};