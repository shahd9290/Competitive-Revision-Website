'use client'
import React, {useEffect, useState} from 'react'
import {useRouter} from 'next/navigation'
import axios from "axios";
/**
 * Registration page for creating a new Study App account.
 *
 * @author Danyal Shah
 */
const page = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [emailConfirm, setEmailConfirm] = useState('');
    const [password, setPassword] = useState('');
    const [qualificationInput, setQualificationInput] = useState('');
    const [qualifications, setQualifications] = useState([]);

    /**
     * Handles form submission for user registration.
     *
     * Validates email confirmation and qualification selection before sending
     * registration data to the backend.
     *
     * @param event - The form submission event.
     */
    const register = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        if (email !== emailConfirm) {
            alert("Please ensure you have entered the correct email address in both sections!");
        }
        else if (qualificationInput === "") {
            alert("Please select a qualification");
        }
        else {
            const payload = {
                "username": username, "email": email, "password": password, "qualification": qualificationInput
            }

            try {
                const response = await axios.post("http://localhost:8080/api/auth/register", payload);
                alert("Account created successfully.");
                router.push('/login')

            } catch (error: any) {
                if (error.response && error.response.data) {
                    alert(error.response.data || "An error occurred during registration.");
                } else {
                    alert("Unable to connect to server.");
                }
            }

        }

    }


    useEffect(() => {
        /**
         * Fetches available qualifications from the backend on component load.
         */
        const quals = async () => {
            const response = await axios.get("http://localhost:8080/api/qualification/get-all")
            return response.data;
        };

        quals().then(data => {
            setQualifications(data);
        })
    }, [])

    return (<>
        {/* This login form component was made available by TailwindCSS. It has been modified to reflect my designs for
          this project.
          
          Source: https://tailwindui.com/components/application-ui/forms/sign-in-forms */}
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className=" sm:mx-auto sm:w-full sm:max-w-lg bg-[#D9D9D9] py-10 rounded-3xl drop-shadow-2xl">

                <div className="sm:mx-auto sm:w-full sm:max-w-sm sm:">
                    <h2 className="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Create your new Study App account
                    </h2>
                </div>

                <form className="space-y-6 pt-5 sm:max-w-sm ml-auto mr-auto" onSubmit={register}>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                            Username
                        </label>
                        <div className="mt-2">
                            <input
                                id="username"
                                name="username"
                                type="username"
                                required
                                autoComplete="username"
                                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                onChange={event => setUsername(event.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email Address
                            </label>
                            <div className="text-sm">

                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                autoComplete="email"
                                className="block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                onChange={event => setEmail(event.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="emailConfirm"
                                   className="block text-sm font-medium leading-6 text-gray-900">
                                Confirm Email
                            </label>
                            <div className="text-sm">

                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                id="emailConfirm"
                                name="emailConfirm"
                                type="text"
                                required
                                className="block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                onChange={event => setEmailConfirm(event.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            <div className="text-sm">

                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                autoComplete="current-password"
                                className="block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                onChange={event => setPassword(event.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="qualification"
                                   className="block text-sm font-medium leading-6 text-gray-900">
                                Qualification
                            </label>
                            <div className="text-sm">

                            </div>
                        </div>
                        <div className="mt-2">
                            <select id="qualification"
                                    className="block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                    onChange={event => setQualificationInput(event.target.value)}
                            >
                                <option value="">Please select a qualification</option>
                                {qualifications.map((qualification) => (
                                    <option key={qualification.id} value={qualification.name}
                                    >
                                        {qualification.name}
                                    </option>))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                            Create account
                        </button>
                    </div>
                </form>

                <p className="mt-5 text-center text-sm text-gray-500">
                    <a href="/login" className="font-semibold text-blue-600 hover:text-blue-500">
                        Have an account already?
                    </a>
                </p>
            </div>
        </div>
    </>)
}

export default page