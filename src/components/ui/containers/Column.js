import { forwardRef } from 'react';
import './Container.css';

const Column = forwardRef(({children, style, dataref, ...props}, ref) => {
    return (
        <div
            ref={ref}
            className="column"
            style={style}
            {...props}
        >
            {children}
        </div>
    );
});
 
export default Column;