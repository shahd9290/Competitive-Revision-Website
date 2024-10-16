'use client'
import React from 'react'
import { getCookie } from 'cookies-next';

import { useRouter } from 'next/navigation';


const page = () => {

  const router = useRouter();

  if (getCookie("token") === null) {
    router.push("/");
  }
  return (
    <div>Dashboard.</div>
  )
}

export default page