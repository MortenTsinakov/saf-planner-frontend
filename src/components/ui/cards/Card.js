import { forwardRef } from 'react';
import './Card.css';


const Card = forwardRef(({style, children, ...props}, ref) => {
    return (
        <div
            ref={ref}
            className="card"
            style={style}
            {...props}
        >
            {children}
        </div>
    );
});
 
export default Card;