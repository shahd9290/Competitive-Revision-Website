import {ColumnDef} from "@tanstack/react-table";
import {Attempt, Qualification, Question, Subject, Topic, User} from "@/components/DataTable";
import { MoreHorizontal, ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {useState} from "react";
import axios from "axios";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";
const apiUrl = process.env.NEXT_PUBLIC_API_URL

export const attemptColumns: ColumnDef<Attempt>[] = [
    {
        accessorKey:"topicName",
        header: "Topic",
    },
    {
        accessorKey:"date",
        header: "Date",
    },
    {
        accessorKey:"proportion",
        header:"Score",
    },
]
export const usersColumns: ColumnDef<User>[] = [
    {
        accessorKey:"username",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Username
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey:"email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey:"role",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Role
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey:"createdAt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Date Created
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey:"qualification",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Qualification
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        id:"actions",
        cell: ({row}) => {
            const user = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(user.id)}
                        >
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(user.id)}
                        >
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]
export const topicColumns: ColumnDef<Topic>[] = [
    {
        accessorKey:"name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Topic Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey:"subject",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Subject
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey:"qualification",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Qualification
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        id:"actions",
        cell: ({row}) => {
            const user = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem
                            // onClick={() => navigator.clipboard.writeText(user.id)}
                        >
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            // onClick={() => navigator.clipboard.writeText(user.id)}
                        >
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]
export const subjectColumns: ColumnDef<Subject>[] = [
    {
        accessorKey:"name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Subject
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey:"topicNum",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Number of Topics
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey:"qualification",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Qualification
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const subject = row.original;
            const [dialogOpen, setDialogOpen] = useState(false);

            const handleDelete = async () => {
                if (subject.topicNum > 0) {
                    alert("Subject cannot be deleted when Topics are present.")
                    return
                }
                let payload = { id: subject.id };
                try {
                    await axios.delete(`${apiUrl}/api/admin/questions/delete`, {
                        data: payload,
                        withCredentials: true,
                    });
                    setDialogOpen(false);
                    alert(`Question deleted successfully.`);
                } catch (error) {
                    console.error("Error deleting Question:", error);
                    alert("Failed to delete Question.");
                }
            };

            return (
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(String(subject.id))}
                            >
                                Edit
                            </DropdownMenuItem>
                            {/* Open dialog when clicking Delete */}
                            <DropdownMenuItem
                                onClick={(e) => {
                                    e.preventDefault(); // Prevent Dropdown from closing
                                    setDialogOpen(true);
                                }}
                            >
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Confirmation Dialog */}
                    <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <AlertDialogContent className="bg-white rounded-lg shadow-lg p-6">
                            <AlertDialogHeader>
                                <AlertDialogTitle className="text-lg font-bold text-gray-900">
                                    Confirm Deletion
                                </AlertDialogTitle>
                                <AlertDialogDescription className="text-gray-700 text-sm mt-2">
                                    Are you sure you want to delete the question
                                    <span className="font-semibold text-gray-900"> "{subject.question}"</span> and it's associated data?
                                    This action cannot be undone.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="flex justify-end space-x-2 mt-4">
                                <AlertDialogCancel
                                    onClick={() => setDialogOpen(false)}
                                    className="border border-gray-300 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md"
                                >
                                    Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={handleDelete}
                                    className="bg-black text-white hover:bg-gray-800 px-4 py-2 rounded-md"
                                >
                                    Confirm Delete
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            );
        },
    },
]
export const questionColumns: ColumnDef<Question>[] = [
    {
        accessorKey:"subject",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Subject
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey:"topic",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Topic
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    }
    ,{
        accessorKey:"question",
        header: "Question",
    },
    {
        accessorKey:"answer",
        header: "Answer",
    },
    {
        accessorKey:"marks",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Marks
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const question = row.original;
            const [dialogOpen, setDialogOpen] = useState(false);

            const handleDelete = async () => {

                let payload = { id: question.id };
                try {
                    await axios.delete(`${apiUrl}/api/admin/questions/delete`, {
                        data: payload,
                        withCredentials: true,
                    });
                    setDialogOpen(false);
                    alert(`Question deleted successfully.`);
                } catch (error) {
                    console.error("Error deleting Question:", error);
                    alert("Failed to delete Question.");
                }
            };

            return (
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(String(question.id))}
                            >
                                Edit
                            </DropdownMenuItem>
                            {/* Open dialog when clicking Delete */}
                            <DropdownMenuItem
                                onClick={(e) => {
                                    e.preventDefault(); // Prevent Dropdown from closing
                                    setDialogOpen(true);
                                }}
                            >
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Confirmation Dialog */}
                    <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <AlertDialogContent className="bg-white rounded-lg shadow-lg p-6">
                            <AlertDialogHeader>
                                <AlertDialogTitle className="text-lg font-bold text-gray-900">
                                    Confirm Deletion
                                </AlertDialogTitle>
                                <AlertDialogDescription className="text-gray-700 text-sm mt-2">
                                    Are you sure you want to delete the question
                                    <span className="font-semibold text-gray-900"> "{question.question}"</span> and it's associated data?
                                    This action cannot be undone.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="flex justify-end space-x-2 mt-4">
                                <AlertDialogCancel
                                    onClick={() => setDialogOpen(false)}
                                    className="border border-gray-300 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md"
                                >
                                    Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={handleDelete}
                                    className="bg-black text-white hover:bg-gray-800 px-4 py-2 rounded-md"
                                >
                                    Confirm Delete
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            );
        },
    },
]
export const qualificationsColumns: ColumnDef<Qualification>[] = [
    {
        accessorKey:"name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Qualification
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey:"subjectsNum",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Number of Subjects
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey:"usersNum",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Number of Users
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const qualification = row.original;
            const [dialogOpen, setDialogOpen] = useState(false);

            const handleDelete = async () => {
                if (qualification.subjectsNum > 0 || qualification.usersNum > 0) {
                    alert("Qualification cannot be deleted when Subjects and Users are present.")
                    return
                }

                let payload = { qualification: qualification.name };
                try {
                    await axios.delete(`${apiUrl}/api/admin/qualifications/delete`, {
                        data: payload,
                        withCredentials: true,
                    });
                    setDialogOpen(false);
                    alert(`Qualification "${qualification.name}" deleted successfully.`);
                } catch (error) {
                    console.error("Error deleting qualification:", error);
                    alert("Failed to delete qualification.");
                }
            };

            return (
                <>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(String(qualification.id))}
                            >
                                Edit
                            </DropdownMenuItem>
                            {/* Open dialog when clicking Delete */}
                            <DropdownMenuItem
                                onClick={(e) => {
                                    e.preventDefault(); // Prevent Dropdown from closing
                                    setDialogOpen(true);
                                }}
                            >
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Confirmation Dialog */}
                    <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <AlertDialogContent className="bg-white rounded-lg shadow-lg p-6">
                            <AlertDialogHeader>
                                <AlertDialogTitle className="text-lg font-bold text-gray-900">
                                    Confirm Deletion
                                </AlertDialogTitle>
                                <AlertDialogDescription className="text-gray-700 text-sm mt-2">
                                    Are you sure you want to delete the qualification
                                    <span className="font-semibold text-gray-900"> "{qualification.name}"</span>?
                                    This action cannot be undone.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="flex justify-end space-x-2 mt-4">
                                <AlertDialogCancel
                                    onClick={() => setDialogOpen(false)}
                                    className="border border-gray-300 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md"
                                >
                                    Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={handleDelete}
                                    className="bg-black text-white hover:bg-gray-800 px-4 py-2 rounded-md"
                                >
                                    Confirm Delete
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </>
            );
        },
    },
]