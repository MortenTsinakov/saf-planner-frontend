import { Column, FilledButton, InputArea, OutlineButton, Row, Typography } from 'components';
import { useAlerts } from 'hooks';
import { useState } from 'react';
import { useProjectStore } from 'stores';
import { possibleSidebarStates } from '../fragment-grid-data/SidebarStates';

const EditLongDescription = () => {
    const sidebarStates = possibleSidebarStates;
    const {fragmentToEdit, updateFragmentLongDescription, setSidebarState} = useProjectStore();
    const [longDescription, setLongDescription] = useState(fragmentToEdit.longDescription);
    const {addAlert} = useAlerts();

    const buttonStyle = {
        minWidth: '100px',
    }

    const handleSaveClick = async () => {
        const description = longDescription.trim()
        if (description === fragmentToEdit.longDescription) {
            setSidebarState({content: sidebarStates.EDIT_FRAGMENT, open: true})
            return;
        }
        const updateWasSuccessful = await updateFragmentLongDescription(fragmentToEdit, description);
        if (updateWasSuccessful) {
            addAlert("Long description updated", "success");
            setSidebarState({content: sidebarStates.EDIT_FRAGMENT, open: true});
        }
    }

    const handleCancelClick = () => {
        setSidebarState({content: sidebarStates.EDIT_FRAGMENT, open: true});
    }

    return (
        <Column
                data-testid='update-long-description'
                style={{
                    gap: '3rem',
                    width: '100%',
                    height: '100%',
                    padding: '5rem 3rem',
                    alignItems: 'center',
                }}
            >
                <Typography fontSize='medium'>Edit long description</Typography>
                <InputArea
                    aria-label='update long description'
                    value={longDescription}
                    onChange={(e) => setLongDescription(e.target.value)}
                    style={{width: 'inherit', height: '100%'}}
                />
                <Row
                    style={{
                        justifyContent: 'space-between',
                        width: 'inherit',
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
 
export default EditLongDescription;