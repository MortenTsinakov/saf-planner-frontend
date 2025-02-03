import { IconButton, Row, Sidebar } from 'components';
import CreateFragment from './CreateFragment';
import EditFragment2 from './EditFragment2';
import { useProject } from 'hooks';
import { MdClose } from 'react-icons/md';
import EditShortDescription from './EditShortDescription';
import EditLongDescription from './EditLongDescription';
import EditDuration from './EditDuration';
import CreateLabel from './CreateLabel';

const FragmentGridSidebar = ({...props}) => {

    const {sidePanelIsOpen, setSidePanelIsOpen, SidePanelStates, sidePanelState} = useProject();
    console.log(props.isMobile);

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
                <EditFragment2 />
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