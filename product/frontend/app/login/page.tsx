import { AuthForm } from "@/components/auth-form"

/**
 * A page component that renders the login form for user authentication.
 *
 * This component allows users to sign in to their existing account.
 * It includes the login form where the user can provide their credentials
 * to authenticate and access their dashboard.
 *
 * @returns The rendered login form component.
 * @author Danyal Shah
 */
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
