import { Column,
         Divider,
         DropdownMenu,
         IconButton,
         Row,
         TextButton} from "components";
import { useAuth } from "hooks";
import { useEffect, useState } from "react";
import { MdNotifications } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSseStore } from "stores";
import NotificationTray from "./components/NotificationTray";
import NotificationDetails from "./components/NotificationDetails";

/**
 * Navbar for desktop devices.
 */
const DesktopNavbar = () => {

    const { user, signOut, error } = useAuth();
    const connect = useSseStore((state) => state.connect);
    const disconnect = useSseStore((state) => state.disconnect);
    const fetchUnreadNotifications = useSseStore((state) => state.fetchUnreadNotifications);
    const hasUnread = useSseStore((state) => state.hasUnread);
    const setHasUnread = useSseStore((state) => state.setHasUnread);
    const navigate = useNavigate();
    const [accountDropdownIsOpen, setAccountDropdownIsOpen] = useState(false);
    const [notificationDropdownIsOpen, setNotificationDropdownIsOpen] = useState(false);
    const [notificationDetails, setNotificationDetails] = useState(null);

    useEffect(() => {
        user && connect();
        return () => {
            disconnect();
        }
    }, [connect, disconnect, user]);

    useEffect(() => {
        user && fetchUnreadNotifications();
    }, [fetchUnreadNotifications, user]);

    const handleNavigate = (link) => {
        setAccountDropdownIsOpen(false);
        navigate(link);
    }

    const handleSignOut = async () => {
        setAccountDropdownIsOpen(false);
        await signOut();
        if (error) {
            console.log(error);
        }
    }

    const handleOpenNotificationDropdown = () => {
        setNotificationDropdownIsOpen(true);
    }

    const handleCloseNotificationDropdown = () => {
        setNotificationDropdownIsOpen(false);
        setHasUnread(false);
    }
    
    return (
        <Row
            style={{
                justifyContent: 'end',
                padding: '0 2rem 0 2rem',
                height: 'var(--navbar-height)',
                backgroundColor: 'var(--background-color-lowest)',
                alignItems: 'center',
                borderBottom: '1px solid var(--main-gray)',    
                position: 'fixed',
                width: '100vw',
                zIndex: '10',
            }}
        >
            <Row
                style={{
                    gap: '10',
                    alignItems: 'center',
                }}
            >
                {!user &&
                    <TextButton onClick={() => handleNavigate('/sign-in')}>
                        Sign In
                    </TextButton>
                }
                {user &&
                    <Column
                        style={{
                            position: 'relative'
                        }}
                    >
                        <IconButton
                            icon={<MdNotifications />}
                            style={{
                                color: hasUnread && 'var(--color-error)' 
                            }}
                            onClick={handleOpenNotificationDropdown}
                        />
                        {
                            notificationDropdownIsOpen &&
                            <NotificationTray
                                handleCloseNotificationDropdown={handleCloseNotificationDropdown}
                                setNotificationDetails={setNotificationDetails}
                            />                            
                        }
                        {
                            notificationDetails &&
                            <NotificationDetails
                                notification={notificationDetails}
                                setNotificationDetails={setNotificationDetails}
                            />
                        }
                    </Column>
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
                                <TextButton onClick={() => handleNavigate('/account')}>
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