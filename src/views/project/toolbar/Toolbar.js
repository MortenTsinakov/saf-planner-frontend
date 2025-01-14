import { IconButton, Row } from 'components';
import { MdOutlineArticle } from "react-icons/md";

const Toolbar = ({height, showReadAllPanel, setShowReadAllPanel, ...props}) => {
    return (
        <Row
            style={{
                alignItems: 'center',
                padding: '2rem',
                height: height,
            }}
        >
            <IconButton
                icon={<MdOutlineArticle />}
                title='Read detailed descriptions'
                onClick={() => setShowReadAllPanel(!showReadAllPanel)}
            />
        </Row>
    );
}
 
export default Toolbar;