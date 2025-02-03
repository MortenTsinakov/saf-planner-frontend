import { Card, Clickable, Column, Container, IconButton, Row, Typography } from 'components';
import { MdSettings, MdShare, MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { formatDate, formatSecondsToHMS } from 'utils';

const UserProjectCard = (props) => {

    const navigate = useNavigate();

    const project = props.project;
    const handleDelete = props.handleDelete;
    const dateOptions = ['day', 'month', 'year', 'hour', 'minute', 'second'];

    const titleStyle = {
        textWrap: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'clip'
    };
    const descriptionStyle = {
        lineHeight: '3rem',
        height: 'calc(3rem * 3)',
        
        display: '-webkit-box',
        WebkitLineClamp: '3',
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
    };

    const navigateToProjectPage = () => {
        navigate(`/project?projectId=${project.id}`);
    }

    const handleDeleteProject = () => {
        handleDelete(project);
    }

    return (
        <Container>
            {}
            <Card style={{gap: '1rem', maxWidth: '90vw', width: '750px'}}>
                    <Clickable onClick={() => navigateToProjectPage(project.id)}>
                        <Column style={{width: '100%'}}>
                            <Typography fontSize='medium' style={titleStyle}>{project.title}</Typography>
                            <Typography fontSize='small' style={descriptionStyle}>{project.description || '-'}</Typography>
                            <Column style={{gap:0}}>
                                <Row>
                                    <Typography fontSize='extrasmall' color='label'>Created: </Typography>
                                    <Typography fontSize='extrasmall'>{formatDate(project.createdAt, dateOptions)}</Typography>
                                </Row>
                                <Row>
                                    <Typography fontSize='extrasmall' color='label'>Updated: </Typography>
                                    <Typography fontSize='extrasmall'>{formatDate(project.updatedAt, dateOptions)}</Typography>
                                </Row>
                                <Row>
                                    <Typography fontSize='extrasmall' color='label'>Target duration: </Typography>
                                    <Typography fontSize='extrasmall'>{formatSecondsToHMS(project.estimatedLengthInSeconds)}</Typography>
                                </Row>
                            </Column>
                        </Column>
                    </Clickable>
                    <Row style={{justifyContent: 'right'}}>
                        <IconButton title='Project settings' style={{fontSize: '3rem'}} icon={<MdSettings />} onClick={() => navigate(`/project-settings?projectId=${project.id}`)}/>
                        <IconButton title='Share project' style={{fontSize: '3rem'}} icon={<MdShare />} onClick={() => {}}/>
                        <IconButton title='Delete project' style={{fontSize: '3rem'}} icon={<MdDelete />} onClick={handleDeleteProject}/>
                    </Row>
                </Card>
        </Container>
    );
}
 
export default UserProjectCard;