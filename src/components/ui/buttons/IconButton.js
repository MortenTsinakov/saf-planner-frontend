const IconButton = ({icon, style, ...props}) => {
    return (
        <button
            className='button-icon'
            style={style}
            {...props}
        >
            {icon}
        </button>
    );
}
 
export default IconButton;