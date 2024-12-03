import './Container.css';

const Row = ({children, style, ...props}) => {
    return (
        <div className="row" style={style} {...props}>
            {children}
        </div>
    );
}
 
export default Row;