/**
 * __tests__/Quiz.test.tsx
 *
 * This test file includes local polyfills for scrollIntoView and hasPointerCapture.
 */

import React from "react";
import {render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import {useRouter} from "next/navigation";
import Page from "@/app/quiz/page";
import '@testing-library/jest-dom'

// Local polyfills added for this test file.
beforeAll(() => {
    if (!Element.prototype.scrollIntoView) {
        Element.prototype.scrollIntoView = () => {
        };
    }
    if (!Element.prototype.hasPointerCapture) {
        Element.prototype.hasPointerCapture = () => false;
    }
});

// Sample data for testing.
const topicData = {id: "1", name: "Mathematics"};
const questionDataSingle = {
    questions: [
        {
            id: 8,
            question: "12 + 8",
            marks: 4,
            answer: "20",
        },
    ],
    totalMarks: 4,
};

const questionDataDouble = {
    questions: [
        {
            id: 8,
            question: "12 + 8",
            marks: 4,
            answer: "20",
        },
        {
            "id": 11,
            "question": "81 / 9",
            "marks": 4,
            "answer": "9"
        },
    ],
    totalMarks: 4,
};

// Mock Next.js router (to verify navigation).
jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));

// Mock axios for GET and POST requests.
jest.mock("axios");

describe("Quiz Page", () => {
    const mockPush = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useRouter as jest.Mock).mockReturnValue({
            push: mockPush,
        });
        process.env.API_URL = "http://localhost:8080";
    });

    it("renders the quiz page and displays the question", async () => {
        // Mock responses for topic and questions.
        (axios.get as jest.Mock)
            .mockResolvedValueOnce({data: topicData}) // topic call
            .mockResolvedValueOnce({data: questionDataSingle}); // questions call

        render(<Page searchParams={{id: "1"}}/>);

        // Verify the topic is rendered.
        expect(await screen.findByText("Mathematics")).toBeInTheDocument();

        // Verify the question and answer input are rendered.
        expect(await screen.findByText("12 + 8")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Enter your answer")).toBeInTheDocument();
    });

    it("submits the correct answer and completes the quiz", async () => {
        // Mock GET responses.
        (axios.get as jest.Mock)
            .mockResolvedValueOnce({data: topicData})
            .mockResolvedValueOnce({data: questionDataSingle});
        // Mock POST for saving marks.
        (axios.post as jest.Mock).mockResolvedValueOnce({data: 4});

        render(<Page searchParams={{id: "1"}}/>);
        const user = userEvent.setup();

        // Wait for the question to appear.
        expect(await screen.findByText("12 + 8")).toBeInTheDocument();

        // Type the correct answer.
        const answerInput = screen.getByPlaceholderText("Enter your answer");
        await user.type(answerInput, "20");

        // Submit the answer.
        await user.click(screen.getByRole("button", {name: /Submit Answer/i}));

        // Check that a "Correct!" badge appears.
        expect(await screen.findByText(/Correct!/i)).toBeInTheDocument();

        // Since we have one question, the quiz should complete.
        await waitFor(() => {
            expect(screen.getByText(/Quiz Completed!/i)).toBeInTheDocument();
        });

        // Verify that axios.post was called to save marks.
        expect(axios.post).toHaveBeenCalledWith(
            "http://localhost:8080/api/user/save-marks",
            {
                marks: 4,
                topicId: "1",
                proportion: 1,
            },
            {withCredentials: true}
        );
    });

    it("submits the correct answer and loads next question", async () => {
        // Mock GET responses.
        (axios.get as jest.Mock)
            .mockResolvedValueOnce({data: topicData})
            .mockResolvedValueOnce({data: questionDataDouble});
        // Mock POST for saving marks.

        render(<Page searchParams={{id: "1"}}/>);
        const user = userEvent.setup();

        // Wait for the question to appear.
        expect(await screen.findByText("12 + 8")).toBeInTheDocument();

        // Type the correct answer.
        const answerInput = screen.getByPlaceholderText("Enter your answer");
        await user.type(answerInput, "20");

        // Submit the answer.
        await user.click(screen.getByRole("button", {name: /Submit Answer/i}));

        // Check that a "Correct!" badge appears.
        expect(await screen.findByText(/Correct!/i)).toBeInTheDocument();

        expect(await screen.findByText("81 / 9")).toBeInTheDocument();

    });

    it("shows error when the answer is incorrect", async () => {
        (axios.get as jest.Mock)
            .mockResolvedValueOnce({data: topicData})
            .mockResolvedValueOnce({data: questionDataSingle});

        render(<Page searchParams={{id: "1"}}/>);
        const user = userEvent.setup();

        expect(await screen.findByText("12 + 8")).toBeInTheDocument();

        // Submit an incorrect answer.
        const answerInput = screen.getByPlaceholderText("Enter your answer");
        await user.type(answerInput, "25");
        await user.click(screen.getByRole("button", {name: /Submit Answer/i}));

        // Expect to see an "Incorrect" badge.
        expect(await screen.findByText(/Incorrect/i)).toBeInTheDocument();
        // Verify that the question remains visible.
        expect(screen.getByText("12 + 8")).toBeInTheDocument();
    });

    it("shows an error when answer is empty", async () => {
        (axios.get as jest.Mock)
            .mockResolvedValueOnce({data: topicData})
            .mockResolvedValueOnce({data: questionDataSingle});

        render(<Page searchParams={{id: "1"}}/>);
        const user = userEvent.setup();

        expect(await screen.findByText("12 + 8")).toBeInTheDocument();

        const answerInput = screen.getByPlaceholderText("Enter your answer");
        await user.clear(answerInput);
        await user.click(screen.getByRole("button", {name: /Submit Answer/i}));

        // Expect an error message.
        expect(await screen.findByText("Please enter an answer")).toBeInTheDocument();
    });

    it("allows skipping the question and finishing, awarding zero marks", async () => {
        (axios.get as jest.Mock)
            .mockResolvedValueOnce({data: topicData})
            .mockResolvedValueOnce({data: questionDataSingle});
        // Mock POST for saving marks after skipping.
        (axios.post as jest.Mock).mockResolvedValueOnce({data: 0});

        render(<Page searchParams={{id: "1"}}/>);
        const user = userEvent.setup();

        expect(await screen.findByText("12 + 8")).toBeInTheDocument();

        const answerInput = screen.getByPlaceholderText("Enter your answer");
        await user.type(answerInput, "25");
        await user.click(screen.getByRole("button", {name: /Submit Answer/i}));

        // Click the "Skip Question" button.
        await user.click(screen.getByRole("button", {name: /Skip Question/i}));

        // Wait for the quiz to complete.
        await waitFor(() => {
            expect(screen.getByText(/Quiz Completed!/i)).toBeInTheDocument();
        });

        // Verify POST was called with zero marks.
        expect(axios.post).toHaveBeenCalledWith(
            "http://localhost:8080/api/user/save-marks",
            expect.objectContaining({
                marks: 0,
                topicId: "1",
                proportion: 0,
            }),
            {withCredentials: true}
        );
    });

    it("allows skipping the question to the next", async () => {
        (axios.get as jest.Mock)
            .mockResolvedValueOnce({data: topicData})
            .mockResolvedValueOnce({data: questionDataDouble});

        render(<Page searchParams={{id: "1"}}/>);
        const user = userEvent.setup();

        expect(await screen.findByText("12 + 8")).toBeInTheDocument();

        // Need to get it wrong first.
        const answerInput = screen.getByPlaceholderText("Enter your answer");
        await user.type(answerInput, "25");
        await user.click(screen.getByRole("button", {name: /Submit Answer/i}));

        // Click the "Skip Question" button.
        await user.click(screen.getByRole("button", {name: /Skip Question/i}));

        expect(await screen.findByText("81 / 9")).toBeInTheDocument();

    });

});
