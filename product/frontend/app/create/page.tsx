"use client"
import {AuthForm} from "@/components/auth-form"
import {useEffect, useState} from "react";
import axios from "axios";

export default function RegisterPage() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    const [qualifications, setQualifications] = useState([]);

     useEffect(() => {
        /**
         * Fetches available qualifications from the backend on component load.
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
            redirectPath="/dashboard"
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

