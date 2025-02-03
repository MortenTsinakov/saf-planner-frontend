import { adjustLightness, isColorLight } from 'utils';
import './Label.css';


const Label = ({children, style, color, ...props}) => {

    const isLight = isColorLight(color);
    const textColor = isLight ? adjustLightness(color, -40) : adjustLightness(color, 40);

    return (
        <div
            className="label"
            style={{
                ...style,
                backgroundColor: color,
                color: textColor,
                border: `1px solid ${color}`,
            }}
            {...props}
        >
            {children}
        </div>
    );
}
 
export default Label;