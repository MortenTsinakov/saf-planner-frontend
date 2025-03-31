import { Column, Row, Typography } from "components";
import FragmentImages from "./presentation-data/FragmentImages";
import FragmentInformation from "./presentation-data/FragmentInformation";
import FragmentComments from "./presentation-data/FragmentComments";
import { useState } from "react";

const Presentation = ({fragment, ...props}) => {

    const [showComments, setShowComments] = useState(false);

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
            <FragmentInformation
                fragment={fragment}
                setShowComments={setShowComments}
            />
            <Column
                style={{
                    flex: 0.6,
                }}
            >
                <FragmentImages
                    fragment={fragment}
                    {...props}
                />
            </Column>
            <FragmentComments
                fragment={fragment}
                showComments={showComments}
                setShowComments={setShowComments}
                {...props}
            />
        </Row>
    );
}
 
export default Presentation;