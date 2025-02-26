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