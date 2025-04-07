import { AuthForm } from "@/components/auth-form"

export default function AdminLoginPage() {
  return (
    <AuthForm
      type="admin"
      title="Admin Portal"
      description="Sign in to your admin account"
      apiEndpoint="/api/auth/login"
      redirectPath="/admin/dashboard"
    />
  )
}

