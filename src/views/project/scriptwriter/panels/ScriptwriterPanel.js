import { Column, Loading } from "components";
import React, { useEffect, useRef, useState } from "react";
import { withHistory } from "slate-history";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";
import { createEditor } from 'slate';
import ScriptElement from "../script-elements/ScriptElement";
import ScriptContent from "../script-elements/ScriptContent";
import { addBlock, changeBlockType, getElementTypeAtCursor } from "utils";
import ScriptModeMenu from "./ScriptModeMenu";
import { useProjectStore } from "stores";

const ScriptwriterPanel = ({
    scriptEditorSettings,
    setScriptEditorSettings,
}) => {

    const [editor] = useState(() => withHistory(withReact(createEditor())));
    const editorRef = useRef(null);

    const {fetchScreenplay, currentScreenplay, setCurrentScreenplay, loading} = useProjectStore();
    const [menuState, setMenuState] = useState({visible: false, x: 0, y: 0});

    useEffect(() => {
        const getScreenplay = async() => {
            fetchScreenplay();
        }
        getScreenplay();
    }, [fetchScreenplay]);

    if (loading) {
        return (
            <Column>
                <Loading />
            </Column>
        );
    }

    const EditableWithRef = React.forwardRef((props, _) => (
        <Editable {...props} ref={editorRef} />
    ));

    const scriptPageStyle = {
        margin: 'auto',
        height: "100%",
        width: `${210 * scriptEditorSettings.zoom}mm`,
        paddingLeft: `${1.5 * scriptEditorSettings.zoom}in`,
        paddingRight: `${1 * scriptEditorSettings.zoom}in`,
        paddingTop: `${1 * scriptEditorSettings.zoom}in`,
        paddingBottom: `${1 * scriptEditorSettings.zoom}in`,
        fontFamily: "'Courier New', Courier, monospace",
        fontSize: `${12 * scriptEditorSettings.zoom}pt`,
        backgroundColor: "white",
        outline: 'none',
        overflow: "auto",
    }

    /**
     * Render script blocks.
     */
    const renderElement = ({element, attributes, children}) => {
        const props = {
            element: element,
            attributes:  attributes,
            children: children,
            editor: editor,
        }

        switch (element.type) {
            case 'screenplay':
                return <ScriptElement {...props} />
            case 'header':
                return <ScriptContent {...props} mode={"header"} zoom={scriptEditorSettings.zoom}/>
            case 'action':
                return <ScriptContent {...props} mode={"action"} zoom={scriptEditorSettings.zoom}/>
            case 'character':
                return <ScriptContent {...props} mode={"character"} zoom={scriptEditorSettings.zoom}/>
            case 'parenthetical':
                return <ScriptContent {...props} mode={"parenthetical"} zoom={scriptEditorSettings.zoom}/>
            case 'dialogue':
                return <ScriptContent {...props} mode={"dialogue"} zoom={scriptEditorSettings.zoom}/>
            case 'transition':
                return <ScriptContent {...props} mode={"transition"} zoom={scriptEditorSettings.zoom}/>
            default:
                return;
        }
    }

    /**
     * Create a new block and automatically change mode according to
     * which would be the most logical to use next.
     */
    const handleEnterPress = (event) => {
        event.preventDefault();
        let automaticMode;
        switch (scriptEditorSettings.mode) {
            case 'header':
                automaticMode = 'action';
                break;
            case 'action':
                automaticMode = 'action';
                break;
            case 'character':
                automaticMode = 'dialogue';
                break;
            case 'parenthetical':
                automaticMode = 'dialogue';
                break;
            case 'dialogue':
                automaticMode = 'character';
                break;
            case 'transition':
                automaticMode = 'header';
                break;
            default:
                return;
        }

        addBlock(editor, automaticMode);
        setScriptEditorSettings((prev) => ({
            ...prev,
            mode: automaticMode,
        }));
    }

    /**
     * Handle alt + <some key> shortcuts for
     * selecting a mode.
     */
    const handleModeShortcutPress = (event) => {
        event.preventDefault();
        event.stopPropagation();
        let requestedMode;
        const key = event.key;
        switch (key) {
            case 'h':
                requestedMode = "header";
                break
            case 'a':
                requestedMode = "action";
                break
            case 'c':
                requestedMode = "character";
                break
            case 'p':
                requestedMode = "parenthetical";
                break;
            case 'd':
                requestedMode = "dialogue";
                break;
            case 't':
                requestedMode = 'transition';
                break;
            default:
                return;
        }
        
        changeMode(requestedMode);
        setScriptEditorSettings((prev) => ({
            ...prev,
            mode: requestedMode,
        }));
    }

    /**
     * Either create and jump to a new block
     * or change the mode.
     */
    const handleKeyDown = (event) => {
        if (event.altKey) {
            handleModeShortcutPress(event);
        } else if (event.key === "Enter") {
            handleEnterPress(event);
        }
    }

    const handleSelectionChange = () => {
        setMenuState((prev) => ({
            ...prev,
            visible: false,
        }));
        determineMode();
    }

    const determineMode = () => {
        const currentMode = getElementTypeAtCursor(editor);
        setScriptEditorSettings((prev) => ({
            ...prev,
            mode: currentMode,
        }));
    }

    const handleCloseMenu = () => {
        setMenuState((prev) => ({
            ...prev,
            visible: false,
        }))
    }

    const changeMode = (toMode) => {
        changeBlockType(editor, toMode);
        editorRef.current?.focus();
    }

    const handleContextMenu = (event) => {
        event.preventDefault();
        const x = event.pageX;
        const y = event.pageY;
        setMenuState({
            visible: true,
            x: x,
            y: y,
        })
    }

    return (
        <Slate
            editor={editor}
            initialValue={[currentScreenplay]}
            onChange={(s) => setCurrentScreenplay(s[0])}
            onSelectionChange={handleSelectionChange}
        >
            <Column
                style={{
                    flex: 1,
                    overflow: 'auto',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <EditableWithRef
                    renderElement={(props) =>  renderElement({...props, path:
                        ReactEditor.findPath(editor, props.element)
                    })}
                    style={scriptPageStyle}
                    onKeyDown={handleKeyDown}
                    onContextMenu={handleContextMenu}
                />
                {menuState.visible &&
                    <ScriptModeMenu
                        x={menuState.x}
                        y={menuState.y}
                        handleCloseMenu={handleCloseMenu}
                        scriptEditorSettings={scriptEditorSettings}
                        setScriptEditorSettings={setScriptEditorSettings}
                        changeMode={changeMode}
                    />
                }
            </Column>
        </Slate>
    );
}
 
export default ScriptwriterPanel;