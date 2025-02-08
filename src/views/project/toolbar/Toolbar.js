import { IconButton, Row } from 'components';
import { MdArticle } from "react-icons/md";

const Toolbar = ({height, showReadAllPanel, setShowReadAllPanel}) => {
    return (
        <Row
            style={{
                alignItems: 'center',
                padding: '2rem',
                height: height,
            }}
        >
            <IconButton
                icon={<MdArticle />}
                title='Read detailed descriptions'
                onClick={() => setShowReadAllPanel(!showReadAllPanel)}
            />
        </Row>
    );
}
 
export default Toolbar;