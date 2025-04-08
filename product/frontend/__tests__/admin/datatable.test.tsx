import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {DataTable} from "@/components/DataTable";
import {
    qualificationsColumns,
    questionColumns,
    subjectColumns,
    topicColumns,
    usersColumns
} from "@/components/TableColumns";
import '@testing-library/jest-dom';
import axios from "axios";
import {userEvent} from "@testing-library/user-event/";
jest.mock('axios');

const questionData = [
    {subject: "Math", topic: "Algebra", question: "2+2?", answer: "4", marks: 1},
    {subject: "Physics", topic: "Forces", question: "What is gravity?", answer: "9.8", marks: 2},
];

const qualificationData = [
    {qualification: "Maths", subjectsNum: 3, usersNum: 5},
    {qualification: "Science", subjectsNum: 1, usersNum: 2},
];

const subjectData = [
    {name: "Math", topicNum: 4, qualification: "High School"},
    {name: "Biology", topicNum: 2, qualification: "College"},
];

const topicData = [
    {name: "Algebra", subject: "Math", qualification: "High School", questionCount: 10},
    {name: "Photosynthesis", subject: "Biology", qualification: "College", questionCount: 5},
];

const userData = [
    {username: "admin", email: "admin@example.com", role: "Admin", createdAt: "2024-01-01", qualification: "N/A"},
    {
        username: "student",
        email: "student@example.com",
        role: "User",
        createdAt: "2024-02-01",
        qualification: "High School"
    },
];


beforeAll(() => {
    if (!Element.prototype.scrollIntoView) {
        Element.prototype.scrollIntoView = () => {
        };
    }
    if (!Element.prototype.hasPointerCapture) {
        Element.prototype.hasPointerCapture = () => false;
    }
});

beforeEach(() => {
    jest.clearAllMocks();
})

const refetch = jest.fn();
const toastMock = jest.fn();

jest.mock('../../hooks/use-toast', () => ({
    useToast: () => ({
        toast: toastMock,
    }),
}));
describe("Qualification Data Table", () => {


    it("renders qualification columns", () => {
        render(<DataTable data={qualificationData} columns={qualificationsColumns(refetch)} name="Qualification"
                          refetch={refetch}/>);
        expect(screen.getByText("Qualification")).toBeInTheDocument();
        expect(screen.getByText("Number of Subjects")).toBeInTheDocument();
        expect(screen.getByText("Number of Users")).toBeInTheDocument();
    });

    it("renders qualification rows", () => {
        render(<DataTable data={qualificationData} columns={qualificationsColumns(refetch)} name="Qualification"
                          refetch={refetch}/>);
        expect(screen.getByText("Maths")).toBeInTheDocument();
        expect(screen.getByText("Science")).toBeInTheDocument();
    });

    it("opens add qualification dialog on button click", async () => {
        (axios.get as jest.Mock)
            .mockResolvedValueOnce({data: qualificationData})
            .mockResolvedValueOnce({data: subjectData})
            .mockResolvedValueOnce({data: topicData})

        render(<DataTable data={qualificationData} columns={qualificationsColumns(refetch)} name="Qualification" refetch={refetch}/>);

        const addButton = screen.getByRole("button", {name: /add qualification/i});
        fireEvent.click(addButton);

        await waitFor(() => {
            expect(screen.getByRole("heading", {name: /add qualification/i})).toBeInTheDocument();
        });

        expect(screen.getByLabelText("Qualification")).toBeInTheDocument();
    });

    it("lets the user create a new qualification", async () => {
        (axios.get as jest.Mock)
            .mockResolvedValueOnce({data: qualificationData})
            .mockResolvedValueOnce({data: subjectData})
            .mockResolvedValueOnce({data: topicData})
        const user = userEvent.setup();

        render(<DataTable data={qualificationData} columns={qualificationsColumns(refetch)} name="Qualification" refetch={refetch}/>);

        await user.click(screen.getByRole("button", {name: /add qualification/i}))
        await user.type(await screen.findByLabelText(/^Qualification$/i), 'GCSEs');
        await user.click(screen.getByRole("button", {name: /confirm/i}));

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith("http://localhost:8080/api/admin/qualifications/add", {
                qualification: "GCSEs"
            }, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }});
            expect(toastMock).toHaveBeenCalledWith(expect.objectContaining({variant:"success"}))
            expect(refetch).toHaveBeenCalled();
        })
    })
});

describe("Questions Data Table", () => {

    it("renders question columns", () => {
        render(<DataTable data={questionData} columns={questionColumns(refetch)} name="Question" refetch={refetch}/>);
        expect(screen.getByText("Subject")).toBeInTheDocument();
        expect(screen.getByText("Topic")).toBeInTheDocument();
        expect(screen.getByText("Question")).toBeInTheDocument();
        expect(screen.getByText("Answer")).toBeInTheDocument();
        expect(screen.getByText("Marks")).toBeInTheDocument();
    });

    it("renders question rows", () => {
        render(<DataTable data={questionData} columns={questionColumns(refetch)} name="Question" refetch={refetch}/>);
        expect(screen.getByText("2+2?")).toBeInTheDocument();
        expect(screen.getByText("What is gravity?")).toBeInTheDocument();
    });

    it("opens add question dialog on button click", async () => {
        (axios.get as jest.Mock)
            .mockResolvedValueOnce({data: qualificationData})
            .mockResolvedValueOnce({data: subjectData})
            .mockResolvedValueOnce({data: topicData})

        render(<DataTable data={questionData} columns={questionColumns(refetch)} name="Question" refetch={refetch}/>);

        const addButton = screen.getByRole("button", {name: /add question/i});
        fireEvent.click(addButton);

        await waitFor(() => {
            expect(screen.getByRole("heading", {name: /add question/i})).toBeInTheDocument();
        });

        expect(screen.getByLabelText("Question")).toBeInTheDocument();
        expect(screen.getByLabelText("Answer")).toBeInTheDocument();
        expect(screen.getByLabelText("Marks")).toBeInTheDocument();
    });
});

describe("Subject Data Table", () => {

    it("renders subject columns", () => {
        render(<DataTable data={subjectData} columns={subjectColumns(refetch)} name="Subject" refetch={refetch}/>);
        expect(screen.getByText("Subject")).toBeInTheDocument();
        expect(screen.getByText("Number of Topics")).toBeInTheDocument();
        expect(screen.getByText("Qualification")).toBeInTheDocument();
    });

    it("renders subject rows", () => {
        render(<DataTable data={subjectData} columns={subjectColumns(refetch)} name="Subject" refetch={refetch}/>);
        expect(screen.getByText("Math")).toBeInTheDocument();
        expect(screen.getByText("Biology")).toBeInTheDocument();
    });

    it("opens add subject dialog on button click", async () => {
        (axios.get as jest.Mock)
            .mockResolvedValueOnce({data: qualificationData})
            .mockResolvedValueOnce({data: subjectData})
            .mockResolvedValueOnce({data: topicData})

        render(<DataTable data={subjectData} columns={subjectColumns(refetch)} name="Subject" refetch={refetch}/>);

        const addButton = screen.getByRole("button", {name: /add subject/i});
        fireEvent.click(addButton);

        await waitFor(() => {
            expect(screen.getByRole("heading", {name: /add subject/i})).toBeInTheDocument();
        });

        expect(screen.getByLabelText("Subject")).toBeInTheDocument();
        expect(screen.getByLabelText("Qualification")).toBeInTheDocument();
    });

});

describe("Topic Data Table", () => {

    it("renders topic columns", () => {
        render(<DataTable data={topicData} columns={topicColumns(refetch)} name="Topic" refetch={refetch}/>);
        expect(screen.getByText("Topic Name")).toBeInTheDocument();
        expect(screen.getByText("Subject")).toBeInTheDocument();
        expect(screen.getByText("Qualification")).toBeInTheDocument();
        expect(screen.getByText("Number of Questions")).toBeInTheDocument();
    });

    it("renders topic rows", () => {
        render(<DataTable data={topicData} columns={topicColumns(refetch)} name="Topic" refetch={refetch}/>);
        expect(screen.getByText("Algebra")).toBeInTheDocument();
        expect(screen.getByText("Photosynthesis")).toBeInTheDocument();
    });

    it("opens add topic dialog on button click", async () => {
        (axios.get as jest.Mock)
            .mockResolvedValueOnce({data: qualificationData})
            .mockResolvedValueOnce({data: subjectData})
            .mockResolvedValueOnce({data: topicData})

        render(<DataTable data={topicData} columns={topicColumns(refetch)} name="Topic" refetch={refetch}/>);

        const addButton = screen.getByRole("button", {name: /add topic/i});
        fireEvent.click(addButton);

        await waitFor(() => {
            expect(screen.getByRole("heading", {name: /add topic/i})).toBeInTheDocument();
        });

        expect(screen.getByLabelText("Topic")).toBeInTheDocument();
        expect(screen.getByLabelText("Subject")).toBeInTheDocument();
        expect(screen.getByLabelText("Qualification")).toBeInTheDocument();
    });
});

describe("Users Data Table", () => {

    it("renders user columns", () => {
        render(<DataTable data={userData} columns={usersColumns(refetch)} name="User" refetch={refetch}/>);
        expect(screen.getByText("Username")).toBeInTheDocument();
        expect(screen.getByText("Email")).toBeInTheDocument();
        expect(screen.getByText("Role")).toBeInTheDocument();
        expect(screen.getByText("Date Created")).toBeInTheDocument();
        expect(screen.getByText("Qualification")).toBeInTheDocument();
    });

    it("renders user rows", () => {
        render(<DataTable data={userData} columns={usersColumns(refetch)} name="User" refetch={refetch}/>);
        expect(screen.getByText("admin")).toBeInTheDocument();
        expect(screen.getByText("student")).toBeInTheDocument();
    });

    it("opens add user dialog on button click", async () => {
        (axios.get as jest.Mock)
            .mockResolvedValueOnce({data: qualificationData})
            .mockResolvedValueOnce({data: subjectData})
            .mockResolvedValueOnce({data: topicData})

        render(<DataTable data={userData} columns={usersColumns(refetch)} name="User" refetch={refetch}/>);

        const addButton = screen.getByRole("button", {name: /add user/i});
        fireEvent.click(addButton);

        await waitFor(() => {
            expect(screen.getByRole("heading", {name: /add user/i})).toBeInTheDocument();
        });

        expect(screen.getByLabelText("Username")).toBeInTheDocument();
        expect(screen.getByLabelText("Password")).toBeInTheDocument();
        expect(screen.getByLabelText("Email")).toBeInTheDocument();
        expect(screen.getByLabelText("Role")).toBeInTheDocument();
    });
});
