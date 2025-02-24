import { Column, IconButton, Row, Typography } from 'components';
import LabelTimeline from './presentation-data/LabelTimeline';
import FragmentInformation from './presentation-data/FragmentInformation';
import FragmentImages from './presentation-data/FragmentImages';
import { useCallback, useEffect, useState } from 'react';
import { useProjectStore } from 'stores';
import { MdAdd, MdArrowBack, MdArrowForward } from 'react-icons/md';

const Presentation = ({filters, ...props}) => {
    
    const {fragments} = useProjectStore();
    const filteredFragments = fragments.filter(f => f.onTimeline === true);
    const [selectedFragment, setSelectedFragment] = useState(filteredFragments.length > 0 ? 0 : null);

    const selectPreviousFragment = useCallback(() => {
        if (filters.length === 0) {
            setSelectedFragment(Math.max(0, selectedFragment - 1));
            return;
        }
        if (selectedFragment === 0) {
            return;
        }
        for (const [index, fragment] of filteredFragments.slice(0, selectedFragment).reverse().entries()) {
            if (fragment.labels.some(l => filters.includes(l.id))) {
                setSelectedFragment(selectedFragment - (index + 1));
                return;
            }
        }
    }, [selectedFragment, filteredFragments, filters]);

    const selectNextFragment = useCallback(() => {
        if (filters.length === 0) {
            setSelectedFragment(Math.min(filteredFragments.length - 1, selectedFragment + 1));
            return;
        }

        if (selectedFragment === filteredFragments.length - 1) {
            return;
        }

        for (const [index, fragment] of filteredFragments.slice(selectedFragment + 1, filteredFragments.length).entries()) {
            if (fragment.labels.some(l => filters.includes(l.id))) {
                setSelectedFragment(selectedFragment + index + 1);
                return;
            }
        }
    }, [filters, filteredFragments, selectedFragment]);

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
            for (const [index, fragment] of fragments.filter(f => f.onTimeline).entries()) {
                if (fragment.onTimeline && fragment.labels.some(l => filters.includes(l.id))) {
                    setSelectedFragment(index);
                    return;
                }
            }

            setSelectedFragment(0);
        }

        findFirstFragmentOnFilterChange();
    }, [filters, fragments]);

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
            style={{width: '100%', height: '100%'}}
        >
            <LabelTimeline filters={filters} filteredFragments={filteredFragments} selectedFragment={selectedFragment} {...props} />
            <Row style={{alignItems: 'center', justifyContent: 'center'}}>
                <IconButton icon={<MdArrowBack />} title='Previous fragment' onClick={selectPreviousFragment}/>
                <Typography>{selectedFragment + 1} / {filteredFragments.length}</Typography>
                <IconButton icon={<MdArrowForward />} title='Next fragment' onClick={selectNextFragment}/>
            </Row>
            <Row style={{height: 'inherit', padding: '2rem', flexWrap: 'wrap'}}>
                <FragmentInformation fragment={filteredFragments[selectedFragment]} {...props} />
                <FragmentImages fragment={filteredFragments[selectedFragment]} {...props} />
            </Row>
        </Column>
    );
}
 
export default Presentation;