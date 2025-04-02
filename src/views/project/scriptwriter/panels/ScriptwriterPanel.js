import { Column, Typography } from "components";
import React, { useState } from "react";
import { withHistory } from "slate-history";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";
import { createEditor } from 'slate';
import ScriptElement from "../script-elements/ScriptElement";
import ScriptContent from "../script-elements/ScriptContent";
import { addBlock, changeBlockType, getElementTypeAtCursor } from "utils";

const ScriptwriterPanel = ({fragments}) => {

    const [editor] = useState(() => withHistory(withReact(createEditor())));
    const defaultValue = [
        {
            type: 'scene',
            id: 1,
            children: [
                { type: 'header', children: [{ text: 'fade in:' }] },
                { type: 'action', children: [{ text: 'action sequence'}]},
            ],
        },
    ];
    const [scenes, setScenes] = useState(defaultValue);
    const [mode, setMode] = useState('header');

    const EditableWithRef = React.forwardRef((props, ref) => (
        <Editable {...props} ref={ref} />
    ));

    const scriptPageStyle = {
        height: "100%",
        width: "210mm",
        paddingLeft: "1.5in",
        paddingRight: "1in",
        paddingTop: "1in",
        paddingBottom: "1in",
        fontFamily: "'Courier New', Courier, monospace",
        fontSize: "12pt",
        backgroundColor: "white",
        overflow: "auto",
    }

    /**
     * Render script blocks.
     */
    const renderElement = ({element, attributes, children, path}) => {
        const props = {
            element: element,
            attributes:  attributes,
            children: children,
            editor: editor,
        }

        switch (element.type) {
            case 'scene':
                return <ScriptElement {...props} />
            case 'header':
                return <ScriptContent {...props} mode={"header"} />
            case 'action':
                return <ScriptContent {...props} mode={"action"} />
            case 'character':
                return <ScriptContent {...props} mode={"character"} />
            case 'parenthetical':
                return <ScriptContent {...props} mode={"parenthetical"} />
            case 'dialogue':
                return <ScriptContent {...props} mode={"dialogue"} />
            case 'transition':
                return <ScriptContent {...props} mode={"transition"} />
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
        switch (mode) {
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
        setMode(automaticMode);
        console.log(scenes);
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
            case 'Enter':
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
        
        changeBlockType(editor, requestedMode);
        setMode(requestedMode);
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

    const handleKeyUp = (event) => {
        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            determineMode();
        }
    }

    const handleClick = () => {
        determineMode();
    }

    const determineMode = () => {
        const currentMode = getElementTypeAtCursor(editor);
        setMode(currentMode);
    }

    const handleEditorChange = (newValue) => {
        setScenes(newValue);
    }

    return (
        <Column
        style={{
            padding: '3rem',
            overflowY: 'auto',
            backgroundColor: 'var(--background-color-medium)',
            gap: '2rem',
            alignItems: 'center',
        }}
        >
            <Typography>{mode}</Typography>
            <Slate
                editor={editor}
                initialValue={scenes}
                onChange={newValue => handleEditorChange(newValue)}
            >
                <EditableWithRef
                    renderElement={(props) =>  renderElement({...props, path:
                        ReactEditor.findPath(editor, props.element)
                    })}
                    style={scriptPageStyle}
                    onKeyDown={event => handleKeyDown(event)}
                    onKeyUp={handleKeyUp}
                    onClick={handleClick}
                />
            </Slate>
        </Column>
    );
}
 
export default ScriptwriterPanel;