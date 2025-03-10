import './Decoration.css';


const Divider = ({style, horizontal=true, ...props}) => {
    return (
        <div className={`divider ${!horizontal && 'vertical'}`} style={style} {...props}></div>
    );
}
 
export default Divider;