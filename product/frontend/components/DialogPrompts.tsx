"use client";

import * as React from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function QuestionDialog({ openDialog, setOpenDialog, qualifications, subjects, topics }) {
    const [selectedQualification, setSelectedQualification] = React.useState("");
    const [selectedSubject, setSelectedSubject] = React.useState("");
    const [selectedTopic, setSelectedTopic] = React.useState("");

    const filteredSubjects = subjects.filter(
        (subject) => subject.qualification === selectedQualification
    );

    // Filter topics based on the selected subject
    const filteredTopics = topics.filter(
        (topic) => topic.subject === selectedSubject
    );

    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Question</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    {/* Question */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Question</Label>
                        <Input className="col-span-3" />
                    </div>

                    {/* Answer */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Answer</Label>
                        <Input className="col-span-3" />
                    </div>

                    {/* Marks */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Marks</Label>
                        <Input className="col-span-3" type="number" />
                    </div>

                    {/* Qualification Dropdown */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Qualification</Label>
                        <Select onValueChange={(value) => {
                            setSelectedQualification(value);
                            setSelectedSubject(""); // Reset Subject
                            setSelectedTopic(""); // Reset Topic
                        }}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select Qualification" />
                            </SelectTrigger>
                            <SelectContent>
                                {qualifications.map((q) => (
                                    <SelectItem key={q.name} value={q.name}>
                                        {q.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Subject Dropdown (depends on Qualification) */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Subject</Label>
                        <Select
                            onValueChange={(value) => {
                                setSelectedSubject(value);
                                setSelectedTopic(""); // Reset Topic
                            }}
                            disabled={!selectedQualification}
                        >
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select Subject" />
                            </SelectTrigger>
                            <SelectContent>
                                {filteredSubjects.length ? (
                                    filteredSubjects.map((s) => (
                                        <SelectItem key={s.name} value={s.name}>
                                            {s.name}
                                        </SelectItem>
                                    ))
                                ) : (
                                    <SelectItem disabled>No subjects available</SelectItem>
                                )}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Topic Dropdown (depends on Subject) */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Topic</Label>
                        <Select
                            onValueChange={setSelectedTopic}
                            disabled={!selectedSubject}
                        >
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select Topic" />
                            </SelectTrigger>
                            <SelectContent>
                                {filteredTopics.length ? (
                                    filteredTopics.map((t) => (
                                        <SelectItem key={t.name} value={t.name}>
                                            {t.name}
                                        </SelectItem>
                                    ))
                                ) : (
                                    <SelectItem disabled>No topics available</SelectItem>
                                )}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Footer Buttons */}
                    <DialogFooter>
                        <Button type="button" onClick={() => setOpenDialog(false)}>
                            Cancel
                        </Button>
                        <Button type="submit">Confirm</Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export function TopicDialog({ openDialog, setOpenDialog }) {
    return (
        <div>Topic</div>
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


