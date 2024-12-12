import { screen, render, fireEvent } from '@testing-library/react';
import { useAuth } from 'hooks';
import { useNavigate } from 'react-router-dom';
import { SignIn } from 'views';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

jest.mock('hooks', () => ({
    useAuth: jest.fn()
}));

const defaultUseAuthValue = {
    user: null,
    signIn: jest.fn(),
  }

describe('SignIn', () => {

    beforeEach(() => {
        useAuth.mockReturnValue(defaultUseAuthValue);
        useNavigate.mockReturnValue(mockedUseNavigate);
    });

    test('renders correct elements', () => {
        render(<SignIn isMobile={false} />);

        expect(screen.getByRole('form')).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/submit/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/navigate to sign up/i)).toBeInTheDocument();
    });

    test('handles email input change', () => {
        render(<SignIn isMobile={false} />);

        const emailValue = 'test@test.com';
        const emailInput = screen.getByLabelText(/email/i).querySelector('input');

        fireEvent.change(emailInput, { target: { value: emailValue }});

        expect(emailInput.value).toBe(emailValue);
    });

    test('handles password input change', () => {
        render(<SignIn isMobile={false} />);

        const passwordValue = 'password';
        const passwordInput = screen.getByLabelText(/password/i).querySelector('input');

        fireEvent.change(passwordInput, { target: { value: passwordValue }});

        expect(passwordInput.value).toBe(passwordValue);
    });

    test('handles sign in on form submission', () => {
        const signInMock = jest.fn();
        useAuth.mockReturnValue({ signIn: signInMock, error: null});

        render(<SignIn isMobile={false}/>);
        const button = screen.getByLabelText(/submit/i);

        fireEvent.click(button);
        expect(signInMock).toHaveBeenCalled();
    });

    test('navigates to sign up page', () => {
        const navigateMock = jest.fn();
        useNavigate.mockReturnValue(navigateMock);

        render(<SignIn isMobile={false}/>);
        const signUpLink = screen.getByLabelText(/navigate to sign up/);

        fireEvent.click(signUpLink);
        expect(navigateMock).toHaveBeenCalledWith('/sign-up');
    });
});