"use client"
import {AuthForm} from "@/components/auth-form"
import {useEffect, useState} from "react";
import axios from "axios";

/**
 * A registration page component for creating a new account.
 *
 * Fetches available qualifications from the backend and passes them as options
 * in the registration form. The form includes fields for the username, password,
 * email, confirmation password, and qualification. Upon successful registration,
 * the user is redirected to the login page.
 *
 * @returns The rendered registration page component with the authentication form.
 * @author Danyal Shah
 */
export default function RegisterPage() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    const [qualifications, setQualifications] = useState([]);

    useEffect(() => {
        /**
         * Fetches available qualifications from the backend on component load.
         * The fetched qualifications are then used as options for the qualification select field.
         */
        const quals = async () => {
            const response = await axios.get(`${apiUrl}/api/qualification/get-all`)
            return response.data;
        };

        quals().then(data => {
            setQualifications(data);
        })
    }, [])

    return (
        <AuthForm
            type="register"
            title="Create an Account"
            description="Sign up to get started"
            apiEndpoint="/api/auth/register"
            redirectPath="/login"
            additionalFields={[
                {
                    name: "confirmPassword",
                    label: "Confirm Password",
                    type: "password",
                    required: true,
                },
                {
                    name: "email",
                    label: "Email",
                    type: "email",
                    required: true,
                },
                {
                  name: "qualification",
                  label: "Qualification",
                  type: "select",
                  required: true,
                  options: qualifications,
                },
            ]}
        />
    )
}
