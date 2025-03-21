import { Column, TextButton, Typography } from "components";

const SharedProjectShortDescriptions = ({fragments, activeFragmentIdx, setActiveFragmentIdx}) => {

    const handleChangeActiveFragment = (index) => {
        setActiveFragmentIdx(index);
    }

    return (
        <Column
            style={{
                flex: 0.15,
                padding: '3rem',
                overflowY: 'auto',
                backgroundColor: 'var(--background-color-medium)',
                gap: '2rem',
                height: 'calc(100vh - var(--navbar-height))',
            }}
        >
            {
                fragments.map((f, index) => (
                    <Column
                        key={f.id}
                    >
                        <TextButton
                            style={{
                                textAlign: 'start',
                                color: index === activeFragmentIdx ? 'var(--text-color)' : 'gray'
                            }}
                            onClick={() => handleChangeActiveFragment(index)}
                        >
                            <Column>
                                <Typography>
                                    •   {f.shortDescription}
                                </Typography>
                            </Column>
                        </TextButton>
                    </Column>
                ))
            }
        </Column>
    );
}
 
export default SharedProjectShortDescriptions;