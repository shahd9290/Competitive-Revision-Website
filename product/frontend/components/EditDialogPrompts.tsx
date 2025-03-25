"use client"
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";
import {CancelUnsavedDialog} from "@/components/DialogPrompts";
import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export function EditQuestion({open, setOpen, row}) {
    const [id, setId] = useState(0);
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [marks, setMarks] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [dirty, setDirty] = useState(false);
    const [showCancelDialog, setShowCancelDialog] = useState(false);

    useEffect(() => {
        if (row && open) {
            setId(row.id || "");
            setQuestion(row.question || "");
            setAnswer(row.answer || "");
            setMarks(row.marks || 0);
            setDirty(false); // Reset dirty state when opening
        }
    }, [row, open]);

    useEffect(() => {
        if (!row) return;
        if (
            question !== row.question ||
            answer !== row.answer ||
            marks !== row.marks
        ) {
            setDirty(true);
        } else {
            setDirty(false);
        }
    }, [question, answer, marks, row]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (dirty) {
            setLoading(true);
            const payload = {
                id: id,
                question: question,
                answer: answer,
                marks: marks,
            }

            try {
                await axios.post(`${apiUrl}/api/admin/questions/edit`, payload, {
                    withCredentials: true,
                    headers: {"Content-Type": "application/json"},
                });

                setOpen(false); // Close the dialog on success
            } catch (error) {
                console.error("Error editing question:", error);
                setErrorMessage("Failed to edit the question. Please try again.");
            } finally {
                setLoading(false);
                window.location.reload();
            }
        }
    }

    const handleCancel = () => {
        if (dirty) {
            setShowCancelDialog(true);
        } else {
            setOpen(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="bg-white rounded-lg shadow-lg p-6">
                <DialogHeader className="text-lg font-bold text-gray-900">
                    <DialogTitle>Editing Question</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    {/* Show Error Message if Any */}
                    {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

                    {/* Question */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Question</Label>
                        <Input className="col-span-3" value={question} onChange={(e) => setQuestion(e.target.value)}
                               required/>
                    </div>

                    {/* Answer */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Answer</Label>
                        <Input className="col-span-3" value={answer} onChange={(e) => setAnswer(e.target.value)}
                               required/>
                    </div>

                    {/* Marks */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Marks</Label>
                        <Input className="col-span-3" type="number" value={marks}
                               onChange={(e) => setMarks(e.target.value)}
                               required/>
                    </div>

                    <h1>The Topic, Subject and Qualification cannot be edited here. Please create a new question if you
                        wish to change these.</h1>

                    {/* Footer Buttons */}
                    <DialogFooter>
                        <Button type="button" onClick={handleCancel}
                                className=" bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md">
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading || !dirty}
                                className="bg-black text-white hover:bg-gray-800 px-4 py-2 rounded-md">
                            {loading ? "Submitting..." : "Confirm"}
                        </Button>
                    </DialogFooter>
                </form>

                <CancelUnsavedDialog
                    open={showCancelDialog}
                    setOpen={setShowCancelDialog}
                    setEdit={setOpen}
                />
            </DialogContent>
        </Dialog>

    )
}