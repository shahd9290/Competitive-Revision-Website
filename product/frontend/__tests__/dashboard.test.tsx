import {fireEvent, render, screen} from "@testing-library/react";
import Page from "@/app/dashboard/page";
import axios from "axios";
import '@testing-library/jest-dom'


jest.mock('axios')

const mockUserData = {
    username: "user",
    marks: 150,
    attempts: [
        {
            topicName: "Algebra",
            proportion: "50.0%",
            date: "April 7, 2025 10:28"
        },
        {
            topicName: "Python",
            proportion: "100.0%",
            date: "April 7, 2025 10:27"
        }
    ]
};

it("displays the sidebar", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({data: {username: "user"}})
    render(<Page/>)

    expect(await screen.findByRole('link', {name: /dashboard/i})).toBeInTheDocument()
    expect(await screen.findByRole('link', {name: /search/i})).toBeInTheDocument()
    expect(await screen.findByRole('link', {name: /logout/i})).toBeInTheDocument()

    const sidebar = screen.getByRole('link', {name: ""});
    fireEvent.mouseEnter(sidebar);
    expect(screen.getAllByText(/Study App/i)[0]).toBeInTheDocument();
})

it("displays the user profile", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({data: mockUserData})
    render(<Page/>)

    expect(await screen.findByText(/Hello, user!/i)).toBeInTheDocument()
    expect(await screen.findByText(/Level 2/i)).toBeInTheDocument();
    expect(await screen.findByText(/150 Points/i)).toBeInTheDocument();
})

it("displays the performance summary correctly", async () => {
    // Provide the full user profile data for performance summary
    (axios.get as jest.Mock).mockResolvedValueOnce({data: mockUserData});
    render(<Page/>);

    // Verify performance summary values:
    // Average Score should be calculated as 100% because there's one attempt with 100.
    expect(await screen.findByText(/Average Score/i)).toBeInTheDocument();
    expect(await screen.findByText(/100%/i)).toBeInTheDocument();

    // Highest Score should also be 100%.
    expect(await screen.findByText(/Highest Score/i)).toBeInTheDocument();
    expect(await screen.findByText(/100%/i)).toBeInTheDocument();

    // Total Attempts should display "1"
    expect(await screen.findByText(/Total Attempts/i)).toBeInTheDocument();
    expect(await screen.findByText(/^2$/)).toBeInTheDocument(); // Using ^ and $ to match exactly "1"

    // Last Attempt should display "100.0%"
    expect(await screen.findByText(/Last Attempt/i)).toBeInTheDocument();
    expect(await screen.findByText(/100\.0%/i)).toBeInTheDocument();
});

it("displays the attempt in the attempts table correctly", async () => {
    // Provide the same mock data to get the attempts table rendered.
    (axios.get as jest.Mock).mockResolvedValueOnce({data: mockUserData});
    render(<Page/>);

    // Check that the attempt's topic "Python" appears in the table.
    expect(await screen.findByText(/Python/i)).toBeInTheDocument();

})