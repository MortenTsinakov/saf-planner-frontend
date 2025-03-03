import { Card, Column, IconButton, Row, SortableItem, Typography } from 'components';
import { useRef, useState } from 'react';
import { MdAccessTime, MdDragIndicator} from 'react-icons/md';
import useProjectStore from 'stores/useProjectStore';
import { possibleSidebarStates } from './SidebarStates';
import FragmentCardMenu from './FragmentCardMenu';
import DeleteFragment from '../fragment-grid-actions/DeleteFragment';
import AttachImage from '../attach_image/AttachImage';

const FragmentCard = (
    {
        fragment,
        isFiltered,
        ...props}) => 
    {

    const sidebarStates = possibleSidebarStates;
    const {
        updateFragmentOnTimelineStatus,
        setSidebarState,
        activeId,
        setFragmentToEdit,
    } = useProjectStore();

    const [showDeleteFragmentModal, setShowDeleteFragmentModal] = useState(false);
    const [showAttachImageModal, setShowAttachImageModal] = useState(false);
    const cardRef = useRef(null);
    const [menuState, setMenuState] = useState({visible: false, x: 0, y: 0});

    const handleContextMenu = (e) => {
        e.preventDefault();
        if (cardRef.current) {
            const cardRect = cardRef.current.getBoundingClientRect();
            setMenuState({
                visible: true,
                x: e.clientX - cardRect.left,
                y: e.clientY - cardRect.top,
            })
        }
    }

    const handleCloseMenu = () => {
        setMenuState({visible: false, x: 0, y: 0});
    }

    const handleFragmentClick = () => {
        if (menuState.visible) {
            handleCloseMenu();
        } else {
            setFragmentToEdit(fragment);
            setSidebarState({content: sidebarStates.EDIT_FRAGMENT, open: true });
        }
    }

    return (
        <SortableItem
            id={fragment.id}
            activeId={activeId}
        >
            {({ listeners, attributes }) => (
                <Card
                    {...attributes}
                    ref={cardRef}
                    style={{
                        position: 'relative',
                        width: '400px',
                        maxWidth: '90vw',
                        height: '200px',
                        padding: '2rem',
                        gap: '0.8rem',
                        justifyContent: 'space-between',
                        filter: !isFiltered && 'brightness(60%)'
                    }}
                    onContextMenu={(e) => handleContextMenu(e)}
                    onMouseLeave={handleCloseMenu}
                    data-testid={'fragment-card'}
                >
                    <Row
                        style={{height: '2rem', gap: '1rem', justifyContent: 'space-between'}}
                        data-testid='button-row'
                    >
                        <MdDragIndicator
                            {...listeners}
                            style={{
                                fontSize: '2.5rem',
                                cursor: 'move',
                                marginLeft: -5
                            }}
                            title='Drag fragment'
                        />
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
                        style={{
                            height: '100%',
                            cursor: 'pointer',
                        }}
                        onClick={handleFragmentClick}
                    >
                        <Column
                            style={{
                                gap:'0.2rem',
                                flex: 1,
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
                                    key={label.id}
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
                    </Column>
                    {menuState.visible &&
                        <FragmentCardMenu
                            fragment={fragment}
                            x={menuState.x}
                            y={menuState.y}
                            handleCloseMenu={handleCloseMenu}
                            setShowDeleteFragmentModal={setShowDeleteFragmentModal}
                            setShowAttachImageModal={setShowAttachImageModal}
                        />
                    }
                    { showDeleteFragmentModal &&
                        <DeleteFragment
                            fragment={fragment}
                            setShowDeleteFragmentModal={setShowDeleteFragmentModal}
                            {...props}
                        />
                    }
                    {
                        showAttachImageModal &&
                        <AttachImage
                            fragment={fragment}
                            setShowAttachImageModal={setShowAttachImageModal}
                            {...props}
                        />
                    }
                </Card>
            )}


        </SortableItem>
    );
}
 
export default FragmentCard;