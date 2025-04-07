import { AuthForm } from "@/components/auth-form"

export default function RegisterPage() {
  return (
    <AuthForm
      type="register"
      title="Create an Account"
      description="Sign up to get started"
      apiEndpoint="/api/auth/register"
      redirectPath="/dashboard"
      additionalFields={[
        {
          name: "email",
          label: "Email",
          type: "email",
          required: true,
        },
        {
          name: "confirmPassword",
          label: "Confirm Password",
          type: "password",
          required: true,
        },
      ]}
    />
  )
}

