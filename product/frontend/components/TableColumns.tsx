import {ColumnDef} from "@tanstack/react-table";
import {Attempt, Qualification, Question, Subject, Topic, User} from "@/components/ui/DataTable";
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
        header: "Username",
    },
    {
        accessorKey:"email",
        header: "Email",
    },
    {
        accessorKey:"role",
        header: "Role",
    },
    {
        accessorKey:"createdAt",
        header: "Date Created",
    },
    {
        accessorKey:"qualification",
        header: "Qualification",
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
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(user.id)}
                        >
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]
export const topicColumns: ColumnDef<Topic>[] = [
    {
        accessorKey:"topicName",
        header: "Topic Name",
    },
    {
        accessorKey:"subjectName",
        header: "Subject",
    },
    {
        accessorKey:"qualificationName",
        header: "Qualification",
    }
]
export const subjectColumns: ColumnDef<Subject>[] = [
    {
        accessorKey:"subject",
        header: "Subject Name",
    },
    {
        accessorKey:"topicNum",
        header: "Number of Topics",
    },
    {
        accessorKey:"qualification",
        header: "Qualification",
    }
]
export const questionColumns: ColumnDef<Question>[] = [
    {
        accessorKey:"question",
        header: "Question",
    },
    {
        accessorKey:"answer",
        header: "Answer",
    },
    {
        accessorKey:"marks",
        header: "Marks",
    },
    {
        accessorKey:"subject",
        header: "Subject",
    },
    {
        accessorKey:"topic",
        header: "Topic",
    }
]
export const qualificationsColumns: ColumnDef<Qualification>[] = [
    {
        accessorKey:"qualification",
        header: "Qualification"
    },
    {
        accessorKey:"subjectsNum",
        header:"Number of Subjects"
    },
    {
        accessorKey:"usersNum",
        header:"Number of Users"
    }
]