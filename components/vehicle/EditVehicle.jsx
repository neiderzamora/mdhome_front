"use client"; // Asegúrate de que esto esté presente

import React, { useState, useEffect } from "react";
import { toast } from "nextjs-toast-notify";
import "nextjs-toast-notify/dist/nextjs-toast-notify.css";

const EditVehicle = ({ vehicle, onEditVehicle }) => {
  const [formData, setFormData] = useState({
    plateNumber: "",
    color: "",
    brand: "",
  });

  // Efecto para cargar los datos del vehículo en el formulario
  useEffect(() => {
    if (vehicle) {
      setFormData({
        plateNumber: vehicle.plateNumber,
        color: vehicle.color,
        brand: vehicle.brand,
      });
    }
  }, [vehicle]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.plateNumber || !formData.color || !formData.brand) {
      toast.error("Por favor, complete todos los campos requeridos.", {
        position: "top-right",
        duration: 3000,
      });
      return;
    }

    // Aquí puedes agregar la lógica para enviar los datos a la API o manejar el formulario
    onEditVehicle({ ...vehicle, ...formData }); // Combina los datos del vehículo con los del formulario
    toast.success("Vehículo editado con éxito", {
      position: "top-right",
      duration: 3000,
    });

    // Resetear los datos del formulario
    setFormData({
      plateNumber: "",
      color: "",
      brand: "",
    });
  };

  if (!vehicle) {
    return <div>No se ha seleccionado un vehículo para editar.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 pt-44">
      <h1 className="text-4xl font-bold mb-4 text-primary-100">
        Editar Vehículo
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-lg font-medium text-primary-100">
            Número de Placa
          </label>
          <input
            type="text"
            name="plateNumber"
            value={formData.plateNumber}
            onChange={handleChange}
            placeholder="Ingrese el número de placa"
            className="border p-2 mt-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-primary-100"
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-primary-100">
            Color
          </label>
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
            placeholder="Ingrese el color del vehículo"
            className="border p-2 mt-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-primary-100"
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-primary-100">
            Marca
          </label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="Ingrese la marca del vehículo"
            className="border p-2 mt-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-primary-100"
          />
        </div>
        <button
          type="submit"
          className="bg-primary-100 text-white py-2 px-4 rounded"
        >
          Editar Vehículo
        </button>
      </form>
    </div>
  );
};

export default EditVehicle;
