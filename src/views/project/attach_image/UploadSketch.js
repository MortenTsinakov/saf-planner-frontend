import { Column, FilledButton, Modal, OutlineButton, Row } from "components";
import Canvas from "./Canvas";

const UploadSketch = ({fragment, setShowAttachImageModal, ...props}) => {

    const handleCancelClick = () => {
        setShowAttachImageModal(false);
    }

    return (
        <Modal
            style={{
                padding: props.isMobile && '1rem',
                overflow: 'auto',
            }}
        >
            <Column>
                <Canvas {...props} />
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