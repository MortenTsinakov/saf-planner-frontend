import { Container, Typography } from 'components';
import FragmentCard from './FragmentCard';

const FragmentGrid = (
    {
        fragmentGridHeight,
        fragments,
        createFragment,
        updateFragmentOnTimelineStatus,
        updateFragmentShortDescription,
        updateFragmentLongDescription,
        updateFragmentDuration,
        deleteFragment,
        ...props}) => 
    {
    return (
            <Container
                style={{
                    padding: '2rem',
                    gap: '1.5rem',
                    flexWrap: 'wrap',
                    justifyContent: 'start',
                    maxHeight: fragmentGridHeight,
                    overflow: 'auto',
                }}
            >
                {
                    fragments.length === 0
                    ?
                    <Typography>This project has no fragments yet...</Typography>
                    :
                    fragments.map(f => (
                        <FragmentCard
                            key={f.id}
                            fragment={f}
                            createFragment={createFragment}
                            updateFragmentOnTimelineStatus={updateFragmentOnTimelineStatus}
                            updateFragmentShortDescription={updateFragmentShortDescription}
                            updateFragmentLongDescription={updateFragmentLongDescription}
                            updateFragmentDuration={updateFragmentDuration}
                            deleteFragment={deleteFragment}
                            {...props}
                        />
                    ))
                }

                {}
            </Container>
    );
}
 
export default FragmentGrid;