import { Column, FilledButton, InputArea, OutlineButton, Row, Typography } from 'components';
import { useAlerts } from 'hooks';
import { useState } from 'react';
import { useProjectStore } from 'stores';
import { possibleSidebarStates } from '../fragment-grid-data/SidebarStates';

const EditShortDescription = () => {

    const sidebarStates = possibleSidebarStates;
    const {fragmentToEdit, updateFragmentShortDescription, setSidebarState} = useProjectStore();
    const [shortDescription, setShortDescription] = useState(fragmentToEdit.shortDescription);
    const {addAlert} = useAlerts();

    const buttonStyle = {
        minWidth: '100px',
    }

    const handleSaveClick = async () => {
        const description = shortDescription.trim()
        if (description === fragmentToEdit.shortDescription) {
            setSidebarState({content: sidebarStates.EDIT_FRAGMENT, open: true});
            return;
        }
        const updateWasSuccessful = await updateFragmentShortDescription(fragmentToEdit, description);
        if (updateWasSuccessful) {
            addAlert("Short description updated", "success");
            setSidebarState({content: sidebarStates.EDIT_FRAGMENT, open: true});
        }
    }

    const handleCancelClick = () => {
        setSidebarState({content: sidebarStates.EDIT_FRAGMENT, open: true});
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