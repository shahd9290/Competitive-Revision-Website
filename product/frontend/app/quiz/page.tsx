'use client'
import {SidebarMenu} from "@/components/ui/SidebarMenu";
import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Link from "next/link";
import {Progress} from "@/components/ui/progress";

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
    const [questionMarks, setQuestionMarks] = useState(0);
    const [totalMarks, setTotalMarks] = useState(0);
    const router = useRouter();
    const {id} = searchParams;

    useEffect(() => {
        const getTopic = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/topic/get?topicId=${id}`, {withCredentials: true});
                setTopic(response.data);
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
                alert(error.response.data);
                router.push('/subjects');
            }
        }

        getQuestions();
    }, [topic]);

    const currentQuestion = questions[currentQuestionIndex];
    useEffect(() => {
        if (currentQuestion) {
            setQuestionMarks(currentQuestion.marks);
        }
    }, [currentQuestion]);

    if (isCompleted) {

        const saveMarks = async () => {
            const payload = {
                "marks": totalMarks,
            }

             await axios.post(`${apiUrl}/api/user/save-marks`, payload, {withCredentials:true});

        }

        saveMarks();

        return (
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-lg bg-[#D9D9D9] py-10 rounded-3xl drop-shadow-2xl">
                    <h1 className="text-center text-2xl font-bold text-gray-900 pb-4">Quiz Completed!</h1>
                    <h2 className="text-center">Marks Earned: {totalMarks}</h2>
                    <h2 className="text-center">Your Total Marks: 0</h2>
                    <Link
                        href="/subjects"
                        className="pt-4 align-middle justify-center items-center flex underline font-bold"
                    >Return to Subjects Page</Link>
                </div>
            </div>
        );
    }

    const nextQuestion = (marks = questionMarks) => {
        setTotalMarks(Math.floor(totalMarks + marks));
        if (currentQuestionIndex < questions.length - 1) {
            // Store marks in a variable for later.
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setUserAnswer('');
        } else {
            setIsCompleted(true);
        }
    }

    const handleSkip = (event: {preventDefault: () => void}) => {
        event.preventDefault();
        nextQuestion(0);
    }

    const handleAnswerSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        if (questions.length === 0) return;

        if (userAnswer === '') {alert('Please enter an answer'); return;}

        const currentQuestion = questions[currentQuestionIndex];
        if (userAnswer.trim() === currentQuestion.answer) {
            nextQuestion();
        } else {
            if (currentQuestion.marks * 0.81 != questionMarks) {
                setQuestionMarks(questionMarks * 0.9);
            }
            alert('Incorrect answer, please try again.');
            // Decrease marks
        }
    };

    return(
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className=" sm:mx-auto sm:w-full sm:max-w-lg bg-[#D9D9D9] py-10 rounded-3xl drop-shadow-2xl">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h1 className="text-center text-2xl font-bold leading-9 underline text-gray-900">
                        {topic != null ? topic.name : "Quiz Page"}
                    </h1>
                    <form
                        className="w-full flex flex-col items-center lg:items-stretch"
                    >
                        <Progress className="my-5" value={(currentQuestionIndex/questions.length)*100} />
                        <div
                            className="w-3/4 lg:w-full text-center text-3xl py-10 bg-white font-medium text-gray-800 mb-6 select-none">
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
                        <div className="text-center text-md text-gray-800 font-bold mb-4 select-none">
                            {currentQuestion ? (
                                `Marks Available: ${Math.floor(questionMarks)}`
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
                        {currentQuestion && questionMarks==currentQuestion.marks ? (
                            <div className="w-3/4 lg:w-full bg-blue-300 text-white py-2 mt-2 rounded-md select-none">
                                <p className={"text-center"}>Skip Question</p>
                            </div>
                        ): (
                            <button
                                onClick={handleSkip}
                                className="text-center w-3/4 lg:w-full bg-blue-500 text-white py-2 mt-2 rounded-md hover:bg-blue-600"
                            >
                                Skip Question
                            </button>
                        )}
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