import { Column, IconButton } from "components";
import { useState } from "react";
import { MdArrowRight, MdDelete, MdDownload, MdLightbulb, MdSave, MdZoomIn, MdZoomOut } from "react-icons/md";
import ScriptModeMenu from "./ScriptModeMenu";
import { useProjectStore } from "stores";
import { useAlerts } from "hooks";

const ScriptwriterToolbar = ({handleZoomIn, handleZoomOut, handleSave, changeMode, handleShowTips}) => {

    const project = useProjectStore((state) => state.project);
    const screenplay = useProjectStore((state) => state.screenplay);
    const downloadScreenplayAsPDF = useProjectStore((state) => state.downloadScreenplayAsPDF);
    const {addAlert} = useAlerts();
    const [showModeOptions, setShowModeOptions] = useState(false);
    
    const handleCloseModeOptions = () => {
        setShowModeOptions(false);
    }

    const getNormalizedFilename = () => {
        let filename = "";
        const title = project.title.toLowerCase();

        for (let i = 0; i < title.length; i++) {
            const code = title.charCodeAt(i);
            // If character is not alphanumeric then replace it with a -
            if (!(code > 47 && code < 58) &&
                !(code > 96 && code < 123)) {
                    filename += "-"
            } else {
                filename += title.charAt(i);
            }
        }

        return filename;
    }

    const handleDownloadScreenplayClick = async () => {
        if (!screenplay || !screenplay.id) {
            addAlert("Screenplay hasn't been saved and can't be downloaded", "error");
            return;
        }

        try {
            const blob = await downloadScreenplayAsPDF(screenplay.id);
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `${getNormalizedFilename()}.pdf`;
            link.click();
    
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.log(err);
            addAlert("Download failed", "error");
        }
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
        </Column>
    );
}
 
export default ScriptwriterToolbar;