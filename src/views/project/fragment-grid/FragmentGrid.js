import { Container, Typography } from 'components';
import FragmentCard from './FragmentCard';

const FragmentGrid = ({fragments, updateFragmentOnTimelineStatus, props}) => {
    return (
            <Container
                style={{
                    margin: '2rem',
                    gap: '1.5rem',
                    flexWrap: 'wrap',
                    justifyContent: 'start',
                }}
            >
                {
                    fragments.length === 0
                    ?
                    <Typography>This project has no scenes yet...</Typography>
                    :
                    fragments.map(f => (
                        <FragmentCard
                            key={f.id}
                            fragment={f}
                            updateFragmentOnTimelineStatus={updateFragmentOnTimelineStatus}
                            {...props}
                        />
                    ))
                }

                {}
            </Container>
    );
}
 
export default FragmentGrid;