import { Column, Row, TextButton, Typography } from 'components';
import Label from 'components/ui/labels/Label';
import { MdAccessTime, MdOutlineModeComment } from 'react-icons/md';

const FragmentInformation = ({fragment, setShowComments}) => {
    return (
        <Column
            style={{flex: 0.4}}
        >
            <Typography
                style={{fontWeight: 'bold'}}
            >
                {fragment.shortDescription}
            </Typography>
            <Row>
                <Row
                    style={{
                        alignItems: 'center',
                        gap: 5
                    }}
                >
                    <MdAccessTime />
                    <Typography fontSize='extrasmall'>
                        {fragment.durationInSeconds} seconds
                    </Typography>
                </Row>
                <TextButton
                    style={{
                        width: 'fit-content',
                        alignItems: 'center',
                        display: 'flex',
                        gap: 5
                    }}
                    onClick={() => setShowComments(true)}
                >
                    <MdOutlineModeComment />
                    <Typography fontSize='extrasmall'>
                        {fragment.comments.length} comments
                    </Typography>
                </TextButton>
            </Row>
            <Typography>
                {fragment.longDescription}
            </Typography>
            <Row
                style={{flewWrap: 'wrap'}}
            >
                {fragment.labels.map(l => (
                    <Label
                        key={l.id}
                        color={l.color}
                    >
                        {l.description}
                    </Label>
                ))}
            </Row>
        </Column>
    );
}
 
export default FragmentInformation;