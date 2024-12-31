import { Card, Clickable, Column, IconButton, Row, Typography } from 'components';
import { MdSettings, MdShare, MdDelete } from "react-icons/md";
import { formatDate, formatSecondsToHMS } from 'utils';

const UserProjectCard = (props) => {

    const project = props.project;
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

    const navigateToProjectPage = (projectId) => {
        console.log(`Navigating to project page. Project id: ${projectId}`);
    }

    return (
        <Card style={{gap: '1rem', maxWidth: '90vw', width: '750px'}}>
                <Clickable onClick={() => navigateToProjectPage(project.id)}>
                    <Column>
                        <Typography fontSize='medium' style={titleStyle}>{project.title}</Typography>
                        <Typography fontSize='small' style={descriptionStyle}>{project.description || 'No description...'}</Typography>
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
                    <IconButton title='Settings' style={{fontSize: '3rem'}} icon={<MdSettings />} onClick={() => {console.log("Settings button pressed")}}/>
                    <IconButton title='Share' style={{fontSize: '3rem'}} icon={<MdShare />} onClick={() => {console.log("Share button pressed")}}/>
                    <IconButton title='Delete' style={{fontSize: '3rem'}} icon={<MdDelete />} onClick={() => {console.log("Delete button pressed")}}/>
                </Row>
            </Card>
    );
}
 
export default UserProjectCard;