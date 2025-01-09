import './Input.css';


const InputArea = ({style,
                    label,
                    type,
                    value,
                    color,
                    placeholder,
                    onChange,
                    ...props}) => {
    return (
        <div className='input-area-container'{...props}>
            <label className="input-area-label">{label}</label>
            <textarea
                className={`input-area-input color-${color ? color : 'primary'}`}
                style={style}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}
 
export default InputArea;