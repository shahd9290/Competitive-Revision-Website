import {ColumnDef} from "@tanstack/react-table";
import {Attempt} from "@/components/ui/AttemptsTable";

export const columns: ColumnDef<Attempt>[] = [
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
