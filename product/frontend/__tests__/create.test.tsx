import Page from "@/app/create/page";
import {render, screen, waitFor} from "@testing-library/react";
import '@testing-library/jest-dom'
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

it("loads the registration form", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({data: []})

    render(<Page />);

    expect(await screen.findByText("Create your new Study App account")).toBeInTheDocument();
    expect(await screen.findByLabelText(/Username/i)).toBeInTheDocument();
    expect(await screen.findByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(await screen.findByLabelText(/Confirm Email/i)).toBeInTheDocument();
    expect(await screen.findByLabelText(/Password/i)).toBeInTheDocument();
    expect(await screen.findByLabelText(/Qualification/i)).toBeInTheDocument();
})

it("gets all qualifications", async () => {
    const qualifications = [
        {id: 1, name: "GCSEs"},
        {id: 2, name: "A-Levels"}
    ];
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: qualifications });
    render(<Page />)
    const user = userEvent.setup()

    await screen.findByText("GCSEs")
    const select =  screen.getByLabelText(/Qualification/i);

    await user.selectOptions(select, "GCSEs");
    expect(select).toHaveValue("GCSEs");
})

it('alerts if emails do not match', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: [] });

    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(<Page />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/Username/i), 'user');
    await user.type(screen.getByLabelText(/^Email Address$/i), 'user@example.com');
    await user.type(screen.getByLabelText(/Confirm Email/i), 'user2@example.com');
    await user.type(screen.getByLabelText(/Password/i), 'password');
    await user.selectOptions(screen.getByLabelText(/Qualification/i), 'Please select a qualification');

    await user.click(screen.getByRole('button', { name: /Create account/i }));

    expect(alertMock).toHaveBeenCalledWith("Please ensure you have entered the correct email address in both sections!");
    alertMock.mockRestore();
});

it('alerts if qualification is not selected', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: [] });

    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const user = userEvent.setup();

    render(<Page />);

    await user.type(screen.getByLabelText(/Username/i), 'user');
    await user.type(screen.getByLabelText(/^Email Address$/i), 'user@example.com');
    await user.type(screen.getByLabelText(/Confirm Email/i), 'user@example.com');
    await user.type(screen.getByLabelText(/Password/i), 'password');

    await user.click(screen.getByRole('button', { name: /Create account/i }));

    expect(alertMock).toHaveBeenCalledWith("Please select a qualification");
    alertMock.mockRestore();
});

it('submits form and navigates on success', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: [{id:1,name:'GCSEs'}] });
    (axios.post as jest.Mock).mockResolvedValueOnce({ data: { success: true } });
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const user = userEvent.setup();

    render(<Page />);

    const usernameInput = await screen.findByLabelText(/Username/i);
    const emailInput = screen.getByLabelText(/^Email Address$/i);
    const confirmEmailInput = screen.getByLabelText(/Confirm Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const qualificationSelect = screen.getByLabelText(/Qualification/i);

    await user.type(usernameInput, 'user');
    await user.type(emailInput, 'user@example.com');
    await user.type(confirmEmailInput, 'user@example.com');
    await user.type(passwordInput, 'password');
    await user.selectOptions(qualificationSelect, 'GCSEs');

    await user.click(screen.getByRole('button', { name: /Create account/i }));

    await waitFor(() => {
        expect(axios.post).toHaveBeenCalledWith("http://localhost:8080/api/auth/register", {
            username: 'user',
            email: 'user@example.com',
            password: 'password',
            qualification: 'GCSEs'
        });
        expect(alertMock).toHaveBeenCalledWith("Account created successfully.");
        expect(mockPush).toHaveBeenCalledWith('/login');
    });

    alertMock.mockRestore();
});

it('displays error message from server', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: [{id:1,name:'B.Sc in CS'}] });
    (axios.post as jest.Mock).mockRejectedValueOnce({ response: { data: 'Email already in use' } });

    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const user = userEvent.setup();

    render(<Page />);

    await user.type(screen.getByLabelText(/Username/i), 'testuser');
    await user.type(screen.getByLabelText(/^Email Address$/i), 'user@example.com');
    await user.type(screen.getByLabelText(/Confirm Email/i), 'user@example.com');
    await user.type(screen.getByLabelText(/Password/i), 'password123');
    await user.selectOptions(screen.getByLabelText(/Qualification/i), 'B.Sc in CS');

    await user.click(screen.getByRole('button', { name: /Create account/i }));

    await waitFor(() => {
        expect(alertMock).toHaveBeenCalledWith("Email already in use");
    });

    alertMock.mockRestore();
});

it('displays generic error if server cannot be reached', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: [{id:1,name:'B.Sc in CS'}] });
    (axios.post as jest.Mock).mockRejectedValueOnce(new Error('Network Error'));

    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const user = userEvent.setup();

    render(<Page />);

    await user.type(screen.getByLabelText(/Username/i), 'testuser');
    await user.type(screen.getByLabelText(/^Email Address$/i), 'user@example.com');
    await user.type(screen.getByLabelText(/Confirm Email/i), 'user@example.com');
    await user.type(screen.getByLabelText(/Password/i), 'password123');
    await user.selectOptions(screen.getByLabelText(/Qualification/i), 'B.Sc in CS');

    await user.click(screen.getByRole('button', { name: /Create account/i }));

    await waitFor(() => {
        expect(alertMock).toHaveBeenCalledWith("Unable to connect to server.");
    });

    alertMock.mockRestore();
});