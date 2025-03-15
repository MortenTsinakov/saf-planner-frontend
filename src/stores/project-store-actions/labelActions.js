import { attachLabeltoFragmentService, createLabelService, removeLabelFromFragmentService } from 'services';

/**
 * Request for creating a new label.
 * If label was created, return the label,
 * else null
 */
export const createLabel = (get, set) => async (project, description, color) => {
    try {
        set({error:null});
        const response = await createLabelService(project.id, description, color);
        const updatedProject = {...get().project, labels: [...get().project.labels, response]};
        set({project: updatedProject});
        return response;
    } catch (err) {
        set({error: err});
        return null;
    }
};

export const attachLabelToFragment = (get, set) => async (labelId, fragmentId) => {
    try {
        set({ error: null});
        const response = await attachLabeltoFragmentService(labelId, fragmentId);
        const fragments = [...get().fragments.map(f => f.id !== fragmentId ? f : {...f, labels: [...f.labels, response]})];
        set({ fragments: fragments});
        set({ fragmentToEdit: get().fragments.find(f => f.id === fragmentId)});
        return true;
    } catch (err) {
        set({ error: err });
        return false;
    }
};

export const removeLabelFromFragment = (get, set) => async (labelId, fragmentId) => {
    try {
        set({error: null});
        await removeLabelFromFragmentService(labelId, fragmentId);
        const fragments = [...get().fragments.map(f => f.id !== fragmentId ? f : {...f, labels: f.labels.filter(l => l.id !== labelId)})];
        set({ fragments: fragments });
        set({ fragmentToEdit: get().fragments.find(f => f.id === fragmentId)});
        return true;
    } catch (err) {
        set({error: err});
        return false;
    }
};