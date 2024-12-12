import { render, screen } from '@testing-library/react';
import { MAIN_PAGE_ANONYMOUS, MAIN_PAGE_PROTECTED } from 'constants/Constants';
import { useAuth } from 'hooks';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ProtectedRoutes } from 'routes';

jest.mock('hooks', () => ({
    useAuth: jest.fn()
}));

const anonymousPage = 'Anonymous page';
const protectedPage = 'Protected page';

describe('ProtectedRoutes', () => {
    test('renders outlet when user is signed in', () => {
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
                initialEntries={[MAIN_PAGE_PROTECTED]}
                future={{
                    v7_startTransition: true,
                    v7_relativeSplatPath: true,
                }}
            >
                <Routes>
                    <Route element={<ProtectedRoutes />}>
                        <Route path={`${MAIN_PAGE_PROTECTED}`} element={<div>{protectedPage}</div>} />
                    </Route>
                    <Route path={`${MAIN_PAGE_ANONYMOUS}`} element={<div>{anonymousPage}</div>} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.queryByText(protectedPage)).toBeInTheDocument();
    });

    test('renders main page for non signed in users when user not signed in', () => {
        useAuth.mockReturnValue({
            user: null,
            loading: false
        });

        render(
            <MemoryRouter
                initialEntries={[MAIN_PAGE_PROTECTED]}
                future={{
                    v7_startTransition: true,
                    v7_relativeSplatPath: true,
                }}
            >
                <Routes>
                    <Route element={<ProtectedRoutes />}>
                        <Route path={`${MAIN_PAGE_PROTECTED}`} element={<div>{protectedPage}</div>} />
                    </Route>
                    <Route path={`${MAIN_PAGE_ANONYMOUS}`} element={<div>{anonymousPage}</div>} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.queryByText(anonymousPage)).toBeInTheDocument();
    });
});