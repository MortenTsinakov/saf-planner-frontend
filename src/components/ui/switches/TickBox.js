import { MdOutlineCheck } from 'react-icons/md';
import './Switch.css';


const TickBox = ({selected, size, style, ...props}) => {
    return (
        <div 
            className={`tickbox ${selected ? 'selected' : ''}`}
            style={{
                ...style,
                height: size,
                width: size,
            }}
            {...props}
        >
            {
                selected &&
                <MdOutlineCheck
                    className='tickbox-tick'
                />
            }
        </div>
    );
}
 
export default TickBox;