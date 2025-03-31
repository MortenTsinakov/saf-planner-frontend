import { Column, IconButton, Row, Sidebar } from "components";
import { MdClose } from "react-icons/md";
import Comment from "views/comment/Comment";

const FragmentComments = ({fragment, showComments, setShowComments, ...props}) => {
    return (
        fragment.comments.length > 0 &&
        <Sidebar
            isOpen={showComments}
            isMobile={props.isMobile}
            fromRight={true}
            style={{
                padding: '2rem',
                justifyContent: 'start',
            }}
        >
            <Row style={{justifyContent: 'start', width: '100%'}}>
                <IconButton
                    icon={<MdClose />}
                    style={{
                        padding: 0,
                    }}
                    onClick={() => setShowComments(false)}
                />
            </Row>
            <Column
                style={{
                    overflowY: 'auto',
                    marginTop: '2rem',
                }}
            >
                    {fragment.comments.map(c => (
                        <Comment
                            key={c.id}
                            comment={c}
                        />
                    ))}
            </Column>
        </Sidebar>
    );
}
 
export default FragmentComments;