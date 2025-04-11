import { Column, Row, TextButton, Typography } from "components";
import { MdDelete, MdEdit, MdImage, MdModeComment } from "react-icons/md";
import { useProjectStore } from "stores";
import { possibleSidebarStates } from "./SidebarStates";
const FragmentCardMenu = ({fragment, x, y, handleCloseMenu, setShowDeleteFragmentModal, setShowAttachImageModal, ...props}) => {

    // const {setFragmentToEdit, setSidebarState} = useProjectStore();
    const setFragmentToEdit = useProjectStore((state) => state.setFragmentToEdit);
    const setSidebarState = useProjectStore((state) => state.setSidebarState);
    const sidebarStates = possibleSidebarStates;

    const handleEditFragmentClick = () => {
        handleCloseMenu();
        setFragmentToEdit(fragment);
        setSidebarState({content: sidebarStates.EDIT_FRAGMENT, open: true });
    }

    const handleDeleteFragmentClick = () => {
        setShowDeleteFragmentModal(true);
    }

    const handleAttachImageClick = () => {
        handleCloseMenu();
        setShowAttachImageModal(true);
    }


    return (
        <Column
            style={{
                position: 'absolute',
                left: x,
                top: y,
                backgroundColor: 'var(--background-color-low)',
                padding: '2rem',
                borderRadius: '10px',
                border: '1px solid var(--main-gray)',
                minWidth: '250px',
                zIndex: 1,
            }}
            onMouseLeave={handleCloseMenu}
        >
            <TextButton
                onClick={handleEditFragmentClick}
            >
                <Row style={{justifyContent: 'space-between'}}>
                    <MdEdit />
                    <Typography>Edit fragment</Typography>
                </Row>
            </TextButton>
            <TextButton
                onClick={handleAttachImageClick}
            >
                <Row style={{justifyContent: 'space-between'}}>
                    <MdImage />
                    <Typography>Attach image</Typography>
                </Row>
            </TextButton>
            <TextButton>
                <Row style={{justifyContent: 'space-between'}}>
                    <MdModeComment />
                    <Typography>Read comments</Typography>
                </Row>
            </TextButton>
            <TextButton
                onClick={handleDeleteFragmentClick}
            >
                <Row style={{justifyContent: 'space-between'}}>
                    <MdDelete />
                    <Typography>Delete fragment</Typography>
                </Row>
            </TextButton>
        </Column>
    );
}
 
export default FragmentCardMenu;