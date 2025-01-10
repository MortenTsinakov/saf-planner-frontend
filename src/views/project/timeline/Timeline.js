import { Column, Row } from 'components';

const Timeline = ({fragments, ...props}) => {
    return (
        <Column
            style={{
                border: '1px solid white',
                gap: 0
            }}
        >
            <Row style={{border: '1px solid gray', height: '120px', padding: '2rem', alignItems: 'center'}}>Timeline panel</Row>
            <Row style={{border: '1px solid gray', height: 'var(--navbar-height)', padding: '2rem', alignItems: 'center'}}>Timeline tools</Row>
        </Column>
    );
}
 
export default Timeline;