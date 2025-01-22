import { forwardRef } from 'react';
import './Container.css';


const Container = forwardRef(({children, style, ...props}, ref) => {
    return (
        <div
            className="container"
            ref={ref}
            style={style}
            {...props}
        >
            {children}
        </div>
    );
});
 
export default Container;