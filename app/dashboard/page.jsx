import DoctorDashboard from '@/components/doctor/dashboard/DoctorDashboard'
import Navbar from '@/components/navbar/Navbar'
import React from 'react'

export default function page() {
  return (
    <div>
      <Navbar/>
      <DoctorDashboard/>
    </div>
  )
}
