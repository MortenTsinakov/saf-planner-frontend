import { Column, Container, IconButton, Loading, Sidebar } from 'components';
import { useAlerts, useProjectSettings } from 'hooks';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProjectSettingsInfoPanel from './project-settings-data/ProjectSettingsInfoPanel';
import { MdClose } from 'react-icons/md';
import EditProjectTitle from './project-settings-actions/EditProjectTitle';
import EditProjectDescription from './project-settings-actions/EditProjectDescription';
import EditProjectEstimatedLength from './project-settings-actions/EditProjectEstimatedLength';
import DeleteLabel from './project-settings-actions/DeleteLabel';
import CreateLabel from './project-settings-actions/CreateLabel';
import EditLabel from './project-settings-actions/EditLabel';
import StopSharingProject from './project-settings-actions/StopSharingProject';

const ProjectSettings = ({...props}) => {

    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const projectId = searchParams.get('projectId');

    const {
        project,
        fetchProject,
        updateProjectTitle,
        updateProjectDescription,
        updateProjectEstimatedLength,
        createLabel,
        updateLabel,
        deleteLabel,
        stopSharingProject,
        loading,
        error,
        setError
    } = useProjectSettings();
    const {addAlert} = useAlerts();

    const [fieldToUpdate, setFieldToUpdate] = useState(null);
    const [editPanelIsOpen, setEditPanelIsOpen] = useState(false);
    const [labelToEdit, setLabelToEdit] = useState(null);
    const [labelToDelete, setLabelToDelete] = useState(null);
    const [userToStopSharingWith, setUserToStopSharingWith] = useState(null);

    const Fields = Object.freeze({
        TITLE: 0,
        DESCRIPTION: 1,
        ESTIMATED_LENGTH: 2,
        CREATE_LABEL: 3,
        EDIT_LABEL: 4,
        SHARED: 5,
    });

    useEffect(() => {
        if (projectId === null) {
            navigate('/404');
        }
    }, [projectId, navigate]);

    useEffect(() => {
        fetchProject(projectId);
    }, [fetchProject, projectId]);

    useEffect(() => {
        if (error) {
            addAlert(error, 'error');
            setError(null);
        }
    }, [setError, error, addAlert]);

    if (loading) {
        return (
            <Loading />
        );
    }

    return (
        <Column
            style={{
                padding:'5rem 2rem',
                width: '100%',
                alignItems: 'center',
            }}
        >
            <ProjectSettingsInfoPanel
                project={project}
                setFieldToUpdate={setFieldToUpdate}
                setEditPanelIsOpen={setEditPanelIsOpen}
                setLabelToDelete={setLabelToDelete}
                setLabelToEdit={setLabelToEdit}
                setUserToStopSharingWith={setUserToStopSharingWith}
                fields={Fields}
                {...props}
            />
            <Sidebar
                isOpen={editPanelIsOpen}
                isMobile={props.isMobile}
                fromRight={true}
                style={{justifyContent: 'start'}}
            >
                <Column style={{width: '80%', alignItems: 'start', padding: '2rem'}}>
                    <IconButton icon={<MdClose />} onClick={() => setEditPanelIsOpen(false)}/>
                    <Container style={{width: '100%'}}>
                        {fieldToUpdate === Fields.TITLE && <EditProjectTitle project={project} updateProjectTitle={updateProjectTitle} setEditPanelIsOpen={setEditPanelIsOpen}/>}
                        {fieldToUpdate === Fields.DESCRIPTION && <EditProjectDescription project={project} updateProjectDescription={updateProjectDescription} setEditPanelIsOpen={setEditPanelIsOpen}/>}
                        {fieldToUpdate === Fields.ESTIMATED_LENGTH && <EditProjectEstimatedLength project={project} updateEstimatedLength={updateProjectEstimatedLength} setEditPanelIsOpen={setEditPanelIsOpen} />} 
                        {fieldToUpdate === Fields.CREATE_LABEL && <CreateLabel createLabel={createLabel} project={project} setEditPanelIsOpen={setEditPanelIsOpen}/>}
                        {fieldToUpdate === Fields.EDIT_LABEL && <EditLabel updateLabel={updateLabel} labelToEdit={labelToEdit} setEditPanelIsOpen={setEditPanelIsOpen} /> }
                    </Container>
                </Column>
            </Sidebar>
            {labelToDelete !== null && <DeleteLabel deleteLabel={deleteLabel} labelToDelete={labelToDelete} setLabelToDelete={setLabelToDelete} />}
            {userToStopSharingWith !== null && <StopSharingProject project={project} user={userToStopSharingWith} stopSharingProject={stopSharingProject} setUserToStopSharingWith={setUserToStopSharingWith}/>}
        </Column>
    );
}
 
export default ProjectSettings;