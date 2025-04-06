'use client'
import React, {useEffect, useState} from 'react'
import axios from "axios";
import {SidebarMenu} from '@/components/ui/SidebarMenu';
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
                    <div className="bg-white h-96 rounded-lg shadow-lg p-6 flex flex-col items-center justify-center">
                        <div
                            className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-4xl font-bold mb-4">
                            {user.username ? user.username.charAt(0).toUpperCase() : "?"}
                        </div>
                        <h1 className="text-3xl font-bold mb-2">Hello, {user.username || "User"}!</h1>
                        <div className="flex items-center mb-4">
                            <span className="text-xl">Level {Math.floor((user.marks || 0) / 100) + 1}</span>
                            <span className="mx-2 text-gray-400">•</span>
                            <span className="text-xl font-semibold">{user.marks || 0} Points</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                            <div className="bg-blue-500 h-2.5 rounded-full"
                                 style={{width: `${user.marks % 100}%`}}></div>
                        </div>
                        <p className="text-sm text-gray-500">{100 - (user.marks % 100)} points to next level</p>
                    </div>

                    {/* Top right */}
                    <div className="col-span-2 bg-white h-96 rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Performance Summary</h2>

                        <div className="grid grid-cols-2 gap-6">
                            {/* Stats Cards */}
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Average Score</p>
                                        <p className="text-3xl font-bold text-gray-800">
                                            {user.attempts && user.attempts.length > 0
                                                ? Math.round(
                                                user.attempts.reduce((acc, attempt) => acc + (Number.parseFloat(attempt.proportion) || 0), 0) /
                                                user.attempts.length,
                                            ) + "%"
                                                : "0%"}
                                        </p>
                                    </div>
                                    <div className="bg-blue-200 p-3 rounded-full">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-blue-700"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-xl shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Highest Score</p>
                                        <p className="text-3xl font-bold text-gray-800">
                                            {user.attempts && user.attempts.length > 0
                                                ? Math.max(...user.attempts.map((a) => Number.parseFloat(a.proportion) || 0)) + "%"
                                                : "0%"}
                                        </p>
                                    </div>
                                    <div className="bg-green-200 p-3 rounded-full">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-green-700"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-xl shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Total Attempts</p>
                                        <p className="text-3xl font-bold text-gray-800">{user.attempts ? user.attempts.length : 0}</p>
                                    </div>
                                    <div className="bg-purple-200 p-3 rounded-full">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-purple-700"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-5 rounded-xl shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Last Attempt</p>
                                        <p className="text-3xl font-bold text-gray-800">
                                            {user.attempts && user.attempts.length > 0 ? user.attempts[0].proportion : "N/A"}
                                        </p>
                                    </div>
                                    <div className="bg-yellow-200 p-3 rounded-full">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-yellow-700"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Bottom section */}
                    <div className="col-span-3 bg-white h-96 rounded-lg shadow-lg px-7">
                        <div className="flex justify-between items-center py-6">
                            <h1 className="text-3xl font-semibold">Recent Attempts</h1>
                        </div>
                        <div className="h-64 overflow-y-auto">
                            {user.attempts && user.attempts.length > 0 ? (
                                <div className="container mx-auto">
                                    <AttemptsTable columns={attemptColumns} data={user.attempts}/>
                                </div>
                            ) : (
                                <div className="flex flex-col justify-center items-center h-full text-center p-6">
                                    <p className="text-gray-500 mb-4">No recent attempts found.</p>
                                    <button
                                        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
                                        Start a New Quiz
                                    </button>
                                </div>
                            )}
                        </div>
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