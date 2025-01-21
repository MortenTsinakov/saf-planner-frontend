import { Column,
         Container,
         SortableContextWrapper,
         IconButton,
         InputArea,
         InputField,
         Row,
         Switch,
         Typography } from 'components';
import { useEffect, useState } from 'react';
import { MdArrowBack, MdArrowForward, MdClose } from 'react-icons/md';
import { clampNumber } from 'utils';
import NewCard from './NewCard';
import { NEW_FRAGMENT_ID, NEW_FRAGMENT_PANEL_ID } from 'constants/Constants';

const CreateFragment = ({activeId, newCards, setNewCards, createFragment, fragmentGridHeight, setShowCreateFragmentPanel, ...props}) => {

    const projectId = props.projectId;
    const panelWidth = 420;

    const [page, setPage] = useState(1);
    const [shortDescription, setShortDescription] = useState('');
    const [longDescription, setLongDescription] = useState('');
    const [durationInSeconds, setDurationInSeconds] = useState(5);
    const [onTimeline, setOnTimeline] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e) => {
            switch (e.key) {
                case "ArrowLeft":
                    handleDecrementPage();
                    break;
                case "ArrowRight":
                    handleIncrementPage();
                    break;
                default:
                    break;
            }
        }
        
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    });

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
                style={{width: panelWidth}}
            >
                <Column>
                    <Typography>Short description</Typography>
                    <Typography fontSize='extrasmall' color='label'>
                        Enter a quick summary of your idea to make it easy to recognize later on.
                    </Typography>
                </Column>
                <InputArea
                    placeholder='Short description for the fragment...'
                    value={shortDescription}
                    onChange={(e) => setShortDescription(e.target.value)}
                    style={{height: 200}}
                />
            </Column>
        );
    }

    const longDescriptionPage = () => {
        return (
            <Column
                data-testid='create-fragment-long-description'
                style={{width: panelWidth}}
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
                    style={{height: 600}}
                />
                
            </Column>
        );
    }

    const durationPage = () => {
        return (
            <Column
                data-testid='create-fragment-duration'
                style={{width: panelWidth}}
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
                style={{width: panelWidth}}
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
                <Typography color='label'>The fragment will appear on the timeline</Typography>
                :
                <Typography color='label'>The fragment will not appear on the timeline</Typography>
                }
            </Column>
        );
    }

    const finalizeFragmentCreationPage = () => {
        return (
            <Column
                style={{width: panelWidth}}
            >
                <Typography
                    color='label'
                >
                    To save it, simply drag the fragment card
                    above the fragment grid and drop it in the
                    position you want it to be saved.
                </Typography>  
                <Container
                    style={{
                        height: 220,
                        borderRadius: 10,
                        border: '1px dashed var(--primary-color)'
                    }}
                >
                    {newCards.map(f => (
                        <NewCard
                            key={f.id}
                            activeId={activeId}
                            fragment={f}
                        />
                    ))}
                </Container>
            </Column>
        );
    }

    const handleIncrementPage = () => {
        if (page === 4) {
            setNewCards([{
                id: NEW_FRAGMENT_ID,
                shortDescription: shortDescription,
                longDescription: longDescription,
                durationInSeconds: durationInSeconds,
                onTimeline: onTimeline,
                position: null,
                projectId: projectId
            }])
            setPage(5);
        }
        else {
            setPage(Math.min(4, page + 1))
        }
    }

    const handleDecrementPage = () => {
        setPage(Math.max(1, page - 1))
    }
    return (
        <SortableContextWrapper
            id={NEW_FRAGMENT_PANEL_ID}
            items={newCards}
        >
        {({setNodeRef}) =>         
            <Column
                ref={setNodeRef}
                style={{
                    width: 'fit-content',
                    padding: '5rem 2rem',
                    height: fragmentGridHeight,
                    borderLeft: '1px solid var(--main-gray)',
                    alignItems: 'center',
                    gap: '3rem',
                }}
            >
                <Row
                    style={{width: '100%'}}
                >
                    <IconButton
                        icon={<MdClose />}
                        onClick={() => setShowCreateFragmentPanel(false)}
                    />
                </Row>
                {
                    page < 5 ?
                    <Typography fontSize='medium'>Create new fragment</Typography>
                    :
                    <Typography fontSize='medium'>Your fragment is ready!</Typography>
                }
                <Column style={{justifyContent: 'space-between', flex: 1}}>
                    {page === 1 && shortDescriptionPage()}
                    {page === 2 && longDescriptionPage()}
                    {page === 3 && durationPage()}
                    {page === 4 && addToTimelinePage()}
                    {page === 5 && finalizeFragmentCreationPage()}
                </Column>
                
                <Row style={{justifyContent: 'space-between', width: '100%'}}>
                    {page > 1 ? <IconButton icon={<MdArrowBack />} onClick={handleDecrementPage} data-testid='backward-button'/> : <div />}
                    {page < 5 ? <IconButton icon={<MdArrowForward />} onClick={handleIncrementPage} data-testid='forward-button'/> : <div />}
                </Row>
            </Column>
        }
        </SortableContextWrapper>
    );
}
 
export default CreateFragment;