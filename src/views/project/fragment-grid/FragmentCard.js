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

const FragmentCard = ({fragment, updateFragmentOnTimelineStatus, ...props}) => {

    const [displayButtons, setDisplayButtons] = useState(false);
    const iconStyle = {
        fontSize: '2.5rem',
        margin: 0,
    };

    const [showFragmentDetails, setShowFragmentDetails] = useState(false);
    const [showCreateFragmentModal, setShowCreateFragmentModal] = useState(false);

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
        >
            <Column
                style={{gap:'0.2rem', flex: 1}}
            >
                <Row style={{justifyContent: 'space-between'}}>
                    <Typography fontSize='extrasmall' color='label'>
                        Short description
                    </Typography>
                    {fragment.onTimeline && <MdCheck title='On timeline'/>}
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
                    >
                        <IconButton onClick={() => setShowCreateFragmentModal(true)}title='Add new fragment after this one' style={iconStyle} icon={<MdAddCircleOutline />} />
                        <IconButton title='Edit the fragment' style={iconStyle} icon={<MdOutlineEdit />} />
                        <IconButton onClick={() => updateFragmentOnTimelineStatus(fragment.id, !fragment.onTimeline)}title={`${fragment.onTimeline ? 'Remove from timeline' : 'Add to timeline'}`} style={iconStyle} icon={<MdAccessTime />} />
                        <IconButton title='Add comment' style={iconStyle} icon={<MdOutlineModeComment />} />
                        <IconButton onClick={() => setShowFragmentDetails(true)} title='See details' style={iconStyle} icon={<MdInfoOutline />} />
                        <IconButton title='Delete fragment' style={iconStyle} icon={<MdDeleteOutline />} />
                    </Row>
                }
            </Row>

            {showFragmentDetails && <FragmentDetails setShowFragmentDetails={setShowFragmentDetails} fragment={fragment} {...props}/>}
            {showCreateFragmentModal && <CreateFragment setShowCreateFragmentModal={setShowCreateFragmentModal} previousFragment={fragment} {...props}/>}
        </Card>
    );
}
 
export default FragmentCard;