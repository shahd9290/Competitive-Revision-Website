import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Page from '@/app/login/page'
import {userEvent} from "@testing-library/user-event/";
import axios from "axios";

//////////////////////////////// START OF CHAT-GPT GENERATED CODE ////////////////////////////////////
// Generative AI was used for this section to ensure mocks were created properly for these tests.
// These were required for the tests to run.

// Mock the next/router or next/navigation (for Next.js 13)
jest.mock('next/navigation', () => ({
    useRouter: jest.fn().mockReturnValue({ push: jest.fn() }),
}));

// Mock axios
jest.mock('axios');

let mockPush: jest.Mock;

beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    const { useRouter } = jest.requireMock('next/navigation');
    mockPush = jest.fn();
    useRouter.mockReturnValue({ push: mockPush });
});

///////////////////////////////// END OF CHAT-GPT GENERATED CODE /////////////////////////////////////


it('should render login page', () => {
    render(<Page />)
    expect(screen.getByText('Sign in to your account')).toBeInTheDocument();
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
})

it('allows the user to enter login details', async () => {
    render(<Page />)
    const user = userEvent.setup();
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(usernameInput, 'user');
    await user.type(passwordInput, 'password');

    expect(usernameInput).toHaveValue('user');
    expect(passwordInput).toHaveValue('password');
})

it('submits user details and redirects on success', async () => {
    render(<Page />)
    const user = userEvent.setup();

    (axios.post as jest.Mock).mockResolvedValueOnce({data : {success: true}});

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const signInButton = screen.getByRole('button', { name: /sign in/i });

    await user.type(usernameInput, 'user');
    await user.type(passwordInput, 'password');
    await user.click(signInButton);


    expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:8080/api/auth/login',
        { username: 'user', password: 'password' },
        { withCredentials: true }
    );

    expect(mockPush).toHaveBeenCalledWith('/dashboard');
});

it('shows an alert if an error occurs during login', async () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    (axios.post as jest.Mock).mockRejectedValueOnce({
        response: {
            data: 'Invalid credentials',
        },
    });

    render(<Page />);
    const user = userEvent.setup();

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const signInButton = screen.getByRole('button', { name: /sign in/i });

    await user.type(usernameInput, 'wronguser');
    await user.type(passwordInput, 'wrongpass');
    await user.click(signInButton);

    expect(axios.post).toHaveBeenCalled();
    expect(alertMock).toHaveBeenCalledWith('Invalid credentials');

    alertMock.mockRestore();
});

it('shows a generic alert if server is unreachable', async () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    (axios.post as jest.Mock).mockRejectedValueOnce(new Error('Network Error'));

    render(<Page />);
    const user = userEvent.setup();

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const signInButton = screen.getByRole('button', { name: /sign in/i });

    await user.type(usernameInput, 'user');
    await user.type(passwordInput, 'password');
    await user.click(signInButton);

    expect(axios.post).toHaveBeenCalled();
    expect(alertMock).toHaveBeenCalledWith('Unable to connect to server.');

    alertMock.mockRestore();
});
