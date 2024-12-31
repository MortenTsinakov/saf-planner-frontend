import { Column, Row, TextButton, Typography } from 'components';
import { useState } from 'react';
import UserProjects from './UserProjects';
import SharedProjects from './SharedProjects';

const Projects = (props) => {

    const Tabs = Object.freeze({
        USER_PROJECTS: 0,
        SHARED_PROJECTS: 1,
    });

    const [selectedTab, setSelectedTab] = useState(Tabs.USER_PROJECTS);

    return (
        <Column
            style={{
                alignItems: 'center',
                paddingTop: '3rem',
            }}
        >
            <Row
                style={{
                    gap: '3rem',
                    minWidth: '350px',
                    justifyContent: 'center',
                    marginBottom: '5rem'
                }}
            >
                <TextButton
                    onClick={() => setSelectedTab(Tabs.USER_PROJECTS)}
                    style={{
                        width: '100%',
                        borderBottom: `1px solid ${selectedTab === Tabs.USER_PROJECTS ? 'var(--primary-color)' : 'var(--text-color)'}`,
                        textWrap: 'nowrap',
                        padding: '1rem',
                    }}
                >
                    <Typography
                        fontSize='small'
                        style={{
                            color: selectedTab === Tabs.USER_PROJECTS ? 'var(--primary-color)' : 'var(--text-color)',
                        }}
                    >
                        My Projects
                    </Typography>
                </TextButton>
                <TextButton
                    onClick={() => setSelectedTab(Tabs.SHARED_PROJECTS)}
                    style={{
                        width: '100%',
                        borderBottom: `1px solid ${selectedTab === Tabs.SHARED_PROJECTS ? 'var(--primary-color)' : 'var(--text-color)'}`,
                        textWrap: 'nowrap',
                        padding: '1rem',
                    }}
                >
                    <Typography
                        fontSize='small'
                        style={{
                            color: selectedTab === Tabs.SHARED_PROJECTS ? 'var(--primary-color)' : 'var(--text-color)',
                        }}
                    >
                        Shared Projects
                    </Typography>
                </TextButton>
            </Row>
            {selectedTab === Tabs.USER_PROJECTS && <UserProjects {...props} />}
            {selectedTab === Tabs.SHARED_PROJECTS && <SharedProjects {...props} />}
        </Column>
    );
}
 
export default Projects;