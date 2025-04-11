const IconButton = ({icon, style, ...props}) => {
    return (
        <button
            className='button-icon'
            type="button"
            style={style}
            {...props}
        >
            {icon}
        </button>
    );
}
 
export default IconButton;