import React from "react";
import {render, screen} from "@testing-library/react";
import axios from "axios";
import Page from "@/app/admin/users/page";
import "@testing-library/jest-dom";

jest.mock("axios");

const userData = [
    {
        "id": "25954d86-0d29-4be5-9ca8-55f8ae43e5aa",
        "username": "user2",
        "email": "user2@test.com",
        "role": "User",
        "createdAt": "April 6, 2025 18:10",
        "qualification": "A-Levels"
    }
];

const apiUrl = "http://localhost:8080";

describe("Users Dashboard Page", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        process.env.API_URL = apiUrl;
    });

    it("renders the dashboard header and users table when data is loaded", async () => {
        (axios.get as jest.Mock).mockResolvedValueOnce({data: userData})
        render(<Page/>);

        expect(await screen.findByRole("heading", {level: 1, name: "Users"})).toBeInTheDocument();
        expect(await screen.findByText("user2")).toBeInTheDocument();
    });

    it("renders an error message when no users are loaded", async () => {
        (axios.get as jest.Mock).mockResolvedValueOnce({data: []})
        render(<Page/>);

        expect(await screen.findByText("Unable to load the users table.")).toBeInTheDocument();
    });
});
