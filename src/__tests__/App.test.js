import { render, screen } from '@testing-library/react';
import App from '../App';
import { useAuth } from 'hooks';

jest.mock('hooks', () => ({
  useAuth: jest.fn()
}));

const defaultUseAuthValue = {
  user: null,
  signOut: function() {},
}

describe('App', () => {

  test('renders Navbar component', () => {
    useAuth.mockReturnValue(defaultUseAuthValue);

    render(
      <App />
    );

    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  test('renders SignIn page on landing when not signed in', () => {
    window.history.pushState({}, 'Main Page', '/');

    useAuth.mockReturnValue(defaultUseAuthValue);

    render(
      <App />
    );

    const signInTexts = screen.getAllByText(/sign in/i);
    expect(screen.getByRole('form')).toBeInTheDocument();
    expect(signInTexts.length).toBeGreaterThan(0);
  });

  test('SignIn page is defined on /sign-in', () => {
    window.history.pushState({}, 'Sign-in page', '/sign-in');

    useAuth.mockReturnValue(defaultUseAuthValue);

    render(
      <App />
    );

    const signInTexts = screen.getAllByText(/sign in/i);
    expect(screen.getByRole('form')).toBeInTheDocument();
    expect(signInTexts.length).toBeGreaterThan(0);
  });

  test('SignUp page is defined on /sign-up', () => {
    window.history.pushState({}, 'Sign-up page', '/sign-up');

    useAuth.mockReturnValue(defaultUseAuthValue);

    render(
      <App />
    );

    const signInTexts = screen.getAllByText(/sign up/i);
    expect(screen.getByRole('form')).toBeInTheDocument();
    expect(signInTexts.length).toBeGreaterThan(0);
  });

  test('unknown url redirects to 404', () => {
    window.history.pushState({}, 'Unknown page', '/somethingrandom');

    useAuth.mockReturnValue(defaultUseAuthValue);

    render(
      <App />
    );

    const signInTexts = screen.getAllByText(/404/i);
    expect(signInTexts.length).toBeGreaterThan(0);
  });

  test('AuthProvider provides context', () => {
    window.history.pushState({}, 'Main page', '/');

    const mockUser = { name: 'John Doe', email: 'john@example.com' };

    useAuth.mockReturnValue({
        user: mockUser, 
        signOut: function() {}
    });

    render(<App />);

    expect(screen.queryByText(/sign in/i)).not.toBeInTheDocument();
  });

  // AxiosErrorHandler is working

});
