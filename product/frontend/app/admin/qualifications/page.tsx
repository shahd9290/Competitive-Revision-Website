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
const QualificationsDash = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="w-full max-w-7xl p-6 rounded-lg bg-white h-96">

            </div>
        </div>
    );
};

/**
 * A wrapper component for the QualificationsDash with a sidebar menu.
 */
const Page = () => {

    return (
        <div>
            <SidebarMenu role="ROLE_ADMIN">
                <QualificationsDash/>
            </SidebarMenu>
        </div>
    )
}

export default Page