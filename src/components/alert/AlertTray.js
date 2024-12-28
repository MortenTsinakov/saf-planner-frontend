import { Column } from 'components';
import { useAlerts } from 'hooks';
import Alert from './Alert';
import './Alert.css';

const AlertTray = ({props}) => {

    const { alerts } = useAlerts();

    return (
        <Column
            style={{
                position: 'fixed',
                bottom: '15px',
                left: '15px',
                maxWidth: '90vw',
                zIndex: '5',
            }}
        >
            {alerts.map((alert) => (
                <Alert
                    key={alert.id}
                    message={alert.message}
                    level={alert.level}
                    {...props}
                />
            ))}
        </Column>
    );
}
 
export default AlertTray;