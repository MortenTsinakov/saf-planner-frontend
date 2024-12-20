import {
    IconButton,
    TextButton,
    Column,
    Container,
    Row,
    Sidebar,
    Divider,
} from 'components'
import { useAuth } from 'hooks';
import { useState } from 'react';
import { RiMenuFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

const MobileNavbar = () => {

    const { user, signOut, error } = useAuth();
    const navigate = useNavigate();
    const [sidebarIsOpen, setSidebarIsOpen] = useState(true);

    const handleNavigate = (link) => {
        setSidebarIsOpen(false);
        navigate(link);
    }

    const handleSignOut = async () => {
        setSidebarIsOpen(false);
        await signOut();
        if (error) {
            console.log(error);
        }
    }

    return (
        <Container
        
        >
            <Row
                style={{
                    height: 'var(--navbar-height)',
                    backgroundColor: 'var(--background-color-lowest)',
                    borderBottom: '1px solid var(--main-gray)',  
                    width: '100%',
                    paddingLeft: '0.5rem',
                }}
            >
                <IconButton
                    icon={<RiMenuFill />}
                    onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
                    style={{
                        rotate: sidebarIsOpen ? '90deg' : '0deg',
                        transition: 'rotate 0.5s ease',
                    }}
                />
            </Row>
            <Sidebar
                isOpen={sidebarIsOpen}
            >
                {user ?
                    <Column
                        style={{
                            gap:'2rem'
                        }}
                    >
                        <TextButton
                            onClick={() => handleNavigate('/dashboard')}
                        >
                            Dashboard
                        </TextButton>
                        <TextButton
                            onClick={() => handleNavigate('/projects')}
                        >
                            Projects
                        </TextButton>
                        <Divider
                            style={{
                                backgroundColor:'var(--primary-color)',
                                height:'1.5px',
                            }}
                        />
                        <TextButton
                            onClick={() => handleNavigate('/settings')}
                        >
                            Settings
                        </TextButton>
                        <TextButton
                            onClick={handleSignOut}
                        >
                            Sign out
                        </TextButton>
                    </Column>
                    :
                    <Column
                        style={{
                            gap:'2rem'
                        }}
                    >
                        <TextButton
                            onClick={() => handleNavigate('/sign-in')}
                        >
                            Sign In
                        </TextButton>
                        <Divider
                            style={{
                                backgroundColor:'var(--primary-color)',
                                height:'1.5px',
                            }}
                        />
                        <TextButton
                            onClick={() => handleNavigate('/about')}
                        >
                            About
                        </TextButton>
                    </Column>
                }
            </Sidebar>
        </Container>
    );
}
 
export default MobileNavbar;