import { Column, FilledButton, InputArea, OutlineButton, Row, Typography } from 'components';
import { useAlerts, useProject } from 'hooks';
import { useState } from 'react';

const EditShortDescription = () => {

    const {fragmentToEdit, updateFragmentShortDescription, SidePanelStates, setSidePanelState} = useProject();
    const [shortDescription, setShortDescription] = useState(fragmentToEdit.shortDescription);
    const {addAlert} = useAlerts();

    const buttonStyle = {
        minWidth: '100px',
    }

    const handleSaveClick = async () => {
        const description = shortDescription.trim()
        if (description === fragmentToEdit.shortDescription) {
            setSidePanelState(SidePanelStates.EDIT_FRAGMENT);
            return;
        }
        const updateWasSuccessful = await updateFragmentShortDescription(fragmentToEdit, description);
        if (updateWasSuccessful) {
            addAlert("Short description updated", "success");
            setSidePanelState(SidePanelStates.EDIT_FRAGMENT);
        }
    }

    const handleCancelClick = () => {
        setSidePanelState(SidePanelStates.EDIT_FRAGMENT);
    }

    return (
        <Column
                data-testid='update-short-description'
                style={{
                    gap: '3rem',
                    width: '100%',
                    padding: '5rem 3rem',
                    alignItems: 'center',
                }}
            >
                <Typography fontSize='medium'>
                    Edit short description
                </Typography>
                <InputArea
                    aria-label='update short description'
                    value={shortDescription}
                    onChange={(e) => setShortDescription(e.target.value)}
                    style={{width: 'inherit'}}
                />
                <Row
                    style={{
                        justifyContent: 'space-between',
                        width: 'inherit'
                    }}
                >
                    <OutlineButton
                        onClick={handleCancelClick}
                        style={buttonStyle}
                    >
                        Cancel
                    </OutlineButton>
                    <FilledButton
                        onClick={handleSaveClick}
                        style={buttonStyle}
                    >
                        Save
                    </FilledButton>
                </Row>
            </Column>
    );
}
 
export default EditShortDescription;