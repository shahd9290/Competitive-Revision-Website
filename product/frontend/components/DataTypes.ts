import {UUID} from "node:crypto";

export type Attempt = {
    id: number
    topicName: string,
    date: string,
    proportion: number
}
export type User = {
    id: UUID
    username: string,
    email: string,
    role: string,
    createdAt: string,
    qualification: string
}
export type Topic = {
    id: number
    topicName: string,
    subjectName: string,
    qualificationName: string,
    questionCount: number
}
export type Subject = {
    id: number
    subject: string,
    topicNum: number,
    qualification: string
}
export type Question = {
    id: number
    question: string,
    answer: string,
    marks: number,
    subject: string,
    topic: string,
}
export type Qualification = {
    id: number
    qualification: string,
    subjectsNum: number,
    usersNum: number
}