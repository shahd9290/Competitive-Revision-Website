import {ColumnDef} from "@tanstack/react-table";
import {Attempt} from "@/components/ui/DataTable";

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
export const usersColumns: ColumnDef<Attempt>[] = [
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
    }
]
export const topicColumns: ColumnDef<Attempt>[] = [
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
export const subjectColumns: ColumnDef<Attempt>[] = [
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
export const questionColumns: ColumnDef<Attempt>[] = [
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
export const qualificationsColumns: ColumnDef<Attempt>[] = [
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