import { Column, IconButton, Row, Typography } from 'components';
import LabelTimeline from './presentation-data/LabelTimeline';
import FragmentInformation from './presentation-data/FragmentInformation';
import FragmentImages from './presentation-data/FragmentImages';
import { useCallback, useEffect, useState } from 'react';
import { useProjectStore } from 'stores';
import { MdAdd, MdArrowBack, MdArrowForward } from 'react-icons/md';

const Presentation = ({filters, filteredFragments, presentationViewHeight, ...props}) => {
    
    const {fragments} = useProjectStore();
    const [selectedFragment, setSelectedFragment] = useState(filteredFragments.length > 0 ? 0 : null);

    const selectPreviousFragment = useCallback(() => {
        setSelectedFragment(Math.max(0, selectedFragment - 1));
    }, [selectedFragment]);

    const selectNextFragment = useCallback(() => {
        setSelectedFragment(Math.min(filteredFragments.length - 1, selectedFragment + 1));
    }, [filteredFragments, selectedFragment]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            switch (event.key) {
                case "ArrowLeft":
                    selectPreviousFragment();
                    break;
                case "ArrowRight":
                    selectNextFragment();
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectPreviousFragment, selectNextFragment]);

    useEffect(() => {
        const findFirstFragmentOnFilterChange = () => {
            setSelectedFragment(0);
        }

        findFirstFragmentOnFilterChange();
    }, [filteredFragments.length]);

    if (fragments.length === 0) {
        return (
            <Column style={{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', padding: '2rem'}}>
                <Typography fontSize='medium'>
                    This project has no fragments yet
                </Typography>
                <Typography color='label'>
                    To create new fragments select the grid view
                    from the toolbar and click
                    <Row style={{justifyContent: 'center', alignItems: 'center'}}>
                        <MdAdd />
                        <Typography>Create new fragment</Typography>
                    </Row>
                </Typography>
            </Column>
        );
    }

    if (filteredFragments.length === 0) {
        return (
            <Column style={{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', padding: '2rem'}}>
                <Typography fontSize='medium'>
                    No fragments on the timeline
                </Typography>
                <Typography color='label'>
                    There are no fragments on the timeline or they have been filtered out.
                </Typography>
            </Column>
        );
    }

    return (
        <Column
            style={{width: '100%', height: presentationViewHeight, overflow: 'auto', gap:0}}
        >
            <LabelTimeline
                filters={filters}
                filteredFragments={filteredFragments}
                selectedFragment={selectedFragment}
                {...props}
            />
            <Column style={{height: '100%', width: '100%', gap: 0}}>
                <Row style={{alignItems: 'center', justifyContent: 'center', gap: 0}}>
                    <IconButton icon={<MdArrowBack />} title='Previous fragment' onClick={selectPreviousFragment}/>
                    <Typography>{selectedFragment + 1} / {filteredFragments.length}</Typography>
                    <IconButton icon={<MdArrowForward />} title='Next fragment' onClick={selectNextFragment}/>
                </Row>
                <Row style={{height: 'inherit', padding: '2rem', flexWrap: 'wrap', gap: 0}}>
                    <FragmentInformation
                        fragment={filteredFragments[selectedFragment]}
                        {...props}
                    />
                    <FragmentImages fragment={filteredFragments[selectedFragment]} {...props} />
                </Row>
            </Column>
        </Column>
    );
}
 
export default Presentation;