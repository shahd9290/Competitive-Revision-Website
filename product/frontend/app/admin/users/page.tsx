'use client'
import React, {useEffect, useState} from 'react'
import axios from "axios";
import { SidebarMenu } from '@/components/ui/SidebarMenu';
import {DataTable} from "@/components/ui/DataTable";
import {usersColumns} from "@/components/TableColumns";

/**
 * A dashboard component displaying user information and statistics.
 *
 * @author Danyal Shah
 */
const UsersDash = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const usersReq = async() => {
            try {
                const response = await axios.get(`${apiUrl}/api/admin/users/get`, {withCredentials: true});
                setUsers(response.data);
            }
            catch (error:any) {
                setUsers([]);
            }
        }
        usersReq();
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="w-full max-w-7xl p-6 rounded-lg bg-white h-96">
                <h1 className="flex items-center justify-center align-middle text-4xl p-6">Users</h1>
                {users && users.length > 0 ? (
                    <div className="container mx-auto">
                        <DataTable columns={usersColumns} data={users}/>
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