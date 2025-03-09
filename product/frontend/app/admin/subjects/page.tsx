'use client'
import React, {useEffect, useState} from 'react'
import axios from "axios";
import { SidebarMenu } from '@/components/ui/SidebarMenu';
import {DataTable} from "@/components/DataTable";
import {subjectColumns} from "@/components/TableColumns";

/**
 * A dashboard component displaying user information and statistics.
 *
 * @author Danyal Shah
 */
const SubjectsDash = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [subjects, setSubjects] = useState([]);
    useEffect(() => {
        const topicsReq = async() => {
            try {
                const response = await axios.get(`${apiUrl}/api/admin/subjects/get`, {withCredentials: true});
                setSubjects(response.data);
            }
            catch (error:any) {
                setSubjects([]);
            }
        }
        topicsReq();
    }, []);
    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="w-full max-w-7xl p-6 rounded-lg bg-white">
                <h1 className="flex items-center justify-center align-middle text-4xl p-6">Subjects</h1>
                {subjects && subjects.length > 0 ? (
                    <div className="container mx-auto">
                        <DataTable columns={subjectColumns} data={subjects}/>
                    </div>
                ) : (
                    <div className="flex justify-center items-center align-middle text-center">
                        Unable to load the subjects table.
                    </div>
                )}
            </div>
        </div>
    );
};

/**
 * A wrapper component for the SubjectsDash with a sidebar menu.
 */
const Page = () => {

    return (
        <div>
            <SidebarMenu role="ROLE_ADMIN">
                <SubjectsDash/>
            </SidebarMenu>
        </div>
    )
}

export default Page