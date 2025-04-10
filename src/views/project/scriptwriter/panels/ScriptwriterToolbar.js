import { Column, IconButton } from "components";
import { useState } from "react";
import { MdArrowRight, MdDelete, MdDownload, MdLightbulb, MdSave, MdZoomIn, MdZoomOut } from "react-icons/md";
import ScriptModeMenu from "./ScriptModeMenu";

const ScriptwriterToolbar = ({handleZoomIn, handleZoomOut, handleSave, changeMode}) => {

    const [showModeOptions, setShowModeOptions] = useState(false);
    
    const handleCloseModeOptions = () => {
        setShowModeOptions(false);
    }

    return (
        <Column
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0 25px',
            }}
        >
            <Column
                style={{
                    height: 'fit-content',
                    padding: '25px 0',
                    backgroundColor: 'var(--background-color-high',
                    border: '1px solid var(--main-gray)',
                    borderRadius: 10,
                    position: 'relative',
                }}
            >
                <Column>
                    <IconButton
                        icon={<MdArrowRight />}
                        onClick={() => setShowModeOptions(!showModeOptions)}
                    />
                    {
                        showModeOptions &&
                        <ScriptModeMenu
                            changeMode={changeMode}
                            handleCloseMenu={handleCloseModeOptions}
                        />
                    }
                </Column>
                <IconButton
                    icon={<MdZoomIn />}
                    title="Zoom in"
                    onClick={handleZoomIn}
                />
                <IconButton
                    icon={<MdZoomOut />}
                    title="Zoom out"
                    onClick={handleZoomOut}
                />
                <IconButton
                    icon={<MdSave />}
                    title="Save script"
                    onClick={handleSave}
                />
                <IconButton
                    icon={<MdDownload />}
                    title="Export PDF"
                />
                <IconButton
                    icon={<MdDelete />}
                    title="Delete script"
                />
                <IconButton
                    icon={<MdLightbulb />}
                    title="Display instruction panel"
                />
            </Column>
        </Column>
    );
}
 
export default ScriptwriterToolbar;