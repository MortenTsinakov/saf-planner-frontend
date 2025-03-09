import { Column, FilledButton, InputArea, Modal, OutlineButton, Row, Typography } from "components";
import Canvas from "./Canvas";
import { useRef, useState } from "react";
import { useAlerts } from "hooks";
import { scaleImage, svgElementToFile } from "utils";
import { useProjectStore } from "stores";

const UploadSketch = ({fragment, setShowAttachImageModal, ...props}) => {

    const {uploadImage, error} = useProjectStore();
    const {addAlert} = useAlerts();
    const svgRef = useRef(null);

    const [description, setDescription] = useState("");

    const handleCancelClick = () => {
        setShowAttachImageModal(false);
    }

    const handleSaveClick = async () => {
        if (svgRef.current === null) {
            addAlert("Saving image failed", "error");
            return;
        }
        let file = await svgElementToFile(svgRef.current);
        file = await scaleImage(file);
        
        const uploadWasSuccessful = await uploadImage(fragment.id, file, description);
        if (uploadWasSuccessful) {
            addAlert("Attached image to the fragment", "success");
            setShowAttachImageModal(false);
        } else {
            addAlert(error, "error");
        }
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    return (
        <Modal
            style={{
                padding: props.isMobile && '1rem',
                overflow: 'auto',
            }}
        >
            <Column>
                <Canvas
                    ref={svgRef}
                    {...props}
                />
                <Column>
                    <Typography>Description</Typography>
                    <Typography 
                        fontSize='extrasmall' 
                        color='label'
                        style={{textWrap: 'wrap'}}
                    >
                        Would you like to describe why the image is attached to the fragment? You can do it here.
                    </Typography>
                    <InputArea
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                </Column>
                <Row
                    style={{
                        justifyContent: 'space-between'
                    }}
                >
                    <OutlineButton
                        onClick={handleCancelClick}
                        style={{minWidth: 100}}
                    >
                        Cancel
                    </OutlineButton>
                    <FilledButton
                        onClick={handleSaveClick}
                        style={{minWidth: 100}}
                    >
                        Save
                    </FilledButton>
                </Row>
            </Column>
        </Modal>
    );
}
 
export default UploadSketch;