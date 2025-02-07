import { Column, Container, IconButton, InputArea, InputField, Row, SortableContextWrapper, Switch, TickBox, Typography } from 'components';
import { useState } from 'react';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import { clampNumber } from 'utils';
import { NEW_FRAGMENT_ID, NEW_FRAGMENT_PANEL_ID } from '../FragmentGridConstants';
import NewCard from '../fragment-grid-data/NewCard';
import { useProjectStore } from 'stores';
import Label from 'components/ui/labels/Label';

const CreateFragment = ({...props}) => {

    const {project, newFragments, setNewFragments} = useProjectStore();

    const projectId = props.projectId;
    const panelWidth = 420;

    const [page, setPage] = useState(1);
    const [shortDescription, setShortDescription] = useState('');
    const [longDescription, setLongDescription] = useState('');
    const [durationInSeconds, setDurationInSeconds] = useState(5);
    const [onTimeline, setOnTimeline] = useState(false);
    const [selectedLabels, setSelectedLabels] = useState([]);

    const handleDurationChange = (e) => {
        if (isNaN(e.target.value)) {
            return;
        }
        const value = Number(e.target.value);
        setDurationInSeconds(clampNumber(value, 0, 999));
    }

    const handleSelectLabel = (label) => {
        if (selectedLabels.includes(label)) {
            setSelectedLabels(prev => prev.filter(l => l !== label));
            return;
        }
        setSelectedLabels(prev => [...prev, label]);
    }

    const shortDescriptionPage = () => {
        return (
            <Column
                data-testid='create-fragment-short-description'
                style={{width: '100%'}}
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
                style={{width: '100%'}}
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
                style={{width: '100%'}}
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
                style={{width: '100%'}}
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

    const addFragmentsPage = () => {
        return (
            <Column
                data-testid='create-fragment-select-labels'
                style={{width: '100%'}}
            >
                <Column>
                    <Typography>Labels</Typography>
                    <Typography fontSize='extrasmall' color='label'>
                    Labels can mark anything you want — characters, moods, turning points —
                    and can be used later for filtering the fragments.
                    </Typography>
                </Column>
                <Column style={{marginTop: '2rem'}}>
                    {project.labels.map(label => (
                        <Row key={label.id} style={{justifyContent: 'space-between'}}>
                            <Label color={label.color}>{label.description}</Label>
                            <TickBox
                                size='30px'
                                selected={selectedLabels.includes(label)}
                                onClick={() => handleSelectLabel(label)}
                            />
                        </Row>
                    ))}
                </Column>
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
                    {newFragments.map(f => (
                        <NewCard
                            key={f.id}
                            fragment={f}
                            labels={selectedLabels}
                        />
                    ))}
                </Container>
            </Column>
        );
    }

    const handleIncrementPage = () => {
        if (page === 5) {
            setNewFragments([{
                id: NEW_FRAGMENT_ID,
                shortDescription: shortDescription,
                longDescription: longDescription,
                durationInSeconds: durationInSeconds,
                onTimeline: onTimeline,
                position: null,
                projectId: projectId,
                labels: [...selectedLabels],
            }])
            setPage(6);
        }
        else {
            setPage(Math.min(5, page + 1))
        }
    }

    const handleDecrementPage = () => {
        setPage(Math.max(1, page - 1))
    }
    return (
        <SortableContextWrapper
            id={NEW_FRAGMENT_PANEL_ID}
            items={newFragments}
        >
        {({setNodeRef}) =>         
            <Column
                ref={setNodeRef}
                style={{
                    padding: '5rem 3rem',
                    height: '100%',
                    width: '100%',
                    overflow: 'auto',
                    alignItems: 'center',
                }}
                data-testid='create-fragment-panel'
            >
                {
                    page < 6 ?
                    <Typography fontSize='medium'>Create new fragment</Typography>
                    :
                    <Typography fontSize='medium'>Your fragment is ready!</Typography>
                }
                <Column style={{justifyContent: 'space-between', flex: 1}}>
                    {page === 1 && shortDescriptionPage()}
                    {page === 2 && longDescriptionPage()}
                    {page === 3 && durationPage()}
                    {page === 4 && addToTimelinePage()}
                    {page === 5 && addFragmentsPage()}
                    {page === 6 && finalizeFragmentCreationPage()}
                </Column>
                
                <Row style={{justifyContent: 'space-between', width: '100%'}}>
                    {page > 1 ? <IconButton icon={<MdArrowBack />} onClick={handleDecrementPage} data-testid='backward-button'/> : <div />}
                    {page < 6 ? <IconButton icon={<MdArrowForward />} onClick={handleIncrementPage} data-testid='forward-button'/> : <div />}
                </Row>
            </Column>
        }
        </SortableContextWrapper>
    );
}
 
export default CreateFragment;