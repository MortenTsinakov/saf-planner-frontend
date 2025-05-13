import { Column, Row, Typography } from 'components';
import { useProjectStore } from 'stores';
import Markings from 'views/project/timeline/Markings';

const LabelTimeline = ({selectedFragmentIdx}) => {

    const project = useProjectStore((state) => state.project);
    const filters = useProjectStore((state) => state.filters);
    const filteredFragments = useProjectStore((state) => state.filteredFragments);

    const getFragmentInTimeline = (fragment) => {
        return (
            <Column
                key={fragment.id}
                style={{
                    gap: '1rem',
                    justifyContent: 'space-between',
                    backgroundColor: fragment.id === selectedFragmentIdx && 'var(--background-color-high)',
                    filter: fragment.id === selectedFragmentIdx && 'brightness(125%)',
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
                                    title={label.description}
                                    style={{
                                        boxSizing: 'border-box',
                                        backgroundColor: label.color,
                                        height: '1rem',
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
                                        height: '1rem',
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
                padding: '1rem',
                backgroundColor: 'var(--background-color-medium)',
                borderTop: '1px solid var(--main-gray)',
                borderBottom: '1px solid var(--main-gray)',
                paddingBottom: 75,
            }}
        >
            <Row
                style={{flexWrap: 'wrap'}}
            >
                {project.labels.map(l => (
                    (filters.length === 0 || filters.includes(l.id)) &&
                    <Row 
                        key={l.id}
                        style={{
                            alignItems: 'center',
                        }}
                    >
                        <div
                            style={{
                                width: '1rem',
                                height: '1rem',
                                borderRadius: '50%',
                                backgroundColor: l.color
                            }}
                        />
                        <Typography
                            fontSize='extrasmall'
                            color='label'
                            style={{textWrap: 'nowrap'}}
                        >
                            {l.description}
                        </Typography>
                    </Row>
                ))}
            </Row>
            <Row style={{gap:'3rem'}}>
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
                        fragment.onTimeline &&
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