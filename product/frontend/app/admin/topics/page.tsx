'use client'
import React, {useEffect, useState} from 'react'
import axios from "axios";
import { SidebarMenu } from '@/components/ui/SidebarMenu';
import {DataTable} from "@/components/DataTable";
import {topicColumns} from "@/components/TableColumns";

/**
 * A component for displaying the topics dashboard.
 *
 * Fetches the list of topics from the backend and displays them in a table.
 * If no topics are available or an error occurs, a message is shown to the user.
 *
 * @returns The rendered topics dashboard component.
 * @author Danyal Shah
 */
const TopicsDash = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [topics, setTopics] = useState([]);

    const topicsReq = async() => {
        try {
            const response = await axios.get(`${apiUrl}/api/admin/topics/get`, {withCredentials: true});
            setTopics(response.data);
        }
        catch (error:any) {
            setTopics([]);
        }
    }

    useEffect(() => {
        topicsReq();
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="w-full max-w-7xl p-6 rounded-lg bg-white">
                <h1 className="flex items-center justify-center align-middle text-4xl p-6">Topics</h1>
                {topics && topics.length >= 0 ? (
                    <div className="container mx-auto">
                        <DataTable columns={topicColumns(topicsReq)} data={topics} name={"Topic"} refetch={topicsReq}/>
                    </div>
                ) : (
                    <div className="flex justify-center items-center align-middle text-center">
                        Unable to load the topics table.
                    </div>
                )}
            </div>
        </div>
    );
};

/**
 * A wrapper component for the TopicsDash with a sidebar menu.
 *
 * @returns The rendered page component containing the sidebar and topics dashboard.
 * @author Danyal Shah
 */
const Page = () => {
    return (
        <div>
            <SidebarMenu role="ROLE_ADMIN">
                <TopicsDash/>
            </SidebarMenu>
        </div>
    )
}

export default Page
