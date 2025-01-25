import { Column, Row } from 'components';
import { useProject } from 'hooks';
import TimelineItem from './TimelineItem';
import { useState } from 'react';
import { DEFAULT_ZOOM } from 'constants/Constants';
import TimelineMarkings from './TimelineMarkings';
import TimelineToolbar from './TimelineToolbar';
import TimelineInfo from './TimelineInfo';

const Timeline = ({timelineHeight, timelineToolsHeight, ...props}) => {

    const {fragments} = useProject();
    const [zoom, setZoom] = useState(DEFAULT_ZOOM);

    const currentDuration = fragments.reduce((partialSum, a) => a.onTimeline ? partialSum + a.durationInSeconds : partialSum, 0);

    return (
        <Column
            style={{
                gap: 0,
                height: timelineHeight + timelineToolsHeight,
            }}
        >
            <Column
                style={{
                    height: timelineHeight,
                    padding: '2rem 0 0 2rem',
                    backgroundColor: 'var(--background-color-medium)',
                    justifyContent: 'start',
                    overflowX: 'auto',
                }}
            >
                <Row
                    style={{
                        height: timelineHeight,
                        minWidth: '100%',
                        gap: 0,
                        backgroundColor: 'var(--background-color-low)',
                    }}
                >
                    {fragments.map(f => (
                        f.onTimeline &&
                        <TimelineItem
                            key={f.id}
                            fragment={f}
                            zoom={zoom}
                        />
                    ))}
                </Row>
                <Row
                    style={{
                        backgroundColor: 'var(--background-color-medium)',
                        width: '100%'
                    }}
                >
                    <TimelineMarkings
                        currentDuration={currentDuration}
                        zoom={zoom}
                    />
                </Row>
            </Column>
            <Row
                style={{
                    backgroundColor: 'var(--background-color-medium)',
                    height: timelineToolsHeight, 
                    padding: '2rem', 
                    alignItems: 'center',
                    justifyContent: 'space-between'
            }}>
                <TimelineToolbar
                    zoom={zoom}
                    setZoom={setZoom}
                />
                {!props.isMobile &&                
                    <TimelineInfo
                        currentDuration={currentDuration}
                    />
                }
            </Row>
        </Column>
    );
}
 
export default Timeline;