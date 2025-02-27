'use client'
import React, {useEffect, useState} from 'react'
import axios from "axios";
import { SidebarMenu } from '@/components/ui/SidebarMenu';
import {DataTable} from "@/components/ui/DataTable";
import {questionColumns} from "@/components/TableColumns";

/**
 * A dashboard component displaying user information and statistics.
 *
 * @author Danyal Shah
 */
const QuestionsDash = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [questions, setQuestions] = useState([]);
    useEffect(() => {
        const topicsReq = async() => {
            try {
                const response = await axios.get(`${apiUrl}/api/admin/questions/get`, {withCredentials: true});
                setQuestions(response.data);
            }
            catch (error:any) {
                setQuestions([]);
            }
        }
        topicsReq();
    }, []);
    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="w-full max-w-7xl p-6 rounded-lg bg-white">
                <h1 className="flex items-center justify-center align-middle text-4xl p-6">Questions</h1>
                {questions && questions.length > 0 ? (
                    <div className="container mx-auto">
                        <DataTable columns={questionColumns} data={questions}/>
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