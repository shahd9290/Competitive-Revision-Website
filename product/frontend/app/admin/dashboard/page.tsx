"use client"

import { useState, useEffect } from "react"
import { SidebarMenu } from "@/components/ui/SidebarMenu"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Users, GraduationCap, FileQuestion, ArrowRight, Layers, CheckCircle2 } from "lucide-react"
import axios from "axios";
import Link from "next/link";

/**
 * A dashboard component displaying user information and statistics.
 *
 * @author Danyal Shah
 */
const Dashboard = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const [stats, setStats] = useState<any[]>([]);
  const [activity, setActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${apiUrl}/api/admin/dashboard`, {withCredentials: true})
        setStats(response.data.dashboard)
        setActivity(response.data.logs)

        setLoading(false)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [apiUrl])

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <FileQuestion className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Questions</p>
                <h3 className="text-2xl font-bold">{loading ? "Loading..." : stats.totalQuestions}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Layers className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Topics</p>
                <h3 className="text-2xl font-bold">{loading ? "Loading..." : stats.totalTopics}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Subjects</p>
                <h3 className="text-2xl font-bold">{loading ? "Loading..." : stats.totalSubjects}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Qualifications</p>
                <h3 className="text-2xl font-bold">{loading ? "Loading..." : stats.totalQualifications}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <h3 className="text-2xl font-bold">{loading ? "Loading..." : stats.totalUsers}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Activity Log</CardTitle>
              <CardDescription>Recent changes made to the system</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="max-h-[45vh] overflow-y-auto">
            <div className="space-y-4">
              {loading ? "Loading..." : activity.map((item) => (
                <div key={item.id} className="flex items-start justify-between border-b pb-3 last:border-0">
                  <div className="flex flex-col">
                    <span className="font-medium">{item.action}</span>
                    <span className="text-sm text-muted-foreground">{item.target}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-medium">{item.user}</span>
                    <span className="text-xs text-muted-foreground">{item.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Attempts</CardTitle>
              <CardDescription>Latest question attempts by users</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="max-h-[45vh] overflow-y-auto">
            <div className="space-y-4">
              {loading ? "Loading..." : stats.recentAttempts.map((attempt) => (
                <div key={attempt.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                  <div className="flex flex-col">
                    <span className="font-medium">{attempt.user}</span>
                    <span className="text-sm text-muted-foreground">{attempt.topic}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{attempt.score}</div>
                      <div className="text-xs text-muted-foreground">{attempt.date}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Access */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Access</CardTitle>
          <CardDescription>Navigate to frequently used sections</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            <Button variant="outline" className="h-auto flex-col items-center justify-center gap-2 p-4" asChild>
              <Link href={"./questions"}>
                <FileQuestion className="h-6 w-6" />
                <span>Questions</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto flex-col items-center justify-center gap-2 p-4" asChild>
              <Link href={"./topics"}>
                <Layers className="h-6 w-6" />
                <span>Topics</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto flex-col items-center justify-center gap-2 p-4" asChild>
              <Link href={"./subjects"}>
                <BookOpen className="h-6 w-6" />
                <span>Subjects</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto flex-col items-center justify-center gap-2 p-4" asChild>
              <Link href={"./qualifications"}>
                <GraduationCap className="h-6 w-6" />
                <span>Qualifications</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto flex-col items-center justify-center gap-2 p-4" asChild>
              <Link href={"./users"}>
                <Users className="h-6 w-6" />
                <span>Users</span>
              </Link>

            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

/**
 * A wrapper component for the Dashboard with a sidebar menu.
 */
const Page = () => {
  return (
    <div>
      <SidebarMenu role="ROLE_ADMIN">
        <Dashboard />
      </SidebarMenu>
    </div>
  )
}

export default Page

