'use client'
import React, {useEffect, useState} from 'react'
import axios from "axios";
import { SidebarMenu } from '@/components/ui/SidebarMenu';

const Dashboard = () => {

    const [user, setUser] = useState([]);

    useEffect(() => {

        const profile = async () => {
            const response = await axios.get("http://localhost:8080/api/user/profile", {withCredentials: true})
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
                        <h1 className="pt-4 text-center text-5xl">Your Points: 0</h1>
                    </div>

                    {/* Top right box - not sure what could go here at the moment, but definitely something */}
                    <div className="col-span-2 bg-gray-200 h-96 rounded-lg shadow-lg">

                    </div>

                    {/* Bottom section - recent attempts? */}
                    <div className="col-span-3 bg-gray-200 h-96 rounded-lg shadow-lg">

                    </div>
                </div>
            </div>
        </div>
    );
};

const Page = () => {

    return (
        <div>
            <SidebarMenu>
                <Dashboard/>
            </SidebarMenu>
        </div>
    )
}

export default Page