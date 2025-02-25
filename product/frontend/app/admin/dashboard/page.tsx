'use client'
import React, {useEffect, useState} from 'react'
import axios from "axios";
import { SidebarMenu } from '@/components/ui/SidebarMenu';
import {AttemptsTable} from "@/components/ui/AttemptsTable";
import {columns} from "@/components/columns";

/**
 * A dashboard component displaying user information and statistics.
 *
 * @author Danyal Shah
 */
const Dashboard = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [user, setUser] = useState([]);

    useEffect(() => {
        /**
         * Fetches the user's profile data on component load.
         */
        const profile = async () => {
            const response = await axios.get(`${apiUrl}/api/user/profile`, {withCredentials: true})
            return response.data;
        };

        profile().then(data => {
            setUser(data);
        })
    }, [])

    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="w-full max-w-7xl p-6 rounded-lg bg-white h-96">

            </div>
        </div>
    );
};

/**
 * A wrapper component for the Dashboard with a sidebar menu.
 */
const Page = () => {

    return (
        <div>
            <SidebarMenu role="ROLE_ADMIN">
                <Dashboard/>
            </SidebarMenu>
        </div>
    )
}

export default Page