'use client'
import React, {useEffect, useState} from 'react'
import axios from "axios";
import { SidebarMenu } from '@/components/ui/SidebarMenu';
import {DataTable} from "@/components/DataTable";
import {usersColumns} from "@/components/TableColumns";
import {Button} from "@/components/ui/button";

/**
 * A component for displaying the users dashboard.
 *
 * Fetches the list of users from the backend and displays them in a table.
 * If no users are available or an error occurs, a message is shown to the user.
 *
 * @returns The rendered users dashboard component.
 * @author Danyal Shah
 */
const UsersDash = () => {
    const apiUrl = process.env.API_URL;
    const [users, setUsers] = useState([]);

    const usersReq = async() => {
        try {
            const response = await axios.get(`${apiUrl}/api/admin/users/get`, {withCredentials: true});
            setUsers(response.data);
        }
        catch (error:any) {
            setUsers([]);
        }
    }

    useEffect(() => {
        usersReq();
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="w-full max-w-7xl p-6 rounded-lg bg-white">
                <h1 className="flex items-center justify-center align-middle text-4xl p-6">Users</h1>
                {users && users.length >= 0 ? (
                    <div className="container mx-auto">
                        <DataTable columns={usersColumns(usersReq)} data={users} name={"User"} refetch={usersReq}/>
                    </div>
                ) : (
                    <div className="flex justify-center items-center align-middle text-center">
                        Unable to load the users table.
                    </div>
                )}
            </div>
        </div>
    );
};

/**
 * A wrapper component for the UsersDash with a sidebar menu.
 *
 * @returns The rendered page component containing the sidebar and users dashboard.
 * @author Danyal Shah
 */
const Page = () => {

    return (
        <div>
            <SidebarMenu role="ROLE_ADMIN">
                <UsersDash/>
            </SidebarMenu>
        </div>
    )
}

export default Page
