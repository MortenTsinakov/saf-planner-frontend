import { Column, Row, Typography } from 'components';
import { useProject } from 'hooks';
import { formatSecondsToHMS } from 'utils';

const TimelineInfo = ({currentDuration}) => {

    const {project} = useProject();

    if (!project) {return};

    return (
        <Row>
            <Column style={{gap: 0, alignItems: 'center'}}>
                <Typography color='label' fontSize='extrasmall'>
                    Current duration
                </Typography>
                <Typography fontSize='extrasmall'>
                    {formatSecondsToHMS(currentDuration)}
                </Typography>
            </Column>
            <Column style={{gap: 0, alignItems: 'center'}}>
                <Typography color='label' fontSize='extrasmall'>
                    Target duration
                </Typography>
                <Typography fontSize='extrasmall'>
                    {formatSecondsToHMS(project.estimatedLengthInSeconds)}
                </Typography>
            </Column>
        </Row>
    );
}
 
export default TimelineInfo;