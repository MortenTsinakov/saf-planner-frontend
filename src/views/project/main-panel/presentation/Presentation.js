import { Column, Row, Typography } from "components";
import Label from "components/ui/labels/Label";
import { MdAlarm} from "react-icons/md";
import FragmentImages from "./presentation-data/FragmentImages";

const Presentation = ({fragment, ...props}) => {

    if (!fragment) {
        return (
            <Column style={{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                <Typography color='label'>
                    There are no fragments to display...
                </Typography>
            </Column>
        );
    }

    return (
        <Row 
            style={{
                width: '100%',
                height: '100%',
                padding: '2rem',
                flexWrap: 'wrap',
                overflowY: 'auto',
            }}
        >
            <Column
                style={{flex: 0.4}}
            >
                <Typography
                    style={{fontWeight: 'bold'}}
                >
                    {fragment.shortDescription}
                </Typography>
                <Row style={{alignItems: 'center'}}>
                    <MdAlarm />
                    <Typography fontSize='extrasmall'>
                        {fragment.durationInSeconds} seconds
                    </Typography>
                </Row>
                <Typography>
                    {fragment.longDescription}
                </Typography>
                <Row
                    style={{flewWrap: 'wrap'}}
                >
                    {fragment.labels.map(l => (
                        <Label
                            key={l.id}
                            color={l.color}
                        >
                            {l.description}
                        </Label>
                    ))}
                </Row>
            </Column>
            <Column
                style={{
                    flex: 0.6,
                }}
            >
                <FragmentImages fragment={fragment} {...props}/>
            </Column>
        </Row>
    );
}
 
export default Presentation;