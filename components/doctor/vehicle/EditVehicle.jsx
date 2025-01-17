"use client";

import React, { useState, useEffect } from "react";
import { toast } from "nextjs-toast-notify";
import { updateVehicle } from "@/api/service_api";
import "nextjs-toast-notify/dist/nextjs-toast-notify.css";

// Reusable FormField Component
const FormField = ({ field, value, onChange, error }) => {
  const { name, label, placeholder, type = "text", disabled = false } = field;

  return (
    <div>
      <label className="block text-lg font-medium text-primary-100">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`border p-2 mt-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-primary-100 ${
          error ? "border-red-500" : ""
        }`}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">{error.join(" ")}</p>
      )}
    </div>
  );
};

const EditVehicle = ({ vehicle, onEditVehicle, onCancel }) => {
  const [formData, setFormData] = useState({
    plate: "",
    color: "",
    brand: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (vehicle) {
      setFormData({
        plate: vehicle.plate,
        color: vehicle.color,
        brand: vehicle.brand,
      });
    }
  }, [vehicle]);

  const showSuccessToast = (message) => {
    toast.success(message, {
      position: "top-center",
      duration: 3000,
    });
  };

  const showErrorToast = (message) => {
    toast.error(message, {
      position: "top-center",
      duration: 3000,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    // Clear the error for the field being edited
    setErrors((prevErrors) => ({ ...prevErrors, [name]: [] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedVehicle = await updateVehicle(vehicle.id, formData);
      onEditVehicle(updatedVehicle);
      showSuccessToast("Vehículo actualizado con éxito.");
      setErrors({});
    } catch (error) {
      if (error.response && error.response.data) {
        const serverErrors = error.response.data;
        const formattedErrors = {};
        const messages = [];

        // Formatear los errores por campo
        Object.keys(serverErrors).forEach((field) => {
          formattedErrors[field] = serverErrors[field];
          messages.push(...serverErrors[field]);
        });

        setErrors(formattedErrors);
      } else {
        showErrorToast("Error al actualizar el vehículo.");
      }
      console.error("Error en handleSubmit:", error);
    }
  };

  if (!vehicle) {
    return <div>No se ha seleccionado un vehículo para editar.</div>;
  }

  const vehicleFields = [
    { name: "plate", label: "Número de Placa", placeholder: "Ingrese el número de placa" },
    { name: "color", label: "Color", placeholder: "Ingrese el color del vehículo" },
    { name: "brand", label: "Marca", placeholder: "Ingrese la marca del vehículo" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-4 text-primary-100">Editar Vehículo</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {vehicleFields.map((field) => (
          <FormField
            key={field.name}
            field={field}
            value={formData[field.name]}
            onChange={handleChange}
            error={errors[field.name]}
          />
        ))}
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-primary-100 text-white py-2 px-4 rounded shadow-lg hover:bg-primary-200 transition duration-300"
          >
            Guardar Cambios
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white py-2 px-4 rounded shadow-lg hover:bg-gray-600 transition duration-300"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditVehicle;