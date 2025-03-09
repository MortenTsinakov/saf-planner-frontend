import { Column, IconButton, Row } from "components";
import { useState } from "react";
import LabelTimeline from "../presentation/presentation-data/LabelTimeline";
import { MdArrowDropDown, MdArrowDropUp, MdClose } from "react-icons/md";
import BasicTimeline from "./BasicTimeline";

const Timeline = ({
    timelinePanelSettings,
    setTimelinePanelSettings,
    filteredFragments,
    filters,
    ...props
}) => {

    const [displayDetailedTimeline, setDisplayDetailedTimeline] = useState(true);
    const iconStyle = {
        fontSize: '3rem',
    };

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
                    justifyContent: 'end',
                }}
            >
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
                    filteredFragments={filteredFragments}
                    filters={filters}
                    selectedFragment={0}
                    {...props}
                />
                :
                <BasicTimeline
                    filteredFragments={filteredFragments}
                />
            }
            <Row
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 25,
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