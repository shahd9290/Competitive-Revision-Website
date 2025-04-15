"use client"

import {useEffect, useState} from "react";
import axios from "axios";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {DialogFooter} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {useToast} from "@/hooks/use-toast";
import {CancelUnsavedDialog} from "@/components/DialogPrompts";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export function QuestionDialog({setOpenDialog, qualifications, subjects, topics, refetch}) {
    const [selectedQualification, setSelectedQualification] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("");
    const [selectedTopic, setSelectedTopic] = useState("");
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [marks, setMarks] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [dirty, setDirty] = useState(false);
    const [showCancelDialog, setShowCancelDialog] = useState(false);

    const {toast} = useToast();

    const filteredSubjects = subjects.filter((subject) => subject.qualification === selectedQualification);
    const filteredTopics = topics.filter((topic) => topic.subject === selectedSubject && topic.qualification === selectedQualification);

    useEffect(() => {
        if (question !== "" || answer !== "" || marks !== 0 || selectedQualification !== "" || selectedSubject !== "" || selectedTopic !== "") {
            setDirty(true);
        } else {
            setDirty(false);
        }
    }, [question, answer, marks, selectedQualification, selectedSubject, selectedTopic]);

    const handleCancel = () => {
        if (dirty) {
            setShowCancelDialog(true);
        } else {
            setOpenDialog(false);
        }
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!question || !answer || !marks || !selectedQualification || !selectedSubject || !selectedTopic) {
            setErrorMessage("Please fill out all fields before submitting.");
            return;
        }

        setLoading(true);
        setErrorMessage("");

        const payload = {
            question,
            answer,
            marks: Number(marks),
            topic: selectedTopic,
            qualification: selectedQualification,
        };

        try {
            await axios.post(`${apiUrl}/api/admin/questions/add`, payload, {
                withCredentials: true,
                headers: {"Content-Type": "application/json"},
            });
            refetch()
            setOpenDialog(false); // Close the dialog on success
            toast({
                title: "Success!",
                description: "The question has been added successfully!",
                variant: "success",
            })
        } catch (error) {
            console.error("Error submitting question:", error);
            toast({
                title: "Error!",
                description: "Failed to submit the question, please try again.",
                variant: "destructive",
            })
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            {/* Show Error Message if Any */}
            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

            {/* Question */}
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="question" className="text-right">Question</Label>
                <Input id="question" className="col-span-3" value={question}
                       onChange={(e) => setQuestion(e.target.value)} required/>
            </div>

            {/* Answer */}
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="answer" className="text-right">Answer</Label>
                <Input id="answer" className="col-span-3" value={answer} onChange={(e) => setAnswer(e.target.value)}
                       required/>
            </div>

            {/* Marks */}
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="marks" className="text-right">Marks</Label>
                <Input id="marks" className="col-span-3" type="number" value={marks}
                       onChange={(e) => setMarks(e.target.value)}
                       required/>
            </div>

            {/* Qualification Dropdown */}
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="qualification" className="text-right">Qualification</Label>
                <Select
                    onValueChange={(value) => {
                        setSelectedQualification(value);
                        setSelectedSubject(""); // Reset Subject
                        setSelectedTopic(""); // Reset Topic
                    }}

                >
                    <SelectTrigger aria-label="Qualification"
                                   className="col-span-3 bg-white disabled:bg-gray-200 disabled:text-gray-500">
                        <SelectValue placeholder="Select Qualification"/>
                    </SelectTrigger>
                    <SelectContent>
                        {qualifications.map((q) => (
                            <SelectItem key={q.id || q.qualification} value={q.qualification} id="qualification">
                                <span>{q.qualification}</span>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Subject Dropdown */}
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="subject" className="text-right">Subject</Label>
                <Select
                    onValueChange={(value) => {
                        setSelectedSubject(value);
                        setSelectedTopic(""); // Reset Topic
                    }}
                    disabled={!selectedQualification || filteredSubjects.length === 0}
                >
                    <SelectTrigger aria-label="Subject"
                                   className="col-span-3 bg-white disabled:bg-gray-200 disabled:text-gray-500">
                        <SelectValue
                            placeholder={filteredSubjects.length ? "Select Subject" : "No subjects available"}/>
                    </SelectTrigger>
                    <SelectContent>
                        {filteredSubjects.length > 0 ? (
                            filteredSubjects.map((s) => (
                                <SelectItem key={s.id || s.name} value={s.name} id="subject">
                                    <span>{s.name}</span>
                                </SelectItem>
                            ))
                        ) : (
                            <SelectItem key="no-subjects" disabled/>
                        )}
                    </SelectContent>
                </Select>
            </div>

            {/* Topic Dropdown */}
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="topic" className="text-right">Topic</Label>
                <Select
                    onValueChange={setSelectedTopic}
                    disabled={!selectedSubject || filteredTopics.length === 0}
                >
                    <SelectTrigger aria-label="Topic"
                                   className="col-span-3 bg-white disabled:bg-gray-200 disabled:text-gray-500">
                        <SelectValue placeholder={filteredTopics.length ? "Select Topic" : "No topics available"}/>
                    </SelectTrigger>
                    <SelectContent>
                        {filteredTopics.length > 0 ? (
                            filteredTopics.map((t) => (
                                <SelectItem key={t.id || t.name} value={t.name} id="topic">
                                    <span>{t.name}</span>
                                </SelectItem>
                            ))
                        ) : (
                            <SelectItem key="no-topics" disabled/>
                        )}
                    </SelectContent>
                </Select>
            </div>

            {/* Footer Buttons */}
            <DialogFooter>
                <Button type="button" onClick={handleCancel}
                        className=" bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md">
                    Cancel
                </Button>
                <Button type="submit" disabled={loading}
                        className="bg-black text-white hover:bg-gray-800 px-4 py-2 rounded-md">
                    {loading ? "Submitting..." : "Confirm"}
                </Button>
            </DialogFooter>

            <CancelUnsavedDialog
                open={showCancelDialog}
                setOpen={setShowCancelDialog}
                setEdit={setOpenDialog}
            />
        </form>
    );
}

export function TopicDialog({setOpenDialog, qualifications, subjects, refetch}) {
    const [topic, setTopic] = useState("");
    const [selectedQualification, setSelectedQualification] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const {toast} = useToast();
    const [dirty, setDirty] = useState(false);
    const [showCancelDialog, setShowCancelDialog] = useState(false);

    const filteredSubjects = subjects.filter((subject) => subject.qualification === selectedQualification);

    useEffect(() => {
        if (topic !== "" || selectedQualification !== "" || selectedSubject !== "") {
            setDirty(true);
        } else {
            setDirty(false);
        }
    }, [topic, selectedQualification, selectedSubject]);

    const handleCancel = () => {
        if (dirty) {
            setShowCancelDialog(true);
        } else {
            setOpenDialog(false);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!topic || !selectedQualification || !selectedSubject) {
            setErrorMessage("Please fill out all fields before submitting.");
            return;
        }

        setLoading(true);
        setErrorMessage("");

        const payload = {
            name: topic,
            subject: selectedSubject,
            qualification: selectedQualification,
        };

        try {
            await axios.post(`${apiUrl}/api/admin/topics/add`, payload, {
                withCredentials: true,
                headers: {"Content-Type": "application/json"},
            });
            refetch()
            setOpenDialog(false); // Close the dialog on success
            toast({
                title: "Success!",
                description: "The question has been added successfully!",
                variant: "success",
            })
        } catch (error) {
            console.error("Error submitting question:", error);
            toast({
                title: "Error!",
                description: "Failed to submit the question, please try again.",
                variant: "destructive",
            })
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            {/* Topic */}
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="topic" className="text-right">Topic</Label>
                <Input id="topic" className="col-span-3" onChange={(e) => setTopic(e.target.value)} required/>
            </div>

            {/* Qualification Dropdown */}
            <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Qualification</Label>
                <Select
                    onValueChange={(value) => {
                        setSelectedQualification(value);
                        setSelectedSubject(""); // Reset Subject
                    }}
                >
                    <SelectTrigger aria-label="Qualification"
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
            </div>

            {/* Subject Dropdown */}
            <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Subject</Label>
                <Select
                    onValueChange={(value) => {
                        setSelectedSubject(value);
                    }}
                    disabled={!selectedQualification || filteredSubjects.length === 0}
                >
                    <SelectTrigger aria-label="Subject"
                                   className="col-span-3 bg-white disabled:bg-gray-200 disabled:text-gray-500">
                        <SelectValue
                            placeholder={filteredSubjects.length ? "Select Subject" : "No subjects available"}/>
                    </SelectTrigger>
                    <SelectContent>
                        {filteredSubjects.length > 0 ? (
                            filteredSubjects.map((s) => (
                                <SelectItem key={s.id || s.name} value={s.name}>
                                    {s.name}
                                </SelectItem>
                            ))
                        ) : (
                            <SelectItem key="no-subjects" disabled/>
                        )}
                    </SelectContent>
                </Select>
            </div>
            <DialogFooter>
                <Button type="button" onClick={handleCancel}
                        className=" bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md">
                    Cancel
                </Button>
                <Button type="submit" disabled={loading}
                        className="bg-black text-white hover:bg-gray-800 px-4 py-2 rounded-md">
                    {loading ? "Submitting..." : "Confirm"}
                </Button>
            </DialogFooter>

            <CancelUnsavedDialog
                open={showCancelDialog}
                setOpen={setShowCancelDialog}
                setEdit={setOpenDialog}
            />
        </form>
    )
}

export function SubjectDialog({setOpenDialog, qualifications, refetch}) {
    const [subject, setSubject] = useState("");
    const [selectedQualification, setSelectedQualification] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [dirty, setDirty] = useState(false);
    const [showCancelDialog, setShowCancelDialog] = useState(false);
    const {toast} = useToast();
    useEffect(() => {
        if (subject !== "" || selectedQualification !== "") {
            setDirty(true);
        } else {
            setDirty(false);
        }
    }, [subject, selectedQualification]);

    const handleCancel = () => {
        if (dirty) {
            setShowCancelDialog(true);
        } else {
            setOpenDialog(false);
        }
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!subject || !selectedQualification) {
            setErrorMessage("Please fill out all fields before submitting.");
            return;
        }

        setLoading(true);
        setErrorMessage("");

        const payload = {
            name: subject,
            qualification: selectedQualification,
        };

        try {
            await axios.post(`${apiUrl}/api/admin/subjects/add`, payload, {
                withCredentials: true,
                headers: {"Content-Type": "application/json"},
            });
            refetch()
            setOpenDialog(false); // Close the dialog on success
            toast({
                title: "Success!",
                description: "The question has been added successfully!",
                variant: "success",
            })
        } catch (error) {
            console.error("Error submitting question:", error);
            toast({
                title: "Error!",
                description: "Failed to submit the question, please try again.",
                variant: "destructive",
            })
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            {/* Topic */}
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="subject" className="text-right">Subject</Label>
                <Input id="subject" className="col-span-3" onChange={(e) => setSubject(e.target.value)} required/>
            </div>

            {/* Qualification Dropdown */}
            <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Qualification</Label>
                <Select
                    onValueChange={(value) => {
                        setSelectedQualification(value);
                    }}
                >
                    <SelectTrigger aria-label="Qualification"
                                   className="col-span-3 bg-white disabled:bg-gray-200 disabled:text-gray-500">
                        <SelectValue placeholder="Select Qualification"/>
                    </SelectTrigger>
                    <SelectContent>
                        {qualifications.map((q) => (
                            <SelectItem key={q.id || q.qualification} value={q.qualification}>
                                <span>{q.qualification}</span>
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
                <Button type="submit" disabled={loading}
                        className="bg-black text-white hover:bg-gray-800 px-4 py-2 rounded-md">
                    {loading ? "Submitting..." : "Confirm"}
                </Button>
            </DialogFooter>
            <CancelUnsavedDialog
                open={showCancelDialog}
                setOpen={setShowCancelDialog}
                setEdit={setOpenDialog}
            />
        </form>
    )
}

export function QualificationDialog({setOpenDialog, refetch}) {
    const [qualification, setQualification] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [dirty, setDirty] = useState(false);
    const [showCancelDialog, setShowCancelDialog] = useState(false);
    const {toast} = useToast();
    useEffect(() => {
        if (qualification !== "") {
            setDirty(true);
        } else {
            setDirty(false);
        }
    }, [qualification]);

    const handleCancel = () => {
        if (dirty) {
            setShowCancelDialog(true);
        } else {
            setOpenDialog(false);
        }
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!qualification) {
            setErrorMessage("Please fill out all fields before submitting.");
            return;
        }

        setLoading(true);
        setErrorMessage("");

        const payload = {
            qualification: qualification,
        };

        try {
            await axios.post(`${apiUrl}/api/admin/qualifications/add`, payload, {
                withCredentials: true,
                headers: {"Content-Type": "application/json"},
            });
            refetch()
            setOpenDialog(false); // Close the dialog on success
            toast({
                title: "Success!",
                description: "The question has been added successfully!",
                variant: "success",
            })
        } catch (error) {
            console.error("Error submitting qualification:", error);
            toast({
                title: "Error!",
                description: "Failed to submit the question, please try again.",
                variant: "destructive",
            })
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            {/* Topic */}
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="qualification" className="text-right">Qualification</Label>
                <Input id="qualification" className="col-span-3" onChange={(e) => setQualification(e.target.value)}
                       required/>
            </div>

            <DialogFooter>
                <Button type="button" onClick={handleCancel}
                        className=" bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md">
                    Cancel
                </Button>
                <Button type="submit" disabled={loading}
                        className="bg-black text-white hover:bg-gray-800 px-4 py-2 rounded-md">
                    {loading ? "Submitting..." : "Confirm"}
                </Button>
            </DialogFooter>
            <CancelUnsavedDialog
                open={showCancelDialog}
                setOpen={setShowCancelDialog}
                setEdit={setOpenDialog}
            />
        </form>
    )
}

export function UserDialog({setOpenDialog, qualifications, refetch}) {
    const [selectedQualification, setSelectedQualification] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [dirty, setDirty] = useState(false);
    const [showCancelDialog, setShowCancelDialog] = useState(false);
    const {toast} = useToast();
    useEffect(() => {
        if (username !== "" || email !== "" || password !== "" || role !== "" || selectedQualification !== "") {
            setDirty(true);
        } else {
            setDirty(false);
        }
    }, [username, email, password, role, selectedQualification]);

    const handleCancel = () => {
        if (dirty) {
            setShowCancelDialog(true);
        } else {
            setOpenDialog(false);
        }
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!username || !email || !password || !role || role === "ROLE_USER" && !selectedQualification) {
            setErrorMessage("Please fill out all fields before submitting.");
            return;
        }

        setLoading(true);
        setErrorMessage("");

        const payload = {
            username,
            email,
            password,
            role,
            qualification: selectedQualification,
        };

        try {
            await axios.post(`${apiUrl}/api/auth/register`, payload, {
                withCredentials: true,
                headers: {"Content-Type": "application/json"},
            });
            refetch()
            setOpenDialog(false); // Close the dialog on success
            toast({
                title: "Success!",
                description: "The question has been added successfully!",
                variant: "success",
            })
        } catch (error) {
            console.error("Error registering user:", error);
            toast({
                title: "Error!",
                description: "Failed to submit the question, please try again.",
                variant: "destructive",
            })
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            {/* Show Error Message if Any */}
            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

            {/* Username */}
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">Username</Label>
                <Input id="username" className="col-span-3" onChange={(e) => setUsername(e.target.value)} required/>
            </div>

            {/* Email */}
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">Email</Label>
                <Input id="email" className="col-span-3" type={"email"} onChange={(e) => setEmail(e.target.value)}
                       required/>
            </div>

            {/* Password */}
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">Password</Label>
                <Input id="password" className="col-span-3" type={"password"}
                       onChange={(e) => setPassword(e.target.value)} required/>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Role</Label>
                <Select
                    onValueChange={(value) => {
                        setRole(value);
                    }}
                >
                    <SelectTrigger aria-label="Role"
                                   className="col-span-3 bg-white disabled:bg-gray-200 disabled:text-gray-500">
                        <SelectValue placeholder="Select Role"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={"ROLE_ADMIN"}><span>Admin</span></SelectItem>
                        <SelectItem value={"ROLE_USER"}><span>User</span></SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Qualification Dropdown */}
            {role === "ROLE_USER" ? (
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Qualification</Label>
                    <Select
                        onValueChange={(value) => {
                            setSelectedQualification(value);
                        }}
                    >
                        <SelectTrigger aria-label="Qualification"
                                       className="col-span-3 bg-white disabled:bg-gray-200 disabled:text-gray-500">
                            <SelectValue placeholder="Select Qualification"/>
                        </SelectTrigger>
                        <SelectContent>
                            {qualifications.map((q) => (
                                <SelectItem key={q.id || q.qualification} value={q.qualification}>
                                    <span>{q.qualification}</span>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            ) : null}

            {/* Footer Buttons */}
            <DialogFooter>
                <Button type="button" onClick={handleCancel}
                        className=" bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md">
                    Cancel
                </Button>
                <Button type="submit" disabled={loading}
                        className="bg-black text-white hover:bg-gray-800 px-4 py-2 rounded-md">
                    {loading ? "Submitting..." : "Confirm"}
                </Button>
            </DialogFooter>
            <CancelUnsavedDialog
                open={showCancelDialog}
                setOpen={setShowCancelDialog}
                setEdit={setOpenDialog}
            />
        </form>
    );
}