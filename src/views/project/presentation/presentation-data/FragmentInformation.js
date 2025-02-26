import { Column, Row, Typography } from 'components';
import Label from 'components/ui/labels/Label';
import { MdAccessTime } from 'react-icons/md';

const FragmentInformation = ({fragment}) => {
    return (
        <Column
            style={{
                width: '30%',
                minWidth: '350px',
                paddingBottom: '2rem',
            }}
        >
            <Typography
                style={{fontWeight: 'bold'}}
            >
                {fragment.shortDescription}
            </Typography>
            <Row style={{gap: '0.5rem', alignItems: 'center'}}>
                <MdAccessTime />
                <Typography fontSize='extrasmall' color='label'>
                    {fragment.durationInSeconds} seconds
                </Typography>
            </Row>
            <Typography>
                {fragment.longDescription}
            </Typography>
            <Row>
                {fragment.labels.map(label => (
                    <Label key={label.id} color={label.color}>
                        {label.description}
                    </Label>
                ))}
            </Row>
        </Column>
    );
}
 
export default FragmentInformation;