'use client'
import React, {useEffect, useState} from 'react'
import axios from "axios";
import { SidebarMenu } from '@/components/ui/SidebarMenu';
import {DataTable} from "@/components/DataTable";
import {questionColumns} from "@/components/TableColumns";

/**
 * A component for displaying the questions dashboard.
 *
 * Fetches the list of questions from the backend and displays them in a table.
 * If no questions are available or an error occurs, a message is shown to the user.
 *
 * @returns The rendered questions dashboard component.
 * @author Danyal Shah
 */
const QuestionsDash = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [questions, setQuestions] = useState([]);

    const questionsReq = async() => {
        try {
            const response = await axios.get(`${apiUrl}/api/admin/questions/get`, {withCredentials: true});
            setQuestions(response.data);
        }
        catch (error:any) {
            setQuestions([]);
        }
    }

    useEffect(() => {
        questionsReq();
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="w-full max-w-7xl p-6 rounded-lg bg-white">
                <h1 className="flex items-center justify-center align-middle text-4xl p-6">Questions</h1>
                {questions && questions.length >= 0 ? (
                    <div className="container mx-auto">
                        <DataTable columns={questionColumns(questionsReq)} data={questions} name={"Question"} refetch={questionsReq}/>
                    </div>
                ) : (
                    <div className="flex justify-center items-center align-middle text-center">
                        Unable to load the questions table.
                    </div>
                )}
            </div>
        </div>
    );
};

/**
 * A wrapper component for the QuestionsDash with a sidebar menu.
 *
 * @returns The rendered page component containing the sidebar and questions dashboard.
 * @author Danyal Shah
 */
const Page = () => {
    return (
        <div>
            <SidebarMenu role="ROLE_ADMIN">
                <QuestionsDash/>
            </SidebarMenu>
        </div>
    )
}

export default Page
