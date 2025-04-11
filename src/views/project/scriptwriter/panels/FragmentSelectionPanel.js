import { Column, IconButton, Row, TextButton, Typography } from "components";
import { useEffect, useState } from "react";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import { useProjectStore } from "stores";

const FragmentSelectionPanel = () => {

    const filteredFragments = useProjectStore((state) => state.filteredFragments);
    const [selectedFragmentIdx, setSelectedFragmentIdx] = useState(0);
    const [shortDescriptionPanelIsOpen, setShortDescriptionPanelIsOpen] = useState(true);

    useEffect(() => {
        if (filteredFragments.length === 0) {return;}
        const activeFragment = document.getElementById(`long-description-${filteredFragments[selectedFragmentIdx].id}`);
        if (activeFragment) {
            activeFragment.scrollIntoView({behavior: 'smooth', block: 'center'});
        }
    }, [selectedFragmentIdx, filteredFragments]);

    return (
        <Row
            style={{
                gap: 0,
            }}
        >
            {
                shortDescriptionPanelIsOpen
                ?
                <Row
                    style={{gap: 0}}
                >
                    <Column
                        style={{
                            width: 300,
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
                    <Column
                        style={{
                            backgroundColor: 'var(--background-color-medium)',
                            justifyContent: 'center',
                        }}
                    >
                        <IconButton
                            icon={<MdArrowLeft />}
                            onClick={() => setShortDescriptionPanelIsOpen(false)}
                        />
                    </Column>
                </Row>
                :
                <Column
                        style={{
                            backgroundColor: 'var(--background-color-medium)',
                            justifyContent: 'center',
                            width: 50,
                        }}
                >
                    <IconButton
                        icon={<MdArrowRight />}
                        onClick={() => setShortDescriptionPanelIsOpen(true)}
                    />
                </Column>
            }
            <Column
                style={{
                    width: 500,
                    padding: '3rem',
                    overflowY: 'auto',
                    gap: '2rem',
                    height: '100%',
                    backgroundColor: 'var(--background-color-medium)',
                    borderLeft: '1px solid var(--main-gray)'
                }}
            >
                {
                    filteredFragments.map((f, index) => (
                        <Typography
                            key={f.id}
                            id={`long-description-${f.id}`}
                            color={f.id !== filteredFragments[selectedFragmentIdx].id && 'label'}
                            onClick={() => setSelectedFragmentIdx(index)}
                        >
                            {f.longDescription}
                        </Typography>
                    ))
                }
            </Column>
        </Row>
    );
}
 
export default FragmentSelectionPanel;