import { Column, Container, IconButton, InputArea, InputField, Row, SortableContextWrapper, TextButton, TickBox, Typography } from 'components';
import { useState } from 'react';
import { MdAdd, MdArrowBack, MdArrowForward } from 'react-icons/md';
import { clampNumber } from 'utils';
import { NEW_FRAGMENT_ID, NEW_FRAGMENT_PANEL_ID } from '../FragmentGridConstants';
import NewCard from '../fragment-grid-data/NewCard';
import { useProjectStore } from 'stores';
import Label from 'components/ui/labels/Label';
import CreateLabel from './CreateLabel';

const CreateFragment = ({...props}) => {

    const project = useProjectStore((state) => state.project);
    const newFragments = useProjectStore((state) => state.newFragments);
    const setNewFragments = useProjectStore((state) => state.setNewFragments);

    const panelWidth = 420;

    const [page, setPage] = useState(1);
    const [shortDescription, setShortDescription] = useState('');
    const [longDescription, setLongDescription] = useState('');
    const [durationInSeconds, setDurationInSeconds] = useState(5);
    const [selectedLabels, setSelectedLabels] = useState([]);
    const [createNewLabel, setCreateNewLabel] = useState(false);

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

    const createNewLabelPage = () => {
        return (
            <CreateLabel
                exitFn={() => setCreateNewLabel(false)}
                currentLabels={selectedLabels}
                setCurrentLabels={setSelectedLabels}
            />
        );
    }

    const addLabelsPage = () => {
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
                <TextButton onClick={() => setCreateNewLabel(true)}>
                    <MdAdd />
                    <Typography>
                        Create new label
                    </Typography>
                </TextButton>
            </Column>
        );
    }

    const finalizeFragmentCreationPage = () => {
        return (
            <Column
                style={{width: props.isMobile ? '100%' : panelWidth, alignItems: 'center'}}
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
                        width: props.isMobile ? 390 : '100%',
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
        if (page === 4) {
            setNewFragments([{
                id: NEW_FRAGMENT_ID,
                shortDescription: shortDescription,
                longDescription: longDescription,
                durationInSeconds: durationInSeconds,
                onTimeline: true,
                position: null,
                projectId: project.id,
                labels: [...selectedLabels],
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
                    !createNewLabel &&
                    <Row style={{justifyContent: 'space-between', width: '100%'}}>
                        {page > 1 ? <IconButton icon={<MdArrowBack />} onClick={handleDecrementPage} data-testid='backward-button'/> : <div />}
                        {page < 5 ? <IconButton icon={<MdArrowForward />} onClick={handleIncrementPage} data-testid='forward-button'/> : <div />}
                    </Row>
                }
                {
                    page < 5 ?
                    (
                        createNewLabel ? 
                        <Typography fontSize='medium'>Create new label</Typography>
                        :
                        <Typography fontSize='medium'>Create new fragment</Typography>
                    )
                    :
                    <Typography fontSize='medium'>Your fragment is ready!</Typography>
                }
                <Column style={{justifyContent: 'space-between', flex: 1}}>
                    {page === 1 && shortDescriptionPage()}
                    {page === 2 && longDescriptionPage()}
                    {page === 3 && durationPage()}
                    {page === 4 && (createNewLabel ? createNewLabelPage() : addLabelsPage())}
                    {page === 5 && finalizeFragmentCreationPage()}
                </Column>
                
            </Column>
        }
        </SortableContextWrapper>
    );
}
 
export default CreateFragment;