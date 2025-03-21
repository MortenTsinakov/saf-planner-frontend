import { Column, FilledButton, Modal, OutlineButton, Row, Typography } from "components";

const StopSharingProject = ({project, user, stopSharingProject, setUserToStopSharingWith}) => {

    const handleCancelClick = () => {
        setUserToStopSharingWith(null);
    }

    const handleStopSharingClick = () => {
        stopSharingProject(project.id, user.id);
        setUserToStopSharingWith(null);
    }

    return (
        <Modal>
            <Column style={{maxWidth: 500, gap: '3rem'}}>
                <Typography>
                    Are you sure you want to stop sharing the project
                    with {user.name}?
                </Typography>
                <Row style={{justifyContent: 'space-between'}}>
                    <OutlineButton
                        onClick={handleCancelClick}
                    >
                        Cancel
                    </OutlineButton>
                    <FilledButton
                        color='error'
                        onClick={handleStopSharingClick}
                    >
                        Stop sharing
                    </FilledButton>
                </Row>
            </Column>
        </Modal>
    );
}
 
export default StopSharingProject;