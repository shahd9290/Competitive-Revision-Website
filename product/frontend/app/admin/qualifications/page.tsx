'use client'
import React, {useEffect, useState} from 'react'
import axios from "axios";
import { SidebarMenu } from '@/components/ui/SidebarMenu';
import {DataTable} from "@/components/ui/DataTable";
import {qualificationsColumns} from "@/components/TableColumns";

/**
 * A dashboard component displaying user information and statistics.
 *
 * @author Danyal Shah
 */
const QualificationsDash = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [qualifications, setQualifications] = useState([]);
    useEffect(() => {
        const topicsReq = async() => {
            try {
                const response = await axios.get(`${apiUrl}/api/admin/qualification/get`, {withCredentials: true});
                setQualifications(response.data);
            }
            catch (error:any) {
                setQualifications([]);
            }
        }
        topicsReq();
    }, []);
    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="w-full max-w-7xl p-6 rounded-lg bg-white">
            <h1 className="flex items-center justify-center align-middle text-4xl p-6">Qualifications</h1>
            {qualifications && qualifications.length > 0 ? (
                <div className="container mx-auto">
                    <DataTable columns={qualificationsColumns} data={qualifications}/>
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