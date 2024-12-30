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
    const [topic, setTopic] = useState(null);
    const router = useRouter();
    const {id} = searchParams;

    useEffect(() => {
        const getTopic = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/topic/get?topicId=${id}`, {withCredentials: true});
                setTopic(response.data);
                console.log(response.data);
            }
            catch (error:any){
                setTopic(null);
            }
        }

        getTopic();
    }, [])

    useEffect(() => {

        const getQuestions = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/question/get?topicId=${id}`, {withCredentials: true});
                setQuestions(response.data);
            }
            catch (error:any){
                console.log(error.response.data);
                // router.push('/subjects');
            }
        }

        getQuestions();
    }, [topic]);

    return(
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className=" sm:mx-auto sm:w-full sm:max-w-lg bg-[#D9D9D9] py-10 rounded-3xl drop-shadow-2xl">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm sm:">
                    <h1 className="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        {topic != null ? topic.name : "Quiz Page"}
                    </h1>
                </div>
            </div>
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