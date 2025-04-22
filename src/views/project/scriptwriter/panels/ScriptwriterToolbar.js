import { Column, IconButton } from "components";
import { useState } from "react";
import { MdArrowRight, MdDelete, MdDownload, MdLightbulb, MdSave, MdZoomIn, MdZoomOut } from "react-icons/md";
import ScriptModeMenu from "./ScriptModeMenu";
import { useProjectStore } from "stores";
import { useAlerts } from "hooks";
import ScreenplayExportPanel from "./ScreenplayExportPanel";

const ScriptwriterToolbar = ({handleZoomIn, handleZoomOut, handleSave, changeMode, handleShowTips}) => {

    const screenplay = useProjectStore((state) => state.screenplay);
    const {addAlert} = useAlerts();
    const [showModeOptions, setShowModeOptions] = useState(false);
    const [exportPanelIsOpen, setExportPanelIsOpen] = useState(false);
    
    const handleCloseModeOptions = () => {
        setShowModeOptions(false);
    }

    const handleDownloadScreenplayClick = async () => {
        if (!screenplay || !screenplay.id) {
            addAlert("Screenplay hasn't been saved and can't be downloaded", "error");
            return;
        }

        setExportPanelIsOpen(true);
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
                    onClick={handleDownloadScreenplayClick}
                />
                <IconButton
                    icon={<MdDelete />}
                    title="Delete script"
                />
                <IconButton
                    icon={<MdLightbulb />}
                    title="Display instruction panel"
                    onClick={handleShowTips}
                />
            </Column>
            <ScreenplayExportPanel
                exportPanelIsOpen={exportPanelIsOpen}
                setExportPanelIsOpen={setExportPanelIsOpen}
            />
        </Column>
    );
}
 
export default ScriptwriterToolbar;