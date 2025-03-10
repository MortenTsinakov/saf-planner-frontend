import { Column, Row, Typography } from 'components';
import { useProjectStore } from 'stores';
import Markings from 'views/project/timeline/Markings';

const LabelTimeline = ({filters, filteredFragments, selectedFragment}) => {

    const {project} = useProjectStore();

    const getFragmentInTimeline = (fragment) => {
        return (
            <Column
                key={fragment.id}
                style={{
                    gap: '1rem',
                    justifyContent: 'space-between',
                    backgroundColor: fragment.id === filteredFragments[selectedFragment].id && 'var(--background-color-high)',
                    filter: fragment.id === filteredFragments[selectedFragment].id && 'brightness(125%)',
                    borderRadius: '5px',
                    flex: `${fragment.durationInSeconds} ${fragment.durationInSeconds} auto`,
                }}
            >
                {            
                    project.labels.map(label => {
                        if (filters.length > 0 && !filters.includes(label.id)) {
                            return null;
                        }
                        if (fragment.labels.some(l => l.id === label.id)) {
                            return (
                                <div
                                    key={label.id}
                                    style={{
                                        boxSizing: 'border-box',
                                        backgroundColor: label.color,
                                        height: '100%',
                                        width: '100%',
                                        borderRadius: '5px',
                                    }}
                                />
                            );
                        } else {
                            return (
                                <div 
                                    key={label.id}
                                    style={{
                                        height: '100%',
                                        width: '100%',
                                    }}
                                />
                            );
                    }
                })}
            </Column>
        );
    }

    if (filteredFragments.length === 0) {
        return (
            <Column>
                <Typography>
                    There are no fragments in the project...
                </Typography>
            </Column>
        );
    }

    return (
        <Column
            style={{
                width: '100%',
                padding: '3rem',
                backgroundColor: 'var(--background-color-medium)',
                borderTop: '1px solid var(--main-gray)',
                borderBottom: '1px solid var(--main-gray)',
                paddingBottom: 75,
            }}
        >
            <Row style={{gap:'3rem'}}>
                <Column
                    style={{
                        gap: '1rem',
                        justifyContent: 'space-between',
                    }}
                >
                    {project.labels.map(label => (
                        (filters.length === 0 || filters.includes(label.id)) &&
                        <Typography
                            key={label.id}
                            style={{textWrap: 'nowrap'}}
                        >
                            {label.description}
                        </Typography>
                    ))}
                </Column>
                <Row
                    style={{
                        backgroundColor: 'var(--background-color-low)',
                        borderRadius: '5px',
                        width: '100%',
                        gap: '0.2rem',
                        position: 'relative',
                    }}
                >
                    {filteredFragments.map(fragment => (
                        getFragmentInTimeline(fragment)
                    ))}
                    <div 
                        style={{
                            position: 'absolute',
                            width: '100%',
                            bottom: 0,
                            transform: 'translateY(65px)'
                        }}
                    >
                        <Markings filteredFragments={filteredFragments} />
                    </div>
                </Row>
            </Row>
        </Column>
    );
}
 
export default LabelTimeline;