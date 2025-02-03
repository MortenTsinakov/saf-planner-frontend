import IconButton from 'components/ui/buttons/IconButton';
import './ColorPicker.css';
import { MdRotateRight } from 'react-icons/md';
import { generateRandomColor } from 'utils';
import Column from 'components/ui/containers/Column';
import Row from 'components/ui/containers/Row';


const ColorPicker = ({value, setColorFn}) => {

    const defaultColors = [
        "#E63946", "#F77F00", "#FFD166", "#4CAF50", "#457B9D", "#9C27B0", "#E91E63", "#B0BEC5",
        "#D62828", "#E76F00", "#F4C430", "#43A047", "#3A6F9D", "#8E24AA", "#D81B60", "#90A4AE",
        "#BA1B1D", "#D66000", "#E6B800", "#388E3C", "#2F639D", "#7B1FA2", "#C2185B", "#78909C",
        "#9C1617", "#C55100", "#D9A600", "#2E7D32", "#24579D", "#6A1B9A", "#AD1457", "#607D8B",
        "#7F1010", "#B44200", "#CC9500", "#25662A", "#194B9D", "#4A148C", "#880E4F", "#546E7A",
    ];

    return (
        <Column style={{gap: '2rem'}}>
            <Row
                style={{justifyContent: 'space-between'}}
            >
                <Row
                    style={{alignItems: 'center'}}
                >
                    <div className="selected-color-box" style={{backgroundColor: value}}/>
                    <span className="selected-color-text">{value}</span>
                </Row>
                <IconButton
                    icon={<MdRotateRight />}
                    onClick={() => setColorFn(generateRandomColor())}
                    title='Generate random color'
                />
            </Row>
            <div className="default-colors">
                {defaultColors.map((color, index) => (
                    <div
                        key={index}
                        className="default-color"
                        style={{
                            backgroundColor: color,
                        }}
                        onClick={() => setColorFn(color)}
                    />
                ))}
            </div>
        </Column>
    );
}
 
export default ColorPicker;