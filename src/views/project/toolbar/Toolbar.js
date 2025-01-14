import { Row } from 'components';

const Toolbar = ({height, ...props}) => {
    return (
        <Row
            style={{
                border: '1px solid white',
                alignItems: 'center',
                padding: '2rem',
                height: height,
            }}
        >
            Panel for buttons, tools etc.
        </Row>
    );
}
 
export default Toolbar;