const { useCallback, useRef } = require("react");
const { fetchImageService } = require("services");

export const useImages = () => {

    const imageCache = useRef(new Map());

    const fetchImage = useCallback(async (imageId) => {
        if (imageCache.current.has(imageId)) {
            return imageCache.current.get(imageId);
        }

        try {
            const imageBlob = await fetchImageService(imageId);
            imageCache.current.set(imageId, imageBlob);
            return imageBlob;
        } catch (err) {
            console.log(err);
        }
    }, []);

    return {
        fetchImage,
    }
}