import { Column, Row, TextButton, Typography } from "components";

const ScriptModeMenu = ({changeMode, handleCloseMenu}) => {

    const handleModeChange = (mode) => {
        const newMode = mode.toLowerCase()
        changeMode(newMode);
        handleCloseMenu();
    }

    const getButton = (mode, shortcut) => {
        return (
            <TextButton
                onClick={(e) => handleModeChange(mode)}
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
                left: 60,
                top: 0,
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