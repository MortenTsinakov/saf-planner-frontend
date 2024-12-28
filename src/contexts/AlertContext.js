import  { createContext, useCallback, useState } from 'react';

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
    
    const value = {
        alerts,
        addAlert,
    }

    return (
        <AlertContext.Provider value={value}>
            {children}
        </AlertContext.Provider>
    );
}

export default AlertContext;
