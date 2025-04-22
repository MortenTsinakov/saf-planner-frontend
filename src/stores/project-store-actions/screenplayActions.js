import { isEqual } from "lodash";

const { fetchScreenplayService, createScreenplayService, updateScreenplayService, deleteScreenplayService, downloadScreenplayAsPDFService } = require("services");

const screenplayDefaultValue =
        {
            type: 'screenplay',
            id: 1,
            children: [
                { type: 'header', children: [{ text: 'fade in:' }] },
            ],
        };

/**
 * Fetch the screenplay for project with given id.
 * Fetch only if it hasn't been fetched yet or project has changed.
 */
export const fetchScreenplay = (get, set) => async () => {
    set({ loading: true});

    if (get().screenplay !== null && get().project.id === get().screenplay.projectId) {
        set({ loading: false});
        return;
    }

    try {
        set({ error: null });

        const response = await fetchScreenplayService(get().project.id);
        set({ screenplay: response, currentScreenplay: response.content });
    } catch (err) {
        set({error: {message: err.response?.data?.message || "Fetching screenplay failed"}, status: err.status});
    } finally {
        set({ loading: false});
    }
}

export const saveScreenplay = (get, set) => async (content) => {
    if (get().screenplay === null) {
        set({ error: "Screenplay is null"});
        return false;
    }

    if (get().screenplay.id === null) {
        return createScreenplay(get, set, content);
    } else {
        return updateScreenplay(get, set, content);
    }
} 

/**
 * Save new screenplay to the database. If saving succeeded, return true,
 * else false.
 */
const createScreenplay = async (get, set, content) => {

    if (isEqual(get().screenplay.content, content)) {
        return;
    }

    try {
        set({error: null});

        const response = await createScreenplayService(get().project.id, content);
        set({ screenplay: response });
        return true;
    } catch (err) {
        set({error: {message: err.response?.data?.message || "Saving screenplay failed"}, status: err.status});
        return false;
    }
}

/**
 * Overwrite the screenplay with given id with content provided.
 * If updating the screenplay succeeded return true, else false.
 */
const updateScreenplay = async (get, set, content) => {
    if (isEqual(get().screenplay.content, content)) {
        return;
    }

    try {
        set({error: null});

        await updateScreenplayService(get().screenplay.id, content);
        set({ screenplay: {...get().screenplay, content: content}});
        return true;
    } catch (err) {
        set({error: {message: err.response?.data?.message || "Saving screenplay failed"}, status: err.status});
        return false;
    }
}

/**
 * Delete the screenplay with given id.
 * If deletion succeeds return true, else false.
 */
export const deleteScreenplay = (get, set) => async () => {
    try {
        set({ error: null});

        await deleteScreenplayService(get().screenplay.id);
        set({ screenplay: null, currentScreenplay: screenplayDefaultValue });
        return true;
    } catch (err) {
        set({error: {message: err.response?.data?.message || "Deleting screenplay failed"}, status: err.status});
        return false;
    }
}

/**
 * Download the blob of the screenplay and then deal with downloading
 * it inside the component.
 */
export const downloadScreenplayAsPDF = (set) => async (data)  => {
    try {
        set({ error: null });

        const blob = await downloadScreenplayAsPDFService(data);
        return blob;
    } catch (err) {
        set({error: {message: err.response?.data?.message || "Downloading screenplay failed"}, status: err.status});
    }
}