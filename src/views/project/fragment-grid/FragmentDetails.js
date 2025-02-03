import { Column, Divider, Modal, OutlineButton, Row, Typography } from 'components';
import Label from 'components/ui/labels/Label';

const FragmentDetails = ({fragment, setShowFragmentDetails}) => {

    const infoFieldStyle = {
        gap: 0
    }

    return (
        <Modal
            style={{
                minWidth: '350px',
                width: '750px',
                maxWidth: '90vw',

                minHeight: '90vh',
                height: '90vh',
                maxHeight: '90vh',

                gap: '2rem',
                justifyContent: 'space-between'
            }}
        >
            <Column style={{gap: 0}}>
                <Typography fontSize='medium'>Fragment details</Typography>
                <Divider style={{marginTop: '2rem'}} />
                <Column
                    style={{
                        padding: '2rem 0',
                        maxHeight: '50vh',
                        overflow: 'auto'
                    }}
                >
                    {/* Short description */}
                    <Column style={infoFieldStyle}>
                        <Typography fontSize='extrasmall' color='label'>Short description</Typography>
                        <Typography>{fragment.shortDescription ? fragment.shortDescription : '-'}</Typography>
                    </Column>
                    {/* Long description */}
                    <Column style={infoFieldStyle}>
                        <Typography fontSize='extrasmall' color='label'>Long description</Typography>
                        <Typography>{fragment.longDescription ? fragment.longDescription : '-'}</Typography>
                    </Column>
                    {/* Duration in seconds */}
                    <Column style={infoFieldStyle}>
                        <Typography fontSize='extrasmall' color='label'>Duration (in seconds)</Typography>
                        <Typography>{fragment.durationInSeconds}</Typography>
                    </Column>
                    {/* On timeline */}
                    <Column style={infoFieldStyle}>
                        <Typography fontSize='extrasmall' color='label'>Is scene added to the timeline?</Typography>
                        <Typography>{fragment.onTimeline ? 'Yes' : 'No'}</Typography>
                    </Column>
                    {/* Labels */}
                    <Column style={infoFieldStyle}>
                        <Typography fontSize='extrasmall' color='label'>Labels</Typography>
                        <Row
                            style={{flexWrap: 'wrap'}}
                        >
                            {fragment.labels.map(label => (
                                <Label
                                    key={label.id}
                                    color={label.color}
                                >
                                    {label.description}
                                </Label>
                            ))}
                        </Row>
                    </Column>
                    {/* Comments */}
                    <Column style={infoFieldStyle}>
                        <Typography fontSize='extrasmall' color='label'>Comments</Typography>
                        <Typography>TODO: Display a list of comments associated with the fragment</Typography>
                    </Column>
                </Column>
            </Column>
            <OutlineButton
                onClick={() => {setShowFragmentDetails(false)}}
                style={{width: 'fit-content'}}
            >
                Close
            </OutlineButton>
        </Modal>
    );
}
 
export default FragmentDetails;