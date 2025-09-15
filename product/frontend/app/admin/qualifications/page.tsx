'use client'
import React, {useEffect, useState} from 'react'
import axios from "axios";
import { SidebarMenu } from '@/components/ui/SidebarMenu';
import {DataTable} from "@/components/DataTable";
import {qualificationsColumns} from "@/components/TableColumns";

/**
 * A component for displaying the qualifications dashboard.
 *
 * Fetches the list of qualifications from the backend and displays them in a table.
 * If no qualifications are available or an error occurs, a message is shown to the user.
 *
 * @returns The rendered qualifications dashboard component.
 * @author Danyal Shah
 */
const QualificationsDash = () => {
    const apiUrl = process.env.API_URL;
    const [qualifications, setQualifications] = useState([]);

    const qualsReq = async() => {
        try {
            const response = await axios.get(`${apiUrl}/api/admin/qualifications/get`, {withCredentials: true});
            setQualifications(response.data);
        }
        catch (error:any) {
            setQualifications([]);
        }
    }

    useEffect(() => {
        qualsReq();
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="w-full max-w-7xl p-6 rounded-lg bg-white">
                <h1 className="flex items-center justify-center align-middle text-4xl p-6">Qualifications</h1>
                {qualifications && qualifications.length >= 0 ? (
                    <div className="container mx-auto">
                        <DataTable columns={qualificationsColumns(qualsReq)} data={qualifications} name={"Qualification"} refetch={qualsReq}/>
                    </div>
                ) : (
                    <div className="flex justify-center items-center align-middle text-center">
                        Unable to load the qualifications table.
                    </div>
                )}
            </div>
        </div>
    );
};

/**
 * A wrapper component for the QualificationsDash with a sidebar menu.
 *
 * @returns The rendered page component containing the sidebar and qualifications dashboard.
 * @author Danyal Shah
 */
const Page = () => {
    return (
        <div>
            <SidebarMenu role="ROLE_ADMIN">
                <QualificationsDash/>
            </SidebarMenu>
        </div>
    )
}

export default Page
