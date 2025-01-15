import './Switch.css';


const Switch = ({selected, ...props}) => {
    return (
        <div className={`switch ${selected ? 'selected' : ''}`} {...props}>
            <div className={`switch-selector ${selected ? 'selected' : ''}`}/>
        </div>
    );
}
 
export default Switch;