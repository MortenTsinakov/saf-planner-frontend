import { Column, FilledButton, Modal, OutlineButton, Row, Typography } from 'components';
import { useAlerts } from 'hooks';
import { useProjectStore } from 'stores';

const DeleteFragment = (
    {
        fragment,
        setShowDeleteFragmentModal}) => 
    {

    const deleteFragment = useProjectStore((state) => state.deleteFragment);
    const { addAlert } = useAlerts();

    const handleDeleteClick = async () => {
        const deleteWasSuccessful = await deleteFragment(fragment);
        if (deleteWasSuccessful) {
            addAlert('Fragment deleted', 'success');
            setShowDeleteFragmentModal(false);
        } 
    }

    return (
        <Modal>
            <Column
                style={{gap: '4rem'}}
            >
                <Typography>
                    Are you sure you want to delete the fragment? <br/>
                    It will be deleted permanently.
                </Typography>
                <Row style={{justifyContent: 'space-between'}}>
                    <OutlineButton
                        onClick={() => setShowDeleteFragmentModal(false)}
                        data-testid='cancel-button'
                    >
                        Cancel
                    </OutlineButton>
                    <FilledButton
                        color='error'
                        onClick={handleDeleteClick}
                        data-testid='delete-button'
                    >
                        Delete
                    </FilledButton>
                </Row>
            </Column>
        </Modal>
    );
}
 
export default DeleteFragment;