import { useState } from 'react';
import UserProjectCard from './UserProjectCard';
import { Column, Row, TextButton, Typography } from 'components';
import { MdAdd } from "react-icons/md";
import CreateProject from './CreateProject';
import DeleteProject from './DeleteProject';


const UserProjects = ({userProjects, createNewProject, deleteProject, props}) => {

    const [creatingProject, setCreatingProject] = useState(false);
    const [deleteModalisOpen, setDeleteModalIsOpen] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState(null);

    const handleDelete = (projectId) => {
        setProjectToDelete(projectId);
        setDeleteModalIsOpen(true);
    }

    return (
        <Column style={{gap: '2rem'}}>
            {
                deleteModalisOpen && 
                <DeleteProject 
                    projectToDelete={projectToDelete}
                    setProjectToDelete={setProjectToDelete}
                    setDeleteModalIsOpen={setDeleteModalIsOpen}
                    deleteProject={deleteProject}
                    {...props}
                />
            }
            {
                creatingProject &&
                <CreateProject
                setCreatingProject={setCreatingProject}
                createNewProject={createNewProject}
                {...props}
                />}
            {
            !creatingProject && 
            <TextButton
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
                <UserProjectCard key={project.id} project={project} handleDelete={handleDelete} {...props}/>
            ))}
        </Column>
    );
}
 
export default UserProjects;