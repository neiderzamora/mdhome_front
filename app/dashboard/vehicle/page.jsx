import Navbar from '@/components/navbar/Navbar'
import CreateVehicle from '@/components/vehicle/CreateVehicle'
import VehicleManagement from '@/components/vehicle/VehicleManagement'
import React from 'react'

export default function home() {
  return (
    <div>
      <Navbar/>
      <VehicleManagement/>
      {/* <CreateVehicle/> */}
    </div>
  )
}
