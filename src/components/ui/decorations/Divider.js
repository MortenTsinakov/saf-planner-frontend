import './Decoration.css';


const Divider = ({style, ...props}) => {
    return (
        <div className="divider" style={style} {...props}></div>
    );
}
 
export default Divider;