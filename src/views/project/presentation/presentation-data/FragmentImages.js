import { Column, FilledButton, IconButton, Loading, Modal, Row, Typography } from 'components';
import Image from './Image';
import { useCallback, useEffect, useState } from 'react';
import { MdAddPhotoAlternate, MdDelete, MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { useProjectStore } from 'stores';
import AttachImage from 'views/project/attach_image/AttachImage';
import { useAlerts } from 'hooks';

const FragmentImages = ({fragment, ...props}) => {

    const {fetchImage, deleteImage, error} = useProjectStore();
    const {addAlert} = useAlerts();

    const [images, setImages] = useState(null);
    const [currentImageIdx, setCurrentImageIdx] = useState(0);
    const [showAttachImageModal, setShowAttachImageModal] = useState(false);
    const [showDeleteImageModal, setShowDeleteImageModal] = useState(false);

    const handleNextImageClick = useCallback(() => {
        setCurrentImageIdx(Math.min(images.length - 1, currentImageIdx + 1));
    }, [currentImageIdx, images]);

    const handlePreviousImageClick = useCallback(() => {
        setCurrentImageIdx(Math.max(0, currentImageIdx - 1));
    }, [currentImageIdx]);

    const handleAttachImageClick = () => {
        setShowAttachImageModal(true);
    }

    const handleDeleteImageClick = () => {
        setShowDeleteImageModal(true);
    }

    const handleConfirmDelete = async () => {
        const fragmentId = fragment.id;
        const imageId = images[currentImageIdx].imageId;
        const deletionWasSuccessful = await deleteImage(fragmentId, imageId);
        if (deletionWasSuccessful) {
            setShowDeleteImageModal(false);
            if (currentImageIdx + 1 >= images.length) {
                setCurrentImageIdx(currentImageIdx - 1);
            }
            addAlert("Image deleted", "success");
        } else {
            addAlert(error.message, "error");
        }
    }

    useEffect(() => {
        const resetCurrentImageIdx = () => {
            setCurrentImageIdx(0);
        }

        resetCurrentImageIdx();
    }, [fragment.id, images]);

    useEffect(() => {
        const fetchFragmentImages = async () => {
            let fetchedImages = [];
            for (const image of fragment.images) {
                const imageBlob = await fetchImage(image.image);
                fetchedImages.push({
                    imageId: image.image,
                    description: image.description,
                    imageBlob: imageBlob,
                });
            }
            setImages(fetchedImages);
        }

        fetchFragmentImages();
    }, [fetchImage, fragment.images]);

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

    if (images.length === 0) {
        return (
            <Column
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: '2rem',
                    padding: '2rem',
                    border: '1px dashed gray',
                    borderRadius: '10px',
                }}
            >
                <IconButton
                    style={{fontSize: '6rem'}}
                    icon={<MdAddPhotoAlternate />}
                    onClick={handleAttachImageClick}
                />

                {
                    showAttachImageModal &&
                    <AttachImage
                    fragment={fragment}
                    setShowAttachImageModal={setShowAttachImageModal}
                        {...props}
                        />
                    }
            </Column>
        );
    }

    return (
        images.length > 0 &&
        <Column
        style={{
            flex: 1,
            height: '100%',
            justifyContent: 'center',
            flexWrap: 'wrap',
            minWidth: 500,
            marginLeft: '2rem',
            alignItems: 'center',
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
                <Row>
                    <Image
                        imageBlob={images[currentImageIdx].imageBlob}
                        description={images[currentImageIdx].description}
                    />
                    <Column>
                        <IconButton
                            icon={<MdAddPhotoAlternate />}
                            onClick={handleAttachImageClick}
                        />
                        <IconButton
                            icon={<MdDelete />}
                            onClick={handleDeleteImageClick}
                        />
                    </Column>
                </Row>
            </Row>

            {
                showAttachImageModal &&
                <AttachImage
                    fragment={fragment}
                    setShowAttachImageModal={setShowAttachImageModal}
                    {...props}
                />
            }

            {
                showDeleteImageModal &&
                <Modal
                    style={{gap: '2rem'}}
                >
                    <Typography>
                        Are you sure you want to delete this image?
                    </Typography>
                    <Row style={{width: '100%', justifyContent: 'space-between'}}>
                        <FilledButton
                            onClick={() => setShowDeleteImageModal(false)}
                        >
                            Cancel
                        </FilledButton>
                        <FilledButton
                            color='error'
                            onClick={handleConfirmDelete}
                        >
                            Delete
                        </FilledButton>
                    </Row>
                </Modal>
            }

        </Column>
    );
}
 
export default FragmentImages;