import {ColumnDef} from "@tanstack/react-table";
import {Attempt, Qualification, Question, Subject, Topic, User} from "@/components/DataTypes";
import {ArrowUpDown} from "lucide-react"

import {Button} from "@/components/ui/button"
import {useState} from "react";
import axios from "axios";
import {DeleteDialog, TableDropDown} from "@/components/DialogPrompts";
import {EditQualification, EditQuestion, EditSubject, EditTopic, EditUser} from "@/components/EditDialogPrompts";
import {toast} from "@/hooks/use-toast";

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