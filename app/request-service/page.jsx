import Navbar from '@/components/navbar/Navbar'
import RequestService from '@/components/patient/request-service/RequestService'
import React from 'react'

export default function page() {
  return (
    <div>
      <Navbar/>
      <RequestService/>
    </div>
  )
}
