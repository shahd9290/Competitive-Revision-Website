'use client'
import React, {useEffect, useState} from 'react'
import axios from "axios";
import { SidebarMenu } from '@/components/ui/SidebarMenu';
import {DataTable} from "@/components/DataTable";
import {subjectColumns} from "@/components/TableColumns";

/**
 * A component for displaying the subjects dashboard.
 *
 * Fetches the list of subjects from the backend and displays them in a table.
 * If no subjects are available or an error occurs, a message is shown to the user.
 *
 * @returns The rendered subjects dashboard component.
 * @author Danyal Shah
 */
const SubjectsDash = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [subjects, setSubjects] = useState([]);

    const subjectsReq = async() => {
        try {
            const response = await axios.get(`${apiUrl}/api/admin/subjects/get`, {withCredentials: true});
            setSubjects(response.data);
        }
        catch (error:any) {
            setSubjects([]);
        }
    }

    useEffect(() => {
        subjectsReq();
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="w-full max-w-7xl p-6 rounded-lg bg-white">
                <h1 className="flex items-center justify-center align-middle text-4xl p-6">Subjects</h1>
                {subjects && subjects.length >= 0 ? (
                    <div className="container mx-auto">
                        <DataTable columns={subjectColumns(subjectsReq)} data={subjects} name={"Subject"} refetch={subjectsReq}/>
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
 *
 * @returns The rendered page component containing the sidebar and subjects dashboard.
 * @author Danyal Shah
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
