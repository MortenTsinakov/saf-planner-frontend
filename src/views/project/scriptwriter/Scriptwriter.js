import { Row } from "components";
import FragmentSelectionPanel from "./panels/FragmentSelectionPanel";
import CurrentFragmentPanel from "./panels/CurrentFragmentPanel";
import ScriptwriterPanel from "./panels/ScriptwriterPanel";
import { useState } from "react";

const Scriptwriter = () => {

    const [selectedFragmentIdx, setSelectedFragmentIdx] = useState(0);

    return (
        <Row
            style={{
                height: '100%',
                overflow: 'hidden',
                flexWrap: 'wrap',
            }}
        >
            <FragmentSelectionPanel
                selectedFragmentIdx={selectedFragmentIdx}
                setSelectedFragmentIdx={setSelectedFragmentIdx}
            />
            <CurrentFragmentPanel
                selectedFragmentIdx={selectedFragmentIdx}
            />
            <ScriptwriterPanel
                selectedFragmentIdx={selectedFragmentIdx}
            />
        </Row>
    );
}
 
export default Scriptwriter;