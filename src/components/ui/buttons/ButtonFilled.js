import './Button.css';

const ButtonFilled = ({children, style, $color, ...props}) => {
    return (
        <button
            className={`button-filled color-${$color}`}
            style={style}
            {...props}
        >
            {children}
        </button>
    );
}
 
export default ButtonFilled;