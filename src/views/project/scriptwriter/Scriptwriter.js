import { Row } from "components";
import FragmentSelectionPanel from "./panels/FragmentSelectionPanel";
import ScriptwriterPanel from "./panels/ScriptwriterPanel";

const Scriptwriter = ({scriptEditorSettings, setScriptEditorSettings}) => {
    return (
        <Row
            style={{
                height: '100%',
                overflow: 'hidden',
                flexWrap: 'wrap',
                width: '100%',
            }}
        >
            <Row
                style={{
                    gap: 0, 
                    height: '100%', 
                    width: '100%',

                }}
            >
                <FragmentSelectionPanel />
                <ScriptwriterPanel
                    scriptEditorSettings={scriptEditorSettings}
                    setScriptEditorSettings={setScriptEditorSettings}
                />
            </Row>
        </Row>
    );
}
 
export default Scriptwriter;