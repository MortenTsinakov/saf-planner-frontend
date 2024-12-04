import './Button.css';

const FilledButton = ({children, style, color, ...props}) => {
    return (
        <button
            className={`button-filled color-${color}`}
            style={style}
            {...props}
        >
            {children}
        </button>
    );
}
 
export default FilledButton;