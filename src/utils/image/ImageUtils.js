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

export const scaleImage = (file) => {

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

const average = (a, b) => (a + b) / 2;

export const getSvgPathFromStroke = (points, closed = true) => {
    const len = points.length;

    if (len < 4) {
        return ``;
    }

    let a = points[0];
    let b = points[1];
    const c = points[2];

    let result = `M${a[0].toFixed(2)},${a[1].toFixed(2)} Q${b[0].toFixed(
        2
      )},${b[1].toFixed(2)} ${average(b[0], c[0]).toFixed(2)},${average(
        b[1],
        c[1]
      ).toFixed(2)} T`;

    for (let i = 2; i < len - 1; i++) {
        a = points[i];
        b = points[i + 1]
        result += `${average(a[0], b[0]).toFixed(2)},${average(a[1], b[1]).toFixed(
            2
        )} `
    }

    if (closed) {
        result += 'Z';
    }

    return result;
}

export const svgElementToFile = (element) => {
    return new Promise((resolve, reject) => {
        const clonedSvg = element.cloneNode(true);
        const rect = element.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        clonedSvg.setAttribute("width", width);
        clonedSvg.setAttribute("height", height);
        clonedSvg.setAttribute("viewBox", `0 0 ${width} ${height}`);

        const svgData = new XMLSerializer().serializeToString(clonedSvg);
        const svgBlob = new Blob([svgData], { type: "image/svg+xml" });
        const file = new File([svgBlob], "sketch.svg", {
            type: "image/svg+xml",
            lastModified: Date.now(),
        });

        resolve(file);
    });
}