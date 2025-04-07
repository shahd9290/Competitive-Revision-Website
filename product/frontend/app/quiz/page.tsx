"use client"
import { SidebarMenu } from "@/components/ui/SidebarMenu"
import { useRouter } from "next/navigation"
import type React from "react"
import { useEffect, useState } from "react"
import axios from "axios"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle, SkipForward } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface SearchParams {
    id?: string;
}

const Quiz = ({ searchParams }: { searchParams: SearchParams }) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const [questions, setQuestions] = useState<Question[]>([])
  const [topic, setTopic] = useState<Topic | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswer, setUserAnswer] = useState("")
  const [isCompleted, setIsCompleted] = useState(false)
  const [questionMarks, setQuestionMarks] = useState(0)
  const [totalMarks, setTotalMarks] = useState(0)
  const [userMarks, setUserMarks] = useState(0)
  const [questionTotal, setQuestionTotal] = useState(0)
  const [error, setError] = useState("")
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const router = useRouter()
  const { id } = searchParams

  useEffect(() => {
    const getTopic = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/topic/get?topicId=${id}`, { withCredentials: true })
        setTopic(response.data)
      } catch (error: any) {
        setTopic(null)
      }
    }

    getTopic()
  }, [apiUrl, id])

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/question/get?topicId=${id}`, { withCredentials: true })
        setQuestions(response.data.questions)
        setQuestionTotal(response.data.totalMarks)
      } catch (error: any) {
        setError(error.response?.data || "Failed to load questions")
        setTimeout(() => {
          router.push("/subjects")
        }, 3000)
      }
    }

    if (topic) {
      getQuestions()
    }
  }, [topic, apiUrl, id, router])

  const currentQuestion = questions[currentQuestionIndex]

  useEffect(() => {
    if (currentQuestion) {
      setQuestionMarks(currentQuestion.marks)
    }
  }, [currentQuestion])

  useEffect(() => {
    if (isCompleted) {
      const saveMarks = async () => {
        const payload = {
          marks: totalMarks,
          topicId: id,
          proportion: totalMarks / questionTotal,
        }
        try {
          const response = await axios.post(`${apiUrl}/api/user/save-marks`, payload, { withCredentials: true })
          setUserMarks(response.data)
        } catch (error) {
          setError("Failed to save marks")
        }
      }

      saveMarks()
    }
  }, [isCompleted, totalMarks, apiUrl, id, questionTotal])

  const nextQuestion = (marks = questionMarks) => {
    setTotalMarks(Math.floor(totalMarks + marks))
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setUserAnswer("")
      setIsCorrect(null)
    } else {
      setIsCompleted(true)
    }
  }

  const handleSkip = (event: React.MouseEvent) => {
    event.preventDefault()
    nextQuestion(0)
  }

  const handleAnswerSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (questions.length === 0) return

    if (userAnswer === "") {
      setError("Please enter an answer")
      return
    }

    setError("")

    if (userAnswer.trim() === currentQuestion.answer) {
      setIsCorrect(true)
      setTimeout(() => {
        nextQuestion()
      }, 1000)
    } else {
      setIsCorrect(false)
      if (Math.abs(currentQuestion.marks * 0.81 - questionMarks) > 0.0001) {
        setQuestionMarks(questionMarks * 0.9)
      }
    }
  }

  if (isCompleted) {
    return (
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <Card className="sm:mx-auto sm:w-full sm:max-w-lg">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
              Quiz Completed!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg text-center space-y-2">
              <p className="text-lg font-medium">Marks Earned</p>
              <p className="text-3xl font-bold text-green-600">{totalMarks}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg text-center space-y-2">
              <p className="text-lg font-medium">Your Total Marks</p>
              <p className="text-3xl font-bold text-slate-600">{userMarks}</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button asChild className="w-full">
              <Link href="/subjects">Return to Subjects Page</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <Card className="sm:mx-auto sm:w-full sm:max-w-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl">{topic ? topic.name : "Quiz Page"}</CardTitle>
          <Progress className="h-2 w-full" value={(currentQuestionIndex / questions.length) * 100} />
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleAnswerSubmit} className="space-y-6">
            <div className="bg-slate-50 p-6 rounded-lg text-center min-h-[150px] flex items-center justify-center">
              <h2 className="text-3xl font-medium text-slate-800 select-none">
                {currentQuestion ? currentQuestion.question : "Loading question..."}
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label htmlFor="answer" className="text-sm font-medium">
                  Your Answer
                </label>
                <Badge variant={isCorrect === true ? "success" : isCorrect === false ? "destructive" : "outline"}>
                  {isCorrect === true ? "Correct!" : isCorrect === false ? "Incorrect" : "Marks Available"}:{" "}
                  {Math.floor(questionMarks)}
                </Badge>
              </div>

              <Input
                id="answer"
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Enter your answer"
                className={`${isCorrect === true ? "border-green-500" : isCorrect === false ? "border-red-500" : ""}`}
              />

              <div className="flex flex-col gap-2">
                <Button type="submit" className="w-full">
                  Submit Answer
                </Button>

                <Button
                  type="button"
                  variant={questionMarks === currentQuestion?.marks ? "secondary" : "default"}
                  onClick={handleSkip}
                  className="w-full"
                  disabled={isCorrect !== false}
                >
                  <SkipForward className="h-4 w-4 mr-2" />
                  Skip Question
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm text-muted-foreground">
          Question {currentQuestionIndex + 1} of {questions.length}
        </CardFooter>
      </Card>
    </div>
  )
}


/**
 * A wrapper component for the `Quiz` component with a sidebar menu.
 */
const Page = ({searchParams}: { searchParams: SearchParams }) => {

    return (
        <div>
            <SidebarMenu role="ROLE_USER">
                <Quiz searchParams={searchParams}/>
            </SidebarMenu>
        </div>
    )
}

export default Page