import { ColorPicker, Column, FilledButton, InputField, OutlineButton, Row, Typography } from 'components';
import Label from 'components/ui/labels/Label';
import { useAlerts, useProject } from 'hooks';
import { useState } from 'react';
import { generateRandomColor } from 'utils';

const CreateLabel = () => {
    const [description, setDescription] = useState("");
    const [color, setColor] = useState(generateRandomColor());

    const {project, createLabel, SidePanelStates, setSidePanelState} = useProject();
    const {addAlert} = useAlerts();

    const handleDescriptionChange = (e) => {
        if (e.target.value.length > 50) {
            return;
        }
        setDescription(e.target.value);
    }

    const handleSaveLabel = async () => {
        const creationWasSuccessful = await createLabel(project, description, color);
        if (creationWasSuccessful) {
            addAlert("Label created - you can attach it to the fragment now", "success");
            setSidePanelState(SidePanelStates.EDIT_FRAGMENT);
        }
    }

    const handleCancelClick = () => {
        setSidePanelState(SidePanelStates.EDIT_FRAGMENT);
    }

    return (
        <Column
        style={{
            gap: '3rem',
            width: '100%',
            height: '100%',
            padding: '5rem 3rem',
            alignItems: 'center',
        }}
        >
            <Typography fontSize='medium'>Create new label</Typography>
            <div style={{minHeight: '75px', textAlign: 'start', alignContent: 'center'}}>
                {
                    description.length > 0 ?
                    <Label color={color}>{description}</Label> :
                    <Typography fontSize='extrasmall' color='label'>Your label will appear here once you start typing...</Typography>
                }
            </div>
            <Column style={{textAlign: 'start', width: 'inherit'}}>
                <Typography color='label'>Label text</Typography>
                <InputField
                    value={description}
                    onChange={handleDescriptionChange}
                />
            </Column>
            <Column style={{textAlign: 'start', width: 'inherit'}}>
                <Typography color='label'>Color</Typography>
                <ColorPicker
                    value={color}
                    setColorFn={setColor}
                />
            </Column>
            <Row style={{justifyContent: 'space-between', width: 'inherit'}}>
                <OutlineButton onClick={handleCancelClick}>
                    Cancel
                </OutlineButton>
                <FilledButton onClick={handleSaveLabel}>
                    Save
                </FilledButton>
            </Row>
        </Column>
    );
}
 
export default CreateLabel;