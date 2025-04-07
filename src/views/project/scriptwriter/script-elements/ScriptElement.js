import './ScriptElement.css';

const ScriptElement = ({...props}) => {
    return (
        <div className="script-element" {...props.attributes}>
            {props.children}
        </div>
    );
}
 
export default ScriptElement;