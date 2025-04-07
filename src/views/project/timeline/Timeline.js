import { Column, IconButton, Row, Typography } from "components";
import { useCallback, useEffect, useState } from "react";
import LabelTimeline from "./LabelTimeline";
import { MdArrowDropDown, MdArrowDropUp, MdArrowLeft, MdArrowRight, MdClose } from "react-icons/md";
import BasicTimeline from "./BasicTimeline";
import { useProjectStore } from "stores";
import { formatSecondsToHMS } from "utils";

const Timeline = ({
    timelinePanelSettings,
    setTimelinePanelSettings,
    selectedFragmentIdx,
    setSelectedFragmentIdx,
    ...props
}) => {

    const {project, fragments, filteredFragments} = useProjectStore();
    const [currentDuration, setCurrentDuration] = useState(0);
    const [displayDetailedTimeline, setDisplayDetailedTimeline] = useState(true);
    const iconStyle = {
        fontSize: '3rem',
    };

    const selectPreviousFragment = useCallback(() => {
        setSelectedFragmentIdx(Math.max(0, selectedFragmentIdx - 1));
    }, [selectedFragmentIdx, setSelectedFragmentIdx]);

    const selectNextFragment = useCallback(() => {
        setSelectedFragmentIdx(Math.min(filteredFragments.length - 1, selectedFragmentIdx + 1));
    }, [filteredFragments, selectedFragmentIdx, setSelectedFragmentIdx]);

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
        const calculateCurrentDuration = () => {
            let duration = 0;

            for (const fragment of fragments) {
                duration += fragment.durationInSeconds;
            }

            setCurrentDuration(duration);
        }

        calculateCurrentDuration();
    }, [fragments]);

    useEffect(() => {
        const findFirstFragmentOnFilterChange = () => {
            setSelectedFragmentIdx(0);
        }

        findFirstFragmentOnFilterChange();
    }, [filteredFragments.length, setSelectedFragmentIdx]);

    if (!timelinePanelSettings.isOpen || filteredFragments.length === 0) {
        return;
    }

    const expandTimeline = () => {
        setDisplayDetailedTimeline(true);
    }

    const compressTimeline = () => {
        setDisplayDetailedTimeline(false);
    }

    const handleClosePanel = () => {
        setTimelinePanelSettings({
            ...timelinePanelSettings,
            isOpen: false,
        });
    }

    return (
        <Column
            style={{
                width: '100%',
                backgroundColor: 'var(--background-color-medium)',
                gap: 0,
            }}
        >
            <Row 
                style={{
                    width: '100%',
                    justifyContent: 'space-between',

                }}
            >
                <Row>
                    <Column style={{gap: 0, paddingLeft: '2rem', alignItems: 'center'}}>
                        <Typography fontSize='extrasmall' color='label'>
                            Current duration:
                        </Typography>
                        <Typography
                            fontSize='extrasmall'
                            style={{
                                color: project.estimatedLengthInSeconds && project.estimatedLengthInSeconds < currentDuration && 'var(--color-error)'
                            }}
                        >
                            {formatSecondsToHMS(currentDuration)}
                        </Typography>
                    </Column>
                    {
                        project.estimatedLengthInSeconds &&
                        <Column style={{gap: 0, paddingLeft: '2rem', alignItems: 'center'}}>
                        <Typography fontSize='extrasmall' color='label'>
                            Estimated duration:
                        </Typography>
                        <Typography fontSize='extrasmall'>
                            {formatSecondsToHMS(project.estimatedLengthInSeconds)}
                        </Typography>
                    </Column>
                    }
                </Row>
                <IconButton
                    icon={<MdClose />}
                    style={iconStyle}
                    onClick={handleClosePanel}
                />
            </Row>
            {
                displayDetailedTimeline
                ?
                <LabelTimeline
                    selectedFragmentIdx={selectedFragmentIdx}
                    {...props}
                />
                :
                <BasicTimeline
                    selectedFragmentIdx={selectedFragmentIdx}
                />
            }
            <Row
                style={{justifyContent: 'center', alignItems: 'center'}}
            >
                <IconButton
                    style={{visibility: selectedFragmentIdx > 0 ? 'visible' : 'hidden'}}
                    icon={<MdArrowLeft />}
                    onClick={selectPreviousFragment}
                    title='Previous fragment (left arrow)'
                />
                <Typography
                    style={{minWidth: '9ch', textAlign: 'center'}}
                >
                    {selectedFragmentIdx + 1} / {filteredFragments.length}
                </Typography>
                <IconButton
                    style={{visibility: selectedFragmentIdx + 1 < filteredFragments.length ? 'visible' : 'hidden'}}
                    icon={<MdArrowRight />}
                    onClick={selectNextFragment}
                    title='Next fragment (right arrow)'
                />
            </Row>
            <Row
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 25,
                    borderTop: '1px solid var(--main-gray)',
                }}
            >
                {
                    displayDetailedTimeline ?
                    <IconButton
                        title='Close timeline'
                        icon={<MdArrowDropUp />}
                        onClick={compressTimeline}
                    />
                    :
                    <IconButton
                        title='Close timeline'
                        icon={<MdArrowDropDown />}
                        onClick={expandTimeline}
                    />
                }
            </Row>
        </Column>
    );
}
 
export default Timeline;