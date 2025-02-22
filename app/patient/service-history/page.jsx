import Navbar from '@/components/navbar/Navbar'
import ServiceHistory from '@/components/patient/service-history/ServiceHistory'
import React from 'react'

export default function PatientHistoryPage() {
  return (
    <div>
      <Navbar/>
      <ServiceHistory/>
    </div>
  )
}