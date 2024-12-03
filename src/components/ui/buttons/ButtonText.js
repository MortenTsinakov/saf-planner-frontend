import './Button.css';

const ButtonText = ({children, style, $color, ...props}) => {
    return (
        <button
            className={`button-text color-${$color}`}
            style={style}
            {...props}
        >
            {children}
        </button>
    );
}
 
export default ButtonText;