import { Card, Column, IconButton, Row, Typography } from 'components';
import { useState } from 'react';
import { 
    MdAccessTime,
    MdAddCircleOutline,
    MdCheck,
    MdDeleteOutline,
    MdInfoOutline,
    MdOutlineEdit,
    MdOutlineModeComment
} from 'react-icons/md';
import FragmentDetails from './FragmentDetails';
import CreateFragment from './CreateFragment';
import DeleteFragment from './DeleteFragment';
import EditFragment from './EditFragment';

const FragmentCard = (
    {
        fragment,
        createFragment,
        updateFragmentOnTimelineStatus,
        updateFragmentShortDescription,
        updateFragmentLongDescription,
        updateFragmentDuration,
        deleteFragment,
        ...props}) => 
    {

    const [displayButtons, setDisplayButtons] = useState(false);
    const iconStyle = {
        fontSize: '2.5rem',
        margin: 0,
    };

    const [showFragmentDetails, setShowFragmentDetails] = useState(false);
    const [showCreateFragmentModal, setShowCreateFragmentModal] = useState(false);
    const [showEditFragmentModal, setShowEditFragmentModal] = useState(false);
    const [showDeleteFragmentModal, setShowDeleteFragmentModal] = useState(false);

    return (
        <Card
            style={{
                width: '400px',
                maxWidth: '90vw',
                height: '200px',
                padding: '2rem',
                gap: '1rem',
                justifyContent: 'space-between'
            }}
            onMouseEnter={() => {setDisplayButtons(true)}}
            onMouseLeave={() => {setDisplayButtons(false)}}
            data-testid={'fragment-card'}
        >
            <Column
                style={{gap:'0.2rem', flex: 1}}
            >
                <Row style={{justifyContent: 'space-between'}}>
                    <Typography fontSize='extrasmall' color='label'>
                        Short description
                    </Typography>
                    {fragment.onTimeline && <MdCheck title='On timeline' data-testid={'fragment-on-timeline-marker'}/>}
                </Row>
                <Typography>
                    {fragment.shortDescription}
                </Typography>
            </Column>
            <Row
                style={{height: '2rem'}}
            >
                {
                    displayButtons &&
                    <Row
                        style={{
                            height: '2rem',
                            gap: '0.5rem',
                        }}
                        data-testid={'fragment-card-action-buttons'}
                    >
                        <IconButton onClick={() => setShowCreateFragmentModal(true)}title='Add new fragment after this one' style={iconStyle} icon={<MdAddCircleOutline />} data-testid={'create-fragment-action-button'}/>
                        <IconButton onClick={() => setShowEditFragmentModal(true)} title='Edit the fragment' style={iconStyle} icon={<MdOutlineEdit />} data-testid={'edit-fragment-action-button'}/>
                        <IconButton onClick={() => updateFragmentOnTimelineStatus(fragment, !fragment.onTimeline)}title={`${fragment.onTimeline ? 'Remove from timeline' : 'Add to timeline'}`} style={iconStyle} icon={<MdAccessTime />} data-testid={'on-timeline-action-button'}/>
                        <IconButton title='Add comment' style={iconStyle} icon={<MdOutlineModeComment />} data-testid={'add-comment-action-button'}/>
                        <IconButton onClick={() => setShowFragmentDetails(true)} title='See details' style={iconStyle} icon={<MdInfoOutline />} data-testid={'details-action-button'}/>
                        <IconButton onClick={() => setShowDeleteFragmentModal(true)}title='Delete fragment' style={iconStyle} icon={<MdDeleteOutline />} data-testid={'delete-fragment-action-button'}/>
                    </Row>
                }
            </Row>

            {showFragmentDetails &&
                <FragmentDetails
                    setShowFragmentDetails={setShowFragmentDetails}
                    fragment={fragment}
                    {...props}/>
            }
            {showCreateFragmentModal &&
                <CreateFragment
                    createFragment={createFragment}
                    setShowCreateFragmentModal={setShowCreateFragmentModal}
                    previousFragment={fragment}
                    {...props}/>
            }
            { showEditFragmentModal &&
                <EditFragment
                    fragment={fragment}
                    updateFragmentShortDescription={updateFragmentShortDescription}
                    updateFragmentLongDescription={updateFragmentLongDescription}
                    updateFragmentDuration={updateFragmentDuration}
                    setShowEditFragmentModal={setShowEditFragmentModal}
                    {...props}
                />
            }
            { showDeleteFragmentModal &&
                <DeleteFragment
                    fragment={fragment}
                    setShowDeleteFragmentModal={setShowDeleteFragmentModal}
                    deleteFragment={deleteFragment}
                    {...props}
                />
            }
        </Card>
    );
}
 
export default FragmentCard;