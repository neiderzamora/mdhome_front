import Navbar from '@/components/navbar/Navbar'
import HomeDoctorService from '@/components/request-service/RequestService'
import React from 'react'

export default function page() {
  return (
    <div>
      <Navbar/>
      <HomeDoctorService/>
    </div>
  )
}
