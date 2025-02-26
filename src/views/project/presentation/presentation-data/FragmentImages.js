import { Column, IconButton, Loading, Row } from 'components';
import Image from './Image';
import { useCallback, useEffect, useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { useProjectStore } from 'stores';

const FragmentImages = ({fragment, ...props}) => {

    const {fetchImage} = useProjectStore();
    const [images, setImages] = useState(null);
    const [currentImageIdx, setCurrentImageIdx] = useState(0);

    const handleNextImageClick = useCallback(() => {
        setCurrentImageIdx(Math.min(images.length - 1, currentImageIdx + 1));
    }, [currentImageIdx, images]);

    const handlePreviousImageClick = useCallback(() => {
        setCurrentImageIdx(Math.max(0, currentImageIdx - 1));
    }, [currentImageIdx]);

    useEffect(() => {
        const resetCurrentImageIdx = () => {
            setCurrentImageIdx(0);
        }

        resetCurrentImageIdx();
    }, [fragment.id]);

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

    if (images.length <= currentImageIdx) {
        return;
    }

    return (
        images.length > 0 &&
        <Row
            style={{
                flex: 1,
                height: '100%',
                justifyContent: 'center',
                flexWrap: 'wrap',
                minWidth: 500,
            }}
        >
            <Row
                style={{
                    borderRadius: '10px',
                }}
            >
                <Column
                    style={{
                        overflow: 'hidden',
                        maxHeight: 576,
                        height: '100%',
                        borderRadius: '10px 0 0 10px',
                        paddingRight: '1rem',
                        borderRight: '1px solid var(--primary-color)',
                        position: 'relative',
                    }}
                >
                    <Column
                        style={{
                            gap: 0,
                            transform: currentImageIdx > 1 && `translateY(${-(currentImageIdx - 1) * 150}px)`,
                            transition: 'transform 0.5s ease-in-out',
                        }}
                    >
                        {images.map((im, index) => (
                            <img
                                key={im.imageId}
                                src={URL.createObjectURL(im.imageBlob)}
                                alt='carousel-image'
                                style={{
                                    width: 150,
                                    height: 150,
                                    objectFit: 'cover',
                                    padding: 5,
                                    borderRadius: '10px',
                                    opacity: currentImageIdx === index ? 1 : 0.2,
                                    transition: 'opacity 0.5s ease-in-out',
                                }}
                            />
                        ))}
                    </Column>
                    {
                        currentImageIdx > 0 &&
                        <Row>
                            <IconButton
                                style={{
                                    position: 'absolute',
                                    background: 'linear-gradient(to bottom, var(--background-color-low), transparent',
                                    width: '100%',
                                    top: 0,
                                }}
                                icon={<MdKeyboardArrowUp />}
                                onClick={handlePreviousImageClick}
                            />
                        </Row>
                    }
                    {
                        currentImageIdx < images.length - 1 &&
                        <Row>
                            <IconButton
                                style={{
                                    position: 'absolute',
                                    background: 'linear-gradient(to top, var(--background-color-low), transparent',
                                    width: '100%',
                                    bottom: 0,
                                }}
                                icon={<MdKeyboardArrowDown />}
                                onClick={handleNextImageClick}
                            />
                        </Row>
                    }
                </Column>
                <Image
                    imageBlob={images[currentImageIdx].imageBlob}
                />
            </Row>
        </Row>
    );
}
 
export default FragmentImages;