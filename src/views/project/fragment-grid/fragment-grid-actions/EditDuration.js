import { Column, FilledButton, InputField, OutlineButton, Row, Typography } from 'components';
import { useAlerts } from 'hooks';
import { useState } from 'react';
import { useProjectStore } from 'stores';
import { possibleSidebarStates } from '../fragment-grid-data/SidebarStates';

const EditDuration = () => {
    const sidebarStates = possibleSidebarStates;
    const {fragmentToEdit, updateFragmentDuration, setSidebarState} = useProjectStore();
    const [duration, setDuration] = useState(fragmentToEdit.durationInSeconds);
    const {addAlert} = useAlerts();

    const buttonStyle = {
        minWidth: '100px',
    }

    const handleSaveClick = async () => {
        if (duration === fragmentToEdit.durationInSeconds) {
            setSidebarState({content: sidebarStates.EDIT_FRAGMENT, open: true});
            return;
        }
        const updateWasSuccessful = await updateFragmentDuration(fragmentToEdit, duration);
        if (updateWasSuccessful) {
            addAlert("Duration updated", "success");
            setSidebarState({content: sidebarStates.EDIT_FRAGMENT, open: true});
        }
    }

    const handleCancelClick = () => {
        setSidebarState({content: sidebarStates.EDIT_FRAGMENT, open: true});
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