import { Column, DropdownMenu, IconButton, Row, Typography } from "components";
import { useState } from "react";
import { MdDarkMode, MdDownload, MdSave, MdTipsAndUpdates, MdZoomIn, MdZoomOut } from "react-icons/md";

const ScriptwriterModeToolbar = ({
    iconStyle,
    scriptEditorSettings,
    setScriptEditorSettings,
}) => {

    const [modeDropdownIsOpen, setModeDropdownIsOpen] = useState(false);

    const handleZoomIn = () => {
        const zoom = Math.min(2, scriptEditorSettings.zoom + 0.25);
        setScriptEditorSettings({
            ...scriptEditorSettings,
            zoom: zoom,
        });
    }

    const handleZoomOut = () => {
        const zoom = Math.max(0.5, scriptEditorSettings.zoom - 0.25);
        setScriptEditorSettings({
            ...scriptEditorSettings,
            zoom: zoom,
        });
    }

    return (
        <Row>
            <IconButton
                icon={<MdSave />}
                style={iconStyle}
                title='Save script (Ctrl + S)'
            />
            <IconButton
                icon={<MdDownload />}
                style={iconStyle}
                title='Download PDF'
            />
            <IconButton
                icon={<MdDarkMode />}
                style={iconStyle}
                title='Change editor theme'
            />
            <IconButton
                icon={<MdZoomIn />}
                style={iconStyle}
                title='Zoom in on script'
                onClick={handleZoomIn}
            />
            <IconButton
                icon={<MdZoomOut />}
                style={iconStyle}
                title='Zoom out on script'
                onClick={handleZoomOut}
            />
            <Column
                style={{
                    position: 'relative',
                    borderBottom: '1px solid var(--text-color)',
                    width: 120,
                    textAlign: 'center',
                    cursor: 'pointer'
                }}
                onMouseLeave={() =>  setModeDropdownIsOpen(false)}
                onClick={() => setModeDropdownIsOpen(!modeDropdownIsOpen)}
                title='Script mode'
            >
                <Typography>
                    {scriptEditorSettings.mode}
                </Typography>
                {
                    modeDropdownIsOpen &&
                    <DropdownMenu style={{width: 300, padding: '2rem'}}>
                        <Column>
                            <MdTipsAndUpdates
                                style={{
                                    color: 'var(--color-warning)',
                                    fontSize: '3rem'
                                }}
                            />
                            <Typography
                                style={{textAlign: 'left'}}
                            >
                                You can select the mode by right clicking on the editor
                            </Typography>
                        </Column>
                    </DropdownMenu>
                }
            </Column>
        </Row>
    );
}
 
export default ScriptwriterModeToolbar;