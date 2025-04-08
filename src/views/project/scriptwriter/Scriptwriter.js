import { Row } from "components";
import FragmentSelectionPanel from "./panels/FragmentSelectionPanel";
import ScriptwriterPanel from "./panels/ScriptwriterPanel";
import TipsPanel from "./panels/TipsPanel";

const Scriptwriter = ({scriptEditorSettings, setScriptEditorSettings}) => {

    return (
        <Row
            style={{
                height: '100%',
                overflow: 'hidden',
                flexWrap: 'wrap',
                width: '100%',
                position: 'relative'
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
            {
                scriptEditorSettings.tipsAreOpen && 
                <TipsPanel
                    scriptEditorSettings={scriptEditorSettings}
                    setScriptEditorSettings={setScriptEditorSettings}
                />
            }
        </Row>
    );
}
 
export default Scriptwriter;