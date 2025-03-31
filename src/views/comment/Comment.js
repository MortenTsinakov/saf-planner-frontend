import { Column, IconButton, Row, Typography } from "components";
import { useAuth } from "hooks";
import { MdDelete, MdEditSquare } from "react-icons/md";
import { formatDate } from "utils";

const Comment = ({comment, setCommentToEdit, setCommentToDelete}) => {

    const {user} = useAuth();
    const iconStyle = {
        fontSize: '2rem'
    }

    const handleEditCommentClick = () => {
        setCommentToEdit(comment);
    }

    const handleDeleteCommentClick = () => {
        setCommentToDelete(comment);
    }

    return (
        <Column
            style={{
                width: '100%',
                backgroundColor: 'var(--background-color-high)',
                padding: '2rem',
                border: '1px solid gray',
                borderRadius: 10,
            }}
        >
            <Column>
                <Typography
                    style={{fontWeight: 'bold'}}
                >
                    {comment.author}
                </Typography>
                <Typography>
                    {comment.content}
                </Typography>
                <Typography
                    fontSize='extrasmall'
                    color='label'
                >
                    {formatDate(comment.lastUpdated, ['year', 'month', 'day', 'hour', 'minute'])}
                </Typography>
            </Column>
            {
                comment.authorId === user.id &&
                <Row>
                    <IconButton
                        style={iconStyle}
                        icon={<MdEditSquare />}
                        onClick={handleEditCommentClick}
                    />
                    <IconButton
                        style={iconStyle}
                        icon={<MdDelete />}
                        onClick={handleDeleteCommentClick}
                    />
                </Row>
            }
        </Column>
    );
}
 
export default Comment;