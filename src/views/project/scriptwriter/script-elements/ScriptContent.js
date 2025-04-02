import './ScriptContent.css';

const ScriptContent = ({...props}) => {
    return (
        <div className={`script-content ${props.mode}`} {...props.attributes}>
            {props.children}
        </div>
    );
}
 
export default ScriptContent;