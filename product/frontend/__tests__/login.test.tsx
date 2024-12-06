import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Page from '@/app/login/page'
import {userEvent} from "@testing-library/user-event/";

///////////////////////////////// START OF CHAT-GPT GENERATED CODE /////////////////////////////////////
// Generative AI was used for this section to ensure mocks were created properly for these tests.
// These were required for the tests to run.

// Mock the next/router or next/navigation (for Next.js 13)
jest.mock('next/navigation', () => ({
    useRouter: jest.fn().mockReturnValue({ push: jest.fn() }),
}));

// Mock axios
jest.mock('axios');

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