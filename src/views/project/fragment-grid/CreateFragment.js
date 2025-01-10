import { Column, IconButton, InputArea, InputField, Modal, OutlineButton, Row, Typography } from 'components';
import { useState } from 'react';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import { clampNumber } from 'utils';

const CreateFragment = ({previousFragment, setShowCreateFragmentModal, ...props}) => {

    // const position = previousFragment.position + 1;
    // const projectId = props.projectId;

    const [page, setPage] = useState(1);
    const [shortDescription, setShortDescription] = useState('');
    const [longDescription, setLongDescription] = useState('');
    const [durationInSeconds, setDurationInSeconds] = useState(5);
    const [onTimeline, setOnTimeline] = useState(false);

    const handleDurationChange = (e) => {
        if (isNaN(e.target.value)) {
            return;
        }
        const value = Number(e.target.value);
        setDurationInSeconds(clampNumber(value, 0, 999));
    }

    const shortDescriptionPage = () => {
        return (
            <Column>
                <Column>
                    <Typography>Short description</Typography>
                    <Typography fontSize='extrasmall' color='label'>
                        Write a short description for your fragment. It's used to give
                        an overview of your idea without having to read through a long 
                        piece of text.
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
            <Column>
                <Column>
                    <Typography>Long description</Typography>
                    <Typography fontSize='extrasmall' color='label'>
                        Write a long description for your fragment. This description
                        can be as detailed as you wish and should describe your idea
                        as precisely as possible.
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
            <Column>
                <Column>
                    <Typography>Duration</Typography>
                    <Typography fontSize='extrasmall' color='label'>
                        Set a duration for your fragment. It will determine 
                        how long the fragment will last on the timeline.
                        NB! If duration is not defined (0), it will be set to
                        5 seconds by default.
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
            <Column>
                <Column>
                    <Typography>On timeline</Typography>
                    <Typography fontSize='extrasmall' color='label'>
                        Decide whether you want the new fragment to appear
                        on the timeline or not.
                    </Typography>
                </Column>
                <div>TODO: Create a selection switch </div>
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
                    {page > 1 ? <IconButton icon={<MdArrowBack />} onClick={() => setPage(Math.max(1, page - 1))} /> : <div />}
                    {page < 4 ? <IconButton icon={<MdArrowForward />} onClick={() => setPage(Math.min(4, page + 1))} /> : <div />}
                </Row>

                <Row style={{gap: '3rem', justifyContent: 'space-between'}}>
                    <OutlineButton
                        onClick={() => setShowCreateFragmentModal(false)}
                        style={{width: '100px'}}
                        >
                        Cancel
                    </OutlineButton>
                        {
                        page === 4 ?
                        <OutlineButton style={{width: '100px'}}>
                            Save
                        </OutlineButton>
                        :
                        <div />
                        }
                </Row>
            </Column>
        </Modal>
    );
}
 
export default CreateFragment;