import { useRef, useState } from 'react';
import './Slider.css';


const Slider = ({minValue, maxValue, initialValue, setValueFn}) => {

    const sliderRef = useRef();
    const [isDragged, setIsDragged] = useState(false);
    const [sliderValue, setSliderValue] = useState(initialValue || 50);

    const getValue = (e) => {
        const rect = sliderRef.current.getBoundingClientRect();
        const containerLeft = rect.x;
        const containerRight = containerLeft + rect.width;

        const newPosition = e.clientX - containerLeft;
        const newPositionPercentage = (newPosition / (containerRight - containerLeft)) * 100;
        
        return Math.floor(Math.max(1, Math.min(100, newPositionPercentage)));
    } 

    const handleDrag = (e) => {
        if (!isDragged) {
            return;
        }
        if (sliderRef === null) {
            return;
        }
        setSliderValue(getValue(e));
    }

    const handleDragEnd = () => {
        setIsDragged(false);
        
        const range = maxValue - minValue;
        const newValue = Math.floor(minValue + (range * sliderValue) / 100);
        setValueFn(newValue);
    }

    return (
        <div
            className='slider-container'
            ref={sliderRef}
            onMouseDown={() => setIsDragged(true)}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onMouseMove={handleDrag}
        >
            <div
                className='slider-thumb'
                style={{
                    backgroundColor: isDragged ? 'var(--primary-color)' : 'var(--text-color)',
                    // left: `calc(${sliderValue}px - 0.75rem)`,
                    left: `calc(${sliderValue}% - 0.75rem)`,
                }}
            />
            <div className='slider-line' />
        </div>
    );
}
 
export default Slider;