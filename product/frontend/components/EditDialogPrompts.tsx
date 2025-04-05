"use client"
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";
import {CancelUnsavedDialog} from "@/components/DialogPrompts";
import axios from "axios";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
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
        if (question !== row.question || answer !== row.answer || marks !== row.marks) {
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

export function EditQualification({open, setOpen, row}) {
    const [id, setId] = useState(0);
    const [qualification, setQualification] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [dirty, setDirty] = useState(false);
    const [showCancelDialog, setShowCancelDialog] = useState(false);

    useEffect(() => {
        if (row && open) {
            setId(row.id || "");
            setQualification(row.qualification || "");
            setDirty(false); // Reset dirty state when opening
        }
    }, [row, open]);

    useEffect(() => {
        if (!row) return;
        if (qualification !== row.qualification) {
            setDirty(true);
        } else {
            setDirty(false);
        }
    }, [qualification, row]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (dirty) {
            setLoading(true);
            const payload = {
                id: id,
                qualification: qualification,
            }

            try {
                await axios.post(`${apiUrl}/api/admin/qualifications/edit`, payload, {
                    withCredentials: true,
                    headers: {"Content-Type": "application/json"},
                });

                setOpen(false); // Close the dialog on success
            } catch (error) {
                console.error("Error editing qualification:", error);
                setErrorMessage("Failed to edit the qualification. Please try again.");
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
                    <DialogTitle>Editing Qualification</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    {/* Show Error Message if Any */}
                    {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

                    {/* Question */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Qualification</Label>
                        <Input className="col-span-3" value={qualification} onChange={(e) => setQualification(e.target.value)}
                               required/>
                    </div>

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

export function EditUser({open, setOpen, row, qualifications}) {
    const [id, setId] = useState(0);
    const [qualification, setQualification] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [dirty, setDirty] = useState(false);
    const [showCancelDialog, setShowCancelDialog] = useState(false);

    useEffect(() => {
        if (row && open) {
            setId(row.id || "");
            setQualification(row.qualification || "");
            setUsername(row.username || "")
            setEmail(row.email || "")
            setPassword(row.password || "")
            setRole(row.role || "")
            setDirty(false); // Reset dirty state when opening
        }
    }, [row, open]);

    useEffect(() => {
        if (!row) return;
        if (qualification !== row.qualification ||
            username !== row.username ||
            email !== row.email ||
            password !== row.password ||
            role !== row.role) {
            setDirty(true);
        } else {
            setDirty(false);
        }
    }, [qualification, row]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (dirty) {
            setLoading(true);
            const payload = {
                id: id,
                username : username,
                email : email,
                password : password,
                role : role,
                qualification: qualification
            }

            try {
                await axios.post(`${apiUrl}/api/admin/users/edit`, payload, {
                    withCredentials: true,
                    headers: {"Content-Type": "application/json"},
                });

                setOpen(false); // Close the dialog on success
            } catch (error) {
                console.error("Error editing qualification:", error);
                setErrorMessage("Failed to edit the qualification. Please try again.");
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
                    <DialogTitle>Editing User</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    {/* Show Error Message if Any */}
                    {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

                    {/* Username */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Username</Label>
                        <Input className="col-span-3" value={username} onChange={(e) => setUsername(e.target.value)}
                               required/>
                    </div>

                    {/* Email */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Email</Label>
                        <Input className="col-span-3" type={"email"} value={email} onChange={(e) => setEmail(e.target.value)}
                               required/>
                    </div>

                    {/* Password */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Password</Label>
                        <Input className="col-span-3" type={"password"} onChange={(e) => setPassword(e.target.value)}/>
                    </div>

                    {/* Role */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Role</Label>
                        <Select
                            onValueChange={(value) => {
                                setRole(value);
                            }}
                        >
                            <SelectTrigger className="col-span-3 bg-white disabled:bg-gray-200 disabled:text-gray-500">
                                <SelectValue placeholder="Select Role"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={"ROLE_ADMIN"}>Admin</SelectItem>
                                <SelectItem value={"ROLE_USER"}>User</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Qualification */}
                    {role === "ROLE_USER" ? (
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Qualification</Label>
                            <Select
                                onValueChange={(value) => {
                                    setQualification(value);
                                }}
                            >
                                <SelectTrigger
                                    className="col-span-3 bg-white disabled:bg-gray-200 disabled:text-gray-500">
                                    <SelectValue placeholder="Select Qualification"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {qualifications.map((q) => (
                                        <SelectItem key={q.id || q.qualification} value={q.qualification}>
                                            {q.qualification}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>) : (
                        <></>
                    )}

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

export function EditSubject({open, setOpen, row, qualifications }) {
    const [id, setId] = useState(0);
    const [subject, setSubject] = useState("");
    const [qualification, setQualification] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [dirty, setDirty] = useState(false);
    const [showCancelDialog, setShowCancelDialog] = useState(false);

    useEffect(() => {
        if (row && open) {
            setId(row.id || 0);
            setSubject(row.name || "");
            setQualification(row.qualification || "");
            setDirty(false); // Reset dirty state when opening
        }
    }, [row, open]);

    useEffect(() => {
        if (!row) return;
        if (subject !== row.name || qualification !== row.qualification) {
            setDirty(true);
        } else {
            setDirty(false);
        }
    }, [subject, qualification, row]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (dirty) {
            setLoading(true);
            const payload = {
                id: id,
                subject: subject,
                qualification: qualification,
            }

            try {
                await axios.post(`${apiUrl}/api/admin/subjects/edit`, payload, {
                    withCredentials: true,
                    headers: {"Content-Type": "application/json"},
                });

                setOpen(false); // Close the dialog on success
            } catch (error) {
                console.error("Error editing subject:", error);
                setErrorMessage("Failed to edit the subject. Please try again.");
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
                    <DialogTitle>Editing Subject</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    {/* Topic */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Subject</Label>
                        <Input className="col-span-3"  value={subject} onChange={(e) => setSubject(e.target.value)}
                               required />
                    </div>

                    {/* Qualification Dropdown */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Qualification</Label>
                        <Select
                            onValueChange={(value) => {
                                setQualification(value);
                            }}
                            value={qualification}
                        >
                            <SelectTrigger className="col-span-3 bg-white disabled:bg-gray-200 disabled:text-gray-500">
                                <SelectValue placeholder="Select Qualification" />
                            </SelectTrigger>
                            <SelectContent>
                                {qualifications.map((q) => (
                                    <SelectItem key={q.id || q.qualification} value={q.qualification}>
                                        {q.qualification}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

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
