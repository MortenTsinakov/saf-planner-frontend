import { Editor, Element, Path, Range, Transforms } from "slate";


/**
 * Find the current node and it's path.
 */
export const getNodeAndPath = (editor) => {
    const {selection} = editor;

    if (selection && Range.isCollapsed(selection)) {
        const [start] = Range.edges(selection);
        const path = Path.parent(start.path);
        const [node] = Editor.node(editor, path);
        return [node, path];
    }

    return [null, null];
}

/**
 * Create a new block if the cursor is in the end of the line,
 * otherwise split the current block into two.
 */
export const addBlock = (editor, mode) => {
    if (!editor.selection) return;

    const {selection} = editor;
    const [, path] = Editor.node(editor, selection);

    if (!Editor.string(editor, path)) {
        const newPath = Editor.after(editor, path);

        Transforms.insertNodes(editor, {
            type: mode,
            children: [{text: ''}],
        });
        Transforms.select(editor, newPath);

        return;
    }

    const cursorOffset = selection.anchor.offset;
    const nodeText = Editor.string(editor, path);
    const isAtEnd = cursorOffset === nodeText.length;

    if (isAtEnd) {
        const newPath = Editor.after(editor, path);

        Transforms.insertNodes(
            editor,
            { type: mode, children: [{text: ''}] },
            { at: Editor.after(editor, path) }
        );
        Transforms.select(editor, newPath);
    } else {
        Transforms.splitNodes(editor);
        Transforms.move(editor, {distance: 1, unit: 'line'});
    }
}

/**
 * Determine what type of block the cursor is in at the moment.
 */
export const getElementTypeAtCursor = (editor) => {
    const [node, ] = getNodeAndPath(editor);
    
    if (!node) return null;

    return node.type;
}

/**
 * Change current block type
 */
export const changeBlockType = (editor, requestedMode) => {
    if (!editor.selection) return;

    const [match] = Editor.nodes(editor, {
        match: (n) => Element.isElement(n),
    });

    if (match) {
        Transforms.setNodes(editor, {type: requestedMode});
    }
}

/**
 * Element styles
 */
export const getElementStyle = (mode, zoom) => {
    switch (mode) {
        case "header":
            return {
                paddingTop: `${1 * zoom}lh`,
                paddingBottom: `${1 * zoom}lh`,
            };
        case "action":
            return {
                paddingBottom: `${1 * zoom}lh`,
            };
        case "character":
            return {
                marginLeft: `${2.2 * zoom}in`,
            };
        case "parenthetical":
            return {
                marginLeft: `${1.6 * zoom}in`,
            };
        case "dialogue":
            return {
                marginLeft: `${1.5 * zoom}in`,
                paddingBottom: `${1 * zoom}lh`,
            };
        case "transition":
            return {
                paddingTop: `${1 * zoom}lh`,
            };
        default:
            return;
    }
}