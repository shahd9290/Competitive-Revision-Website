import React from "react";
import {render, screen} from "@testing-library/react";
import axios from "axios";
import Page from "@/app/admin/subjects/page";
import "@testing-library/jest-dom";

jest.mock("axios");

const subjectData = [
    {
        "id": 3,
        "name": "Accounting",
        "topicNum": 0,
        "qualification": "A-Levels"
    },
];

const apiUrl = "http://localhost:8080";

describe("Subjects Dashboard Page", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        process.env.NEXT_PUBLIC_API_URL = apiUrl;
    });

    it("renders the dashboard header and subjects table when data is loaded", async () => {
        (axios.get as jest.Mock).mockResolvedValueOnce({data: subjectData})
        render(<Page/>);

        expect(await screen.findByRole("heading", {level: 1, name: "Subjects"})).toBeInTheDocument();
        expect(await screen.findByText("Accounting")).toBeInTheDocument();
    });

    it("renders an error message when no subjects are loaded", async () => {
        (axios.get as jest.Mock).mockResolvedValueOnce({data: []})
        render(<Page/>);

        expect(await screen.findByText("Unable to load the subjects table.")).toBeInTheDocument();
    });
});
