import './Container.css';

const Column = ({children, style, ...props}) => {
    return (
        <div
            className="column"
            style={style}
            {...props}
        >
            {children}
        </div>
    );
}
 
export default Column;