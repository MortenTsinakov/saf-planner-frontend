import './Input.css';


const InputField = ({style,
                     label,
                     type,
                     value,
                     placeholder,
                     onChange,
                     ...props}) => {
    return (
        <div className='input-field-container'{...props}>
            <label className="input-field-label">{label}</label>
            <input
                className="input-field-input"
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}
 
export default InputField;