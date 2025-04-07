import { getElementStyle } from 'utils';
import './ScriptContent.css';

const ScriptContent = ({...props}) => {
    return (
        <div
            className={`script-content ${props.mode}`}
            style={getElementStyle(props.mode, props.zoom)}
            {...props.attributes}
        >
            {props.children}
        </div>
    );
}
 
export default ScriptContent;