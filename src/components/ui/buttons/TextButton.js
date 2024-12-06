import './Button.css';

const TextButton = ({children, style, color, ...props}) => {
    return (
        <button
            className={`button-text color-${color ? color : 'primary'}`}
            style={style}
            {...props}
        >
            {children}
        </button>
    );
}
 
export default TextButton;