import { Card, Clickable, Column, Container, IconButton, Row, Typography } from 'components';
import { MdSettings, MdDelete } from "react-icons/md";
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

    const handleOpenProjectClick = () => {
        navigate(`/project?projectId=${project.id}`);
    }

    const handleDeleteProjectClick = (e) => {
        e.stopPropagation();
        handleDelete(project);
    }

    const handleOpenProjectSettingsClick = (e) => {
        e.stopPropagation();
        navigate(`/project-settings?projectId=${project.id}`);
    }

    return (
        <Container>
            <Clickable
                onClick={handleOpenProjectClick}
            >                
                <Card
                    style={{
                        gap: '1rem', 
                        maxWidth: '90vw', 
                        width: '750px'
                    }}
                    title='Open project'
                >
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
                    <Row style={{justifyContent: 'right'}}>
                        {/* <IconButton title='Open project' style={{fontSize: '3rem'}} icon={<MdFileOpen />} onClick={handleOpenProjectClick}/>    */}
                        <IconButton title='Project settings' style={{fontSize: '3rem'}} icon={<MdSettings />} onClick={handleOpenProjectSettingsClick}/>
                        <IconButton title='Delete project' style={{fontSize: '3rem'}} icon={<MdDelete />} onClick={handleDeleteProjectClick}/>
                    </Row>
                </Card>
            </Clickable>
        </Container>
    );
}
 
export default UserProjectCard;