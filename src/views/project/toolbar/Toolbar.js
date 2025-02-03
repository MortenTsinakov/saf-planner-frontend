import { IconButton, Row } from 'components';
import { useProject } from 'hooks';
import { MdAddBox, MdArticle } from "react-icons/md";

const Toolbar = ({height, showReadAllPanel, setShowReadAllPanel}) => {

    const {SidePanelStates, setSidePanelState, sidePanelIsOpen, setSidePanelIsOpen} = useProject();

    const handleCreateFragmentClick = () => {
        setSidePanelState(SidePanelStates.CREATE_FRAGMENT);
        setSidePanelIsOpen(!sidePanelIsOpen);
    }

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
                onClick={handleCreateFragmentClick}
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