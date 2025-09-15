// __tests__/Dashboard.test.tsx

import React from "react";
import {render, screen, within} from "@testing-library/react";
import axios from "axios";
import Page from "@/app/admin/dashboard/page";
import '@testing-library/jest-dom'

// Set up a mock for axios.
jest.mock("axios");

// Sample dashboard response data (the shape expected by Dashboard).
const dashboardResponse = {
    dashboard: {
        totalQuestions: 1,
        totalTopics: 1,
        totalSubjects: 1,
        totalUsers: 2,
        totalQualifications: 1,
        recentAttempts: [
            {
                id: 1,
                user: "user4",
                topic: "Arithmetic",
                score: "100.0%",
                date: "2025-04-07 11:56",
            },
        ],
    },
    logs: [
        {
            id: 1,
            user: "test",
            action: "Created new Arithmetic Question",
            target: "Question: 10 + 10, Answer 20, Marks 10",
            timestamp: "2 days ago, 15:01",
        },
    ],
};

describe("Dashboard Page", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // Set your API URL so that Dashboard picks it up.
        process.env.API_URL = "http://localhost:8080";
    });

    it("renders the dashboard stat cards with correct values", async () => {
        // Mock the GET call that Dashboard makes.
        (axios.get as jest.Mock).mockResolvedValueOnce({data: dashboardResponse});

        render(<Page/>);
        // Wait until at least one of the stat cards shows its value.
        // Here, we use the label texts to narrow our queries.
        const questionsCard = await screen.findByText("Total Questions");
        const questionsValue = within(questionsCard.parentElement!).getByText("1");
        expect(questionsValue).toBeInTheDocument();

        const topicsCard = screen.getByText("Total Topics");
        const topicsValue = within(topicsCard.parentElement!).getByText("1");
        expect(topicsValue).toBeInTheDocument();

        const subjectsCard = screen.getByText("Total Subjects");
        const subjectsValue = within(subjectsCard.parentElement!).getByText("1");
        expect(subjectsValue).toBeInTheDocument();

        const qualificationsCard = screen.getByText("Total Qualifications");
        const qualificationsValue = within(qualificationsCard.parentElement!).getByText("1");
        expect(qualificationsValue).toBeInTheDocument();

        const usersCard = screen.getByText("Total Users");
        const usersValue = within(usersCard.parentElement!).getByText("2");
        expect(usersValue).toBeInTheDocument();
    });

    it("renders the activity log with the log entry", async () => {
        (axios.get as jest.Mock).mockResolvedValueOnce({data: dashboardResponse});

        render(<Page/>);
        // Wait for the activity log to be rendered
        expect(await screen.findByText("Activity Log")).toBeInTheDocument();

        // Check that the log entry is rendered properly.
        const action = await screen.findByText("Created new Arithmetic Question");
        expect(action).toBeInTheDocument();

        const target = screen.getByText("Question: 10 + 10, Answer 20, Marks 10");
        expect(target).toBeInTheDocument();

        const timestamp = screen.getByText("2 days ago, 15:01");
        expect(timestamp).toBeInTheDocument();
    });

    it("renders the recent attempts card with attempt details", async () => {
        (axios.get as jest.Mock).mockResolvedValueOnce({data: dashboardResponse});

        render(<Page/>);
        // Wait for the recent attempts title to be rendered.
        expect(await screen.findByText("Recent Attempts")).toBeInTheDocument();

        // Check that the attempt row renders correctly.
        const attemptUser = await screen.findByText("user4");
        expect(attemptUser).toBeInTheDocument();

        const attemptTopic = screen.getByText("Arithmetic");
        expect(attemptTopic).toBeInTheDocument();

        const attemptScore = screen.getByText("100.0%");
        expect(attemptScore).toBeInTheDocument();

        const attemptDate = screen.getByText("2025-04-07 11:56");
        expect(attemptDate).toBeInTheDocument();
    });

    it("renders quick access buttons with correct labels", async () => {
        (axios.get as jest.Mock).mockResolvedValueOnce({data: dashboardResponse});

        render(<Page/>);
        // Check that there are two links, the sidebar and the quick access buttons.
        const questions = await screen.findAllByRole('link', {name: /^Questions$/i})
        expect(questions.length).toBe(2);
        const topics = await screen.findAllByRole('link', {name: /^Topics$/i})
        expect(topics.length).toBe(2);
        const subjects = await screen.findAllByRole('link', {name: /^Subjects$/i})
        expect(subjects.length).toBe(2);
        const qualifications = await screen.findAllByRole('link', {name: /^Qualifications$/i})
        expect(qualifications.length).toBe(2);
        const users = await screen.findAllByRole('link', {name: /^Users$/i})
        expect(users.length).toBe(2);


    });
});
