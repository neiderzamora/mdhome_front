import Navbar from '@/components/navbar/Navbar'
import ServiceHistory from '@/components/doctor/service-history/ServiceHistory'
import React from 'react'

export default function Home() {
  return (
    <div>
      <Navbar/>
      <ServiceHistory/>
    </div>
  )
}
