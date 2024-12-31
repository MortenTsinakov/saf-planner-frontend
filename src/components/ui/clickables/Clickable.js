import './Clickable.css';


const Clickable = ({style, children, ...props}) => {
    return (
        <div
            className="clickable"
            style={style}
            {...props}
        >
            {children}
        </div>
    );
}
 
export default Clickable;