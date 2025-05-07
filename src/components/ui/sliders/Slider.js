import { useState } from 'react';


const Slider = ({minValue, maxValue, initialValue, setValueFn}) => {

    const [sliderValue, setSliderValue] = useState(initialValue || 50);

    const handleChange = (e) => {
        const newValue = e.target.valueAsNumber;
        setSliderValue(newValue);
        setValueFn(newValue);
    }

    return (
        <input
            type='range'
            min={minValue}
            max={maxValue}
            value={sliderValue}
            onChange={e => handleChange(e)}
        />
    );
}
 
export default Slider;