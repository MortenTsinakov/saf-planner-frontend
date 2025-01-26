import { Column, Row } from 'components';
import { useProject } from 'hooks';
import TimelineItem from './TimelineItem';
import { useEffect, useState } from 'react';
import { DEFAULT_ZOOM, PIXELS_PER_SECOND, TIMELINE_BAR_HEIGHT, TIMELINE_ITEM_HEIGHT, TIMELINE_MARKING_HEIGHT, TIMELINE_TOOLBAR_HEIGHT } from './TimelineConstants';
import TimelineMarkings from './TimelineMarkings';
import TimelineToolbar from './TimelineToolbar';
import TimelineInfo from './TimelineInfo';

const Timeline = ({timelineHeight, ...props}) => {

    const {project, fragments} = useProject();
    const [zoom, setZoom] = useState(DEFAULT_ZOOM);
    const [showEstimatedDuration, setShowEstimatedDuration] = useState(false);

    const [windowWidth, setWindowWidth] = useState(document.documentElement.clientWidth);

    const currentDuration = fragments.reduce((partialSum, a) => a.onTimeline ? partialSum + a.durationInSeconds : partialSum, 0);
    const estimatedDuration = project && project.estimatedLengthInSeconds ? project.estimatedLengthInSeconds : 0;
    const maxTimelineWidth = Math.max(estimatedDuration + 30, currentDuration + 30, windowWidth / (PIXELS_PER_SECOND * zoom)) * PIXELS_PER_SECOND * zoom;

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(document.documentElement.clientWidth);
        }

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);
    
    return (
        <Column
            style={{
                gap: 0,
                height: timelineHeight,
            }}
        >

            {/* Timeline */}

            <Column
                style={{
                    height: TIMELINE_BAR_HEIGHT,
                    padding: '2rem 0 0 2rem',
                    backgroundColor: 'var(--background-color-medium)',
                    justifyContent: 'start',
                    overflowX: 'auto',
                }}
            >
                <Row
                    style={{
                        height: TIMELINE_ITEM_HEIGHT,
                        minWidth: '100%',
                        width: maxTimelineWidth,
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
                        height: TIMELINE_MARKING_HEIGHT
                    }}
                >
                    <TimelineMarkings
                        maxTimelineWidth={maxTimelineWidth}
                        showEstimatedDuration={showEstimatedDuration}
                        zoom={zoom}
                    />
                </Row>
            </Column>

            {/* Timeline toolbar */}
            
            <Row
                style={{
                    backgroundColor: 'var(--background-color-medium)',
                    height: TIMELINE_TOOLBAR_HEIGHT, 
                    padding: '2rem', 
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderTop: '1px solid var(--main-gray)'
            }}>
                <TimelineToolbar
                    zoom={zoom}
                    setZoom={setZoom}
                    showEstimatedDuration={showEstimatedDuration}
                    setShowEstimatedDuration={setShowEstimatedDuration}
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