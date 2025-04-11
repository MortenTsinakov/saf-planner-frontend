import { AlertTray } from 'components';
import  { createContext, useCallback, useMemo, useState } from 'react';

const AlertContext = createContext();

/**
 * Provider for alerts.
 */
export const AlertProvider = ({children}) => {
    const alertDuration = 5000;
    const [alerts, setAlerts] = useState([]);

    /**
     * Hook for adding new alerts to the alert tray.
     */
    const addAlert = useCallback((message, level='info') => {
        const id = Date.now();
        setAlerts((prev) => [{id, message, level}, ...prev]);
        setTimeout(() => {
            setAlerts((prev) => prev.filter((a) => a.id !== id));
        }, alertDuration);
    }, []);
    
    const contextValue = useMemo(() => ({ addAlert }), [addAlert]);

    return (
        <AlertContext.Provider value={contextValue}>
            {children}
            <AlertTray alerts={alerts} />
        </AlertContext.Provider>
    );
}

export default AlertContext;
