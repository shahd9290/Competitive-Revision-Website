import { AuthForm } from "@/components/auth-form"

/**
 * A page component for admin login.
 *
 * Displays a login form for administrators to sign in to the admin portal.
 * Upon successful authentication, the user is redirected to the admin dashboard.
 *
 * @returns The rendered admin login page component.
 * @author Danyal Shah
 */
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
