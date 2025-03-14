import { Row, Typography } from "components";
import { useEffect, useState } from "react";

const Markings = ({filteredFragments}) => {

    const [totalDuration, setTotalDuration] = useState(0);
    const [markings, setMarkings] = useState([]);

    useEffect(() => {

        const getTotalLength = () => {

            let totalLength = 0;

            for (const f of filteredFragments) {
                totalLength += f.onTimeline ? f.durationInSeconds : 0;
            }

            setTotalDuration(totalLength);
            return totalLength;
        }
    
        const createMarkings = () => {
            const totalLength = getTotalLength();
            const temp = [];

            for (let i = 0; i < totalLength; i += 10) {
                temp.push(i);
            }

            setMarkings(temp);
        }

        createMarkings();
    }, [filteredFragments]);

    return (
        <Row
            style={{
                gap: 0,
                height: 40,
                alignItems: 'center',
                borderTop: '1px solid gray',
            }}
        >
            {markings.map((m, index) => (
                <div
                    key={index}
                    style={{width: '100%'}}
                >
                    <div
                        style={{
                            display: 'flex',
                            flex: '1 1 0',
                            height: index % 6 === 0 ? 20 : 10,
                            borderLeft: '1px solid gray',
                            transform: 'translateY(-20px)'
                        }}
                    />
                    {
                        index % 6 === 0 &&
                        <div
                            style={{transform: `translate(${index !== 0 ? '-15px' : '-3px'}, -20px)`, position: 'absolute'}}
                        >
                            <Typography
                                color='label'
                                fontSize='extrasmall'
                            >
                                {index / 6}{index % 6 === 0 && index !== 0 ? 'min' : ''}
                            </Typography>
                        </div>
                    }
                    {
                        totalDuration < 120 && index % 6 !== 0 &&
                        <div
                            style={{transform: 'translate(-10px, -20px)', position: 'absolute'}}
                        >
                            <Typography
                                color='label'
                                fontSize='extrasmall'
                            >
                                {index % 6 * 10}s
                            </Typography>
                        </div>
                    }
                </div>
            ))}
        </Row>
    );
}
 
export default Markings;