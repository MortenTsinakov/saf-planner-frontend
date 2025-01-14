import { Column, Divider, Modal, OutlineButton, Typography } from 'components';

const FragmentDetails = ({fragment, setShowFragmentDetails, ...props}) => {

    const infoFieldStyle = {
        gap: 0
    }

    return (
        <Modal>
            <Column style={{gap: 0}}>
                <Typography fontSize='medium'>Project details</Typography>
                <Divider style={{height: '1.4px', marginTop: '2rem'}} />
                <Column
                    style={{
                        padding: '2rem 0',
                        maxHeight: '50vh',
                        overflow: 'scroll'
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
                        <Typography>TODO: Display a list of labels associated with the fragment</Typography>
                    </Column>
                    {/* Comments */}
                    <Column style={infoFieldStyle}>
                        <Typography fontSize='extrasmall' color='label'>Comments</Typography>
                        <Typography>TODO: Display a list of comments associated with the fragment</Typography>
                    </Column>
                </Column>
                <Divider style={{height: '1.4px', marginBottom: '2rem'}} />
                <OutlineButton
                    onClick={() => {setShowFragmentDetails(false)}}
                    style={{width: 'fit-content'}}
                >
                    Close
                </OutlineButton>
            </Column>
        </Modal>
    );
}
 
export default FragmentDetails;