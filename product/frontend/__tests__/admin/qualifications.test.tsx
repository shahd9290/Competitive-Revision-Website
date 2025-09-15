import React from "react";
import {render, screen} from "@testing-library/react";
import axios from "axios";
import Page from "@/app/admin/qualifications/page";
import "@testing-library/jest-dom";

jest.mock("axios");

const qualificationData = [
    {
        "id": 2,
        "qualification": "A-Levels",
        "subjectsNum": 4,
        "usersNum": 1,
    }
];

const apiUrl = "http://localhost:8080";

describe("Qualifications Dashboard Page", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        process.env.NEXT_PUBLIC_API_URL = apiUrl;
    });

    it("renders the dashboard header and qualifications table when data is loaded", async () => {
        (axios.get as jest.Mock).mockResolvedValueOnce({data: qualificationData})
        render(<Page/>);

        expect(await screen.findByRole("heading", {level: 1, name: "Qualifications"})).toBeInTheDocument();
        expect(await screen.findByText("A-Levels")).toBeInTheDocument();
    });

    it("renders an error message when no qualifications are loaded", async () => {
        (axios.get as jest.Mock).mockResolvedValueOnce({data: []})
        render(<Page/>);

        expect(await screen.findByText("Unable to load the qualifications table.")).toBeInTheDocument();
    });
});
