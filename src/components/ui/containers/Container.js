import './Container.css';


const Container = ({children, style, ...props}) => {
    return (
        <div className="container" style={style} {...props}>
            {children}
        </div>
    );
}
 
export default Container;