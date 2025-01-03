import { Column, Divider, FilledButton, InputArea, InputField, Modal, OutlineButton, Row, TextButton, Typography } from 'components';
import { useAlerts } from 'hooks';
import { useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { clampNumber, formatSecondsToHMS, timeInMinsSecsToTimeInSeconds } from 'utils';

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

    const handleCloseUpdateWindow = () => {
        setProjectToUpdate(null);
        setUpdatingProject(false);
    }

    const closeUpdateWindow = () => {
        setFieldToUpdate(null);
    }

    const handleUpdateTitle = async () => {
        const updateSucceeded = await updateProjectTitle(projectToUpdate.id, newTitle);
        if (updateSucceeded) {
            setOldTitle(newTitle);
            closeUpdateWindow();
            addAlert("Project title was updated", "success");
        }
    }

    const handleUpdateDescription = async () => {
        const updateSucceeded = await updateProjectDescription(projectToUpdate.id, newDescription);
        if (updateSucceeded) {
            setOldDescrpition(newDescription);
            closeUpdateWindow();
            addAlert("Project description was updated", "success");
        }
    }

    const handleUpdateEstimatedLength = async () => {
        const estimatedLength = timeInMinsSecsToTimeInSeconds(estLenMin, estLenSec);
        const updateSuceeded = await updateProjectEstimatedLength(projectToUpdate.id, estimatedLength);
        if (updateSuceeded) {
            setOldEstLen(estimatedLength);
            closeUpdateWindow();
            addAlert("Project's estimated length was updated", "success");
        } else {

        }
    }

    const getModalButtons = (updateFunction) => {
        return (
            <Row
                style={{justifyContent: 'center', gap: '3rem'}}
            >
                <FilledButton style={{width: '100px'}} onClick={updateFunction}>Update</FilledButton>
                <OutlineButton style={{width: '100px'}} onClick={closeUpdateWindow}>Close</OutlineButton>
            </Row>
        )
    }

    const titleUpdateWindow = () => {
        return (
            <Column style={{gap: '3rem'}}>
                <InputField
                    label='Update project title'
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                />
                {getModalButtons(handleUpdateTitle)}
            </Column>
        );
    }

    const descriptionUpdateWindow = () => {
        return (
            <Column style={{gap: '3rem'}}>
                <InputArea
                    label='Update project description'
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                />
                {getModalButtons(handleUpdateDescription)}
            </Column>
        )
    }

    const estimatedLengthUpdateWindow = () => {
        return (
            <Column style={{gap: '3rem'}}>
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
                            aria-label='estimated duration'
                            type='text'
                            value={estLenMin}
                            onChange={handleEstLenMinChange}
                            style={{
                                width: '60px'
                            }}
                        />
                        <Typography>min</Typography>
                        <InputField
                            aria-label='estimated duration'
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

    const labelsUpdateWindow = () => {
        return (
            <Column>
                <Typography>Update labels</Typography>
                {getModalButtons(() => {})}
            </Column>
        )
    }

    const sharedUpdateWindow = () => {
        return (
            <Column>
                <Typography>Update shared with</Typography>
                {getModalButtons(() => {})}
            </Column>
        )
    }

    const handleEstLenMinChange = (e) => {
            if (isNaN(e.target.value) && e.target.value !== '') {
                return;
            }
            const value = Number(e.target.value);
            setEstLenMin(clampNumber(value, 0, 180));
        }

    const handleEstLenSecChange = (e) => {
        if (isNaN(e.target.value) && e.target.value !== '') {
            return;
        }
        const value = Number(e.target.value);
        setEstLenSec(clampNumber(value, 0, 59));
    }

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

    const getRowInProjectSettings = (label, data, fieldType) => {
        return(
        <Column
            style={{gap: 0}}
            onMouseOver={() => setActiveField(fieldType)}
            onMouseLeave={() => setActiveField(null)}
            onClick={() => setActiveField(fieldType)}
        >
            <Typography fontSize='small' color='label'>{label}</Typography>
            <Row style={{justifyContent: 'space-between'}}>
                    <Typography
                        style={{maxWidth: '80%'}}
                    >{data}</Typography>
                {
                    activeField === fieldType &&
                    <TextButton
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
                <Modal style={{minWidth: '250px', width: '500px'}}>
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
                style={{
                    width: 'fit-content',
                    bottom: 0,
                }}
                onClick={handleCloseUpdateWindow}
            >
                Close
            </OutlineButton>
        </Modal>
    );
}
 
export default UpdateProject;