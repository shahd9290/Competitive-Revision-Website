"use client"

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
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
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {QuestionDialog} from "@/components/DialogPrompts";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    name: string
}
export type Attempt = {
    topicName: string,
    date: string,
    proportion: number
}
export type User = {
    username: string,
    email: string,
    role: string,
    createdAt: string,
    qualification: string
}
export type Topic = {
    topicName: string,
    subjectName: string,
    qualificationName: string
}
export type Subject = {
    subject: string,
    topicNum: number,
    qualification: string
}
export type Question = {
    question: string,
    answer: string,
    marks: number,
    subject: string,
    topic: string,
}
export type Qualification = {
    qualification: string,
    subjectsNum: number,
    usersNum: number
}
export function DataTable<TData, TValue>({
    data,
    columns,
    name
 }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [globalFilter, setGlobalFilter] = React.useState("")
    const [openDialog, setOpenDialog] = React.useState(false)

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
                return QuestionDialog({openDialog, setOpenDialog})
            case "Topic":
                return (
                    <div>Topic</div>
                )
            case "Subject":
                return (
                    <div>Subject</div>
                )
            case "Qualification":
                return (
                    <div>Qualification</div>
                )
            case "User":
                return (
                    <div>User</div>
                )
            default:
                return (
                    <div>You shouldn't be seeing me!</div>
                )
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

                    <DialogContent>
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