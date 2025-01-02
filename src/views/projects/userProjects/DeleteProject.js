import { FilledButton, Modal, OutlineButton, Row, Typography } from 'components';
import { useAlerts } from 'hooks';

const DeleteProject = ({projectToDelete, setProjectToDelete, setDeleteModalIsOpen, deleteProject, ...props}) => {

    const { addAlert } = useAlerts();

    const handleCancelDelete = () => {
        setProjectToDelete(null);
        setDeleteModalIsOpen(false);
    }

    const confirmDelete = () => {
        const deleteWasSuccessful = deleteProject(projectToDelete);
        if (deleteWasSuccessful) {
            addAlert('Project deleted', 'success');
        }
        setDeleteModalIsOpen(false);
        setProjectToDelete(null);
    }

    return (
        <Modal>
            <Typography fontSize='small'> Are you sure you want to delete this project? </Typography>
            <Typography fontSize='small'>The project will be deleted permanently. </Typography>
            <Row style={{marginTop: '40px', gap: '4rem', justifyContent: 'center'}}>
                <FilledButton onClick={confirmDelete}>Delete</FilledButton>
                <OutlineButton onClick={handleCancelDelete}>Cancel</OutlineButton>
            </Row>
        </Modal>
    );
}
 
export default DeleteProject;