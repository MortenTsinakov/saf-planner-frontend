import { Column, Typography } from "components";
import { useSharedProject } from "hooks";
import { useEffect, useRef, useState } from "react";
import { MdOutlineAccessTime } from "react-icons/md";
import { formatSecondsToHMS } from "utils";

const SharedProjectLongDescriptions = ({activeFragmentIdx, setActiveFragmentIdx}) => {

    const {project, fragments} = useSharedProject();
    const containerRef = useRef(null);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        const activeFragment = document.getElementById(`long-description-${fragments[activeFragmentIdx].id}`);
        if (activeFragment) {
            activeFragment.scrollIntoView({behavior: 'smooth', block: 'center'});
        }
    }, [activeFragmentIdx, fragments]);

    useEffect(() => {
        const handleScroll = (event) => {
            if (containerRef.current.scrollTop + containerRef.current.offsetHeight>= containerRef.current.scrollHeight) {
                const scroll = event.deltaY;
                if (scroll > 25) {
                    setActiveFragmentIdx(Math.min(activeFragmentIdx + 1, fragments.length - 1));
                }
            } else if (containerRef.current.scrollTop <= 0) {
                const scroll = event.deltaY;
                if (scroll < -25) {
                    setActiveFragmentIdx(Math.max(activeFragmentIdx - 1, 0));
                }
            } else {
                const activeItem = document.getElementById(`long-description-${fragments[activeFragmentIdx].id}`);
                const container = containerRef.current;
                const containerTop = container.getBoundingClientRect().y;
                const containerBottom = containerTop + container.getBoundingClientRect().height;
                if (activeItem) {
                    const top = activeItem.getBoundingClientRect().y;
                    const bottom = activeItem.getBoundingClientRect().y + activeItem.getBoundingClientRect().height;
                    
                    if (top < containerTop) {
                        setActiveFragmentIdx(Math.min(activeFragmentIdx + 1, fragments.length - 1));
                    } else if (bottom > containerBottom) {
                        setActiveFragmentIdx(Math.max(activeFragmentIdx - 1, 0));

                    }
                }
            }
        }

        const currentContainer = containerRef.current;
        if (currentContainer) {
            currentContainer.addEventListener("wheel", handleScroll);
        }
        return () => {
            if (currentContainer) {
                currentContainer.removeEventListener("wheel", handleScroll);
            }
        }
    }, [activeFragmentIdx, setActiveFragmentIdx, fragments]);

    useEffect(() => {
        const calculateDuration = () => {
            let durationInSeconds = 0;
            for (const f of fragments) {
                durationInSeconds += f.durationInSeconds;
            }
            setDuration(formatSecondsToHMS(durationInSeconds));
        }

        calculateDuration();
    }, [fragments]);

    return (
        <div
            ref={containerRef}
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
                overflowY: 'auto',
                flex: 0.35,
                padding: '3rem',
            }}
        >
            <Column style={{alignItems: 'center', gap: '1rem'}}>
                <Typography
                    fontSize='medium'
                    style={{
                        textAlign: 'center',
                    }}
                >
                    {project.title}
                </Typography>
                <Typography
                    fontSize='extrasmall'
                    color='label'
                >
                    <MdOutlineAccessTime />
                    {duration}
                </Typography>
            </Column>
            {
                fragments.map((f, index) => (
                    <Column
                        key={f.id}
                        id={`long-description-${f.id}`}
                        onClick={() => setActiveFragmentIdx(index)}
                    >
                        <Typography
                            color={index === activeFragmentIdx ? 'text' : 'label'}
                        >
                            {f.longDescription}
                        </Typography>
                    </Column>
                ))
            }
        </div>
    );
}
 
export default SharedProjectLongDescriptions;