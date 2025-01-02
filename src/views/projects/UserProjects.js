import { useAlerts, useProjects } from 'hooks';
import { useEffect } from 'react';
import UserProjectCard from './UserProjectCard';
import { Column, Row, TextButton, Typography } from 'components';
import { MdAdd } from "react-icons/md";


const UserProjects = ({userProjects, props}) => {

    const { loading, error, setError } = useProjects();
    const { addAlert } = useAlerts();

    useEffect(() => {
        if (error) {
            addAlert(error, 'error');
            setError(null);
        }
    }, [setError, error, addAlert]);

    if (loading) {
        return <div>
            Loading...
        </div>
    }

    return (
        <Column style={{gap: '2rem'}}>
            <TextButton style={{width: 'fit-content'}}>
                <Row style={{gap: '0.75rem'}}>
                    <MdAdd />
                    <Typography>Create new project</Typography>
                </Row>
            </TextButton>   
            {userProjects.map((project) => (
                <UserProjectCard key={project.id} project={project} {...props}/>
            ))}
        </Column>
    );
}
 
export default UserProjects;