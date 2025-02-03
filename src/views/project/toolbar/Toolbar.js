import { IconButton, Row } from 'components';
import { MdAddBox, MdArticle } from "react-icons/md";
import { useProjectStore } from 'stores';
import { possibleSidebarStates } from '../fragment-grid/fragment-grid-data/SidebarStates';

const Toolbar = ({height, showReadAllPanel, setShowReadAllPanel}) => {

    const sidebarStates = possibleSidebarStates;
    const {setSidebarState} = useProjectStore();

    const handleCreateFragmentClick = () => {
        setSidebarState({content: sidebarStates.CREATE_FRAGMENT, open: true});
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