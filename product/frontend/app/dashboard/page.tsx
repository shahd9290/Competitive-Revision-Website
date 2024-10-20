'use client'
import React, {useEffect} from 'react'
import axios from "axios";

const Page = () => {

    useEffect(() => {

        const profile = async () => {
            const response = await axios.get("http://localhost:8080/api/user/profile", {withCredentials: true})
            return response.data;
        };

        profile().then(data => {
            console.log(data.username);
            console.log(data.email);
        })
    }, [])

    return (
        <div>Dashboard.</div>
    )
}

export default Page