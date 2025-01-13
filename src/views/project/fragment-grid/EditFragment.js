import { Column, Divider, FilledButton, InputArea, InputField, Modal, OutlineButton, Row, TextButton, Typography } from 'components';
import { useAlerts } from 'hooks';
import { useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { clampNumber } from 'utils';

const EditFragment = (
    {
        fragment,
        setShowEditFragmentModal,
        updateFragmentShortDescription,
        updateFragmentLongDescription,
        updateFragmentDuration,
        ...props
    }) => {

    const Fields = Object.freeze({
        SHORT_DESCRIPTION: 0,
        LONG_DESCRIPTION: 1,
        DURATION: 2,
        LABELS: 3,
    });

    const [activeField, setActiveField] = useState(null);
    const [fieldToUpdate, setFieldToUpdate] = useState(null);
    const { addAlert } = useAlerts();

    const [oldShortDescription, setOldShortDescription] = useState(fragment.shortDescription);
    const [oldLongDescription, setOldLongDescription] = useState(fragment.longDescription);
    const [oldDurationInSeconds, setOldDurationInSeconds] = useState(fragment.durationInSeconds);

    const [shortDescription, setShortDescription] = useState(fragment.shortDescription);
    const [longDescription, setLongDescription] = useState(fragment.longDescription);
    const [durationInSeconds, setDurationInSeconds] = useState(fragment.durationInSeconds);

    const handleUpdateShortDescription = async () => {
        const value = shortDescription.trim();
        if (value === oldShortDescription) {
            addAlert('Nothing to update', 'info')
            return;
        }
        const updateWasSuccessful = await updateFragmentShortDescription(fragment, value);
        if (updateWasSuccessful) {
            setOldShortDescription(value);
            addAlert('Short description was updated', 'success');
            setFieldToUpdate(null);
        }
    }

    const handleUpdateLongDescription = async () => {
        const value = longDescription.trim();
        if (value === oldLongDescription) {
            addAlert('Nothing to update', 'info')
            return;
        }
        const updateWasSuccessful = await updateFragmentLongDescription(fragment, value);
        if (updateWasSuccessful) {
            setOldLongDescription(value);
            addAlert('Long description was updated', 'success');
            setFieldToUpdate(null);
        }
    }

    const handleUpdateDuration = async () => {
        const value = durationInSeconds;
        if (value === oldDurationInSeconds) {
            addAlert('Nothing to update', 'info')
            return;
        }
        if (value <= 0) {
            addAlert("Duration value has to be a positive integer", "error");
            return;
        }
        const updateWasSuccessful = await updateFragmentDuration(fragment, value);
        if (updateWasSuccessful) {
            setOldDurationInSeconds(value);
            addAlert('Fragment duration was updated', 'success');
            setFieldToUpdate(null);
        }
    }

    /**
     * Close the entire editin window
     */
    const closeEditFragmentModal = () => {
        setFieldToUpdate(null);
        setShowEditFragmentModal(false);
    }

    /**
     * Close the editing modal for a particular field.
     */
    const closeFieldEditModal = () => {
        resetFields()
        setFieldToUpdate(null);
    }

    /**
     * Reset all edited fields to the previous
     * version
     */
    const resetFields = () => {
        setShortDescription(oldShortDescription);
        setLongDescription(oldLongDescription);
        setDurationInSeconds(oldDurationInSeconds);
    }

    /**
     * Change the field value for short description
     */
    const handleEditShortDescription = (newValue) => {
        setShortDescription(newValue);
    }

    /**
     * Change the field value for long description
     */
    const handleEditLongDescription = (newValue) => {
        setLongDescription(newValue);
    }

    /**
     * Change the field value for duration.
     */
    const handleEditDuration = (newValue) => {
        if (isNaN(newValue)) {
            return;
        }
        const value = Number(newValue);
        setDurationInSeconds(clampNumber(value, 0, 999));
    }

     /**
     * Renders 'save' and 'cancel' buttons on the bottom of the modal
     * for updating a specific field.
     */
     const getModalButtons = (updateFunction) => {
        return (
            <Row
                style={{justifyContent: 'space-between', gap: '3rem'}}
            >
                <OutlineButton data-testid='cancel-button' style={{width: '100px'}} onClick={closeFieldEditModal}>Close</OutlineButton>
                <FilledButton data-testid='save-button' style={{width: '100px'}} onClick={updateFunction}>Update</FilledButton>
            </Row>
        )
    }

    /**
     * Render a field with a label and the corresponding data.
     * Each field has it's own 'edit' button that opens a
     * window to edit that particular field.
     */
    const getRowInEditFragment = (label, data, fieldType) => {
        return(
            <Column
                aria-label={`fragment ${label.toLowerCase()}`}
                style={{gap: 0}}
                onMouseOver={() => setActiveField(fieldType)}
                onMouseLeave={() => setActiveField(null)}
                onClick={() => setActiveField(fieldType)}
            >
                <Typography fontSize='small' color='label'>{label}</Typography>
                <Row style={{justifyContent: 'space-between'}}>
                        <Typography
                            style={{maxWidth: '80%'}}
                        >
                            {data ? data : '-'}
                        </Typography>
                    {
                        activeField === fieldType &&
                        <TextButton
                            data-testid={`edit-${label.toLowerCase()}-button`}
                            style={{display: 'flex', gap:'0.8rem', height: 'fit-content'}}
                            onClick={() => setFieldToUpdate(fieldType)}
                        >
                            <MdEdit />
                            <Typography>Edit</Typography>
                        </TextButton>
                    }
                </Row>
            </Column>
        );
    }

    /**
     * Editing window for the short description
     */
    const shortDescriptionEditWindow = () => {
        return (
            <Column
                data-testid='short-description-update-modal'
                style={{gap: '3rem'}}
            >
                <InputArea
                    aria-label='update short description'
                    label='Update short description'
                    value={shortDescription}
                    onChange={(e) => handleEditShortDescription(e.target.value)}
                />
                {getModalButtons(handleUpdateShortDescription)}
            </Column>
        );
    }

    /**
     * Editing window for the long description
     */
    const longDescriptionEditWindow = () => {
        return (
            <Column
                data-testid='long-description-update-modal'
                style={{gap: '3rem'}}
            >
                <InputArea
                    aria-label='update long description'
                    label='Update long description'
                    value={longDescription}
                    onChange={(e) => handleEditLongDescription(e.target.value)}
                />
                {getModalButtons(handleUpdateLongDescription)}
            </Column>
        );
    }

    /**
     * Editing window for duration
     */
    const durationEditWindow = () => {
        return (
            <Column
                data-testid='duration-update-modal'
                style={{gap: '3rem'}}
            >
                <Row style={{alignItems: 'end'}}>
                    <InputField
                        style={{
                            width: '60px'
                        }}
                        value={durationInSeconds}
                        onChange={(e) => handleEditDuration(e.target.value)}
                    />
                    <Typography>seconds</Typography>
                </Row>
                {getModalButtons(handleUpdateDuration)}
            </Column>
        );
    }

    /**
     * TODO: Editing window for labels
     */
    const labelsEditWindow = () => {
        return (
            <Column>
                TODO: Update labels
                {getModalButtons(() => {})}
            </Column>
        );
    }

    /**
     * Choose which editing window to open
     * according to which field has been selected
     * for editing.
     */
    const getCorrectEditingWindow = () => {
        switch (fieldToUpdate) {
            case (Fields.SHORT_DESCRIPTION):
                return shortDescriptionEditWindow()
            case (Fields.LONG_DESCRIPTION):
                return longDescriptionEditWindow()
            case (Fields.DURATION):
                return durationEditWindow()
            case (Fields.LABELS):
                return labelsEditWindow()
            default:
                return "ERROR";
        }
    }

    return (
        <Modal
            style={{
                minWidth: '350px',
                width: '750px',
                maxWidth: '90vw',

                minHeight: '50vh',
                maxHeight: '90vh',

                gap: '2rem',
                justifyContent: 'space-between'
            }}
        >
            {
                fieldToUpdate !== null
                && 
                <Modal
                    data-testid='update-modal'
                    style={{minWidth: '250px', width: '500px'}}
                >
                    {getCorrectEditingWindow()}
                </Modal>
            }
            <Column>
                <Typography fontSize='medium'>Edit fragment</Typography>
                <Divider style={{backgroundColor: 'var(--primary-color)', height: '1.4px', marginBottom: '3rem'}}/>
            </Column>
            <Column
                style={{overflow: 'scroll', paddingBottom: '2rem'}}
            >
                {getRowInEditFragment('Short description', oldShortDescription, Fields.SHORT_DESCRIPTION)}
                {getRowInEditFragment('Long description', oldLongDescription, Fields.LONG_DESCRIPTION)}
                {getRowInEditFragment('Duration', `${oldDurationInSeconds} seconds`, Fields.DURATION)}
                {getRowInEditFragment('Labels', 'TODO: Display labels created for the project and let user to add/update/delete them', Fields.LABELS)}
            </Column>
            <OutlineButton
                data-testid='close-button'
                style={{
                    width: 'fit-content',
                    bottom: 0,
                }}
                onClick={closeEditFragmentModal}
            >
                Close
            </OutlineButton>
        </Modal>
    );
}
 
export default EditFragment;