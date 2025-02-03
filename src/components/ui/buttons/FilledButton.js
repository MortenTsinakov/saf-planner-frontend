import './Button.css';

const FilledButton = ({children, style, color, disabled, ...props}) => {
    return (
        <button
            className={`button-filled color-${color ? color : 'primary'}`}
            style={style}
            {...props}
        >
            {children}
        </button>
    );
}
 
export default FilledButton;