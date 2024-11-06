'use client'
import React, {useEffect, useState} from 'react'
import axios from "axios";
import { SidebarMenu } from '@/components/SidebarMenu';

// Dummy dashboard component with content
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
        <div>
            <h1>Dashboard</h1>
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