import IconButton from "components/ui/buttons/IconButton";
import Typography from "components/ui/typography/Typography";
import { MdClose } from "react-icons/md";
import { useSseStore } from "stores";

const NotificationSummary = ({notification, setNotificationDetails}) => {

    const markNotificationAsRead = useSseStore((state) => state.markNotificationAsRead);

    const handleOpenNotification = () => {
        setNotificationDetails(notification);
    }

    const handleMarkNotificationAsRead = (e) => {
        e.stopPropagation();
        markNotificationAsRead(notification.id);
    }

    return (
        <div
            style={{
                border: '1px solid var(--main-gray)',
                padding: '1rem',
                borderRadius: 5,
                height: 75,
                overflow: 'hidden',
                position: 'relative',
                width: 230,
                backgroundColor: 'var(--background-color-low)',
                cursor: 'pointer',
            }}
            onClick={handleOpenNotification}
        >
            <IconButton
                icon={<MdClose />}
                style={{position: 'absolute', top: 5, right: 0, fontSize: '2rem'}}
                title='Mark as read'
                onClick={e => handleMarkNotificationAsRead(e)}
            />
            <Typography fontSize='extrasmall'>
                {notification.summary}
            </Typography>
        </div>
    );
}
 
export default NotificationSummary;