import { Column, FilledButton, InputArea, Modal, OutlineButton, Row, Typography } from "components";
import { useAlerts, useSharedProject } from "hooks";
import { useState } from "react";

const EditComment = ({comment, setCommentToEdit, fragmentId}) => {

    const {addAlert} = useAlerts();
    const {editComment} = useSharedProject();
    const [editedComment, setEditedComment] = useState(comment.content);

    const handleCommentChange = (e) => {
        setEditedComment(e.target.value);
    }

    const handleCancelClick = () => {
        setCommentToEdit(null);
    }

    const handleSaveClick = async () => {
        const content = editedComment.trim();
        if (content.length === 0) {
            addAlert("Comment can't be blank", "error");
            return;
        }
        if (content === comment.content) {
            setCommentToEdit(null);
            return;
        }

        const isSuccess = await editComment(fragmentId, comment.id, editedComment);
        if (isSuccess) {
            addAlert("Comment was updated", "success");
            setCommentToEdit(null);
        }
    }

    return (
        <Modal
            style={{
                minWdith: 300,
                width: 500,
            }}
        >
            <Column>
                <Typography
                    fontSize='medium'
                >
                    Edit comment
                </Typography>
                <InputArea
                    value={editedComment}
                    onChange={handleCommentChange}
                    style={{height: 200}}
                />
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
 
export default EditComment;