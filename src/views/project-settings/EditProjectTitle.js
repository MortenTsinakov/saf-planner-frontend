import { Column, FilledButton, InputField, Typography } from 'components';
import { useAlerts } from 'hooks';
import { useState } from 'react';

const EditProjectTitle = ({project, updateProjectTitle, setEditPanelIsOpen}) => {

    const [newTitle, setNewTitle] = useState(project.title);
    const {addAlert} = useAlerts();

    const handleUpdate = async () => {
        const title = newTitle.trim()
        if (title.length === 0) {
            addAlert("Project title can't be blank", "error");
            return;
        }
        if (title === project.title) {
            setEditPanelIsOpen(false);
            return;
        }
        const updateWasSuccessful = await updateProjectTitle(project.id, title);
        if (updateWasSuccessful) {
            addAlert("Project title updated", "success");
            setEditPanelIsOpen(false);
            return;
        }
    }

    return (
        <Column style={{width: '100%', gap: '3rem', textAlign: 'center'}}>
            <Typography fontSize='medium'>
                Edit project title
            </Typography>
            <InputField
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
            />
            <FilledButton
                onClick={handleUpdate}
            >
                Save
            </FilledButton>
        </Column>
    );
}
 
export default EditProjectTitle;