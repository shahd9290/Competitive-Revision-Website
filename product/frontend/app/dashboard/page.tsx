'use client'
import React, {useEffect, useState} from 'react'
import axios from "axios";
import { SidebarMenu } from '@/components/ui/SidebarMenu';
import {AttemptsTable} from "@/components/AttemptsTable";
import {attemptColumns} from "@/components/TableColumns";

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
            <div className="w-full max-w-7xl p-6 rounded-lg ">

                <div className="grid gap-4 md:grid-cols-3">
                    {/* Top Left */}
                    <div className=" bg-gray-200 h-96 rounded-lg shadow-lg">
                        <h1 className="pt-36 text-center text-5xl">Hello, {user.username}!</h1>
                        <h1 className="pt-4 text-center text-5xl">Your Points: {user.marks}</h1>
                    </div>

                    {/* Top right box - not sure what could go here at the moment, but definitely something */}
                    <div className="col-span-2 bg-gray-200 h-96 rounded-lg shadow-lg">

                    </div>

                    {/* Bottom section - recent attempts? */}
                    <div className="col-span-3 bg-gray-200 h-96 rounded-lg shadow-lg px-7">
                        <h1 className="flex items-center justify-center align-middle text-4xl p-6">Recent Attempts</h1>
                        {/* Could use Shadcn data table here */}
                        {user.attempts && user.attempts.length > 0 ? (
                            <div className="container mx-auto">
                                <AttemptsTable columns={attemptColumns} data={user.attempts}/>
                            </div>
                        ) : (
                            <div className="flex justify-center items-center align-middle text-center">No recent attempts found.</div>
                        )}
                    </div>
                </div>
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
            <SidebarMenu role="ROLE_USER">
                <Dashboard/>
            </SidebarMenu>
        </div>
    )
}

export default Page