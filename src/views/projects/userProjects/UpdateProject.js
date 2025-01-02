import { Column, Divider, FilledButton, InputArea, InputField, Modal, OutlineButton, Row, TextButton, Typography } from 'components';
import { useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { clampNumber, formatSecondsToHMS } from 'utils';

const UpdateProject = ({projectToUpdate, setProjectToUpdate, setUpdatingProject, updateProject}) => {

    const Fields = Object.freeze({
        TITLE: 0,
        DESCRIPTION: 1,
        ESTIMATED_LENGTH: 2,
        LABELS: 3,
        SHARED: 4,
    });

    const [activeField, setActiveField] = useState(null);
    const [fieldToUpdate, setFieldToUpdate] = useState(null);

    const [newTitle, setNewTitle] = useState(projectToUpdate.title);
    const [newDescription, setNewDescription] = useState(projectToUpdate.description);
    const [estLenMin, setEstLenMin] = useState(Math.floor(projectToUpdate.estimatedLengthInSeconds / 60));
    const [estLenSec, setEstLenSec] = useState(projectToUpdate.estimatedLengthInSeconds - (60 * Math.floor(projectToUpdate.estimatedLengthInSeconds / 60)));

    const handleCloseUpdateWindow = () => {
        setProjectToUpdate(null);
        setUpdatingProject(false);
    }

    const titleUpdateWindow = () => {
        return (
            <InputField
                label='Update project title'
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
            />
        );
    }

    const descriptionUpdateWindow = () => {
        return (
            <InputArea
                label='Update project description'
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
            />
        )
    }

    const estimatedLengthUpdateWindow = () => {
        return (
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
        );
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
                return 'Labels'
            case (Fields.SHARED):
                return 'Shared'
            default:
                return 'Error';
        }
    }

    const getProjectField = (label, data, fieldType) => {
        return(
        <Column
            style={{gap: 0}}
            onMouseOver={() => setActiveField(fieldType)}
            onMouseLeave={() => setActiveField(null)}
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
                <Modal style={{gap: '3rem', minWidth: '250px', width: '500px'}}>
                    {getCorrectUpdatingWindow()}
                    <Row
                        style={{justifyContent: 'center', gap: '3rem'}}
                    >
                        <FilledButton style={{width: '100px'}}>Update</FilledButton>
                        <OutlineButton style={{width: '100px'}} onClick={() => setFieldToUpdate(null)}>Close</OutlineButton>
                    </Row>
                </Modal>
            }
            <Column
                style={{overflow: 'scroll'}}
            >
                <Typography fontSize='medium'>Project settings</Typography>
                <Divider style={{backgroundColor: 'var(--primary-color)', marginBottom: '3rem'}}/>
                {getProjectField('Title', projectToUpdate.title, Fields.TITLE)}
                {getProjectField('Description', projectToUpdate.description, Fields.DESCRIPTION)}
                {getProjectField('Estimated length', formatSecondsToHMS(projectToUpdate.estimatedLengthInSeconds), Fields.ESTIMATED_LENGTH)}
                {getProjectField('Labels', 'TODO: Display labels created for the project and let user to add/update/delete them', Fields.LABELS)}
                {getProjectField('Shared with', 'TODO: Display users the project is shared with and let user add/delete them', Fields.SHARED)}
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