import { Column, FilledButton, IconButton, InputArea, InputField, Modal, OutlineButton, Row, Switch, Typography } from 'components';
import { useAlerts } from 'hooks';
import { useState } from 'react';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import { clampNumber } from 'utils';

const CreateFragment = ({createFragment, previousFragment, setShowCreateFragmentModal, ...props}) => {

    const position = previousFragment.position + 1;
    const projectId = props.projectId;

    const [page, setPage] = useState(1);
    const [shortDescription, setShortDescription] = useState('');
    const [longDescription, setLongDescription] = useState('');
    const [durationInSeconds, setDurationInSeconds] = useState(5);
    const [onTimeline, setOnTimeline] = useState(false);

    const { addAlert } = useAlerts();

    const handleSaveClick = async () => {
        const creationWasSuccessful = await createFragment(
            shortDescription.trim(),
            longDescription.trim(),
            durationInSeconds <= 0 ? 5 : durationInSeconds,
            onTimeline,
            position,
            projectId
        );
        if (creationWasSuccessful) {
            addAlert("Fragment created", "success");
            setShowCreateFragmentModal(false);
        }
    }

    const handleDurationChange = (e) => {
        if (isNaN(e.target.value)) {
            return;
        }
        const value = Number(e.target.value);
        setDurationInSeconds(clampNumber(value, 0, 999));
    }

    const shortDescriptionPage = () => {
        return (
            <Column
                data-testid='create-fragment-short-description'
            >
                <Column>
                    <Typography>Short description</Typography>
                    <Typography fontSize='extrasmall' color='label'>
                        Enter a quick summary of your idea to make it easy to recognize.
                    </Typography>
                </Column>
                <InputArea
                    placeholder='Short description for the fragment...'
                    value={shortDescription}
                    onChange={(e) => setShortDescription(e.target.value)}
                />
            </Column>
        );
    }

    const longDescriptionPage = () => {
        return (
            <Column
                data-testid='create-fragment-long-description'
            >
                <Column>
                    <Typography>Long description</Typography>
                    <Typography fontSize='extrasmall' color='label'>
                        Write a detailed explanation of your idea, including all the important elements.
                    </Typography>
                </Column>
                <InputArea
                    placeholder='Long description for the fragment...'
                    value={longDescription}
                    onChange={(e) => setLongDescription(e.target.value)}
                />
                
            </Column>
        );
    }

    const durationPage = () => {
        return (
            <Column
                data-testid='create-fragment-duration'
            >
                <Column>
                    <Typography>Duration</Typography>
                    <Typography fontSize='extrasmall' color='label'>
                        Specify how long this fragment should last on the timeline.
                        If not specified, a default duration of 5 seconds will be used.
                    </Typography>
                </Column>
                <Row style={{alignItems: 'end'}}>
                    <InputField
                        style={{
                            width: '60px'
                        }}
                        value={durationInSeconds}
                        onChange={(e) => handleDurationChange(e)}
                    />
                    <Typography>seconds</Typography>
                </Row>
            </Column>
        );
    }

    const addToTimelinePage = () => {
        return (
            <Column
                data-testid='create-fragment-timeline-status'
            >
                <Column>
                    <Typography>On timeline</Typography>
                    <Typography fontSize='extrasmall' color='label'>
                        Decide if this fragment should be shown on the timeline or kept as a draft.
                    </Typography>
                </Column>
                <Switch
                    style={{marginTop: '2rem', marginBottom: '2rem'}}
                    selected={onTimeline}
                    onClick={() => setOnTimeline(!onTimeline)}
                    data-testid='on-timeline-toggle'
                />
                {
                onTimeline 
                ?
                <Typography color='label'>The scene will appear on the timeline</Typography>
                :
                <Typography color='label'>The scene will not appear on the timeline</Typography>
                }
            </Column>
        );
    }

    return (
        <Modal
            style={{
                maxWidth: '75vw',
                width: '500px',
                minHeight: '650px',
            }}
            data-testid='create-fragment-modal'
        >
            <Column
                style={{gap: '3rem', flex:1}}
            >
                <Typography fontSize='medium'>Create new fragment</Typography>
                <Column style={{justifyContent: 'space-between', flex: 1}}>
                    {page === 1 && shortDescriptionPage()}
                    {page === 2 && longDescriptionPage()}
                    {page === 3 && durationPage()}
                    {page === 4 && addToTimelinePage()}
                </Column>
                
                <Row style={{justifyContent: 'space-between'}}>
                    {page > 1 ? <IconButton icon={<MdArrowBack />} onClick={() => setPage(Math.max(1, page - 1))} data-testid='backward-button'/> : <div />}
                    {page < 4 ? <IconButton icon={<MdArrowForward />} onClick={() => setPage(Math.min(4, page + 1))} data-testid='forward-button'/> : <div />}
                </Row>

                <Row style={{gap: '3rem', justifyContent: 'space-between'}}>
                    <OutlineButton
                        onClick={() => setShowCreateFragmentModal(false)}
                        style={{width: '100px'}}
                        data-testid='create-fragment-cancel-button'
                    >
                        Cancel
                    </OutlineButton>
                        {
                        page === 4 ?
                        <FilledButton
                            onClick={handleSaveClick}
                            style={{width: '100px'}}
                            data-testid='create-fragment-save-button'
                        >
                            Save
                        </FilledButton>
                        :
                        <div />
                        }
                </Row>
            </Column>
        </Modal>
    );
}
 
export default CreateFragment;