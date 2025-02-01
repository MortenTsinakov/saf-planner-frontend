import { Column, FilledButton, InputArea, Typography } from 'components';
import { useAlerts } from 'hooks';
import { useState } from 'react';

const EditProjectDescription = ({project, updateProjectDescription, setEditPanelIsOpen}) => {

    const [newDescription, setNewDescription] = useState(project.description);
    const {addAlert} = useAlerts();

    const handleUpdate = async () => {
        const description = newDescription.trim()
        if (description === project.description) {
            setEditPanelIsOpen(false);
            return;
        }
        const updateWasSuccessful = await updateProjectDescription(project.id, description);
        if (updateWasSuccessful) {
            addAlert("Project description updated", "success");
            setEditPanelIsOpen(false);
            return;
        }
    }

    return (
        <Column
            data-testid='description-update-modal'
            style={{gap: '3rem', width: '100%', textAlign: 'center'}}
        >
            <Typography fontSize='medium'>
                Edit project description
            </Typography>
            <InputArea
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
            />
            <FilledButton
                onClick={handleUpdate}
            >
                Save
            </FilledButton>
        </Column>
    );
}
 
export default EditProjectDescription;