import { Column, FilledButton, Modal, OutlineButton, Row, Typography } from 'components';
import { useAlerts } from 'hooks';

const DeleteLabel = ({deleteLabel, labelToDelete, setLabelToDelete}) => {

    const {addAlert} = useAlerts();

    const handleDeleteLabel = async () => {
        const deletionWasSuccessful = deleteLabel(labelToDelete.id);
        if (deletionWasSuccessful) {
            addAlert("Label deleted", "success");
            setLabelToDelete(null);
        }
    }

    return (
        <Modal style={{maxWidth: '500px'}}>
            <Column style={{gap: '2rem'}}>
                <Typography>
                    Are you sure you want to delete this label?
                </Typography>
                <Typography color='label'>
                    Deleting this label will remove it from the whole
                    project. All fragments currently using this label
                    will lose it permanently.
                </Typography>
                <Row style={{justifyContent: 'space-between'}}>
                    <OutlineButton onClick={() => setLabelToDelete(null)}>
                        Cancel
                    </OutlineButton>
                    <FilledButton color='error' onClick={handleDeleteLabel}>
                        Delete
                    </FilledButton>
                </Row>
            </Column>
        </Modal>
    );
}
 
export default DeleteLabel;