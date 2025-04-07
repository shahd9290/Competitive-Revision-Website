"use client"

import {useState} from "react"
import Link from "next/link"
import {Book, ChevronRight, Search} from "lucide-react"

import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {ScrollArea} from "@/components/ui/scroll-area"
import {Separator} from "@/components/ui/separator"
import {Badge} from "@/components/ui/badge"

interface Topic {
    id: string
    name: string
    questionCount: number
}

interface Subject {
    id: string
    name: string
    topics: Topic[]
}

interface SubjectGridProps {
    subjects: Subject[]
}

export function SubjectGrid({subjects}: SubjectGridProps) {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null)
    const [open, setOpen] = useState(false);

    const filteredSubjects = subjects.filter((subject) => subject.name.toLowerCase().includes(searchQuery.toLowerCase()))

    return (
        <div className="space-y-4">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"/>
                <Input
                    placeholder="Search subjects..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredSubjects.map((subject) => (
                    <SubjectCard key={subject.id} subject={subject} onClick={() => {
                        setSelectedSubject(subject);
                        setOpen(true);
                    }}/>
                ))}
            </div>

            <Dialog open={open} onOpenChange={(open) => {
                setOpen(open);
                if (!open) {
                    setTimeout(() => setSelectedSubject(null), 200); // Match dialog close duration
                }
            }}>
                {selectedSubject && (<DialogContent className="sm:max-w-md bg-white rounded-lg shadow-lg p-6">
                    <DialogHeader>
                        <DialogTitle>{selectedSubject?.name}</DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="max-h-[60vh] bg-white rounded-lg p-3">
                        <div className="space-y-4 py-2">
                            {selectedSubject?.topics && selectedSubject.topics.length > 0 ? (
                                selectedSubject.topics.map((topic) => (
                                    <div key={topic.id} className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            {topic.questionCount > 0 ? (
                                                <Link
                                                    href={{pathname: "/quiz", query: {id: topic.id}}}
                                                    className="group flex items-center gap-2 hover:text-primary transition-colors"
                                                >
                                                    <span>{topic.name}</span>
                                                    <ChevronRight
                                                        className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity"/>
                                                </Link>
                                            ) : (
                                                <span className="text-muted-foreground">{topic.name}</span>
                                            )}
                                            <Badge variant={topic.questionCount > 0 ? "default" : "outline"}>
                                                {topic.questionCount} {topic.questionCount === 1 ? "Question" : "Questions"}
                                            </Badge>
                                        </div>
                                        <Separator/>
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center py-8 text-center">
                                    <Book className="h-12 w-12 text-muted-foreground mb-4"/>
                                    <p className="text-muted-foreground">No topics available for this subject</p>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </DialogContent>)}
            </Dialog>
        </div>
    )
}

interface SubjectCardProps {
    subject: Subject
    onClick: () => void
}

function SubjectCard({subject, onClick}: SubjectCardProps) {
    const topicCount = subject.topics?.length || 0
    const totalQuestions = subject.topics?.reduce((sum, topic) => sum + topic.questionCount, 0) || 0

    return (
        <Button
            variant="outline"
            className={cn(
                "h-auto flex flex-col items-center justify-center p-6 gap-3",
                "border-2 hover:border-primary hover:bg-primary/5 transition-all",
                "relative group overflow-hidden",
                "bg-white hover:bg-gray-100",
            )}
            onClick={onClick}
        >
            <div
                className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"/>

            <div
                className="size-12 rounded-full bg-primary/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Book className="size-6 text-primary"/>
            </div>

            <h3 className="font-semibold text-center line-clamp-2">{subject.name}</h3>

            <div className="flex flex-col items-center text-xs text-muted-foreground">
        <span>
          {topicCount} {topicCount === 1 ? "Topic" : "Topics"}
        </span>
                <span>
          {totalQuestions} {totalQuestions === 1 ? "Question" : "Questions"}
        </span>
            </div>
        </Button>
    )
}

