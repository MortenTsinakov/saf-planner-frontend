import './Button.css';


const OutlineButton = ({children, style, color, ...props}) => {
    return (
        <button
            className={`button-outline color-${color ? color : 'primary'}`}
            style={style}
            {...props}
        >
            {children}
        </button>
    );
}
 
export default OutlineButton;