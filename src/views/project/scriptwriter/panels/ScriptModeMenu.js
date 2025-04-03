import { Column, Row, TextButton, Typography } from "components";

const ScriptModeMenu = ({x, y, handleCloseMenu, scriptEditorSettings, setScriptEditorSettings, changeMode}) => {

    const handleModeChange = (mode) => {
        const newMode = mode.toLowerCase()
        changeMode(newMode);
        setScriptEditorSettings({
            ...scriptEditorSettings,
            mode: newMode,
        })
        handleCloseMenu();
    }

    const getButton = (mode, shortcut) => {
        return (
            <TextButton
                onClick={(event) => handleModeChange(mode)}
            >
                <Row
                    style={{
                        justifyContent: 'space-between'
                    }}
                >
                    <Typography>
                        {mode}
                    </Typography>
                    <Typography color='label' fontSize='extrasmall'>
                        {shortcut}
                    </Typography>
                </Row>
            </TextButton>
        );
    }

    return (
        <Column
            onMouseLeave={handleCloseMenu}
            style={{
                position: 'absolute',
                left: x,
                top: y,
                backgroundColor: 'var(--background-color-low)',
                padding: '2rem',
                borderRadius: '10px',
                border: '1px solid var(--main-gray)',
                minWidth: '250px',
                zIndex: 1,
            }}
        >
            {getButton("Header", "Alt + H")}
            {getButton("Action", "Alt + A")}
            {getButton("Character", "Alt + C")}
            {getButton("Parenthetical", "Alt + P")}
            {getButton("Dialogue", "Alt + D")}
            {getButton("Transition", "Alt + T")}
        </Column>
    );
}
 
export default ScriptModeMenu;