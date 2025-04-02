import { Column, TextButton, Typography } from "components";
import { useProjectStore } from "stores";

const FragmentSelectionPanel = ({
    selectedFragmentIdx,
    setSelectedFragmentIdx,
}) => {

    const {filteredFragments} = useProjectStore();

    return (
        <Column
            style={{
                width: 350,
                padding: '3rem',
                overflowY: 'auto',
                backgroundColor: 'var(--background-color-medium)',
                gap: '2rem',
                alignItems: 'start',
            }}
        >
            {
                filteredFragments.length === 0
                ?
                <Typography>
                    No fragments to display...
                </Typography>
                :
                filteredFragments.map((f, index) => (
                    <TextButton
                        key={f.id}
                        style={{textAlign: 'start'}}
                        onClick={() => setSelectedFragmentIdx(index)}
                    >
                        <Typography color={selectedFragmentIdx !== index && 'label'}>
                            • {f.shortDescription}
                        </Typography>
                    </TextButton>
                ))
            }
        </Column>
    );
}
 
export default FragmentSelectionPanel;