import './Card.css';


const Card = ({style, children, ...props}) => {
    return (
        <div
            className="card"
            style={style}
            {...props}
        >
            {children}
        </div>
    );
}
 
export default Card;