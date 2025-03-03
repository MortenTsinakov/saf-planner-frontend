export const isValidImageFile = (file) => {
    if (!file) {
        return false;
    }

    if (!file.type.startsWith("image/")) {
        return false;
    }

    return true;
}

export const isCorrectSize = (file) => {
    const MAX_SIZE = 5000000

    if (file.size > MAX_SIZE) {
        return false;
    }

    return true;
}

export const scaleImage = (file, callback) => {

    const MAX_SIZE = 750;

    return new Promise((resolve, reject) => {
        const reader = new FileReader();
    
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
    
            img.onload = () => {
                let width = img.width;
                let height = img.height;
    
                if (width > MAX_SIZE || height > MAX_SIZE) {
                    const scaleFactor = Math.min(MAX_SIZE / width, MAX_SIZE / height);
                    width *= scaleFactor;
                    height *= scaleFactor;
                }
    
                const canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, width, height);
    
                canvas.toBlob((blob) => {
                    if (!blob) {
                        reject(new Error("Image resizing failed"));
                        return;
                    }

                    const resizedFile = new File([blob], file.name, {
                        type: "image/jpeg",
                        lastModified: Date.now(),
                    });

                    resolve(resizedFile);
                }, "image/jpeg", 0.8); // 0.8 is the quality
            };
        };
    
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}