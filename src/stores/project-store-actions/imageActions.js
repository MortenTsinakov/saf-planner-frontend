import { deleteImageService, fetchImageService, uploadImageService } from "services";

export const fetchImage = (get, set) => async (imageId) => {

    if (get().images.has(imageId)) {
        return get().images.get(imageId);
    }

    try {
        set({ error: null});
        const imageBlob = await fetchImageService(imageId);
        get().images.set(imageId, imageBlob);
        return imageBlob;
    } catch (err) {
        set({error: {message: err.response?.data?.message || "Fetching image failed", status: err.status }});
    }
}

export const uploadImage = (get, set) => async (fragmentId, image) => {
    try {
        set({error: null});
        const response = await uploadImageService(fragmentId, image);
        const fragments = [...get().fragments.map(f => f.id !== response.fragmentId ? f : {...f, images: [...f.images, response.image]})];
        set({ fragments: fragments });
        return true;
    } catch (err) {
        set({error: {message: err.response?.data?.message || "Uploading image failed", status: err.status }});
        return false;
    }
}

export const deleteImage = (get, set) => async (fragmentId, imageId) => {
    try {
        set({error: null});
        const response = await deleteImageService(imageId);
        const fragments = [...get().fragments.map(f => f.id !== fragmentId ? f : {...f, images: [...f.images.filter(i => i !== response.image)]})];
        get().images.delete(imageId);
        set({ fragments: fragments });
        return true;
    } catch (err) {
        set({error: {message: err.response?.data?.message || "Deleting image failed", status: err.status}});
        return false;
    }
}