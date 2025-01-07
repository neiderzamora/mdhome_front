import Navbar from '@/components/navbar/Navbar'
import VehicleManagement from '@/components/vehicle/VehicleManagement'
import React from 'react'

export default function home() {
  return (
    <div>
      <Navbar/>
      <VehicleManagement/>
    </div>
  )
}
