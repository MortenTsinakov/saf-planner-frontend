import { Column, FilledButton, InputArea, Typography } from "components";
import { useAlerts, useSharedProject } from "hooks";
import { useState } from "react";
import Comment from "views/comment/Comment";

const SharedProjectComments = ({activeFragmentIdx, setCommentToEdit, setCommentToDelete}) => {

    const {fragments, commentFragment} = useSharedProject();
    const {addAlert} = useAlerts();

    const [comment, setComment] = useState("");

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    }

    const handleAddCommentClick = async () => {
        const content = comment.trim();
        if (content.length === 0) {
            return;
        }
        const fragmentId = fragments[activeFragmentIdx].id;
        const isSuccess = await commentFragment(fragmentId, content);
        if (isSuccess) {
            addAlert("Comment was saved", "success");
            setComment("");
        }
    }

    return (
        activeFragmentIdx !== null &&
        <Column
            style={{
                flex: 0.25,
                alignItems: 'center',
                paddingTop: '2rem',
            }}
        >
            <Typography fontSize='medium'>
                Fragment comments
            </Typography>
            <Column
                style={{
                    width: '100%',
                    padding: '0 2rem',
                }}
            >
                <InputArea
                    style={{minHeight: 200}}
                    value={comment}
                    placeholder='Write a comment...'
                    onChange={handleCommentChange}
                />
                <FilledButton
                    onClick={handleAddCommentClick}
                    style={{width: 'fit-content'}}
                >
                    Comment
                </FilledButton>
            </Column>
            <Column
                style={{
                    paddingTop: '3rem',
                    width: '100%', 
                    padding: '2rem'
                }}
            >
                {
                    fragments[activeFragmentIdx].comments.length === 0
                    ?
                    <Typography color='label'>
                        This fragment has no comments yet...
                    </Typography>
                    :
                    <Column style={{width: '100%'}}>
                        {fragments[activeFragmentIdx].comments.map(c => (
                            <Comment
                                key={c.id}
                                comment={c}
                                setCommentToEdit={setCommentToEdit}
                                setCommentToDelete={setCommentToDelete}
                            />
                        ))}
                    </Column>
                }
            </Column>
        </Column>
    );
}
 
export default SharedProjectComments;