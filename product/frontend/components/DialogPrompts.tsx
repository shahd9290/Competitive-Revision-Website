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

const apiUrl = process.env.API_URL;

interface TableDropDownProps {
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setQualifications?: React.Dispatch<React.SetStateAction<any[]>>;
  setSubjects?: React.Dispatch<React.SetStateAction<any[]>>;
}

/**
 * A dialog component that confirms deletion of an item.
 *
 * Displays a confirmation prompt to the user, including the item name,
 * and provides options to either cancel or confirm the deletion.
 * The deletion action is triggered when the user confirms.
 *
 * @param open - A boolean that controls the visibility of the dialog.
 * @param setOpen - A function to toggle the visibility of the dialog.
 * @param handleDelete - The function to be called when the user confirms the deletion.
 * @param loading - A boolean that indicates if the deletion process is ongoing.
 * @param name - The name of the item to be deleted, displayed in the dialog.
 */
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

/**
 * A dialog component that warns the user about unsaved changes.
 *
 * Displays a warning message when the user tries to discard unsaved changes.
 * Provides options to either cancel the discard action or confirm it.
 * The dialog closes the edit form and confirms the discard action when the user confirms.
 *
 * @param open - A boolean that controls the visibility of the dialog.
 * @param setOpen - A function to toggle the visibility of the dialog.
 * @param setEdit - A function to close the edit dialog when the user confirms discarding changes.
 */
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

/**
 * A dropdown menu component that provides actions for editing and deleting a table entry.
 *
 * This component includes options to edit and delete a table entry. It fetches qualifications and subjects
 * from the backend when the "Edit" option is selected. The "Delete" option opens a confirmation dialog for deletion.
 *
 * @param setDialogOpen - A function to open the delete confirmation dialog when the "Delete" option is clicked.
 * @param setEditOpen - A function to open the edit form dialog when the "Edit" option is clicked.
 * @param setQualifications - A function to set the fetched qualifications data.
 * @param setSubjects - A function to set the fetched subjects data.
 */
export function TableDropDown ({setDialogOpen, setEditOpen, setQualifications, setSubjects} : TableDropDownProps) {
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
                        if (setSubjects) {
                            let subs = await axios.get(`${apiUrl}/api/admin/subjects/get`, {withCredentials: true})
                            setSubjects(subs.data);
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