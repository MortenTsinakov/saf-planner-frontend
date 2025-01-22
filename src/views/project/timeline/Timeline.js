import { Column, Row } from 'components';
// import { useProject } from 'hooks';

const Timeline = ({timelineHeight, timelineToolsHeight}) => {

    // const {fragments} = useProject();

    return (
        <Column
            style={{
                border: '1px solid white',
                gap: 0,
                height: timelineHeight + timelineToolsHeight,
            }}
        >
            <Row style={{border: '1px solid gray', height: timelineHeight, padding: '2rem', alignItems: 'center'}}>Timeline panel</Row>
            <Row style={{border: '1px solid gray', height: timelineToolsHeight, padding: '2rem', alignItems: 'center'}}>Timeline tools</Row>
        </Column>
    );
}
 
export default Timeline;