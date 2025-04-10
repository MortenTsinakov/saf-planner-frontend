import { Row } from "components";
import FragmentSelectionPanel from "./panels/FragmentSelectionPanel";
import ScriptwriterPanel from "./panels/ScriptwriterPanel";
import { useProjectStore } from "stores";
import { useEffect } from "react";

const Scriptwriter = () => {

    console.log("Scriptwriter rendered");

    const filteredFragments = useProjectStore((state) => state.filteredFragments);
    const fetchScreenplay = useProjectStore((state) => state.fetchScreenplay);

    useEffect(() => {
        const getScreenplay = async() => {
            fetchScreenplay();
        }
        getScreenplay();
    }, [fetchScreenplay]);

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
                {
                    filteredFragments.length > 0 &&
                    <FragmentSelectionPanel />
                }
                <ScriptwriterPanel />
            </Row>
        </Row>
    );
}
 
export default Scriptwriter;