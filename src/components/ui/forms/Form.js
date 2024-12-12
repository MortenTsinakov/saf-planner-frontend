import './Form.css';


const Form = ({children, ariaLabel, style, ...props}) => {
    return (
        <form
            className="custom-form"
            style={style} {...props}
            aria-label={ariaLabel}
        >
            {children}
        </form>
    );
}
 
export default Form;