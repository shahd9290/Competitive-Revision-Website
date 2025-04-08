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
    useRouter: jest.fn().mockReturnValue({push: jest.fn()}),
}));

// Mock axios
jest.mock('axios');

let mockPush: jest.Mock;

beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    const {useRouter} = jest.requireMock('next/navigation');
    mockPush = jest.fn();
    useRouter.mockReturnValue({push: mockPush});

});
beforeAll(() => {
    if (!Element.prototype.scrollIntoView) {
        Element.prototype.scrollIntoView = () => {
        };
    }
    if (!Element.prototype.hasPointerCapture) {
        Element.prototype.hasPointerCapture = () => false;
    }
});

const toastMock = jest.fn();

jest.mock('../hooks/use-toast', () => ({
    useToast: () => ({
        toast: toastMock,
    }),
}));
///////////////////////////////// END OF CHAT-GPT GENERATED CODE /////////////////////////////////////
const qualifications = [
    {id: 1, name: "GCSEs"},
    {id: 2, name: "A-Levels"}
];
it("loads the registration form", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({data: qualifications})

    render(<Page/>);

    expect(await screen.findByText("Create an Account")).toBeInTheDocument();
    expect(await screen.findByText("Sign up to get started")).toBeInTheDocument();
    expect(await screen.findByLabelText(/Username/i)).toBeInTheDocument();
    expect(await screen.findByLabelText(/Email/i)).toBeInTheDocument();
    expect(await screen.findByLabelText(/^Password$/)).toBeInTheDocument();
    expect(await screen.findByLabelText(/Confirm Password/i)).toBeInTheDocument();
    expect(await screen.findByLabelText(/Qualification/i)).toBeInTheDocument();
})

it("gets all qualifications", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({data: qualifications});
    render(<Page/>);
    const user = userEvent.setup();


    // Selecting Option
    const selectTrigger = screen.getByRole("combobox");
    expect(selectTrigger).toHaveTextContent("Select qualification");
    await user.click(selectTrigger);
    const gcseOption = await screen.findByText("GCSEs", {selector: "span"});
    expect(gcseOption).toBeInTheDocument();
    await user.click(gcseOption);
    await waitFor(() => {
        expect(selectTrigger).toHaveTextContent("GCSEs");
    });
})

it('alerts if passwords do not match', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({data: qualifications});

    render(<Page/>);

    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/Username/i), 'user');
    await user.type(screen.getByLabelText(/Email/i), 'user@example.com');
    await user.type(screen.getByLabelText(/^Password$/i), 'password');
    await user.type(screen.getByLabelText(/Confirm Password/i), 'wrongpassword');

    const selectTrigger = screen.getByRole("combobox");
    await user.click(selectTrigger);
    await user.click(await screen.findByText("GCSEs", {selector: "span"}));
    await user.click(screen.getByRole('button', {name: /Sign up/i}));

    expect(toastMock).toHaveBeenCalledWith(expect.objectContaining({description: "Passwords do not match!"}));

});

it('alerts if qualification is not selected', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({data: qualifications});

    const user = userEvent.setup();

    render(<Page/>);

    await user.type(screen.getByLabelText(/Username/i), 'user');
    await user.type(screen.getByLabelText(/Email/i), 'user@example.com');
    await user.type(screen.getByLabelText(/^Password$/i), 'password');
    await user.type(screen.getByLabelText(/Confirm Password/i), 'password');

    await user.click(screen.getByRole('button', {name: /Sign up/i}));

    expect(toastMock).toHaveBeenCalledWith(expect.objectContaining({description: "Please select a qualification"}));
});

it('submits form and navigates on success', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({data: qualifications});
    (axios.post as jest.Mock).mockResolvedValueOnce({data: {success: true}});
    const user = userEvent.setup();

    render(<Page/>);

    await user.type(screen.getByLabelText(/Username/i), 'user');
    await user.type(screen.getByLabelText(/Email/i), 'user@example.com');
    await user.type(screen.getByLabelText(/^Password$/i), 'password');
    await user.type(screen.getByLabelText(/Confirm Password/i), 'password');

    const selectTrigger = screen.getByRole("combobox");
    await user.click(selectTrigger);
    await user.click(await screen.findByText("GCSEs", {selector: "span"}));
    await user.click(screen.getByRole('button', {name: /Sign up/i}));

    await waitFor(() => {
        expect(axios.post).toHaveBeenCalledWith("http://localhost:8080/api/auth/register", {
            username: 'user',
            email: 'user@example.com',
            password: 'password',
            confirmPassword: 'password',
            qualification: 'GCSEs',
            role: 'ROLE_USER'
        }, {withCredentials: true});
        expect(toastMock).toHaveBeenCalledWith(expect.objectContaining({description: "Your account has been created successfully."}));
        expect(mockPush).toHaveBeenCalledWith('/login');
    });
});

it('displays error message from server', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({data: qualifications});
    (axios.post as jest.Mock).mockRejectedValueOnce({response: {data: 'Email already in use'}});
    const user = userEvent.setup();

    render(<Page/>);

    await user.type(screen.getByLabelText(/Username/i), 'user');
    await user.type(screen.getByLabelText(/Email/i), 'user@example.com');
    await user.type(screen.getByLabelText(/^Password$/i), 'password');
    await user.type(screen.getByLabelText(/Confirm Password/i), 'password');

    const selectTrigger = screen.getByRole("combobox");
    await user.click(selectTrigger);
    await user.click(await screen.findByText("GCSEs", {selector: "span"}));

    await user.click(screen.getByRole('button', {name: /Sign up/i}));

    expect(toastMock).toHaveBeenCalledWith(expect.objectContaining({description: "Email already in use"}));

});

it('displays generic error if server cannot be reached', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({data: qualifications});
    (axios.post as jest.Mock).mockRejectedValueOnce(new Error('Network Error'));

    const user = userEvent.setup();
    render(<Page/>);

    await user.type(screen.getByLabelText(/Username/i), 'user');
    await user.type(screen.getByLabelText(/Email/i), 'user@example.com');
    await user.type(screen.getByLabelText(/^Password$/i), 'password');
    await user.type(screen.getByLabelText(/Confirm Password/i), 'password');

    const selectTrigger = screen.getByRole("combobox");
    await user.click(selectTrigger);
    await user.click(await screen.findByText("GCSEs", {selector: "span"}));

    await user.click(screen.getByRole('button', {name: /Sign up/i}));

    expect(toastMock).toHaveBeenCalledWith(expect.objectContaining({description: "Unable to connect to server. Please try again later."}));
});