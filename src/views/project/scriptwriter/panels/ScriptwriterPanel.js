import { Column } from "components";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { withHistory } from "slate-history";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";
import { createEditor } from 'slate';
import ScriptElement from "../script-elements/ScriptElement";
import ScriptContent from "../script-elements/ScriptContent";
import { addBlock, changeBlockType, deleteTextFromElement, getElementTextValue, getElementTypeAtCursor } from "utils";
import { useProjectStore } from "stores";
import { useAlerts } from "hooks";
import ScriptwriterToolbar from "./ScriptwriterToolbar";
import TipsPanel from "./TipsPanel";

const ScriptwriterPanel = () => {

    const editor = useMemo(() => withHistory(withReact(createEditor())), []);
    const editorRef = useRef(null);

    const [zoom, setZoom] = useState(1);
    const [showTips, setShowTips] = useState(false);

    const currentScreenplay = useProjectStore((state) => state.currentScreenplay);
    const saveScreenplay = useProjectStore((state) => state.saveScreenplay);
    const setCurrentScreenplay = useProjectStore((state) => state.setCurrentScreenplay);
    const {addAlert} = useAlerts();

    const EditableWithRef = React.forwardRef((props, _) => (
        <Editable {...props} ref={editorRef} />
    ));

    useEffect(() => {
        return () => {
            setCurrentScreenplay(editor.children[0]);
        }
    }, [setCurrentScreenplay, editor.children]);

    const scriptPageStyle = {
        margin: 'auto',
        height: "100%",
        width: `${210 * zoom}mm`,
        paddingLeft: `${1.5 * zoom}in`,
        paddingRight: `${1 * zoom}in`,
        paddingTop: `${1 * zoom}in`,
        paddingBottom: `${1 * zoom}in`,
        fontFamily: "'Courier New', Courier, monospace",
        fontSize: `${12 * zoom}pt`,
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
                return <ScriptContent {...props} mode={"header"} zoom={zoom}/>
            case 'action':
                return <ScriptContent {...props} mode={"action"} zoom={zoom}/>
            case 'character':
                return <ScriptContent {...props} mode={"character"} zoom={zoom}/>
            case 'parenthetical':
                return <ScriptContent {...props} mode={"parenthetical"} zoom={zoom}/>
            case 'dialogue':
                return <ScriptContent {...props} mode={"dialogue"} zoom={zoom}/>
            case 'transition':
                return <ScriptContent {...props} mode={"transition"} zoom={zoom}/>
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
        const currentMode = getElementTypeAtCursor(editor);
        let automaticMode;
        switch (currentMode) {
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
                automaticMode = 'action';
                break;
            case 'transition':
                automaticMode = 'header';
                break;
            default:
                return;
        }

        addBlock(editor, automaticMode);
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
    }

    const handleSave = async () => {
        editorRef.current?.focus();

        const content = editor.children[0]
        const successfulSave = await saveScreenplay(content);

        if (successfulSave) {
            addAlert("Screenplay saved", "success");
        }
    }

    const handleZoomIn = () => {
        editorRef.current?.focus();
        const newZoom = Math.min(zoom + 0.25, 2);
        setZoom(newZoom);
    }

    const handleZoomOut = () => {
        editorRef.current?.focus();
        const newZoom = Math.max(zoom - 0.25, 0.5);
        setZoom(newZoom);
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
        } else if (event.ctrlKey && event.key === "s") {
            event.preventDefault();
            handleSave();
        } else if (event.key === "Tab") {
            event.preventDefault();
            const elementText = getElementTextValue(editor);
            if (elementText === null) {
                changeMode("character");
            }
        }
    }

    const changeMode = (toMode) => {
        editorRef.current?.focus();
        changeBlockType(editor, toMode);
        editorRef.current?.focus();
    }

    const isUpperCase = (s) => {
        return s === s.toUpperCase();
    }

    const handleAutomaticModeChange = () => {
        const elementText = getElementTextValue(editor);
        if (elementText === null) {return;}

        if (elementText.toUpperCase() === "INT." || elementText.toUpperCase() === "EXT.") {
            changeMode("header");
        } else if (elementText === "(") {
            deleteTextFromElement(editor);
            changeMode("parenthetical");
        } else if (elementText.length > 1 && isUpperCase(elementText) && elementText[elementText.length - 1] === ":") {
            changeBlockType(editor, "transition");
        }
    }

    const handleCloseTips = () => {
        setShowTips(false);
    }

    const handleOpenTips = () => {
        setShowTips(true)
    }

    return (
        <Slate
            editor={editor}
            initialValue={[currentScreenplay]}
        >
            <ScriptwriterToolbar
                handleZoomIn={handleZoomIn}
                handleZoomOut={handleZoomOut}
                handleSave={handleSave}
                changeMode={changeMode}
                handleShowTips={handleOpenTips}
            />
            <Column
                style={{
                    flex: 1,
                    overflow: 'auto',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
            <EditableWithRef
                style={scriptPageStyle}
                renderElement={(props) =>  renderElement({...props, path:
                        ReactEditor.findPath(editor, props.element)
                    })}
                onKeyDown={handleKeyDown}
                onKeyUp={handleAutomaticModeChange}
            />
            </Column>
            {showTips && <TipsPanel handleCloseTips={handleCloseTips} />}
        </Slate>
    );
}
 
export default ScriptwriterPanel;