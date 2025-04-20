import { Column, IconButton, Modal, Typography } from 'components'
import { MdClose } from "react-icons/md";

const NotificationDetails = ({notification, setNotificationDetails}) => {

    const handleCloseNotificationDetails = () => {
        setNotificationDetails(null);
    }

    return (
        <Modal
            style={{
                maxHeight: 500,
                overflow: 'auto',
                position: 'relative',
            }}
        >
            <IconButton
                icon={<MdClose />}
                onClick={handleCloseNotificationDetails}
                style={{position: 'absolute', right: 15, top: 15}}
            />
            <Column>
                <Typography >
                    {notification.summary}
                </Typography>
                <Typography color='label'>
                    {notification.message}
                </Typography>
            </Column>
        </Modal>
    );
}
 
export default NotificationDetails;