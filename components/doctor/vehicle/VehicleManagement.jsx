"use client";

import React, { useState, useEffect } from "react";
import VehicleList from "./VehicleList";
import CreateVehicle from "./CreateVehicle";
import EditVehicle from "./EditVehicle";
import DeleteVehicle from "./DeleteVehicle";
import { fetchVehicles } from "@/api/service_api";
import { FaPlus } from "react-icons/fa";
import "nextjs-toast-notify/dist/nextjs-toast-notify.css";

const VehicleManagement = () => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const getVehicles = async () => {
      try {
        const data = await fetchVehicles();
        setVehicles(data);
      } catch (error) {
        console.error("Error al obtener los vehículos:", error);
      }
    };
    getVehicles();
  }, []);

  const handleCreateVehicle = (newVehicle) => {
    setVehicles([...vehicles, newVehicle]);
    setIsCreating(false);
  };

  const handleEditVehicle = (updateVehicle) => {
    setVehicles(
      vehicles.map((v) => (v.id === updateVehicle.id ? updateVehicle : v))
    );
    setIsEditing(false);
    setSelectedVehicle(null);
  };

  const handleDeleteVehicle = (id) => {
    setVehicles(vehicles.filter((v) => v.id !== id));
    setSelectedVehicle(null);
    setIsDeleting(false);
  };

  const handleSelectVehicle = (vehicle, action) => {
    setSelectedVehicle(vehicle);
    if (action === "edit") {
      setIsEditing(true);
      setIsDeleting(false);
      setIsCreating(false);
    } else if (action === "delete") {
      setIsDeleting(true);
      setIsEditing(false);
      setIsCreating(false);
    }
  };

  const handleAddVehicleClick = () => {
    setIsCreating(true);
    setSelectedVehicle(null);
    setIsEditing(false);
    setIsDeleting(false);
  };

  const handleCancel = () => {
    setIsCreating(false);
    setIsEditing(false);
    setIsDeleting(false);
    setSelectedVehicle(null);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 mt-36 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex lg:justify-between mb-4">
          <h1 className="text-4xl font-bold text-primary-100 flex items-center">
            Gestión de Vehículos
          </h1>
          <button
            className="hidden bg-primary-100 text-white py-2 px-4 rounded lg:flex items-center"
            onClick={handleAddVehicleClick}
          >
            <FaPlus className="mr-2" /> Agregar Vehículo
          </button>
        </div>

        {/* Botón de Agregar Vehículo para pantallas pequeñas */}
        <div className="flex lg:hidden justify-start mb-6">
          <button
            onClick={handleAddVehicleClick}
            className="bg-primary-100 text-white py-2 px-4 rounded flex items-center"
          >
            <FaPlus className="mr-2" /> Agregar Vehículo
          </button>
        </div>

        <VehicleList
          vehicles={vehicles}
          onEditVehicle={(vehicle) => handleSelectVehicle(vehicle, "edit")}
          onDeleteVehicle={(vehicle) => handleSelectVehicle(vehicle, "delete")}
        />

        {/* Formulario de Creación */}
        {isCreating && (
          <div className="mt-8">
            <CreateVehicle
              onCreateVehicle={handleCreateVehicle}
              onCancel={handleCancel}
            />
          </div>
        )}

        {/* Formulario de Edición */}
        {isEditing && selectedVehicle && (
          <div className="mt-8">
            <EditVehicle
              vehicle={selectedVehicle}
              onEditVehicle={handleEditVehicle}
              onCancel={handleCancel}
            />
          </div>
        )}

        {/* Confirmación de Eliminación */}
        {isDeleting && selectedVehicle && (
          <div className="mt-8">
            <DeleteVehicle
              vehicle={selectedVehicle}
              onDeleteVehicle={handleDeleteVehicle}
              onCancel={handleCancel}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleManagement;
