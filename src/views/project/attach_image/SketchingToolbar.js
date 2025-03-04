import { Column, Row, Slider, Switch, Typography } from "components";

const SketchingToolbar = ({drawingParameters, setDrawingParameters}) => {

    const handleStrokeColorChange = (e) => {
        setDrawingParameters({
            ...drawingParameters,
            color: e.target.value,
        });
    }

    const handleBackgroundColorChange = (e) => {
        setDrawingParameters({
            ...drawingParameters,
            backgroundColor: e.target.value,
        })
    }

    return (
        <Column
            style={{
                padding: '3rem',
                marginRight: '3rem',
                width: 300,
                gap: '2rem'
            }}
        >
            <Column
                style={{gap: 0}}
            >
                <Typography title='' color='label'>Stroke</Typography>
                <div
                    style={{
                        width: 35,
                        aspectRatio: 1,
                        backgroundColor: drawingParameters.color,
                        borderRadius: 10,
                        border: '1px solid var(--text-color)',
                    }}
                >
                    <input
                        type="color"
                        style={{
                            width: 35,
                            aspectRatio: 1,
                            opacity: 0,
                        }}
                        onChange={handleStrokeColorChange}
                    />
                </div>
            </Column>
            <Column
                style={{gap: 0}}
            >
                <Typography color='label'>Background</Typography>
                <div
                    style={{
                        width: 35,
                        aspectRatio: 1,
                        backgroundColor: drawingParameters.backgroundColor,
                        borderRadius: 10,
                        border: '1px solid var(--text-color)',
                    }}
                >
                    <input
                        type="color"
                        style={{
                            width: 35,
                            aspectRatio: 1,
                            opacity: 0,
                        }}
                        onChange={handleBackgroundColorChange}
                    />
                </div>
            </Column>
            <Column
                style={{gap: 0}}
            >
                <Typography color='label'>Stroke width</Typography>
                <Row>
                    <Slider
                        minValue={1}
                        maxValue={64}
                        initialValue={10}
                        setValueFn={(v) => setDrawingParameters({...drawingParameters, size: v})}
                    />
                    <Typography fontSize='extrasmall' color='label'>
                        {drawingParameters.size}px
                    </Typography>
                </Row>
            </Column>
            <Column
                title='The effect of pressure on the stroke size'
                style={{gap: 0}}
            >
                <Typography color='label'>Thinning</Typography>
                <Row>
                    <Slider
                        minValue={1}
                        maxValue={100}
                        initialValue={50}
                        setValueFn={(v) => setDrawingParameters({...drawingParameters, thinning: v / 100})}
                    />
                    <Typography fontSize='extrasmall' color='label'>
                        {drawingParameters.thinning}
                    </Typography>
                </Row>
            </Column>
            <Column
                title='How much to soften the stroke edges'
                style={{gap: 0}}
            >
                <Typography color='label'>Smoothing</Typography>
                <Row>
                    <Slider
                        minValue={1}
                        maxValue={100}
                        initialValue={50}
                        setValueFn={(v) => setDrawingParameters({...drawingParameters, smoothing: v / 100})}
                    />
                    <Typography fontSize='extrasmall' color='label'>
                        {drawingParameters.smoothing}
                    </Typography>
                </Row>
            </Column>
            <Column
                title='Whether to simulate pressure based on velocity'
                style={{gap: 0}}
            >
                <Typography color='label'>Simulate pressure</Typography>
                <Switch
                   selected={drawingParameters.simulatePressure}
                   onClick={() => setDrawingParameters({...drawingParameters, simulatePressure: !drawingParameters.simulatePressure})}
                />
            </Column>
            <Column
                title='How much to streamline the stroke'
                style={{gap: 0}}
            >
                <Typography color='label'>Streamline</Typography>
                <Row>
                    <Slider
                        minValue={1}
                        maxValue={100}
                        initialValue={50}
                        setValueFn={(v) => setDrawingParameters({...drawingParameters, streamline: v / 100})}
                    />
                    <Typography fontSize='extrasmall' color='label'>
                        {drawingParameters.streamline}
                    </Typography>
                </Row>
            </Column>
        </Column>
    );
}
 
export default SketchingToolbar;