import { Column } from 'components';
import Alert from './Alert';
import './Alert.css';

/**
 * Displays a list of alerts.
 */
const AlertTray = ({alerts}) => {
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
                />
            ))}
        </Column>
    );
}
 
export default AlertTray;