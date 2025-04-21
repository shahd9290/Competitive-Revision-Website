"use client"

import type React from "react"
import {useState} from "react"
import {useRouter} from "next/navigation"
import axios from "axios"
import {Eye, EyeOff, LockKeyhole, User} from "lucide-react"

import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {useToast} from "@/hooks/use-toast"
import {IconMail} from "@tabler/icons-react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"

interface AuthFormProps {
    type: "login" | "admin" | "register"
    title: string
    description: string
    apiEndpoint: string
    redirectPath: string
    additionalFields?: {
        name: string
        label: string
        type: string
        required?: boolean
        options?: { id: number; name: string }[]
    }[]
}

/**
 * A form for user authentication (login, registration, admin login).
 *
 * Handles form submission for logging in users, registering new users, and admin login.
 * Displays appropriate loading indicators, validates input fields, and provides feedback via toasts.
 * Can include additional fields like qualification for user registration.
 *
 * @param type - The type of form: "login", "admin", or "register".
 * @param title - The title of the form (e.g., "Sign In", "Sign Up").
 * @param description - A brief description displayed above the form (e.g., "Enter your credentials").
 * @param apiEndpoint - The API endpoint for form submission (e.g., "/api/auth/login").
 * @param redirectPath - Path to redirect to after successful submission.
 * @param additionalFields - Optional additional fields like qualifications for user registration.
 */
export function AuthForm({
                             type,
                             title,
                             description,
                             apiEndpoint,
                             redirectPath,
                             additionalFields = [],
                         }: AuthFormProps) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    const router = useRouter()
    const {toast} = useToast()
    const [formData, setFormData] = useState<Record<string, string>>({
        username: "",
        password: "",
    })
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormData((prev) => ({...prev, [name]: value}))
    }

    const handleSelectChange = (name: string, value: string) => {
        setFormData((prev) => ({...prev, [name]: value}))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        if (type === "register") {
            if (formData.qualification === undefined) {
                toast({
                    title: "Error!",
                    description: "Please select a qualification",
                    variant: "destructive",
                })
                setIsLoading(false);
                return
            }
            else if (formData.password !== formData.confirmPassword) {
                toast({
                    title: "Registration failed",
                    description: "Passwords do not match!",
                    variant: "destructive",
                })
                setIsLoading(false);
                return;
            }
        }

        const payload = {
            ...formData,
            role: type === "admin" ? "ROLE_ADMIN" : "ROLE_USER",
        }

        try {
            await axios.post(`${apiUrl}${apiEndpoint}`, payload, {withCredentials: true})

            toast({
                title: "Success!",
                description:
                    type === "register" ? "Your account has been created successfully." : "You have been logged in successfully.",
                variant: "success",
            })

            router.push(redirectPath)
        } catch (error: any) {
            if (error.response && error.response.data) {
                toast({
                    title: "Authentication failed",
                    description: error.response.data || "An error occurred during authentication.",
                    variant: "destructive",
                })
            } else {
                toast({
                    title: "Connection error",
                    description: "Unable to connect to server. Please try again later.",
                    variant: "destructive",
                })
            }
        } finally {
            setIsLoading(false)
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className="flex min-h-full items-center justify-center px-4 py-12">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">{title}</CardTitle>
                    <CardDescription className="text-center">{description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <div className="relative">
                                <Input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    autoComplete="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="pl-10"
                                    placeholder="Enter your username"
                                />
                                <User
                                    className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"/>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    autoComplete={type === "register" ? "new-password" : "current-password"}
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="pl-10 pr-10"
                                    placeholder="Enter your password"
                                />
                                <LockKeyhole
                                    className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"/>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4 text-muted-foreground"/>
                                    ) : (
                                        <Eye className="h-4 w-4 text-muted-foreground"/>
                                    )}
                                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                                </Button>
                            </div>
                        </div>

                        {additionalFields.map((field) => (
                            <div key={field.name} className="space-y-2">
                                <Label htmlFor={field.name}>{field.label}</Label>
                                <div className="relative">
                                    {field.type === "select" && field.options ? (
                                        <Select
                                            onValueChange={(value) => handleSelectChange(field.name, value)}
                                            defaultValue={formData[field.name] || ""}
                                            required
                                        >
                                            <SelectTrigger id={field.name}>
                                                <SelectValue placeholder={`Select ${field.label.toLowerCase()}`}/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {field.options.map((option) => (
                                                    <SelectItem key={option.id} value={option.name}>
                                                        {option.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    ) : (
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            type={field.type}
                                            required={field.required}
                                            value={formData[field.name] || ""}
                                            onChange={handleChange}
                                            className="pl-10"
                                            placeholder={field.type === "password" ? "Confirm your password" : `Enter your ${field.label.toLowerCase()}`}
                                        />)}
                                    {field.type !== "select" && (
                                        field.type === "password" ? (
                                            <LockKeyhole
                                                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"/>
                                        ) : (
                                            <IconMail
                                                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"/>
                                        )
                                    )}
                                </div>
                            </div>
                        ))}

                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? "Processing..." : type === "register" ? "Sign Up" : "Sign In"}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4 border-t p-6">
                    {type === "login" && (
                        <>
                            <div className="flex justify-center w-full text-sm">
                                <Button variant="outline" className="w-full px-0 h-auto"
                                        onClick={() => router.push("/create")}>
                                    Create Account
                                </Button>
                            </div>
                            <Button variant="outline" className="w-full" onClick={() => router.push("/admin/login")}>
                                Admin Login
                            </Button>
                        </>
                    )}

                    {type === "admin" && (
                        <Button variant="outline" className="w-full" onClick={() => router.push("/login")}>
                            Student Login
                        </Button>
                    )}

                    {type === "register" && (
                        <Button variant="outline" className="w-full" onClick={() => router.push("/login")}>
                            Already have an account? Sign in
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    )
}

