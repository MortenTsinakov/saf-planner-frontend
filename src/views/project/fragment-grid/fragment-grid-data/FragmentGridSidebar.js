import { IconButton, Row, Sidebar } from 'components';
import { useProject } from 'hooks';
import { MdClose } from 'react-icons/md';
import CreateFragment from '../fragment-grid-actions/CreateFragment';
import EditFragment from '../fragment-grid-actions/EditFragment';
import EditShortDescription from '../fragment-grid-actions/EditShortDescription';
import EditLongDescription from '../fragment-grid-actions/EditLongDescription';
import EditDuration from '../fragment-grid-actions/EditDuration';
import CreateLabel from '../fragment-grid-actions/CreateLabel';

const FragmentGridSidebar = ({...props}) => {

    const {sidePanelIsOpen, setSidePanelIsOpen, SidePanelStates, sidePanelState} = useProject();

    return (
        <Sidebar
            isOpen={sidePanelIsOpen}
            fromRight={true}
            isMobile={props.isMobile}
            style={{justifyContent: 'start'}}
        >
            <Row style={{width: '100%', padding: '2rem'}}>
                <IconButton
                    icon={<MdClose />}
                    onClick={() => setSidePanelIsOpen(false)}
                />
            </Row>
            {
                sidePanelState === SidePanelStates.CREATE_FRAGMENT &&
                <CreateFragment />
            }
            {
                sidePanelState === SidePanelStates.EDIT_FRAGMENT &&
                <EditFragment />
            }
            {
                sidePanelState === SidePanelStates.EDIT_SHORT_DESCRIPTION &&
                <EditShortDescription />
            }
            {
                sidePanelState === SidePanelStates.EDIT_LONG_DESCRIPTION &&
                <EditLongDescription />
            }
            {
                sidePanelState === SidePanelStates.EDIT_DURATION &&
                <EditDuration />
            }
            {
                sidePanelState === SidePanelStates.CREATE_LABEL &&
                <CreateLabel />
            }
        </Sidebar>
    );
}

export default FragmentGridSidebar;