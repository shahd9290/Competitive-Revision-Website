import React from "react";
import {render, screen} from "@testing-library/react";
import axios from "axios";
import Page from "@/app/admin/questions/page";
import "@testing-library/jest-dom";

jest.mock("axios");

const questionsData = [
     {
        "id": 32,
        "question": "42 / 2",
        "answer": "21",
        "marks": 4,
        "subject": "Mathematics",
        "topic": "Arithmetic"
    },
];

const apiUrl = "http://localhost:8080";

describe("Questions Dashboard Page", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        process.env.API_URL = apiUrl;
    });

    it("renders the dashboard header and questions table when data is loaded", async () => {
        (axios.get as jest.Mock).mockResolvedValueOnce({data: questionsData})
        render(<Page/>);

        expect(await screen.findByRole("heading", {level: 1, name: "Questions"})).toBeInTheDocument();
        expect(await screen.findByText("42 / 2")).toBeInTheDocument();
    });

    it("renders an error message when no questions are loaded", async () => {
        (axios.get as jest.Mock).mockResolvedValueOnce({data: []})
        render(<Page/>);

        expect(await screen.findByText("Unable to load the questions table.")).toBeInTheDocument();
    });
});
