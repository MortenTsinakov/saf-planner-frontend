import { renderHook, act } from '@testing-library/react';
import { AuthProvider } from 'contexts';
import { useAuth } from 'hooks';
import { MemoryRouter } from 'react-router-dom';
import { signInService, signOutService, signUpService } from 'services';

jest.mock('services', () => ({
    signInService: jest.fn(),
    signOutService: jest.fn(),
    signUpService: jest.fn(),
}));

describe('Authentication tests', () => {
    beforeEach(() => {
        localStorage.setItem('user', null);
    });

    test('sets user after successful sign in', async () => {
        const mockUser = {
            id: 1,
            email: 'email@email.com',
            firstName: 'John',
            lastName: 'Doe',
        }

        signInService.mockResolvedValue(mockUser);

        const wrapper = ({ children }) => (
            <MemoryRouter
                future={{
                    v7_startTransition: true,
                    v7_relativeSplatPath: true,
                }}
            >
                <AuthProvider>{children}</AuthProvider>
            </MemoryRouter>
        );

        const { result } = renderHook(() => useAuth(), { wrapper });

        await act(async () => {
            await result.current.signIn('john@email.com', 'password');
        });

        expect(result.current.user).toEqual(mockUser);
        expect(localStorage.getItem('user')).toEqual(JSON.stringify(mockUser));
    });

    test('sets error after unsuccessful sign in - incorrect email', async () => {
        const wrapper = ({ children }) => (
            <MemoryRouter
                future={{
                    v7_startTransition: true,
                    v7_relativeSplatPath: true,
                }}
            >
                <AuthProvider>{children}</AuthProvider>
            </MemoryRouter>
        );

        const { result } = renderHook(() => useAuth(), { wrapper });

        await act(async () => {
            await result.current.signIn('email', 'password');
        });

        expect(result.current.error).not.toBeNull();
    });

    test('sets error after unsuccessful sign in - empty password', async () => {
        const wrapper = ({ children }) => (
            <MemoryRouter
                future={{
                    v7_startTransition: true,
                    v7_relativeSplatPath: true,
                }}
            >
                <AuthProvider>{children}</AuthProvider>
            </MemoryRouter>
        );

        const { result } = renderHook(() => useAuth(), { wrapper });

        await act(async () => {
            await result.current.signIn('email@email.com', '');
        });

        expect(result.current.error).not.toBeNull();
    });

    test('clears user on successful sign out', async () => {
        localStorage.setItem('user', JSON.stringify({ name: 'John Doe' }));
        signOutService.mockResolvedValue({message: "User was successfully signed out"});

        const wrapper = ({ children }) => (
            <MemoryRouter
                future={{
                    v7_startTransition: true,
                    v7_relativeSplatPath: true,
                }}
            >
                <AuthProvider>{children}</AuthProvider>
            </MemoryRouter>
        );

        const { result } = renderHook(() => useAuth(), { wrapper });

        await act(async () => {
            await result.current.signOut();
        });

        expect(result.current.user).toBeNull();
        expect(localStorage.getItem('user')).toBeNull();
    });

    test('sets user on successful sign up', async () => {
        const mockedUser = {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            email: 'email@email.com',
        };

        signUpService.mockResolvedValue(mockedUser);

        const wrapper = ({ children }) => (
            <MemoryRouter
                future={{
                    v7_startTransition: true,
                    v7_relativeSplatPath: true,
                }}
            >
                <AuthProvider>{children}</AuthProvider>
            </MemoryRouter>
        );

        const { result } = renderHook(() => useAuth(), { wrapper });

        await act(async () => {
            await result.current.signUp(
                mockedUser.email,
                mockedUser.firstName,
                mockedUser.lastName,
                'password',
            );
        });

        expect(result.current.user).toEqual(mockedUser);
        expect(localStorage.getItem('user')).toEqual(JSON.stringify(mockedUser));
    });

    test('sets error on unsuccessful sign up - email not valid', async () => {
        const mockedUser = {
            email: 'email@email',
            firstName: 'John',
            lastName: 'Doe',
            password: 'password'
        };

        const wrapper = ({ children }) => (
            <MemoryRouter
                future={{
                    v7_startTransition: true,
                    v7_relativeSplatPath: true,
                }}
            >
                <AuthProvider>{children}</AuthProvider>
            </MemoryRouter>
        );

        const { result } = renderHook(() => useAuth(), { wrapper });

        await act(async () => {
            result.current.signUp(mockedUser);
        });

        expect(result.current.error).not.toBeNull();
    });

    test('sets error on unsuccessful sign up - first name is missing', async () => {
        const mockedUser = {
            email: 'email@email.com',
            firstName: '',
            lastName: 'Doe',
            password: 'password'
        };

        const wrapper = ({ children }) => (
            <MemoryRouter
                future={{
                    v7_startTransition: true,
                    v7_relativeSplatPath: true,
                }}
            >
                <AuthProvider>{children}</AuthProvider>
            </MemoryRouter>
        );

        const { result } = renderHook(() => useAuth(), { wrapper });

        await act(async () => {
            result.current.signUp(mockedUser);
        });

        expect(result.current.error).not.toBeNull();
    });

    test('sets error on unsuccessful sign up - last name is missing', async () => {
        const mockedUser = {
            email: 'email@email.com',
            firstName: 'John',
            lastName: '',
            password: 'password'
        };

        const wrapper = ({ children }) => (
            <MemoryRouter
                future={{
                    v7_startTransition: true,
                    v7_relativeSplatPath: true,
                }}
            >
                <AuthProvider>{children}</AuthProvider>
            </MemoryRouter>
        );

        const { result } = renderHook(() => useAuth(), { wrapper });

        await act(async () => {
            result.current.signUp(mockedUser);
        });

        expect(result.current.error).not.toBeNull();
    });

    test('sets error on unsuccessful sign up - password too short', async () => {
        const mockedUser = {
            email: 'email@email.com',
            firstName: '',
            lastName: 'Doe',
            password: 'passwor'
        };

        const wrapper = ({ children }) => (
            <MemoryRouter
                future={{
                    v7_startTransition: true,
                    v7_relativeSplatPath: true,
                }}
            >
                <AuthProvider>{children}</AuthProvider>
            </MemoryRouter>
        );

        const { result } = renderHook(() => useAuth(), { wrapper });

        await act(async () => {
            result.current.signUp(mockedUser);
        });

        expect(result.current.error).not.toBeNull();
    });
}); 