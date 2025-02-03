import { Column, FilledButton, InputField, OutlineButton, Row, Typography } from 'components';
import { useAlerts, useProject } from 'hooks';
import { useState } from 'react';

const EditDuration = () => {
    const {fragmentToEdit, updateFragmentDuration, SidePanelStates, setSidePanelState} = useProject();
    const [duration, setDuration] = useState(fragmentToEdit.durationInSeconds);
    const {addAlert} = useAlerts();

    const buttonStyle = {
        minWidth: '100px',
    }

    const handleSaveClick = async () => {
        if (duration === fragmentToEdit.durationInSeconds) {
            setSidePanelState(SidePanelStates.EDIT_FRAGMENT);
            return;
        }
        const updateWasSuccessful = await updateFragmentDuration(fragmentToEdit, duration);
        if (updateWasSuccessful) {
            addAlert("Duration updated", "success");
            setSidePanelState(SidePanelStates.EDIT_FRAGMENT);
        }
    }

    const handleCancelClick = () => {
        setSidePanelState(SidePanelStates.EDIT_FRAGMENT);
    }

    return (
        <Column
                data-testid='update-duration'
                style={{
                    gap: '3rem',
                    width: '100%',
                    padding: '5rem 3rem',
                    alignItems: 'center',
                }}
            >
                <Typography fontSize='medium'>Edit duration</Typography>
                <Row style={{alignItems: 'end'}}>
                    <InputField
                        aria-label='update duration'
                        style={{
                            width: '60px',
                        }}
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                    />
                    <Typography>seconds</Typography>
                </Row>
                <Row style={{width: 'inherit', justifyContent: 'space-between'}}>
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
 
export default EditDuration;