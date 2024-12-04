import './Typography.css';

const Typography = ({fontSize,
                     color,
                     style,
                     children,
                     ...props}) => {

    return (
        <span className={`typography font-size-${fontSize} color-${color}`} style={style} {...props}>
            {children}
        </span>
    );
}
 
export default Typography;