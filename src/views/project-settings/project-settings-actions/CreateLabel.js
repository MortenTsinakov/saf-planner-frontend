import { ColorPicker, Column, FilledButton, InputField, Typography } from 'components';
import Label from 'components/ui/labels/Label';
import { useAlerts } from 'hooks';
import { useState } from 'react';
import { generateRandomColor } from 'utils';

const CreateLabel = ({project, createLabel, setEditPanelIsOpen}) => {

    const [description, setDescription] = useState("");
    const [color, setColor] = useState(generateRandomColor());
    const {addAlert} = useAlerts();

    const handleDescriptionChange = (e) => {
        if (e.target.value.length > 50) {
            return;
        }
        setDescription(e.target.value);
    }

    const handleSaveLabel = async () => {
        const creationWasSuccessful = await createLabel(project.id, description, color);
        if (creationWasSuccessful) {
            addAlert("Label created", "success");
            setEditPanelIsOpen(false);
        }
    }

    return (
        <Column
            style={{gap: '3rem', width: '100%', textAlign: 'center'}}
        >
            <Typography fontSize='medium'>Create new label</Typography>
            <div style={{minHeight: '75px', textAlign: 'start', alignContent: 'center'}}>
                {
                    description.length > 0 ?
                    <Label color={color}>{description}</Label> :
                    <Typography fontSize='extrasmall' color='label'>Your label will appear here once you start typing...</Typography>
                }
            </div>
            <Column style={{textAlign: 'start'}}>
                <Typography color='label'>Label text</Typography>
                <InputField
                    value={description}
                    onChange={handleDescriptionChange}
                />
            </Column>
            <Column style={{textAlign: 'start'}}>
                <Typography color='label'>Color</Typography>
                <ColorPicker
                    value={color}
                    setColorFn={setColor}
                />
            </Column>
            <FilledButton onClick={handleSaveLabel}>
                Save
            </FilledButton>
        </Column>
    );
}
 
export default CreateLabel;