import {ColumnDef} from "@tanstack/react-table";
import {Attempt, Qualification, Question, Subject, Topic, User} from "@/components/DataTypes";
import {ArrowUpDown} from "lucide-react"

import {Button} from "@/components/ui/button"
import {useState} from "react";
import axios from "axios";
import {DeleteDialog, TableDropDown} from "@/components/DialogPrompts";
import {EditQualification, EditQuestion, EditSubject, EditTopic, EditUser} from "@/components/EditDialogPrompts";
import {useToast} from "@/hooks/use-toast";

const apiUrl = process.env.NEXT_PUBLIC_API_URL

/**
 * The column definitions for the attempts table.
 *
 * This configuration defines how each column in the attempts table should behave, including
 * the data field to be accessed and the column header text.
 *
 * - `topicName`: Represents the name of the topic for the attempt.
 * - `date`: Represents the date when the attempt was made.
 * - `proportion`: Represents the score of the attempt in proportion (e.g., as a percentage).
 *
 * @type {ColumnDef<Attempt>[]}
 */
export const attemptColumns: ColumnDef<Attempt>[] = [
    {
        accessorKey: "topicName",
        header: "Topic",
    },
    {
        accessorKey: "date",
        header: "Date",
    },
    {
        accessorKey: "proportion",
        header: "Score",
    },
]

/**
 * The column definitions for the users table.
 *
 * This configuration defines how each column in the users table should behave, including
 * the data field to be accessed and the column header text. Each column also supports sorting.
 *
 * - `username`: Represents the username of the user.
 * - `email`: Represents the email address of the user.
 * - `role`: Represents the user's role (e.g., admin, user).
 * - `createdAt`: Represents the date when the user was created.
 * - `qualification`: Represents the qualification associated with the user.
 * - `actions`: Provides actions (like editing and deleting) for each user entry in the table.
 *
 * @param {function} refetch - A function to refetch the data after modifications (e.g., after deleting or editing a user).
 * @returns {ColumnDef<User>[]} The column definitions for the users table.
 */
export const usersColumns = (refetch) : ColumnDef<User>[] => [
    {
        accessorKey: "username",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Username
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
    },
    {
        accessorKey: "email",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
    },
    {
        accessorKey: "role",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Role
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
    },
    {
        accessorKey: "createdAt",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Date Created
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
    },
    {
        accessorKey: "qualification",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Qualification
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
    },
    {
        id: "actions",
        cell: ({row}) => {
            const user = row.original;
            const [dialogOpen, setDialogOpen] = useState(false);
            const [editOpen, setEditOpen] = useState(false);
            const [loading, setLoading] = useState(false);
            const [qualifications, setQualifications] = useState<any[]>([]);
            const {toast} = useToast();
            const handleDelete = async () => {
                // Check if user is currently logged in?
                setLoading(true);
                let payload = {id: user.id};
                try {
                    await axios.delete(`${apiUrl}/api/admin/users/delete`, {
                        data: payload,
                        withCredentials: true,
                    });
                    refetch()
                    setDialogOpen(false);
                    toast({
                        title: "Success!",
                        description: "The user has been deleted successfully!",
                        variant: "success",
                    })
                } catch (error) {
                    console.error("Error deleting User:", error);
                    toast({
                        title: "Error!",
                        description: "Failed to delete user, please try again later.",
                        variant: "destructive",
                    })
                } finally {
                    setLoading(false);
                }
            };
            return (
                <div>
                    <TableDropDown
                        setDialogOpen={setDialogOpen}
                        setEditOpen={setEditOpen}
                        setQualifications={setQualifications}
                    />

                    {/* Confirmation Dialog */}
                    <DeleteDialog
                        open={dialogOpen}
                        setOpen={setDialogOpen}
                        handleDelete={handleDelete}
                        loading={loading}
                        name={user.username}
                    />

                    <EditUser
                        open={editOpen}
                        setOpen={setEditOpen}
                        row={row.original}
                        qualifications={qualifications}
                        refetch={refetch}
                    />
                </div>
            );
        },
    },
]

/**
 * The column definitions for the topics table.
 *
 * This configuration defines how each column in the topics table should behave, including
 * the data field to be accessed, sorting functionality, and the column header text.
 * It also includes actions for editing and deleting a topic.
 *
 * - `name`: Represents the name of the topic.
 * - `subject`: Represents the subject associated with the topic.
 * - `qualification`: Represents the qualification associated with the topic.
 * - `questionCount`: Represents the number of questions for the topic.
 * - `actions`: Provides actions (like editing and deleting) for each topic entry in the table.
 *
 * @param {function} refetch - A function to refetch the data after modifications (e.g., after deleting or editing a topic).
 * @returns {ColumnDef<Topic>[]} The column definitions for the topics table.
 */
export const topicColumns = (refetch): ColumnDef<Topic>[] => [
    {
        accessorKey: "name",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Topic Name
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
    },
    {
        accessorKey: "subject",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Subject
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
    },
    {
        accessorKey: "qualification",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Qualification
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
    },
    {
        accessorKey: "questionCount",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Number of Questions
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
    },
    {
        id: "actions",
        cell: ({row}) => {
            const topic = row.original;
            const [qualifications, setQualifications] = useState<any[]>([]);
            const [subjects, setSubjects] = useState<any[]>([]);
            const [dialogOpen, setDialogOpen] = useState(false);
            const [editOpen, setEditOpen] = useState(false);
            const [loading, setLoading] = useState(false);
            const {toast} = useToast();

            const handleDelete = async () => {
                // Get Question Count.
                if (topic.questionCount > 0) {
                    toast({
                        title: "Error!",
                        description: "Topic cannot be deleted when Questions are present.",
                        variant: "destructive",
                    })
                    return
                }
                setLoading(true);

                let payload = {id: topic.id};
                try {
                    await axios.delete(`${apiUrl}/api/admin/topics/delete`, {
                        data: payload,
                        withCredentials: true,
                    });
                    refetch()
                    setDialogOpen(false);
                    toast({
                        title: "Success!",
                        description: "The topic has been deleted successfully!",
                        variant: "success",
                    })
                } catch (error) {
                    console.error("Error deleting Topic:", error);
                    toast({
                        title: "Error!",
                        description: "Failed to delete topic, please try again later.",
                        variant: "destructive",
                    })
                } finally {
                    setLoading(false);
                }
            };

            return (
                <div>
                    <TableDropDown
                        setDialogOpen={setDialogOpen}
                        setEditOpen={setEditOpen}
                        setQualifications={setQualifications}
                        setSubjects={setSubjects}
                    />

                    {/* Confirmation Dialog */}
                    <DeleteDialog
                        open={dialogOpen}
                        setOpen={setDialogOpen}
                        handleDelete={handleDelete}
                        loading={loading}
                        name={topic.name}
                    />

                    <EditTopic
                        open={editOpen}
                        setOpen={setEditOpen}
                        row={topic}
                        qualifications={qualifications}
                        subjects={subjects}
                        refetch={refetch}
                    />
                </div>
            );
        },
    },
]

/**
 * The column definitions for the subjects table.
 *
 * This configuration defines how each column in the subjects table should behave, including
 * the data field to be accessed, sorting functionality, and the column header text.
 * It also includes actions for editing and deleting a subject.
 *
 * - `name`: Represents the name of the subject.
 * - `topicNum`: Represents the number of topics under the subject.
 * - `qualification`: Represents the qualification associated with the subject.
 * - `actions`: Provides actions (like editing and deleting) for each subject entry in the table.
 *
 * @param {function} refetch - A function to refetch the data after modifications (e.g., after deleting or editing a subject).
 * @returns {ColumnDef<Subject>[]} The column definitions for the subjects table.
 */
export const subjectColumns = (refetch): ColumnDef<Subject>[] => [
    {
        accessorKey: "name",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Subject
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
    },
    {
        accessorKey: "topicNum",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Number of Topics
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
    },
    {
        accessorKey: "qualification",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Qualification
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
    },
    {
        id: "actions",
        cell: ({row}) => {
            const subject = row.original;
            const [dialogOpen, setDialogOpen] = useState(false);
            const [editOpen, setEditOpen] = useState(false);
            const [loading, setLoading] = useState(false);
            const [qualifications, setQualifications] = useState<any[]>([]);
            const {toast} = useToast();
            const handleDelete = async () => {
                if (subject.topicNum > 0) {
                    toast({
                        title: "Error!",
                        description: "Subject cannot be deleted when Topics are present.",
                        variant: "destructive",
                    })
                    return
                }
                setLoading(true);
                let payload = {id: subject.id, qualification: subject.qualification};
                try {
                    await axios.delete(`${apiUrl}/api/admin/subjects/delete`, {
                        data: payload,
                        withCredentials: true,
                    });
                    refetch();
                    setDialogOpen(false);
                    toast({
                        title: "Success!",
                        description: "The subject has been deleted successfully!",
                        variant: "success",
                    })
                } catch (error) {
                    console.error("Error deleting Subject:", error);
                    toast({
                        title: "Error!",
                        description: "Failed to delete subject, please try again later.",
                        variant: "destructive",
                    })
                } finally {
                    setLoading(false);
                }
            };

            return (
                <div>
                    <TableDropDown
                        setDialogOpen={setDialogOpen}
                        setEditOpen={setEditOpen}
                        setQualifications={setQualifications}
                    />

                    {/* Confirmation Dialog */}
                    <DeleteDialog
                        open={dialogOpen}
                        setOpen={setDialogOpen}
                        handleDelete={handleDelete}
                        loading={loading}
                        name={subject.name}
                    />

                    <EditSubject
                        open={editOpen}
                        setOpen={setEditOpen}
                        row = {row.original}
                        qualifications={qualifications}
                        refetch={refetch}
                    />
                </div>
            );
        },
    },
]

/**
 * The column definitions for the questions table.
 *
 * This configuration defines how each column in the questions table should behave, including
 * the data field to be accessed, sorting functionality, and the column header text.
 * It also includes actions for editing and deleting a question.
 *
 * - `subject`: Represents the subject of the question.
 * - `topic`: Represents the topic the question is related to.
 * - `question`: Represents the text of the question itself.
 * - `answer`: Represents the correct answer for the question.
 * - `marks`: Represents the number of marks the question is worth.
 * - `actions`: Provides actions (like editing and deleting) for each question entry in the table.
 *
 * @param {function} refetch - A function to refetch the data after modifications (e.g., after deleting or editing a question).
 * @returns {ColumnDef<Question>[]} The column definitions for the questions table.
 */
export const questionColumns = (refetch): ColumnDef<Question>[] => [
    {
        accessorKey: "subject",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Subject
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
    },
    {
        accessorKey: "topic",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Topic
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
    }
    , {
        accessorKey: "question",
        header: "Question",
    },
    {
        accessorKey: "answer",
        header: "Answer",
    },
    {
        accessorKey: "marks",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Marks
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
    },
    {
        id: "actions",
        cell: ({row}) => {
            const question = row.original;
            const [dialogOpen, setDialogOpen] = useState(false);
            const [editOpen, setEditOpen] = useState(false);
            const [loading, setLoading] = useState(false);
            const {toast} = useToast();

            const handleDelete = async () => {
                setLoading(true);
                let payload = {id: question.id};
                try {
                    await axios.delete(`${apiUrl}/api/admin/questions/delete`, {
                        data: payload,
                        withCredentials: true,
                    });
                    refetch();
                    setDialogOpen(false);
                    toast({
                        title: "Success!",
                        description: "The question has been deleted successfully!",
                        variant: "success",
                    })
                } catch (error) {
                    console.error("Error deleting Question:", error);
                    toast({
                        title: "Error!",
                        description: "Failed to delete question, please try again.",
                        variant: "destructive",
                    })
                } finally {
                    setLoading(false);
                }
            };

            return (
                <div>
                    <TableDropDown
                        setDialogOpen={setDialogOpen}
                        setEditOpen={setEditOpen}
                    />

                    {/* Confirmation Dialog */}
                    <DeleteDialog
                        open={dialogOpen}
                        setOpen={setDialogOpen}
                        handleDelete={handleDelete}
                        loading={loading}
                        name={question.question}
                    />

                    <EditQuestion
                        open={editOpen}
                        setOpen={setEditOpen}
                        row={row.original}
                        refetch={refetch}
                    />

                </div>
            );
        },
    },
]

/**
 * The column definitions for the qualifications table.
 *
 * This configuration defines how each column in the qualifications table should behave, including
 * the data field to be accessed, sorting functionality, and the column header text.
 * It also includes actions for editing and deleting a qualification.
 *
 * - `qualification`: Represents the name of the qualification.
 * - `subjectsNum`: Represents the number of subjects associated with the qualification.
 * - `usersNum`: Represents the number of users assigned to the qualification.
 * - `actions`: Provides actions (like editing and deleting) for each qualification entry in the table.
 *
 * @param {function} refetch - A function to refetch the data after modifications (e.g., after deleting or editing a qualification).
 * @returns {ColumnDef<Qualification>[]} The column definitions for the qualifications table.
 */
export const qualificationsColumns = (refetch): ColumnDef<Qualification>[] => [
    {
        accessorKey: "qualification",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Qualification
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
    },
    {
        accessorKey: "subjectsNum",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Number of Subjects
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
    },
    {
        accessorKey: "usersNum",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Number of Users
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
    },
    {
        id: "actions",
        cell: ({row}) => {
            const qualification = row.original;
            const [dialogOpen, setDialogOpen] = useState(false);
            const [editOpen, setEditOpen] = useState(false);
            const [loading, setLoading] = useState(false);
            const {toast} = useToast();

            const handleDelete = async () => {
                if (qualification.subjectsNum > 0 || qualification.usersNum > 0) {
                    toast({
                        title: "Error!",
                        description: "Qualification cannot be deleted when Subjects and Users are present.",
                        variant: "destructive",
                    })
                    return
                }
                setLoading(true);
                let payload = {qualification: qualification.qualification};
                try {
                    await axios.delete(`${apiUrl}/api/admin/qualifications/delete`, {
                        data: payload,
                        withCredentials: true,
                    });
                    refetch()
                    setDialogOpen(false);
                    toast({
                        title: "Success!",
                        description: "The qualification has been deleted successfully!",
                        variant: "success",
                    })
                } catch (error) {
                    console.error("Error deleting qualification:", error);
                    toast({
                        title: "Error!",
                        description: "Failed to delete qualification, please try again later.",
                        variant: "destructive",
                    })
                } finally {
                    setLoading(false);
                }
            };

            return (
                <div>
                    <TableDropDown
                        setDialogOpen={setDialogOpen}
                        setEditOpen={setEditOpen}
                    />

                    <DeleteDialog
                        open={dialogOpen}
                        setOpen={setDialogOpen}
                        handleDelete={handleDelete}
                        loading={loading}
                        name={qualification.qualification}
                    />

                    <EditQualification
                        open={editOpen}
                        setOpen={setEditOpen}
                        row={row.original}
                        refetch={refetch}
                    />
                </div>
            );
        },
    },
]