import { Row } from "components";
import getStroke from "perfect-freehand";
import { forwardRef, useCallback, useEffect, useState } from "react";
import { getSvgPathFromStroke } from "utils";
import SketchingToolbar from "./SketchingToolbar";

const Canvas = forwardRef(({...props}, ref) => {

    const [isDrawing, setIsDrawing] = useState(false);
    const [inputPoints, setInputPoints] = useState([]);
    const [pathData, setPathData] = useState(['', '#000000']);
    const [allPaths, setAllPaths] = useState([]);
    const [drawingParameters, setDrawingParameters] = useState({
        size: 4,
        thinning: 0.5,
        smoothing: 0.5,
        streamline: 0.5,
        easing: (t) => t,
        simulatePressure: true,
        last: true,
        start: {
            cap: true,
            taper: 0,
            easing: (t) => t,
        },
        end: {
            cap: true,
            taper: 0,
            easing: (t) => t,
        },
        color: '#000000',
        backgroundColor: '#FFFFFF'
    });

    const [undoStack, setUndoStack] = useState([]);

    const handleUndo = useCallback(() => {
        if (isDrawing) {
            return;
        }

        if (allPaths.length > 0) {
            setUndoStack([...undoStack, allPaths[allPaths.length - 1]]);
            setAllPaths([...allPaths.slice(0, allPaths.length - 1)]);
        }

    }, [isDrawing, allPaths, undoStack]);

    const handleRedo = useCallback(() => {
        if (isDrawing) {
            return;
        }

        if (undoStack.length > 0) {
            setAllPaths([...allPaths, undoStack[undoStack.length - 1]]);
            setUndoStack([...undoStack.slice(0, undoStack.length - 1)]);
        }
    }, [isDrawing, allPaths, undoStack]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key.toLowerCase()) {
                    case "z":
                        e.preventDefault();
                        handleUndo();
                        break;
                    case "y":
                        e.preventDefault();
                        handleRedo();
                        break;
                    default:
                        break;
                }
            }
        }

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        }
    }, [handleUndo, handleRedo]);

    const getMousePosition = (e) => {
        const rect = ref.current.getBoundingClientRect();
        return [
            e.clientX - rect.left,
            e.clientY - rect.top,
        ];
    }

    const penDown = (e) => {
        setInputPoints([getMousePosition(e)]);
        setIsDrawing(true);
        setUndoStack([]);
    }

    const penUp = (e) => {
        setIsDrawing(false);
        setAllPaths([...allPaths, pathData]);
        setInputPoints([]);
        setPathData(['', drawingParameters.color]);
    }

    const penMove = (e) => {
        if (isDrawing && inputPoints.length > 0) {
            const [x, y] = getMousePosition(e);
            const [lastX, lastY] = inputPoints[inputPoints.length - 1];

            if (x !== lastX || y !== lastY) {
                setInputPoints([...inputPoints, [x, y]]);
                drawLine();
            }
        }

    }

    const drawLine = () => {
        const outlinePoints = getStroke(inputPoints, drawingParameters);
        const path = getSvgPathFromStroke(outlinePoints);
        setPathData([path, drawingParameters.color]);
    }

    return (
        <Row
            style={{flexWrap: 'wrap'}}
        >
            <SketchingToolbar
                drawingParameters={drawingParameters}
                setDrawingParameters={setDrawingParameters}
            />
            <svg
                ref={ref}
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    backgroundColor: drawingParameters.backgroundColor,
                    borderRadius: 10,
                    width: 960,
                    aspectRatio: 16 / 9,
                }}
                onMouseDown={penDown}
                onMouseUp={penUp}
                onMouseMove={penMove}
                onMouseLeave={penUp}
            >
                {allPaths.map((p, index) => (
                    <path key={index} d={p[0]} fill={p[1]} stroke={p[1]} />    
                ))}
                <path d={pathData[0]} fill={pathData[1]} stroke={pathData[1]} />
            </svg>
        </Row>
    );
});
 
export default Canvas;