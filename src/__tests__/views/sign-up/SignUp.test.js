import { fireEvent, render, screen } from '@testing-library/react';
import { useAuth } from 'hooks';
import { useNavigate } from 'react-router-dom';
import { SignUp } from 'views';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

jest.mock('hooks', () => ({
    useAuth: jest.fn()
}));

const defaultUseAuthValue = {
    signUp: jest.fn()
}

describe('SignUp', () => {
    beforeEach(() => {
        useAuth.mockReturnValue(defaultUseAuthValue);
        useNavigate.mockReturnValue(mockedUseNavigate);
    });

    test('render correct elements', () => {
        render(<SignUp isMobile={false}/>);

        expect(screen.getByRole('form')).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/submit/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/navigate to sign in/i)).toBeInTheDocument();
    });

    test('handles email input change', () => {
        render(<SignUp isMobile={false} />);

        const emailValue = 'test@test.com';
        const emailInput = screen.getByLabelText(/email/i).querySelector('input');

        fireEvent.change(emailInput, { target: { value: emailValue }});

        expect(emailInput.value).toBe(emailValue);
    });

    
    test('handles first name input change', () => {
        render(<SignUp isMobile={false}/>);

        const firstNameValue = "John";
        const firstNameInput = screen.getByLabelText(/first name/i).querySelector('input');

        fireEvent.change(firstNameInput, { target: { value: firstNameValue}});

        expect(firstNameInput.value).toBe(firstNameValue);
    });

    test('handles last name input change', () => {
        render(<SignUp isMobile={false}/>);

        const lastNameValue = "Doe";
        const lastNameInput = screen.getByLabelText(/last name/i).querySelector('input');

        fireEvent.change(lastNameInput, { target: { value: lastNameValue}});

        expect(lastNameInput.value).toBe(lastNameValue);
    });

    test('handles password input change', () => {
        render(<SignUp isMobile={false}/>);

        const passwordValue = "password";
        const passwordInput = screen.getByLabelText(/password/i).querySelector('input');

        fireEvent.change(passwordInput, { target: { value: passwordValue}});

        expect(passwordInput.value).toBe(passwordValue);
    });

    test('handles sign up on form submission', () => {
        const signUpMock = jest.fn();
        useAuth.mockReturnValue({ signUp: signUpMock, error: null});

        render(<SignUp isMobile={false}/>);
        const button = screen.getByLabelText(/submit/i);

        fireEvent.click(button);
        expect(signUpMock).toHaveBeenCalled();
    });

    test('handles navigate to sign in click', () => {
        const navigateMock = jest.fn();
        useNavigate.mockReturnValue(navigateMock);

        render(<SignUp isMobile={false}/>);
        const signInLink = screen.getByLabelText(/navigate to sign in/);

        fireEvent.click(signInLink);
        expect(navigateMock).toHaveBeenCalledWith('/sign-in');
    });
});