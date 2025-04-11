import { IconButton, Row, Sidebar } from 'components';
import { MdClose } from 'react-icons/md';
import CreateFragment from '../fragment-grid-actions/CreateFragment';
import EditFragment from '../fragment-grid-actions/EditFragment';
import EditShortDescription from '../fragment-grid-actions/EditShortDescription';
import EditLongDescription from '../fragment-grid-actions/EditLongDescription';
import EditDuration from '../fragment-grid-actions/EditDuration';
import CreateLabel from '../fragment-grid-actions/CreateLabel';
import { possibleSidebarStates } from './SidebarStates';
import { useProjectStore } from 'stores';

const FragmentGridSidebar = ({...props}) => {

    const sidebarStates = possibleSidebarStates;

    const sidebarState = useProjectStore((state) => state.sidebarState);
    const setSidebarState = useProjectStore((state) => state.setSidebarState);

    return (
        <Sidebar
            isOpen={sidebarState.open}
            fromRight={true}
            isMobile={props.isMobile}
            style={{justifyContent: 'start'}}
        >
            <Row style={{width: '100%', padding: '2rem'}}>
                <IconButton
                    icon={<MdClose />}
                    onClick={() => setSidebarState({...sidebarState, open: false})}
                />
            </Row>
            {
                sidebarState.content === sidebarStates.CREATE_FRAGMENT &&
                <CreateFragment {...props} />
            }
            {
                sidebarState.content === sidebarStates.EDIT_FRAGMENT &&
                <EditFragment {...props} />
            }
            {
                sidebarState.content === sidebarStates.EDIT_SHORT_DESCRIPTION &&
                <EditShortDescription {...props} />
            }
            {
                sidebarState.content === sidebarStates.EDIT_LONG_DESCRIPTION &&
                <EditLongDescription {...props} />
            }
            {
                sidebarState.content === sidebarStates.EDIT_DURATION &&
                <EditDuration {...props} />
            }
            {
                sidebarState.content === sidebarStates.CREATE_LABEL &&
                <CreateLabel exitFn={() => setSidebarState({content: sidebarStates.EDIT_FRAGMENT, open: true})} {...props}/>
            }
        </Sidebar>
    );
}

export default FragmentGridSidebar;