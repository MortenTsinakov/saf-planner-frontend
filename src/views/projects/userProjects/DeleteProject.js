import { FilledButton, Modal, OutlineButton, Row, Typography } from 'components';
import { useAlerts } from 'hooks';

/**
 * Renders a confirmation modal for deleting a project.
 * If project is deleted, the hook for deleting the project is called.
 */
const DeleteProject = ({projectToDelete, setProjectToDelete, setDeletingProject, deleteProject, ...props}) => {

    const { addAlert } = useAlerts();

    const handleCancelDelete = () => {
        setProjectToDelete(null);
        setDeletingProject(false);
    }

    const handleConfirmDelete = () => {
        const deleteWasSuccessful = deleteProject(projectToDelete);
        if (deleteWasSuccessful) {
            addAlert('Project deleted', 'success');
            setDeletingProject(false);
            setProjectToDelete(null);
        }
    }

    return (
        <Modal>
            <Typography fontSize='small'> Are you sure you want to delete this project? </Typography>
            <Typography fontSize='small'>The project will be deleted permanently. </Typography>
            <Row style={{marginTop: '40px', gap: '4rem', justifyContent: 'center'}}>
                <FilledButton data-testid='delete-button' onClick={handleConfirmDelete}>Delete</FilledButton>
                <OutlineButton data-testid='cancel-button' onClick={handleCancelDelete}>Cancel</OutlineButton>
            </Row>
        </Modal>
    );
}
 
export default DeleteProject;