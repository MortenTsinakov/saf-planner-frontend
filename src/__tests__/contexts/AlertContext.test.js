const { renderHook } = require('@testing-library/react');
const { AlertProvider } = require('contexts');
const { useAlerts } = require('hooks');
const { act } = require('react');
const { MemoryRouter } = require('react-router-dom');

describe('Alert tests', () => {
    test('add alert', () => {
        const wrapper = ({ children }) => (
            <MemoryRouter
                future={{
                    v7_startTransition: true,
                    v7_relativeSplatPath: true,
                }}
            >
                <AlertProvider>{children}</AlertProvider>
            </MemoryRouter>
        );

        const { result } = renderHook(() => useAlerts(), { wrapper });

        act(() => {
            result.current.addAlert('New alert', 'error');
        });

        expect(result.current.alerts.length).toBeGreaterThan(0);
    });

    test('add several alerts', () => {
        const wrapper = ({ children }) => (
            <MemoryRouter
                future={{
                    v7_startTransition: true,
                    v7_relativeSplatPath: true,
                }}
            >
                <AlertProvider>{children}</AlertProvider>
            </MemoryRouter>
        );

        const { result } = renderHook(() => useAlerts(), { wrapper });

        act(() => {
            result.current.addAlert('New alert 1', 'error');
        });
        act(() => {
            result.current.addAlert('New alert 2', 'info');
        });
        act(() => {
            result.current.addAlert('New alert 3', 'success');
        });

        expect(result.current.alerts.length).toEqual(3);
    });
});