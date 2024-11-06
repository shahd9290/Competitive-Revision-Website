'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const page = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async (event: { preventDefault: () => void; }) =>  {
    event.preventDefault();
    
    const payload = {
      "username":username,
      "password":password
    }

    try {
      const login_confirm = await axios.post("http://localhost:8080/api/auth/login", payload, {withCredentials: true});
      if (login_confirm) {
        router.push('/dashboard')
      }
    }catch{
      alert("Invalid Credentials");
    }

  }

    return (
        <>
          {/* This login form component was made available by TailwindCSS. It has been modified to reflect my designs for
          this project.
          
          Source: https://tailwindui.com/components/application-ui/forms/sign-in-forms */}
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className=" sm:mx-auto sm:w-full sm:max-w-lg bg-[#D9D9D9] py-10 rounded-3xl drop-shadow-2xl">
                
                <div className="sm:mx-auto sm:w-full sm:max-w-sm sm:">
                    <h2 className="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>
                
              <form className="space-y-6 pt-5 sm:max-w-sm ml-auto mr-auto" onSubmit={login}>
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
                      onChange={event=>setUsername(event.target.value)}
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
                      onChange={event=>setPassword(event.target.value)}
                    />
                  </div>
                </div>
    
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    Sign in
                  </button>
                </div>
              </form>
    
              <p className="mt-5 text-center text-sm text-gray-500">
                <a href="/forgot" className="font-semibold text-blue-600 hover:text-blue-500">
                    Forgot password?
                </a>
                <br/><br/>
                <a href="/create" className="font-semibold text-blue-600 hover:text-blue-500">
                   Don't have an account?
                </a>
              </p>
            </div>
          </div>
        </>
      )
}

export default page