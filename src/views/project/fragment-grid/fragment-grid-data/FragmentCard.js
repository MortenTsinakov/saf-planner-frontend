import { Card, Column, IconButton, Row, SortableItem, Typography } from 'components';
import { useState } from 'react';
import { MdAccessTime, MdMoreHoriz, MdDelete, MdInfo, MdEditSquare, MdModeComment } from 'react-icons/md';
import FragmentDetails from './FragmentDetails';
import DeleteFragment from '../fragment-grid-actions/DeleteFragment';
import useProjectStore from 'stores/useProjectStore';
import { possibleSidebarStates } from './SidebarStates';

const FragmentCard = (
    {
        fragment,
        ...props}) => 
    {

    const sidebarStates = possibleSidebarStates;
    const {
        updateFragmentOnTimelineStatus,
        setSidebarState,
        activeId,
        setFragmentToEdit,
    } = useProjectStore();
    const [displayButtons, setDisplayButtons] = useState(false);
    const iconStyle = {
        fontSize: '2.2rem',
        margin: 0,
        padding: 0,
        alignItems: 'center',
        transition: displayButtons
                    ? 'transform 0.3s ease, opacity 0.3s ease'
                    : 'transform 0.3s ease, opacity 0.3s ease, visibility 0s linear 0.3s'
    };

    const [showFragmentDetails, setShowFragmentDetails] = useState(false);
    const [showDeleteFragmentModal, setShowDeleteFragmentModal] = useState(false);

    const handleEditFragmentClick = () => {
        setFragmentToEdit(fragment);
        setSidebarState({content: sidebarStates.EDIT_FRAGMENT, open: true });
    }

    return (
        <SortableItem
            id={fragment.id}
            activeId={activeId}
        >
            {({ listeners, attributes }) => (
                <Card
                    {...attributes}
                    style={{
                        width: '400px',
                        maxWidth: '90vw',
                        height: '200px',
                        padding: '2rem',
                        gap: '0.8rem',
                        justifyContent: 'space-between'
                    }}
                    data-testid={'fragment-card'}
                >
                    <Row
                        style={{height: '2rem', gap: '1rem', justifyContent: 'space-between'}}
                        onMouseLeave={() => setDisplayButtons(false)}
                        data-testid='button-row'
                    >
                        <Row>
                            <IconButton
                                icon={<MdMoreHoriz />}
                                style={{
                                    ...iconStyle,
                                    transform: displayButtons ? 'rotate(90deg)' : 'rotate(0)'
                                }}
                                onClick={() => setDisplayButtons((prev) => !prev)}
                                data-testid='show-action-icons-button'
                            />
                            <Row
                                style={{
                                    height: '2rem',
                                    gap: '1.5rem',
                                }}
                                data-testid={'fragment-card-action-buttons'}
                            >
    
                                <IconButton 
                                    // onClick={() => setShowEditFragmentModal(true)}
                                    onClick={handleEditFragmentClick}
                                    title='Edit the fragment'
                                    style={{
                                        ...iconStyle,
                                        opacity: displayButtons ? 1 : 0,
                                        visibility: displayButtons ? 'visible' : 'hidden',
                                    }}
                                    icon={<MdEditSquare />}
                                    data-testid={'edit-fragment-action-button'}
                                />
                                <IconButton
                                    title='Add comment'
                                    style={{
                                        ...iconStyle,
                                        transform: displayButtons ? 'translate(0)' : 'translate(-25px)',
                                        opacity: displayButtons ? 1 : 0,
                                        visibility: displayButtons ? 'visible' : 'hidden',
                                    }}
                                    icon={<MdModeComment />}
                                    data-testid={'add-comment-action-button'}
                                />
                                <IconButton
                                    onClick={() => setShowFragmentDetails(true)}
                                    title='See details'
                                    style={{
                                        ...iconStyle,
                                        transform: displayButtons ? 'translate(0)' : 'translate(-50px)',
                                        opacity: displayButtons ? 1 : 0,
                                        visibility: displayButtons ? 'visible' : 'hidden',
                                    }}
                                    icon={<MdInfo />}
                                    data-testid={'details-action-button'}
                                />
                                <IconButton
                                    onClick={() => setShowDeleteFragmentModal(true)}
                                    title='Delete fragment'
                                    style={{
                                        ...iconStyle,
                                        transform: displayButtons ? 'translate(0)' : 'translate(-75px)',
                                        opacity: displayButtons ? 1 : 0,
                                        visibility: displayButtons ? 'visible' : 'hidden',
                                    }}
                                    icon={<MdDelete />}
                                    data-testid={'delete-fragment-action-button'}
                                />
                            </Row>
                        </Row>
                        <IconButton
                            style={{
                                fontSize: '2.5rem',
                                margin: 0,
                                padding: 0,
                                alignItems: 'center',
                                color: fragment.onTimeline ? 'var(--text-color)' : 'var(--main-gray)'
                            }}
                            icon={<MdAccessTime />}
                            title={fragment.onTimeline ? 'Remove from timeline' : 'Add to timeline'}
                            onClick={() => updateFragmentOnTimelineStatus(fragment, !fragment.onTimeline)}
                            data-testid='on-timeline-button'
                        />
                    </Row>
                    <Column
                        {...listeners}
                        style={{
                            gap:'0.2rem',
                            flex: 1,
                            cursor: 'move',
                        }}
                    >
                        <Row style={{justifyContent: 'space-between'}}>
                            <Typography fontSize='extrasmall' color='label'>
                                Short description
                            </Typography>
                        </Row>
                        <Typography
                            style={{
                                display: '-webkit-box',
                                WebkitLineClamp: '3',
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                            }}
                        >
                            {fragment.shortDescription}
                        </Typography>
                    </Column>
                    <Row style={{overflow: 'hidden'}}>
                        {fragment.labels.map(label => (
                            <div
                                style={{
                                    height: 15,
                                    width: 15,
                                    backgroundColor: label.color,
                                    borderRadius: '50%'
                                }}
                                title={label.description}
                            />
                        ))}
                    </Row>

                    {showFragmentDetails &&
                        <FragmentDetails
                            setShowFragmentDetails={setShowFragmentDetails}
                            fragment={fragment}
                            {...props}/>
                    }
                    { showDeleteFragmentModal &&
                        <DeleteFragment
                            fragment={fragment}
                            setShowDeleteFragmentModal={setShowDeleteFragmentModal}
                            {...props}
                        />
                    }
                </Card>
            )}


        </SortableItem>
    );
}
 
export default FragmentCard;