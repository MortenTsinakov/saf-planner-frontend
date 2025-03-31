import { Column, FilledButton, Modal, OutlineButton, Row, Typography } from "components";
import { useAlerts, useSharedProject } from "hooks";

const DeleteComment = ({comment, setCommentToDelete, fragmentId}) => {

    const {deleteComment} = useSharedProject();
    const {addAlert} = useAlerts();

    const handleCancelClick = () => {
        setCommentToDelete(null);
    }
    
    const handleDeleteClick = async () => {
        const isSuccess = await deleteComment(fragmentId, comment.id);
        if (isSuccess) {
            addAlert("Comment was deleted", "success");
            setCommentToDelete(null);
        }
    }

    return (
        <Modal>
            <Column>
                <Typography>
                    Are you sure you want to delete this comment?
                </Typography>
                <Row
                    style={{justifyContent: 'space-between', paddingTop: '2rem'}}
                >
                    <OutlineButton
                        onClick={handleCancelClick}
                    >
                        Cancel
                    </OutlineButton>
                    <FilledButton
                        color='error'
                        onClick={handleDeleteClick}
                    >
                        Delete
                    </FilledButton>
                </Row>
            </Column>
        </Modal>
    );
}
 
export default DeleteComment;