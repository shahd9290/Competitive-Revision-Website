"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { BookOpen, Loader2 } from "lucide-react"

import { SubjectGrid } from "@/components/subject-grid"
import { DashboardShell } from "@/components/dashboard-shell"

/**
 * Main page component that displays subjects and topics based on user qualification
 */
export default function SubjectsPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const [subjects, setSubjects] = useState([])
  const [userQual, setUserQual] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    /**
     * Fetches the user's qualification on component load.
     */
    const fetchQualification = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/user/get-qualification`, {
          withCredentials: true,
        })
        setUserQual(response.data.name)
      } catch (error) {
        console.error("Error fetching qualification:", error)
      }
    }

    fetchQualification()
  }, [apiUrl])

  useEffect(() => {
    /**
     * Fetches subjects associated with the user's qualification.
     */
    if (!userQual) return

    const fetchSubjects = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get(`${apiUrl}/api/subject/get-all?qualification=${userQual}`, {
          withCredentials: true,
        })
        setSubjects(response.data)
      } catch (error) {
        console.error("Error fetching subjects:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSubjects()
  }, [userQual, apiUrl])

  return (
      <DashboardShell>
        {/*<div className="flex flex-col gap-6 px-4 md:px-6 py-8">*/}
        <div className="flex flex-col flex-1 justify-center min-h-[calc(100vh-100px)] gap-6 px-4 md:px-6 py-8">
          {isLoading ? (
              <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary"/>
                <p className="text-muted-foreground">Loading subjects...</p>
              </div>
          ) : subjects.length > 0 ? (
              <SubjectGrid subjects={subjects}/>
          ) : (
              <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 border rounded-lg p-8 bg-white">
                <BookOpen className="h-12 w-12 text-muted-foreground"/>
                <h3 className="text-xl font-medium">No subjects found</h3>
                <p className="text-muted-foreground text-center max-w-md">
                  We couldn't find any subjects for your qualification. Please contact your administrator if you believe
                  this is an error.
                </p>
              </div>
          )}
        </div>
      </DashboardShell>
  )
}

