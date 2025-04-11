import { ColorPicker, Column, FilledButton, InputField, OutlineButton, Row, Typography } from 'components';
import Label from 'components/ui/labels/Label';
import { useAlerts } from 'hooks';
import { useState } from 'react';
import { useProjectStore } from 'stores';
import { generateRandomColor } from 'utils';

const CreateLabel = ({exitFn, currentLabels=null, setCurrentLabels=null}) => {
    const [description, setDescription] = useState("");
    const [color, setColor] = useState(generateRandomColor());

    const project = useProjectStore((state) => state.project);
    const createLabel = useProjectStore((state) => state.createLabel);
    const {addAlert} = useAlerts();

    const handleDescriptionChange = (e) => {
        if (e.target.value.length > 50) {
            return;
        }
        setDescription(e.target.value);
    }

    const handleSaveClick = async () => {
        const createdLabel = await createLabel(project, description, color);
        if (createdLabel !== null) {
            addAlert("Label created", "success");
            if (currentLabels !== null && setCurrentLabels !== null) {
                setCurrentLabels([...currentLabels, createdLabel]);
            }
            exitFn();
        }
    }

    const handleCancelClick = () => {
        exitFn();
    }

    return (
        <Column
            style={{
                gap: '3rem',
                width: '100%',
            }}
        >
            <Typography color='label'>
                When saved, the new label will be added to the project so that you can
                use it in the other fragments as well.
            </Typography>
            <div style={{textAlign: 'start', alignContent: 'center'}}>
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
            <Column>
                <Typography color='label'>Color</Typography>
                <ColorPicker
                    value={color}
                    setColorFn={setColor}
                />
            </Column>
            <Row style={{justifyContent: 'space-between'}}>
                <OutlineButton onClick={handleCancelClick}>
                    Cancel
                </OutlineButton>
                <FilledButton onClick={handleSaveClick}>
                    Save
                </FilledButton>
            </Row>
        </Column>
    );
}
 
export default CreateLabel;