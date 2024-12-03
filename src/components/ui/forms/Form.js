import './Form.css';


const Form = ({children, style, ...props}) => {
    return (
        <form className="custom-form" style={style} {...props}>
            {children}
        </form>
    );
}
 
export default Form;