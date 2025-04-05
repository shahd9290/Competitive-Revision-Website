"use client";

import { useState } from "react";
import {DialogFooter} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from "axios";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {MoreHorizontal} from "lucide-react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface TableDropDownProps {
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setQualifications?: React.Dispatch<React.SetStateAction<any[]>>;
}

export function DeleteDialog({open, setOpen, handleDelete, loading, name}) {
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent className="bg-white rounded-lg shadow-lg p-6">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-lg font-bold text-gray-900">
                        Confirm Deletion
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-700 text-sm mt-2">
                        Are you sure you want to delete
                        <span className="font-semibold text-gray-900"> "{name}"</span>?
                        This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex justify-end space-x-2 mt-4">
                    <AlertDialogCancel
                        onClick={() => setOpen(false)}
                        className="border border-gray-300 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md"
                    >
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        className="bg-black text-white hover:bg-gray-800 px-4 py-2 rounded-md"
                        disabled={loading}
                    >
                        {loading ? "Deleting..." : "Confirm Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export function CancelUnsavedDialog({open, setOpen, setEdit}) {
    const handleDiscard = () => {
        setOpen(false); // close warning
        setEdit(false); // close edit dialog
    };
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent className="bg-white rounded-lg shadow-lg p-6">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-lg font-bold text-gray-900">
                        Warning!
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-700 text-sm mt-2">
                        You have unsaved changes! Are you sure you want to discard them?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex justify-end space-x-2 mt-4">
                    <AlertDialogCancel
                        onClick={() => setOpen(false)}
                        className="border border-gray-300 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md"
                    >
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDiscard}
                        className="bg-black text-white hover:bg-gray-800 px-4 py-2 rounded-md"
                    >
                        Confirm
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export function TableDropDown ({setDialogOpen, setEditOpen, setQualifications} : TableDropDownProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuItem
                    onClick={async (e) => {
                        e.preventDefault();
                        if (setQualifications) {
                            let qs = await axios.get(`${apiUrl}/api/admin/qualifications/get`, {withCredentials: true})
                            setQualifications(qs.data);
                        }
                        setEditOpen(true);
                    }}
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
    )
}