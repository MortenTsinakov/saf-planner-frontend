import { Column, IconButton, Loading } from 'components';
import Image from './Image';
import { useImages } from 'hooks';
import { useCallback, useEffect, useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

const FragmentImages = ({fragment, ...props}) => {

    const {fetchImage} = useImages();
    const [images, setImages] = useState(null);
    const [currentImageIdx, setCurrentImageIdx] = useState(0);
    const [imageIsHovered, setImageIsHovered] = useState(false);

    const handleNextImageClick = useCallback(() => {
        setCurrentImageIdx(Math.min(images.length - 1, currentImageIdx + 1));
    }, [currentImageIdx, images]);

    const handlePreviousImageClick = useCallback(() => {
        setCurrentImageIdx(Math.max(0, currentImageIdx - 1));
    }, [currentImageIdx]);

    useEffect(() => {
        const fetchFragmentImages = async () => {
            let fetchedImages = [];
            for (const imageId of fragment.images) {
                const imageBlob = await fetchImage(imageId);
                fetchedImages.push({
                    imageId: imageId,
                    imageBlob: imageBlob,
                });
            }
            setImages(fetchedImages);
        }

        fetchFragmentImages();
    }, [fetchImage, fragment]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            switch (event.key) {
                case "ArrowUp":
                    handlePreviousImageClick();
                    break;
                case "ArrowDown":
                    handleNextImageClick();
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handlePreviousImageClick, handleNextImageClick]);

    if (images === null) {
        return (
            <Column
                style={{width: '50%'}}
            >
                <Loading />
            </Column>
        );
    }

    return (
        <Column
            style={{
                borderRadius: '10px',
                flex: 1,
                minWidth: '300px', 
                textAlign: 'center',
                height: 'fit-content',
                border: fragment.images.length > 0 && '1px solid var(--main-gray)',
            }}
            onMouseEnter={() => setImageIsHovered(true)}
            onMouseLeave={() => setImageIsHovered(false)}
        >
            {
                images.length > 0 &&
                <Column style={{position: 'relative'}}>
                    {
                        imageIsHovered &&
                        currentImageIdx > 0 &&
                        <IconButton
                            icon={<MdKeyboardArrowUp />}
                            onClick={handlePreviousImageClick}
                            style={{
                                position: 'absolute',
                                width: '100%',
                                backgroundColor: 'rgba(150, 150, 150, 0.15)',
                                borderRadius: '10px 10px 0 0'
                            }}
                        />
                    }
                    <Image
                        key={images[currentImageIdx].imageId}
                        imageId={images[currentImageIdx].imageId}
                        imageBlob={images[currentImageIdx].imageBlob}
                    />
                    {
                        imageIsHovered &&
                        currentImageIdx < images.length - 1 &&
                        <IconButton
                            icon={<MdKeyboardArrowDown />}
                            onClick={handleNextImageClick}
                            style={{
                                position: 'absolute',
                                width: '100%',
                                backgroundColor: 'rgba(150, 150, 150, 0.15)',
                                borderRadius: '0 0 10px 10px ',
                                bottom: 0,
                            }}
                        />
                    }
                </Column>
            }
        </Column>
    );
}
 
export default FragmentImages;