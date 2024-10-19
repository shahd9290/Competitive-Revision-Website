'use client'
import React, { useEffect, useState } from 'react'

import axiosInstance from '../lib/axiosInstance';


const page = () => {

  useEffect(() => {
    axiosInstance.get('http://localhost:8080/api/user/profile')
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }, [])

  return (
    <div>Dashboard.</div>
  )
}

export default page