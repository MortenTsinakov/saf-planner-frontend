import { Column, FilledButton, IconButton, Modal, OutlineButton, Row, Typography } from "components";
import { useAlerts } from "hooks";
import { useRef, useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";
import { useProjectStore } from "stores";
import { isCorrectSize, isValidImageFile, scaleImage } from "utils";

const UploadImageFromDevice = ({fragment, setShowAttachImageModal}) => {

    const {addAlert} = useAlerts();
    const {uploadImage, error} = useProjectStore();

    const fileInputRef = useRef(null);
    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);

    const handleSelectImage = async (file) => {
        if (!isValidImageFile(file)) {
            addAlert("Please attach a valid image file", "error");
            return;
        }
        if (!isCorrectSize(file)) {
            addAlert("Maximum file size allowed is 5MB", "error");
            return;
        }

        const scaledImage = await scaleImage(file);
        setFile(scaledImage);
        setImage(URL.createObjectURL(scaledImage));
    }

    const handleChange = (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            handleSelectImage(file);
        }
    }
    
    const handleDropImage = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            handleSelectImage(file);
        }
    }

    const handleRemoveImageClick = () => {
        setImage(null);
        setFile(null);
    }

    const handleCancelClick = () => {
        setImage(null);
        setFile(null);
        setShowAttachImageModal(false);
    }

    const handleSaveClick = async () => {
        const uploadWasSuccessful = await uploadImage(fragment.id, file);
        if (uploadWasSuccessful) {
            addAlert("Attached image to the fragment", "success");
            setImage(null);
            setFile(null);
            setShowAttachImageModal(false);
        } else {
            addAlert(error, "error");
        }
    }

    return (
        <Modal>
            <Column
                style={{gap: '2rem'}}
            >
                <Typography fontSize='medium'>
                    Upload image
                </Typography>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleChange}
                    style={{display: 'none'}}
                />
                {
                    image === null ?
                    <Column
                        style={{
                            width: '100%',
                            height: '300px',
                            border: '1px dashed gray',
                            borderRadius: '10px',
                            padding: '2rem',
                            textAlign: 'center',
                            justifyContent: 'center',
                        }}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleDropImage}
                    >
                        <IconButton
                            icon={<MdAdd />}
                            onClick={() => fileInputRef.current.click()}
                        />
                        <Typography
                            fontSize='extrasmall'
                            color='label'
                        >
                            Select image from device or drag and drop it here.
                        </Typography>
                    </Column>
                    :
                    <Column style={{position: 'relative', alignItems: 'end'}}>
                        <IconButton
                            style={{
                                position: 'absolute',
                                margin: '1rem',
                                backgroundColor: 'var(--background-color-low)',
                                color: 'var(--text-color)',
                                borderRadius: '5px',
                            }}
                            icon={<MdClose />}
                            onClick={handleRemoveImageClick}
                        />
                        <img src={image} alt='Upload' style={{borderRadius: '10px'}}/>
                    </Column>
                }
                <Row style={{justifyContent: 'space-between'}}>
                    <OutlineButton
                        onClick={handleCancelClick}
                        style={{minWidth: '100px'}}
                    >
                        Cancel
                    </OutlineButton>
                    {
                        image !== null &&
                        <FilledButton
                            onClick={handleSaveClick}
                            style={{minWidth: '100px'}}
                        >
                            Save
                        </FilledButton>
                    }
                </Row>
            </Column>
        </Modal>
    );
}
 
export default UploadImageFromDevice;