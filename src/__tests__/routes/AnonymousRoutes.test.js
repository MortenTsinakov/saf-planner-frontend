const { screen, render } = require('@testing-library/react');
const { MAIN_PAGE_PROTECTED, MAIN_PAGE_ANONYMOUS } = require('constants/Constants');
const { useAuth } = require('hooks');
const { Routes, Route, MemoryRouter } = require('react-router-dom');
const { AnonymousRoutes } = require('routes');

jest.mock('hooks', () => ({
    useAuth: jest.fn()
}));

const anonymousPage = 'Anonymous page';
const protectedPage = 'Protected page';

describe('AnonymousRoutes', () => {
    test('renders outlet when user is not signed in', () => {
        useAuth.mockReturnValue({
            user: null,
            loading: false,
        });

        render(
            <MemoryRouter
                initialEntries={[MAIN_PAGE_ANONYMOUS]}
                future={{
                    v7_startTransition: true,
                    v7_relativeSplatPath: true,
                }}
            >
                <Routes>
                    <Route element={<AnonymousRoutes />}>
                        <Route path={`${MAIN_PAGE_ANONYMOUS}`} element={<div>{anonymousPage}</div>} />
                    </Route>
                    <Route path={`${MAIN_PAGE_PROTECTED}`} element={<div>{protectedPage}</div>} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.queryByText(anonymousPage)).toBeInTheDocument();
    });

    test('renders main page for signed in users when user is signed in', () => {
        useAuth.mockReturnValue({
            user: {
                id: 1,
                firstName: 'John',
                lastName: 'Doe',
                email: 'email@email.com',
            },
            loading: false,
        });

        render(
            <MemoryRouter
                initialEntries={[MAIN_PAGE_ANONYMOUS]}
                future={{
                    v7_startTransition: true,
                    v7_relativeSplatPath: true,
                }}
            >
                <Routes>
                    <Route element={<AnonymousRoutes />}>
                        <Route path={`${MAIN_PAGE_ANONYMOUS}`} element={<div>{anonymousPage}</div>} />
                    </Route>
                    <Route path={`${MAIN_PAGE_PROTECTED}`} element={<div>{protectedPage}</div>} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.queryByText(protectedPage)).toBeInTheDocument();
    });
});