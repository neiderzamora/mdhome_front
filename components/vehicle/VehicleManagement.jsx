"use client";

import React, { useState, useEffect } from "react";
import VehicleList from "./VehicleList";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation"; // Importa useRouter

const VehicleManagement = () => {
  const [vehicles, setVehicles] = useState([]);
  const router = useRouter(); // Inicializa useRouter

  useEffect(() => {
    const vehicles = [
      { id: 1, plateNumber: "ABC123", color: "Rojo", brand: "Toyota" },
      { id: 2, plateNumber: "DEF456", color: "Azul", brand: "Honda" },
      { id: 3, plateNumber: "GHI789", color: "Verde", brand: "Ford" },
      { id: 4, plateNumber: "GHI789", color: "Verde", brand: "Ford" },
    ];
    setVehicles(vehicles);
  }, []);

  const handleCreateVehicle = () => {
    router.push("./vehicle/add"); // Redirige a la página de creación de vehículos
  };

  const handleEditVehicle = (vehicleId) => {
    router.push(`./vehicle/${vehicleId}`); // Redirige a la página de edición del vehículo
  };

  const handleDeleteVehicle = (id) => {
    const updatedVehicles = vehicles.filter((v) => v.id !== id);
    setVehicles(updatedVehicles);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 mt-44">
      <div className="flex lg:justify-between mb-4 lg:mb-8">
        <h1 className="text-4xl font-bold text-primary-100 flex items-center">
          Gestión de Vehículos
        </h1>
        <button
          className="hidden bg-primary-100 text-white py-2 px-4 rounded lg:flex items-center"
          onClick={handleCreateVehicle}
        >
          <FaPlus className="mr-2" /> Agregar Vehículo
        </button>
      </div>
      <button
        className="bg-primary-100 text-white mb-8 py-2 px-4 rounded lg:hidden flex items-center"
        onClick={handleCreateVehicle}
      >
        <FaPlus className="mr-2" /> Agregar Vehículo
      </button>
      <VehicleList
        vehicles={vehicles}
        onEditVehicle={handleEditVehicle}
        onDeleteVehicle={handleDeleteVehicle}
      />
    </div>
  );
};

export default VehicleManagement;
