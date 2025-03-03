import { Column, FilledButton, Modal, OutlineButton } from "components";
import { useState } from "react";
import UploadImageFromDevice from "./UploadImageFromDevice";

const AttachImage = ({fragment, setShowAttachImageModal, ...props}) => {

    const AttachImageModes = Object.freeze({
        FROM_DEVICE: 0,
        DRAW: 1
    });

    const [attachImageMode, setAttachImageMode] = useState(null);

    if (attachImageMode === null) {
        return (
            <Modal>
                <Column>
                    <OutlineButton
                        onClick={() => setAttachImageMode(AttachImageModes.FROM_DEVICE)}
                    >
                        Upload from device
                    </OutlineButton>
                    <OutlineButton>
                        Draw new image
                    </OutlineButton>
                    <FilledButton
                        onClick={() => setShowAttachImageModal(false)}
                    >
                        Cancel
                    </FilledButton>
                </Column>
            </Modal>
        );
    }

    if (attachImageMode === AttachImageModes.FROM_DEVICE) {
        return (
            <UploadImageFromDevice
                fragment={fragment} 
                setShowAttachImageModal={setShowAttachImageModal}
                {...props}
            />
        );
    }
}
 
export default AttachImage;