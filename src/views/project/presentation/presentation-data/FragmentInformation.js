import { Column, Row, Typography } from 'components';
import Label from 'components/ui/labels/Label';
import { MdAccessTime } from 'react-icons/md';
import { useProjectStore } from 'stores';

const FragmentInformation = ({selectedFragment}) => {

    const {fragments} = useProjectStore();
    const fragment = fragments.length > selectedFragment ? fragments[selectedFragment] : null;

    if (!fragment) {
        return (
            <Column>
                There are no fragments yet...
            </Column>
        );
    }

    return (
        <Column
            style={{
                width: '45%',
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