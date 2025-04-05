"use client"

import {useState} from "react";
import axios from "axios";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {DialogFooter} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export function QuestionDialog({setOpenDialog, qualifications, subjects, topics }) {
    const [selectedQualification, setSelectedQualification] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("");
    const [selectedTopic, setSelectedTopic] = useState("");
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [marks, setMarks] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const filteredSubjects = subjects.filter((subject) => subject.qualification === selectedQualification);
    const filteredTopics = topics.filter((topic) => topic.subject === selectedSubject && topic.qualification === selectedQualification);

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
                headers: { "Content-Type": "application/json" },
            });

            setOpenDialog(false); // Close the dialog on success
        } catch (error) {
            console.error("Error submitting question:", error);
            setErrorMessage("Failed to submit the question. Please try again.");
        } finally {
            setLoading(false);
            window.location.reload();
        }
    };

    return (
            <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                {/* Show Error Message if Any */}
                {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

                {/* Question */}
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Question</Label>
                    <Input className="col-span-3" value={question} onChange={(e) => setQuestion(e.target.value)} required />
                </div>

                {/* Answer */}
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Answer</Label>
                    <Input className="col-span-3" value={answer} onChange={(e) => setAnswer(e.target.value)} required />
                </div>

                {/* Marks */}
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Marks</Label>
                    <Input className="col-span-3" type="number" value={marks} onChange={(e) => setMarks(e.target.value)} required />
                </div>

                {/* Qualification Dropdown */}
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Qualification</Label>
                    <Select
                        onValueChange={(value) => {
                            setSelectedQualification(value);
                            setSelectedSubject(""); // Reset Subject
                            setSelectedTopic(""); // Reset Topic
                        }}
                    >
                        <SelectTrigger className="col-span-3 bg-white disabled:bg-gray-200 disabled:text-gray-500">
                            <SelectValue placeholder="Select Qualification" />
                        </SelectTrigger>
                        <SelectContent>
                            {qualifications.map((q) => (
                                <SelectItem key={q.id || q.name} value={q.name}>
                                    {q.name}
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
                            setSelectedTopic(""); // Reset Topic
                        }}
                        disabled={!selectedQualification || filteredSubjects.length === 0}
                    >
                        <SelectTrigger className="col-span-3 bg-white disabled:bg-gray-200 disabled:text-gray-500">
                            <SelectValue placeholder={filteredSubjects.length ? "Select Subject" : "No subjects available"} />
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

                {/* Topic Dropdown */}
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Topic</Label>
                    <Select
                        onValueChange={setSelectedTopic}
                        disabled={!selectedSubject || filteredTopics.length === 0}
                    >
                        <SelectTrigger className="col-span-3 bg-white disabled:bg-gray-200 disabled:text-gray-500">
                            <SelectValue placeholder={filteredTopics.length ? "Select Topic" : "No topics available"} />
                        </SelectTrigger>
                        <SelectContent>
                            {filteredTopics.length > 0 ? (
                                filteredTopics.map((t) => (
                                    <SelectItem key={t.id || t.name} value={t.name}>
                                        {t.name}
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
                    <Button type="button" onClick={() => setOpenDialog(false)} className=" bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md">
                        Cancel
                    </Button>
                    <Button type="submit" disabled={loading} className="bg-black text-white hover:bg-gray-800 px-4 py-2 rounded-md">
                        {loading ? "Submitting..." : "Confirm"}
                    </Button>
                </DialogFooter>
            </form>
    );
}

export function TopicDialog({setOpenDialog, qualifications, subjects }) {
    const [topic, setTopic] = useState("");
    const [selectedQualification, setSelectedQualification] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const filteredSubjects = subjects.filter((subject) => subject.qualification === selectedQualification);
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
                headers: { "Content-Type": "application/json" },
            });

            setOpenDialog(false); // Close the dialog on success
        } catch (error) {
            console.error("Error submitting question:", error);
            setErrorMessage("Failed to submit the topic. Please try again.");
        } finally {
            setLoading(false);
            window.location.reload();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            {/* Topic */}
            <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Topic</Label>
                <Input className="col-span-3"  onChange={(e) => setTopic(e.target.value)} required />
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

            {/* Subject Dropdown */}
            <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Subject</Label>
                <Select
                    onValueChange={(value) => {
                        setSelectedSubject(value);
                    }}
                    disabled={!selectedQualification || filteredSubjects.length === 0}
                >
                    <SelectTrigger className="col-span-3 bg-white disabled:bg-gray-200 disabled:text-gray-500">
                        <SelectValue placeholder={filteredSubjects.length ? "Select Subject" : "No subjects available"} />
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
                    <Button type="button" onClick={() => setOpenDialog(false)} className=" bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md">
                        Cancel
                    </Button>
                    <Button type="submit" disabled={loading} className="bg-black text-white hover:bg-gray-800 px-4 py-2 rounded-md">
                        {loading ? "Submitting..." : "Confirm"}
                    </Button>
            </DialogFooter>
        </form>
    )
}

export function SubjectDialog({setOpenDialog, qualifications }) {
    const [subject, setSubject] = useState("");
    const [selectedQualification, setSelectedQualification] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!subject || !selectedQualification ) {
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
                headers: { "Content-Type": "application/json" },
            });

            setOpenDialog(false); // Close the dialog on success
        } catch (error) {
            console.error("Error submitting question:", error);
            setErrorMessage("Failed to submit the subject. Please try again.");
        } finally {
            setLoading(false);
            window.location.reload();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            {/* Topic */}
            <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Subject</Label>
                <Input className="col-span-3"  onChange={(e) => setSubject(e.target.value)} required />
            </div>

            {/* Qualification Dropdown */}
            <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Qualification</Label>
                <Select
                    onValueChange={(value) => {
                        setSelectedQualification(value);
                    }}
                >
                    <SelectTrigger className="col-span-3 bg-white disabled:bg-gray-200 disabled:text-gray-500">
                        <SelectValue placeholder="Select Qualification" />
                    </SelectTrigger>
                    <SelectContent>
                        {qualifications.map((q) => (
                            <SelectItem key={q.id || q.name} value={q.name}>
                                {q.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

             <DialogFooter>
                    <Button type="button" onClick={() => setOpenDialog(false)} className=" bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md">
                        Cancel
                    </Button>
                    <Button type="submit" disabled={loading} className="bg-black text-white hover:bg-gray-800 px-4 py-2 rounded-md">
                        {loading ? "Submitting..." : "Confirm"}
                    </Button>
            </DialogFooter>
        </form>
    )
}

export function QualificationDialog({setOpenDialog }) {
    const [qualification, setQualification] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

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
                headers: { "Content-Type": "application/json" },
            });

            setOpenDialog(false); // Close the dialog on success
        } catch (error) {
            console.error("Error submitting qualification:", error);
            setErrorMessage("Failed to submit the qualification. Please try again.");
        } finally {
            setLoading(false);
            window.location.reload();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            {/* Topic */}
            <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Qualification</Label>
                <Input className="col-span-3"  onChange={(e) => setQualification(e.target.value)} required />
            </div>

             <DialogFooter>
                    <Button type="button" onClick={() => setOpenDialog(false)} className=" bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md">
                        Cancel
                    </Button>
                    <Button type="submit" disabled={loading} className="bg-black text-white hover:bg-gray-800 px-4 py-2 rounded-md">
                        {loading ? "Submitting..." : "Confirm"}
                    </Button>
            </DialogFooter>
        </form>
    )
}

export function UserDialog({setOpenDialog, qualifications }) {
    const [selectedQualification, setSelectedQualification] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

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
                headers: { "Content-Type": "application/json" },
            });

            setOpenDialog(false); // Close the dialog on success
        } catch (error) {
            console.error("Error registering user:", error);
            setErrorMessage("Failed to register the user. Please try again.");
        } finally {
            setLoading(false);
            window.location.reload();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            {/* Show Error Message if Any */}
            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

            {/* Question */}
            <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Username</Label>
                <Input className="col-span-3" onChange={(e) => setUsername(e.target.value)} required/>
            </div>

            {/* Answer */}
            <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Email</Label>
                <Input className="col-span-3" type={"email"} onChange={(e) => setEmail(e.target.value)} required/>
            </div>

            {/* Marks */}
            <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Password</Label>
                <Input className="col-span-3" type={"password"} onChange={(e) => setPassword(e.target.value)} required/>
            </div>

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

            {/* Qualification Dropdown */}
            <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Qualification</Label>
                <Select
                    onValueChange={(value) => {
                        setSelectedQualification(value);
                    }}
                >
                    <SelectTrigger className="col-span-3 bg-white disabled:bg-gray-200 disabled:text-gray-500">
                        <SelectValue placeholder="Select Qualification"/>
                    </SelectTrigger>
                    <SelectContent>
                        {qualifications.map((q) => (
                            <SelectItem key={q.id || q.name} value={q.name}>
                                {q.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Footer Buttons */}
            <DialogFooter>
                <Button type="button" onClick={() => setOpenDialog(false)} className=" bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md">
                    Cancel
                </Button>
                <Button type="submit" disabled={loading} className="bg-black text-white hover:bg-gray-800 px-4 py-2 rounded-md">
                    {loading ? "Submitting..." : "Confirm"}
                </Button>
            </DialogFooter>
        </form>
    );
}