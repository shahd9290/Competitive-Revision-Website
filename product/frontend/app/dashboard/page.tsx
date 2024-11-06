'use client'
import React, {useEffect, useState} from 'react'
import axios from "axios";
import { SidebarMenu } from '@/components/SidebarMenu';

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
        <div className="grid max-w-4xl mx-auto gap-4 md:grid-cols-3">
            {/* Item with col-span 2 */}
            <div className="col-span-2 bg-gray-800 text-white p-6 rounded-lg">

            </div>

            {/* Item with col-span 1 */}
            <div className="col-span-1 bg-gray-800 text-white p-6 rounded-lg">

            </div>

            {/* Item with col-span 3 */}
            <div className="col-span-3 bg-gray-800 text-white p-6 rounded-lg">

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