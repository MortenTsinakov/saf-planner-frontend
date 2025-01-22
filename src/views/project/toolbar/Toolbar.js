import { IconButton, Row } from 'components';
import { MdAddBox, MdArticle } from "react-icons/md";

const Toolbar = ({height, showReadAllPanel, setShowReadAllPanel, showCreateFragmentPanel, setShowCreateFragmentPanel, ...props}) => {
    return (
        <Row
            style={{
                alignItems: 'center',
                padding: '2rem',
                height: height,
            }}
        >
            <IconButton
                icon={<MdAddBox />}
                title='Add new fragment'
                onClick={() => setShowCreateFragmentPanel(!showCreateFragmentPanel)}
            />
            <IconButton
                icon={<MdArticle />}
                title='Read detailed descriptions'
                onClick={() => setShowReadAllPanel(!showReadAllPanel)}
            />
        </Row>
    );
}
 
export default Toolbar;