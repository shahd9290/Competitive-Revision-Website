import axios from "axios";
import {fireEvent, render, screen} from "@testing-library/react";
import Page from "@/app/subjects/page";
import '@testing-library/jest-dom'

jest.mock("axios")
let mockPush: jest.Mock;

beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    const {useRouter} = jest.requireMock('next/navigation');
    mockPush = jest.fn();
    useRouter.mockReturnValue({push: mockPush});
});

const mockedAxios = axios as jest.Mocked<typeof axios>;
it("uses the user's qualification to get and display two subjects", async () => {
    mockedAxios.get.mockResolvedValueOnce({data: {name: "A-Levels"}});

    mockedAxios.get.mockResolvedValueOnce({
        data: [{
            id: 1, name: "Mathematics", topics: [{
                id: 1, name: "Binomials"
            }]
        }, {
            id: 2, name: "Physics", topics: []
        }]
    })

    render(<Page/>)

    const mathsButton = await screen.findByText("Mathematics");
    const physButton = await screen.findByText("Physics");
    expect(mathsButton).toBeInTheDocument();
    expect(physButton).toBeInTheDocument();

    fireEvent.click(mathsButton);
    expect(screen.getByText("Binomials")).toBeInTheDocument();
    fireEvent.click(physButton);
    expect(screen.getByText("No topics available for this subject")).toBeInTheDocument();

    expect(mockedAxios.get).toHaveBeenCalledTimes(2);
    expect(mockedAxios.get).toHaveBeenNthCalledWith(1, "http://localhost:8080/api/user/get-qualification", {withCredentials: true});
    expect(mockedAxios.get).toHaveBeenNthCalledWith(2, "http://localhost:8080/api/subject/get-all?qualification=A-Levels", {withCredentials: true});

})

