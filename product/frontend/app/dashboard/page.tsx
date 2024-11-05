'use client'
import React, {useEffect} from 'react'
import axios from "axios";
import { SidebarMenu } from '@/components/SidebarMenu';

// Dummy dashboard component with content
const Dashboard = () => {
    return (
        <div>

        </div>
    );
};

const Page = () => {

    useEffect(() => {

        const profile = async () => {
            const response = await axios.get("http://localhost:8080/api/user/profile", {withCredentials: true})
            return response.data;
        };

        profile().then(data => {
            console.log(data.username);
            console.log(data.email);
        })
    }, [])

    return (
        <div>
            <SidebarMenu>
                <Dashboard/>
            </SidebarMenu>
        </div>
    )
}

export default Page