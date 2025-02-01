import { ColorPicker, Column, FilledButton, InputField, Loading, Typography } from 'components';
import Label from 'components/ui/labels/Label';
import { useAlerts } from 'hooks';
import { useEffect, useState } from 'react';

const EditLabel = ({updateLabel, labelToEdit, setEditPanelIsOpen}) => {

    const [description, setDescription] = useState(null);
    const [color, setColor] = useState(null);
    const {addAlert} = useAlerts();

    useEffect(() => {
        const initialize = () => {
            setDescription(labelToEdit.description);
            setColor(labelToEdit.color);
        }
        initialize();
    }, [labelToEdit]);

    const handleDescriptionChange = (e) => {
        if (e.target.value.length < 0 || e.target.value.length > 50) {
            return;
        }
        setDescription(e.target.value);
    }

    const handleUpdateLabel = async() => {
        if (description === labelToEdit.description && color === labelToEdit.color) {
            setEditPanelIsOpen(false);
            return;
        }
        const updateWasSuccessful = await updateLabel(labelToEdit.id, description, color);
        if (updateWasSuccessful) {
            addAlert("Label updated", "success");
            setEditPanelIsOpen(false);
            return;
        }
    }

    if (description === null || color === null) {
        return <Loading />
    }

    return (
        <Column
            style={{gap: '3rem', width: '100%', textAlign: 'center'}}
        >
            <Typography fontSize='medium'>Edit label</Typography>
            <Label color={color}>{description}</Label>
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
            <FilledButton onClick={handleUpdateLabel}>
                Save
            </FilledButton>
        </Column>
    );
}
 
export default EditLabel;