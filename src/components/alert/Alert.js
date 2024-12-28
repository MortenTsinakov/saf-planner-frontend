import { Typography } from 'components';
import './Alert.css';
import { MdError, MdInfo, MdWarning, MdCheckCircle } from "react-icons/md";

/**
 * Pop-up alert.
 * The alert pops up inside the alert tray and displays an icon
 * indicating the type of alert and a message.
 */
const Alert = ({message, level, ...props}) => {
    return (
        <div
            className='alert' {...props}
            role='alert'
            aria-live='assertive'
        >
            <div className={`alert-icon ${level}`}>
                {level === 'error' && <MdError aria-label='error'/>}
                {level === 'info' && <MdInfo aria-label='info'/>}
                {level === 'success' && <MdCheckCircle aria-label='success'/>}
                {level === 'warning' && <MdWarning aria-label='warning'/>}
            </div>
            <Typography
                fontSize={'small'}
                style={{
                    textWrap: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}
            >
                {message}
            </Typography>
        </div>
    );
}
 
export default Alert;