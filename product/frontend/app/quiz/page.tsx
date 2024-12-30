'use client'
import {SidebarMenu} from "@/components/ui/SidebarMenu";
import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import axios from "axios";

interface SearchParams {
    id?: string;
}

const Quiz = ({ searchParams }: { searchParams: SearchParams }) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [questions, setQuestions] = useState([]);
    const router = useRouter();
    const {id} = searchParams;
    useEffect(() => {
        if (!id) {
            router.push("/subjects");
        }
        const getQuestions = async () => {
            const response = await axios.get(`${apiUrl}/api/question/get?topicId=${id}`, {withCredentials:true});
            setQuestions(response.data);
        }
        getQuestions();
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