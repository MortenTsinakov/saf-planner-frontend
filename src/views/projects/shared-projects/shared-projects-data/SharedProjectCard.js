import { Card, Clickable, Column, Container, Row, Typography } from "components";
import { useNavigate } from "react-router-dom";

const SharedProjectCard = ({project, ...props}) => {

    const navigate = useNavigate();

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
        navigate(`/shared-project?projectId=${project.id}`);
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
                            <Row>
                                <Typography fontSize='extrasmall' color='label'>Author: </Typography>
                                <Typography fontSize='extrasmall'>{project.owner}</Typography>
                            </Row>
                        </Column>
                </Card>
            </Clickable>
        </Container>
    );
}
 
export default SharedProjectCard;