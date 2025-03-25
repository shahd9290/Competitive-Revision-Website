import {ColumnDef} from "@tanstack/react-table";
import {Attempt, Qualification, Question, Subject, Topic, User} from "@/components/DataTable";
import {ArrowUpDown} from "lucide-react"

import {Button} from "@/components/ui/button"
import {useState} from "react";
import axios from "axios";
import {DeleteDialog, TableDropDown} from "@/components/DialogPrompts";
import {EditQualification, EditQuestion} from "@/components/EditDialogPrompts";

const apiUrl = process.env.NEXT_PUBLIC_API_URL

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
export const usersColumns: ColumnDef<User>[] = [
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
            const [loading, setLoading] = useState(false);

            const handleDelete = async () => {
                // Check if user is currently logged in?
                setLoading(true);
                let payload = {id: user.id};
                try {
                    await axios.delete(`${apiUrl}/api/admin/users/delete`, {
                        data: payload,
                        withCredentials: true,
                    });
                    setDialogOpen(false);
                } catch (error) {
                    console.error("Error deleting User:", error);
                    alert("Failed to delete User.");
                } finally {
                    setLoading(false);
                    window.location.reload();
                }
            };

            return (
                <div>
                    <TableDropDown
                        setDialogOpen={setDialogOpen}
                    />

                    {/* Confirmation Dialog */}
                    <DeleteDialog
                        open={dialogOpen}
                        setOpen={setDialogOpen}
                        handleDelete={handleDelete}
                        loading={loading}
                        name={user.username}
                    />
                </div>
            );
        },
    },
]
export const topicColumns: ColumnDef<Topic>[] = [
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
            const [dialogOpen, setDialogOpen] = useState(false);
            const [loading, setLoading] = useState(false);

            const handleDelete = async () => {
                // Get Question Count.
                if (topic.questionCount > 0) {
                    alert("Topic cannot be deleted when Questions are present.")
                    return
                }
                setLoading(true);

                let payload = {id: topic.id};
                try {
                    await axios.delete(`${apiUrl}/api/admin/topics/delete`, {
                        data: payload,
                        withCredentials: true,
                    });
                    setDialogOpen(false);
                } catch (error) {
                    console.error("Error deleting Topic:", error);
                    alert("Failed to delete Topic.");
                } finally {
                    setLoading(false);
                    window.location.reload();
                }
            };

            return (
                <div>
                    <TableDropDown
                        setDialogOpen={setDialogOpen}
                    />

                    {/* Confirmation Dialog */}
                    <DeleteDialog
                        open={dialogOpen}
                        setOpen={setDialogOpen}
                        handleDelete={handleDelete}
                        loading={loading}
                        name={topic.name}
                    />
                </div>
            );
        },
    },
]
export const subjectColumns: ColumnDef<Subject>[] = [
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
            const [loading, setLoading] = useState(false);

            const handleDelete = async () => {
                if (subject.topicNum > 0) {
                    alert("Subject cannot be deleted when Topics are present.")
                    return
                }
                setLoading(true);
                let payload = {id: subject.id, qualification: subject.qualification};
                try {
                    await axios.delete(`${apiUrl}/api/admin/subjects/delete`, {
                        data: payload,
                        withCredentials: true,
                    });
                    setDialogOpen(false);
                } catch (error) {
                    console.error("Error deleting Subject:", error);
                    alert("Failed to delete Subject.");
                } finally {
                    setLoading(false);
                    window.location.reload();
                }
            };

            return (
                <div>
                    <TableDropDown
                        setDialogOpen={setDialogOpen}
                    />

                    {/* Confirmation Dialog */}
                    <DeleteDialog
                        open={dialogOpen}
                        setOpen={setDialogOpen}
                        handleDelete={handleDelete}
                        loading={loading}
                        name={subject.name}
                    />
                </div>
            );
        },
    },
]
export const questionColumns: ColumnDef<Question>[] = [
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

            const handleDelete = async () => {
                setLoading(true);
                let payload = {id: question.id};
                try {
                    await axios.delete(`${apiUrl}/api/admin/questions/delete`, {
                        data: payload,
                        withCredentials: true,
                    });
                    setDialogOpen(false);
                } catch (error) {
                    console.error("Error deleting Question:", error);
                    alert("Failed to delete Question.");
                } finally {
                    setLoading(false);
                    window.location.reload();
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
                    />

                </div>
            );
        },
    },
]
export const qualificationsColumns: ColumnDef<Qualification>[] = [
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

            const handleDelete = async () => {
                if (qualification.subjectsNum > 0 || qualification.usersNum > 0) {
                    alert("Qualification cannot be deleted when Subjects and Users are present.")
                    return
                }
                setLoading(true);
                let payload = {qualification: qualification.name};
                try {
                    await axios.delete(`${apiUrl}/api/admin/qualifications/delete`, {
                        data: payload,
                        withCredentials: true,
                    });
                    setDialogOpen(false);
                } catch (error) {
                    console.error("Error deleting qualification:", error);
                    alert("Failed to delete qualification.");
                } finally {
                    setLoading(false);
                    window.location.reload();
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
                        name={qualification.name}
                    />

                    <EditQualification
                        open={editOpen}
                        setOpen={setEditOpen}
                        row={row.original}
                    />
                </div>
            );
        },
    },
]