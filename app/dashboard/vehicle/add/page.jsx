import Navbar from '@/components/navbar/Navbar'
import CreateVehicle from '@/components/vehicle/CreateVehicle'
import React from 'react'

export default function home() {
  return (
    <div>
      <Navbar/>
      <CreateVehicle/>
    </div>
  )
}
