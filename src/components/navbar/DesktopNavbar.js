import { Column,
         Container,
         Divider,
         DropdownMenu,
         Row,
         TextButton} from "components";
import { useAuth } from "hooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Navbar for desktop devices.
 */
const DesktopNavbar = () => {

    const { user, signOut, error } = useAuth();
    const navigate = useNavigate();

    const [accountDropdownIsOpen, setAccountDropdownIsOpen] = useState(false);

    const handleNavigate = (link) => {
        setAccountDropdownIsOpen(false);
        navigate(link);
    }

    const handleSignOut = async () => {
        setAccountDropdownIsOpen(false);
        signOut();
    }

    if (error) {
        console.log(error);
    }
    
    return (
        <Row
            style={{
                justifyContent: 'space-between',
                padding: '0 2rem 0 2rem',
                height: 'var(--navbar-height)',
                backgroundColor: 'var(--background-color-lowest)',
                alignItems: 'center',
                borderBottom: '1px solid var(--main-gray)',    
            }}
        >
            <Container>
                Future logo perhaps?
            </Container>
            <Row
                style={{
                    gap: '10' 
                }}
            >
                {!user &&
                    <TextButton onClick={() => handleNavigate('/sign-in')}>
                        Sign In
                    </TextButton>
                }
                {user &&
                    <TextButton onClick={() => handleNavigate('/dashboard')}>
                        Dashboard
                    </TextButton>
                }
                {user &&
                    <TextButton onClick={() => handleNavigate('/projects')}>
                        Projects
                    </TextButton>
                }
                {user &&
                    <Column
                        style={{position: 'relative'}}
                    >
                        <TextButton
                            onClick={() => {setAccountDropdownIsOpen(!accountDropdownIsOpen)}}
                        >
                            Account
                        </TextButton>
                        {
                            accountDropdownIsOpen &&
                            <DropdownMenu
                                alignedBy='right'
                                style={{width: '250px'}}
                                onMouseLeave={() => {setAccountDropdownIsOpen(false)}}
                            >
                                <TextButton onClick={() => handleNavigate('settings')}>
                                    Settings
                                </TextButton>
                                <Divider />
                                <TextButton
                                    onClick={handleSignOut}
                                >
                                    Sign out
                                </TextButton>
                            </DropdownMenu>
                        }
                    </Column>
                }
            </Row>
        </Row>
    );
}
 
export default DesktopNavbar;