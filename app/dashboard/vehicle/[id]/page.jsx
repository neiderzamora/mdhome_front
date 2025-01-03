"use client";

import React from "react";
import EditVehicle from "@/components/vehicle/EditVehicle"; // Asegúrate de que la ruta sea correcta
import Navbar from "@/components/navbar/Navbar";

const VehicleEditPage = async ({ params }) => {
  const { id } = await params; // Asegúrate de usar await aquí

  // Aquí deberías cargar los datos del vehículo según el ID
  // Por ejemplo, podrías hacer una llamada a la API para obtener los datos del vehículo
  const vehicle = {
    id: id,
    plateNumber: "ABC123", // Simulación de datos
    color: "Rojo",
    brand: "Toyota",
  };

  const handleEditVehicle = (updatedVehicle) => {
    // Lógica para guardar el vehículo editado
    console.log(updatedVehicle);
  };

  return (
    <div>
      <Navbar />
      <h1 className="text-4xl font-bold mb-4">Editar Vehículo</h1>
      <EditVehicle vehicle={vehicle} onEditVehicle={handleEditVehicle} />
    </div>
  );
};

export default VehicleEditPage;
