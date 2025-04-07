import { AuthForm } from "@/components/auth-form"

export default function LoginPage() {
  return (
    <AuthForm
      type="login"
      title="Welcome Back"
      description="Sign in to your account to continue"
      apiEndpoint="/api/auth/login"
      redirectPath="/dashboard"
    />
  )
}

