import { Column, IconButton, Row, Typography } from 'components';
import LabelTimeline from './presentation-data/LabelTimeline';
import FragmentInformation from './presentation-data/FragmentInformation';
import FragmentImages from './presentation-data/FragmentImages';
import { useCallback, useEffect, useState } from 'react';
import { useProjectStore } from 'stores';
import { MdAdd, MdArrowBack, MdArrowForward } from 'react-icons/md';

const Presentation = ({...props}) => {

    const {fragments} = useProjectStore();
    const [selectedFragment, setSelectedFragment] = useState(fragments.length > 0 ? 0 : null);

    const selectPreviousFragment = useCallback(() => {
        setSelectedFragment(Math.max(0, selectedFragment - 1));
    }, [selectedFragment]);

    const selectNextFragment = useCallback(() => {
        setSelectedFragment(Math.min(fragments.length - 1, selectedFragment + 1));
    }, [fragments.length, selectedFragment]);

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

    return (
        <Column
            style={{width: '100%', height: '100%'}}
        >
            <LabelTimeline selectedFragment={selectedFragment} {...props} />
            <Row style={{alignItems: 'center', justifyContent: 'center'}}>
                <IconButton icon={<MdArrowBack />} title='Previous fragment' onClick={selectPreviousFragment}/>
                <Typography>{selectedFragment + 1} / {fragments.length}</Typography>
                <IconButton icon={<MdArrowForward />} title='Next fragment' onClick={selectNextFragment}/>
            </Row>
            <Row style={{height: 'inherit', padding: '2rem', flexWrap: 'wrap'}}>
                <FragmentInformation selectedFragment={selectedFragment} {...props} />
                <FragmentImages selectedFragment={selectedFragment} {...props} />
            </Row>
        </Column>
    );
}
 
export default Presentation;