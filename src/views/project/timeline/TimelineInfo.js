import { Column, Row, Typography } from 'components';
import { formatSecondsToHMS } from 'utils';

const TimelineInfo = ({currentDuration}) => {
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
                    Estimated duration
                </Typography>
                <Typography fontSize='extrasmall'>
                    TODO: Add est. dur.
                </Typography>
            </Column>
        </Row>
    );
}
 
export default TimelineInfo;