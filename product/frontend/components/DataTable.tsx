"use client"

import {useState, useEffect} from "react"
import {
    ColumnDef,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {QualificationDialog, QuestionDialog, SubjectDialog, TopicDialog, UserDialog} from "@/components/AddDialogPrompts";
import axios from "axios";
import {UUID} from "node:crypto";

const apiUrl = process.env.API_URL

/**
 * Original Documentation - https://ui.aceternity.com/components/data-table
 */
interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    name: string
    refetch: () => void
}

export function DataTable<TData, TValue>({
    data,
    columns,
    name,
    refetch,
 }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [globalFilter, setGlobalFilter] = useState("")
    const [openDialog, setOpenDialog] = useState(false)

    const [qualifications, setQualifications] = useState([])
    const [subjects, setSubjects] = useState([])
    const [topics, setTopics] = useState([])

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [qualRes, subjRes, topRes] = await Promise.all([
                axios.get(`${apiUrl}/api/admin/qualifications/get`, {withCredentials: true}),
                axios.get(`${apiUrl}/api/admin/subjects/get`, {withCredentials: true}),
                axios.get(`${apiUrl}/api/admin/topics/get`, {withCredentials: true})
            ]);

            setQualifications(qualRes.data);
            setSubjects(subjRes.data);
            setTopics(topRes.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        state: {
            sorting,
            globalFilter,
        },
        initialState: {
            pagination: {
                pageSize: 5,
            }
        }
    })

    const renderDialogContent = () => {
        switch (name) {
            case "Question":
                return <QuestionDialog
                    openDialog={openDialog}
                    setOpenDialog={setOpenDialog}
                    qualifications={qualifications}
                    subjects={subjects}
                    topics={topics}
                    refetch={refetch}
                />
            case "Topic":
                 return <TopicDialog
                     openDialog={openDialog}
                     setOpenDialog={setOpenDialog}
                     qualifications={qualifications}
                     subjects={subjects}
                     refetch={refetch}
                 />
            case "Subject":
                 return <SubjectDialog
                     openDialog={openDialog}
                     setOpenDialog={setOpenDialog}
                     qualifications={qualifications}
                     refetch={refetch}
                 />
            case "Qualification":
                 return <QualificationDialog
                     openDialog={openDialog}
                     setOpenDialog={setOpenDialog}
                     refetch={refetch}
                 />
            case "User":
                 return <UserDialog
                     openDialog={openDialog}
                     setOpenDialog={setOpenDialog}
                     qualifications={qualifications}
                     refetch={refetch}
                 />
            default:
                console.log("This shouldn't have happened!");
        }

    }

    return (
        <div>
            {/* Filtering */}
            <div className="flex items-center justify-between py-4">
                <Input
                    placeholder="Filter..."
                    value={globalFilter}
                    onChange={(event) =>
                        setGlobalFilter(event.target.value)
                    }
                    className="max-w-sm"
                />
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                    <DialogTrigger asChild>
                        <Button>Add {name}</Button>
                    </DialogTrigger>

                    <DialogContent className="bg-white rounded-lg shadow-lg p-6">
                        <DialogHeader>
                            <DialogTitle>Add {name}</DialogTitle>
                        </DialogHeader>
                        {renderDialogContent()}
                    </DialogContent>
                </Dialog>
            </div>
            {/* Table Container */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            {/* Pagination */}
            <div className="flex items-center justify-between space-x-2 py-4">
                <span className="text-sm text-gray-500">
                    Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </span>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.firstPage()} // Jump to First Page
                        disabled={!table.getCanPreviousPage()}
                    >
                        « First
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.lastPage()} // Jump to Last Page
                        disabled={!table.getCanNextPage()}
                    >
                        Last »
                    </Button>
                </div>
            </div>
        </div>
    )
}