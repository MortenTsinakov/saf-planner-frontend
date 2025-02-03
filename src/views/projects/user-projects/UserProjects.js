import { useState } from 'react';
import UserProjectCard from './user-projects-data/UserProjectCard';
import { Column, Row, TextButton, Typography } from 'components';
import { MdAdd } from "react-icons/md";
import CreateProject from './user-projects-actions/CreateProject';
import DeleteProject from './user-projects-actions/DeleteProject';

/**
 * Displays a list of projects that the user has created.
 * Passes down functions/variables for creating/updating/deleting
 * projects to necessary sub-components.
 */
const UserProjects = ({
    userProjects,
    createProject,
    updateProjectTitle,
    updateProjectDescription,
    updateProjectEstimatedLength,
    updateLabel,
    deleteProject,
    ...props}
) => {

    const [creatingProject, setCreatingProject] = useState(false);
    const [deletingProject, setDeletingProject] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState(null);

    const handleDelete = (project) => {
        setProjectToDelete(project);
        setDeletingProject(true);
    }

    return (
        <Column style={{gap: '2rem'}}>
            {
                deletingProject && 
                <DeleteProject 
                    projectToDelete={projectToDelete}
                    setProjectToDelete={setProjectToDelete}
                    setDeletingProject={setDeletingProject}
                    deleteProject={deleteProject}
                    {...props}
                />
            }
            {
                creatingProject &&
                <CreateProject
                    setCreatingProject={setCreatingProject}
                    createProject={createProject}
                    {...props}
                />}
            {
            !creatingProject && 
            <TextButton
                data-testid='create-project-button'
                style={{width: 'fit-content'}}
                onClick={() => setCreatingProject(true)}
            >
                <Row style={{gap: '0.75rem'}}>
                    <MdAdd />
                    <Typography>Create new project</Typography>
                </Row>
            </TextButton>
            }
            {userProjects.map((project) => (
                <UserProjectCard
                    key={project.id}
                    project={project}
                    handleDelete={handleDelete}
                    {...props}
                />
            ))}
        </Column>
    );
}
 
export default UserProjects;