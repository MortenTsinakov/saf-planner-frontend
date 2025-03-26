import { Column, Typography } from "components";
import { useSharedProject } from "hooks";
import { useEffect, useState } from "react";
import Image from "views/image/Image";

const SharedProjectImages = ({activeFragmentIdx}) => {

    const {project, fragments, fetchImage} = useSharedProject();
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchFragmentImages = async () => {

            if (isNaN(activeFragmentIdx)) {
                return;
            }

            let fetchedImages = [];
            for (const image of fragments[activeFragmentIdx].images) {
                const imageBlob = await fetchImage(project.id, image.image);
                fetchedImages.push({
                    imageId: image.image,
                    description: image.description,
                    imageBlob: imageBlob,
                });
            }
            setImages(fetchedImages);
        }

        fetchFragmentImages();
    }, [fetchImage, fragments, project.id, activeFragmentIdx]);

    return (
        <Column
            style={{
                flex: 0.25,
                alignItems: 'center',
                paddingTop: '2rem',
            }}
        >
            <Typography fontSize='medium'>
                Fragment images
            </Typography>
            {
                images.length === 0
                ?
                <Typography color='label'>
                    Fragment has no images...
                </Typography>
                :
                images.map(im => (
                    <Image
                        key={im.imageId}
                        imageBlob={im.imageBlob}
                        description={im.description}
                    />
                ))
            } 
        </Column>
    );
}
 
export default SharedProjectImages;