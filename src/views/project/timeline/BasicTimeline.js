import { Column, Row } from "components";
import Markings from "./Markings";
import { useProjectStore } from "stores";

const BasicTimeline = ({
    selectedFragmentIdx,
    ...props
}) => {

    const filteredFragments = useProjectStore((state) => state.filteredFragments);

    return (
        <Column
            style={{
                padding: '1rem',
                gap: 15,
            }}
        >
            <Row
                style={{
                    width: '100%',
                    gap: 0,
                }}
            >
                {filteredFragments.map(f => (
                    f.onTimeline &&
                    <div
                        key={f.id}
                        style={{
                            display: 'flex',
                            flex: `${f.durationInSeconds} ${f.durationInSeconds} auto`,
                            height: '2rem',
                            backgroundColor: f.id === selectedFragmentIdx ? 'var(--text-color' : 'gray',
                            borderRadius: 5,
                            border: '1px solid var(--background-color-lowest)'
                        }}
                    />
                ))}
            </Row>
            <Markings filteredFragments={filteredFragments}/>
        </Column>
    );
}
 
export default BasicTimeline;