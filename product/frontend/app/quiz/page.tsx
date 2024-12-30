'use client'
import {SidebarMenu} from "@/components/ui/SidebarMenu";
import {useRouter} from "next/navigation";
import React, {useEffect} from "react";

interface SearchParams {
    id?: string;
}

const Quiz = ({ searchParams }: { searchParams: SearchParams }) => {
    const {id} = searchParams;
    useEffect(() => {
        if (id) {
            console.log(`Received id: ${id}`);
        }
    }, []);

    return(
        <div>
            <h1>Quiz Page</h1>
        </div>
    )
}


/**
 * A wrapper component for the `Quiz` component with a sidebar menu.
 */
const Page = ({ searchParams }: { searchParams: SearchParams }) => {

    return (
        <div>
            <SidebarMenu>
                <Quiz searchParams={searchParams}/>
            </SidebarMenu>
        </div>
    )
}

export default Page