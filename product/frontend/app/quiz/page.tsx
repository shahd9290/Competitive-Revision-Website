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
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [isCompleted, setIsCompleted] = useState(false);
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

    if (isCompleted) {
        return (
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-lg bg-[#D9D9D9] py-10 rounded-3xl drop-shadow-2xl">
                    <h1 className="text-center text-2xl font-bold text-gray-900">Quiz Completed!</h1>
                </div>
            </div>
        );
    }

    const handleAnswerSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        if (questions.length === 0) return;

        const currentQuestion = questions[currentQuestionIndex];
        if (userAnswer.trim() === currentQuestion.answer) {
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setUserAnswer('');
            } else {
                setIsCompleted(true);
            }
        } else {
            alert('Incorrect answer, please try again.');
        }
    };

    const currentQuestion = questions[currentQuestionIndex];

    return(
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className=" sm:mx-auto sm:w-full sm:max-w-lg bg-[#D9D9D9] py-10 rounded-3xl drop-shadow-2xl">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h1 className="mb-10 text-center text-2xl font-bold leading-9 underline text-gray-900">
                        {topic != null ? topic.name : "Quiz Page"}
                    </h1>
                    <form
                        className="w-full flex flex-col items-center lg:items-stretch"
                    >
                        <div
                            className="w-3/4 lg:w-full text-center text-3xl py-10 bg-white font-medium text-gray-800 mb-6">
                            {currentQuestion ? (
                                <h2>
                                    {currentQuestion.question}
                                </h2>
                            ) : (
                                <h2>
                                    Loading question...
                                </h2>
                            )}
                        </div>
                        <input
                            type="text"
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            className="w-3/4 lg:w-full p-3 rounded-md border border-gray-300"
                            placeholder="Enter your answer"
                        />
                        <div className="text-center text-md text-gray-800 font-bold mb-4">
                            {currentQuestion ? (
                                `Marks Available: ${currentQuestion.marks}`
                            ) : (
                                "Loading marks..."
                            )}
                        </div>
                        <button
                            onClick={handleAnswerSubmit}
                            className="w-3/4 lg:w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                        >
                            Submit Answer
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}


/**
 * A wrapper component for the `Quiz` component with a sidebar menu.
 */
const Page = ({searchParams}: { searchParams: SearchParams }) => {

    return (
        <div>
            <SidebarMenu>
                <Quiz searchParams={searchParams}/>
            </SidebarMenu>
        </div>
    )
}

export default Page