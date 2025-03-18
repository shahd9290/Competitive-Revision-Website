"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export function QuestionDialog({ openDialog, setOpenDialog, qualifications, subjects, topics }) {
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
            await axios.post(`${apiUrl}/api/admin/question/add`, payload, {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            });

            setOpenDialog(false); // Close the dialog on success
        } catch (error) {
            console.error("Error submitting question:", error);
            setErrorMessage("Failed to submit the question. Please try again.");
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
                    <Button type="button" onClick={() => setOpenDialog(false)}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={loading}>
                        {loading ? "Submitting..." : "Confirm"}
                    </Button>
                </DialogFooter>
            </form>
    );
}

export function TopicDialog({ openDialog, setOpenDialog, qualifications, subjects }) {
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
            await axios.post(`${apiUrl}/api/admin/topic/add`, payload, {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            });

            setOpenDialog(false); // Close the dialog on success
        } catch (error) {
            console.error("Error submitting question:", error);
            setErrorMessage("Failed to submit the question. Please try again.");
        } finally {
            setLoading(false);
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
                    <Button type="button" onClick={() => setOpenDialog(false)}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={loading}>
                        {loading ? "Submitting..." : "Confirm"}
                    </Button>
            </DialogFooter>
        </form>
    )
}
export function SubjectDialog({ openDialog, setOpenDialog }) {
    return (
        <div>Subject</div>
    )
}
export function QualificationDialog({ openDialog, setOpenDialog }) {
    return (
        <div>Qualification</div>
    )
}
export function UserDialog({ openDialog, setOpenDialog }) {
    return (
        <div>User</div>
    )
}


