import React from "react";
import {render, screen} from "@testing-library/react";
import axios from "axios";
import Page from "@/app/admin/topics/page";
import "@testing-library/jest-dom";

jest.mock("axios");

const topicData = [
     {
        "id": 17,
        "name": "Cells",
        "subject": "Biology",
        "qualification": "GCSEs",
        "questionCount": 1
    },
];

const apiUrl = "http://localhost:8080";

describe("Topics Dashboard Page", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        process.env.API_URL = apiUrl;
    });

    it("renders the dashboard header and topics table when data is loaded", async () => {
        (axios.get as jest.Mock).mockResolvedValueOnce({data: topicData})
        render(<Page/>);

        expect(await screen.findByRole("heading", {level: 1, name: "Topics"})).toBeInTheDocument();
        expect(await screen.findByText("Cells")).toBeInTheDocument();
    });

    it("renders an error message when no topics are loaded", async () => {
        (axios.get as jest.Mock).mockResolvedValueOnce({data: []})
        render(<Page/>);

        expect(await screen.findByText("Unable to load the topics table.")).toBeInTheDocument();
    });
});
