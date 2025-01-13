import { Card, Column, FilledButton, InputArea, InputField, OutlineButton, Row, Typography } from 'components';
import { useAlerts } from 'hooks';
import { useState } from 'react';
import { clampNumber, timeInMinsSecsToTimeInSeconds } from 'utils';

/**
 * Renders an input form for creating a new project.
 * Call the necessary hook when a project is created.
 */
const CreateProject = ({createProject, setCreatingProject, props}) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [estLenMin, setEstLenMin] = useState(0);
    const [estLenSec, setEstLenSec] = useState(0);
    const { addAlert } = useAlerts(); 

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    /**
     * Change the value inside the input field
     * for minutes in estimated duration
     */
    const handleEstLenMinChange = (e) => {
        if (isNaN(e.target.value) && e.target.value !== '') {
            return;
        }
        const value = Number(e.target.value);
        setEstLenMin(clampNumber(value, 0, 180));
    }

    /**
     * Change the value inside the input field
     * for seconds in estimated duration
     */
    const handleEstLenSecChange = (e) => {
        if (isNaN(e.target.value) && e.target.value !== '') {
            return;
        }
        const value = Number(e.target.value);
        setEstLenSec(clampNumber(value, 0, 59));
    }

    const handleSaveClick = async () => {
        const formattedTitle = title.trim();
        const formattedDescription = description.trim();
        const estimatedLengthInSeconds = timeInMinsSecsToTimeInSeconds(estLenMin, estLenSec);
        const saveWasSuccessful = await createProject(
            formattedTitle,
            formattedDescription,
            estimatedLengthInSeconds
        );
        if (saveWasSuccessful) {
            handleCancelClick();
            addAlert('Project created', 'success');
        }
    }

    const handleCancelClick = () => {
        setCreatingProject(false);
    }

    return (
        <Card style={{gap: '1rem', maxWidth: '90vw', width: '750px'}}>
            <Column
                style={{
                    gap: '3rem'
                }}
            >
                <Typography fontSize='medium'>Creating new project</Typography>
                <InputField
                    aria-label='project title'
                    type='text'
                    label='Title *'
                    placeholder='Your project title...'
                    autoComplete='off'
                    value={title}
                    onChange={handleTitleChange}
                />
                <InputArea
                    aria-label='project description'
                    label='Description'
                    placeholder='Your project description...'
                    autoComplete='off'
                    value={description}
                    onChange={handleDescriptionChange}
                />
                <Column
                    style={{
                        gap: 0,
                    }}
                >
                    <Typography>Estimated duration</Typography>
                    <Row
                        style={{
                            alignItems: 'end'
                        }}
                    >
                        <InputField
                            aria-label='estimated duration minutes'
                            type='text'
                            value={estLenMin}
                            onChange={handleEstLenMinChange}
                            style={{
                                width: '60px'
                            }}
                        />
                        <Typography>min</Typography>
                        <InputField
                            aria-label='estimated duration seconds'
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
                <Row
                    style={{
                        marginTop: '3rem',
                        gap: '2rem',
                        justifyContent: 'space-between'
                    }}
                >
                    <OutlineButton
                        data-testid='cancel-button'
                        style={{width: '100px'}}
                        onClick={handleCancelClick}
                    >
                        Cancel
                    </OutlineButton>
                    <FilledButton
                        data-testid='save-button'
                        style={{width: '100px'}}
                        onClick={handleSaveClick}
                    >
                        Save
                    </FilledButton>
                </Row>
            </Column>
        </Card>
    );
}
 
export default CreateProject;