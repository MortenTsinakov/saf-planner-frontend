import { Row } from "components";
import getStroke from "perfect-freehand";
import { useRef, useState } from "react";
import { getSvgPathFromStroke } from "utils";
import SketchingToolbar from "./SketchingToolbar";

const Canvas = ({...props}) => {

    const svgRef = useRef(null);
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

    const getMousePosition = (e) => {
        const rect = svgRef.current.getBoundingClientRect();
        return [
            e.clientX - rect.left,
            e.clientY - rect.top,
        ];
    }

    const penDown = (e) => {
        setInputPoints([getMousePosition(e)]);
        setIsDrawing(true);
    }

    const penUp = (e) => {
        setIsDrawing(false);
        setAllPaths([...allPaths, pathData]);
        setInputPoints([]);
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
                ref={svgRef}
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
}
 
export default Canvas;