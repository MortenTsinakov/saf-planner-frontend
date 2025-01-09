import { Column, Divider, FilledButton, InputArea, InputField, Modal, OutlineButton, Row, TextButton, Typography } from 'components';
import { useAlerts } from 'hooks';
import { useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { clampNumber, formatSecondsToHMS, timeInMinsSecsToTimeInSeconds } from 'utils';

/**
 * Renders a modal with project information and necessary
 * buttons for updating project information.
 * Calls necessary hooks when some field is updated.
 */
const UpdateProject = ({
    projectToUpdate,
    setProjectToUpdate,
    setUpdatingProject,
    updateProjectTitle,
    updateProjectDescription,
    updateProjectEstimatedLength,
}) => {

    const Fields = Object.freeze({
        TITLE: 0,
        DESCRIPTION: 1,
        ESTIMATED_LENGTH: 2,
        LABELS: 3,
        SHARED: 4,
    });

    const [activeField, setActiveField] = useState(null);
    const [fieldToUpdate, setFieldToUpdate] = useState(null);

    const [oldTitle, setOldTitle] = useState(projectToUpdate.title);
    const [oldDescription, setOldDescrpition] = useState(projectToUpdate.description || "-");
    const [oldEstLen, setOldEstLen] = useState(projectToUpdate.estimatedLengthInSeconds);

    const [newTitle, setNewTitle] = useState(projectToUpdate.title);
    const [newDescription, setNewDescription] = useState(projectToUpdate.description);
    const [estLenMin, setEstLenMin] = useState(Math.floor(projectToUpdate.estimatedLengthInSeconds / 60));
    const [estLenSec, setEstLenSec] = useState(projectToUpdate.estimatedLengthInSeconds - (60 * Math.floor(projectToUpdate.estimatedLengthInSeconds / 60)));

    const { addAlert } = useAlerts();

    // Closes the modal that displays project information
    const closeEntireUpdateModal = () => {
        setProjectToUpdate(null);
        setUpdatingProject(false);
    }

    // Closes the modal for updating a specific field
    const closeFieldUpdateModal = () => {
        setFieldToUpdate(null);
    }

    const handleUpdateTitle = async () => {
        const updateSucceeded = await updateProjectTitle(projectToUpdate.id, newTitle);
        if (updateSucceeded) {
            setOldTitle(newTitle);
            closeFieldUpdateModal();
            addAlert("Project title was updated", "success");
        }
    }

    const handleUpdateDescription = async () => {
        const updateSucceeded = await updateProjectDescription(projectToUpdate.id, newDescription);
        if (updateSucceeded) {
            setOldDescrpition(newDescription);
            closeFieldUpdateModal();
            addAlert("Project description was updated", "success");
        }
    }

    const handleUpdateEstimatedLength = async () => {
        const estimatedLength = timeInMinsSecsToTimeInSeconds(estLenMin, estLenSec);
        const updateSuceeded = await updateProjectEstimatedLength(projectToUpdate.id, estimatedLength);
        if (updateSuceeded) {
            setOldEstLen(estimatedLength);
            closeFieldUpdateModal();
            addAlert("Project's estimated length was updated", "success");
        } else {

        }
    }

    /**
     * Renders 'save' and 'cancel' buttons on the bottom of the modal
     * for updating a specific field.
     */
    const getModalButtons = (updateFunction) => {
        return (
            <Row
                style={{justifyContent: 'center', gap: '3rem'}}
            >
                <FilledButton data-testid='save-button' style={{width: '100px'}} onClick={updateFunction}>Update</FilledButton>
                <OutlineButton data-testid='cancel-button' style={{width: '100px'}} onClick={closeFieldUpdateModal}>Close</OutlineButton>
            </Row>
        )
    }

    /**
     * Renders necessary input field inside an update modal
     * for updating the project title
     */
    const titleUpdateWindow = () => {
        return (
            <Column
                data-testid='title-update-modal'
                style={{gap: '3rem'}}
            >
                <InputField
                    aria-label='update title'
                    label='Update project title'
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                />
                {getModalButtons(handleUpdateTitle)}
            </Column>
        );
    }

    /**
     * Renders necessary input area inside an update modal
     * for updating the project description
     */
    const descriptionUpdateWindow = () => {
        return (
            <Column
                data-testid='description-update-modal'
                style={{gap: '3rem'}}
            >
                <InputArea
                    aria-label='update description'
                    label='Update project description'
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                />
                {getModalButtons(handleUpdateDescription)}
            </Column>
        )
    }

    /**
     * Renders necessary input fields inside an update modal
     * for updating the project's estimated length
     */
    const estimatedLengthUpdateWindow = () => {
        return (
            <Column
                data-testid='estimated-length-update-modal'
                style={{gap: '3rem'}}
            >
                <Column
                    style={{
                        gap: 0,
                    }}
                >
                    <Typography
                        style={{textAlign: 'center'}}
                    >
                        Update estimated duration
                    </Typography>
                    <Row
                        style={{
                            alignItems: 'end',
                            justifyContent: 'center',
                        }}
                    >
                        <InputField
                            aria-label='update estimated duration minutes'
                            type='text'
                            value={estLenMin}
                            onChange={handleEstLenMinChange}
                            style={{
                                width: '60px'
                            }}
                        />
                        <Typography>min</Typography>
                        <InputField
                            aria-label='update estimated duration seconds'
                            type='text'
                            value={estLenSec}
                            onChange={handleEstLenSecChange}
                            style={{
                                width: '60px'
                            }}
                        />
                        <Typography>sec</Typography>
                    </Row>
                </Column>
                {getModalButtons(handleUpdateEstimatedLength)}
            </Column>
        );
    }

    /**
     * TODO: implement updating labels
     * Temporary placeholder for updating labels.
     */
    const labelsUpdateWindow = () => {
        return (
            <Column
                data-testid='label-update-modal'
            >
                <Typography>Update labels</Typography>
                {getModalButtons(() => {})}
            </Column>
        )
    }

    /**
     * TODO: implement updating users who the project has been shared with
     * Temporary placeholder for updating 'shared with'.
     */
    const sharedUpdateWindow = () => {
        return (
            <Column
                data-testid='shared-with-update-modal'
            >
                <Typography>Update shared with</Typography>
                {getModalButtons(() => {})}
            </Column>
        )
    }

    /**
     * Change the value of the minutes input on
     * estimated duration update modal
     */
    const handleEstLenMinChange = (e) => {
            if (isNaN(e.target.value) && e.target.value !== '') {
                return;
            }
            const value = Number(e.target.value);
            setEstLenMin(clampNumber(value, 0, 180));
        }

        /**
     * Change the value of the seconds input on
     * estimated duration update modal
     */
    const handleEstLenSecChange = (e) => {
        if (isNaN(e.target.value) && e.target.value !== '') {
            return;
        }
        const value = Number(e.target.value);
        setEstLenSec(clampNumber(value, 0, 59));
    }

    /**
     * Choose which inputs to render depending on
     * which field the user has chosen to update
     */
    const getCorrectUpdatingWindow = () => {
        switch (fieldToUpdate) {
            case Fields.TITLE:
                return titleUpdateWindow()
            case (Fields.DESCRIPTION):
                return descriptionUpdateWindow()
            case (Fields.ESTIMATED_LENGTH):
                return estimatedLengthUpdateWindow()
            case (Fields.LABELS):
                return labelsUpdateWindow()
            case (Fields.SHARED):
                return sharedUpdateWindow()
            default:
                return "ERROR";
        }
    }

    /**
     * Render the label and data for each field in the
     * project information/settings modal
     */
    const getRowInProjectSettings = (label, data, fieldType) => {
        return(
        <Column
            aria-label={`project ${label.toLowerCase()}`}
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
                        {data}
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

    return (
        <Modal
            style={{
                minWidth: '350px',
                width: '750px',
                maxWidth: '90vw',

                minHeight: '90vh',
                height: '90vh',
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
                    {getCorrectUpdatingWindow()}
                </Modal>
            }
            <Column
                style={{overflow: 'scroll'}}
            >
                <Typography fontSize='medium'>Project settings</Typography>
                <Divider style={{backgroundColor: 'var(--primary-color)', marginBottom: '3rem'}}/>
                {getRowInProjectSettings('Title', oldTitle, Fields.TITLE)}
                {getRowInProjectSettings('Description', oldDescription, Fields.DESCRIPTION)}
                {getRowInProjectSettings('Estimated length', formatSecondsToHMS(oldEstLen), Fields.ESTIMATED_LENGTH)}
                {getRowInProjectSettings('Labels', 'TODO: Display labels created for the project and let user to add/update/delete them', Fields.LABELS)}
                {getRowInProjectSettings('Shared with', 'TODO: Display users the project is shared with and let user add/delete them', Fields.SHARED)}
            </Column>
            <OutlineButton
                data-testid='close-button'
                style={{
                    width: 'fit-content',
                    bottom: 0,
                }}
                onClick={closeEntireUpdateModal}
            >
                Close
            </OutlineButton>
        </Modal>
    );
}
 
export default UpdateProject;