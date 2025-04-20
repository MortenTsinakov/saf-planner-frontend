import Column from "components/ui/containers/Column";
import DropdownMenu from "components/ui/menus/DropdownMenu";
import Typography from "components/ui/typography/Typography";
import { useSseStore } from "stores";
import NotificationSummary from "./NotificationSummary";
import TextButton from "components/ui/buttons/TextButton";

const NotificationTray = ({handleCloseNotificationDropdown, setNotificationDetails}) => {

    const notifications = useSseStore((state) => state.notifications);
    const markAllNotificationsAsRead = useSseStore((state) => state.markAllNotificationsAsRead);

    const handleMarkAllAsRead = () => {
        markAllNotificationsAsRead();
    }

    return (
        <DropdownMenu
            alignedBy='right'
            style={{
                width: 250,
                paddingBottom: 10,
            }}
            onMouseLeave={handleCloseNotificationDropdown}
        >
            <Column>
                {
                    notifications.length > 0
                    ?
                    <Column style={{alignItems: 'start'}}>
                        <TextButton
                            style={{fontSize: '1.3rem'}}
                            onClick={handleMarkAllAsRead}
                        >
                            Mark all as read
                        </TextButton>
                        {
                        notifications.map(n => (
                            <NotificationSummary
                                key={n.id}
                                notification={n}
                                setNotificationDetails={setNotificationDetails}
                            />
                        ))
                        }
                    </Column>
                    :
                    <Typography color='label'>No new notifications...</Typography>
                }
            </Column>
        </DropdownMenu>
    );
}
 
export default NotificationTray;