"use client";

import React, { useState } from 'react';
import { toast } from 'nextjs-toast-notify';
import { createVehicle } from '@/api/service_api';
import "nextjs-toast-notify/dist/nextjs-toast-notify.css";

const CreateVehicle = ({ onCreateVehicle, onCancel }) => {
  const [formData, setFormData] = useState({
    plate: '',
    color: '',
    brand: '',
  });

  const [errors, setErrors] = useState({});

  const showSuccessToast = (message) => {
    toast.success(message, {
      position: "top-right",
      duration: 3000,
    });
  };

  const showErrorToast = (message) => {
    toast.error(message, {
      position: "top-right",
      duration: 3000,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
    // Clear the error for the field being edited
    setErrors(prevErrors => ({ ...prevErrors, [name]: [] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newVehicle = await createVehicle(formData);
      onCreateVehicle(newVehicle);
      showSuccessToast("Vehículo creado con éxito.");
      setFormData({ plate: '', color: '', brand: '' });
      setErrors({});
    } catch (error) {
      if (error.response && error.response.data) {
        const serverErrors = error.response.data;
        const formattedErrors = {};
        const messages = [];

        // Formatear los errores por campo
        Object.keys(serverErrors).forEach(field => {
          formattedErrors[field] = serverErrors[field];
          messages.push(...serverErrors[field]);
        });

        setErrors(formattedErrors);
      } else {
        showErrorToast("Error al crear el vehículo.");
      }
      console.error("Error en handleSubmit:", error);
    }
  };

  const fields = [
    { name: 'plate', label: 'Número de Placa', placeholder: 'Ingrese el número de placa' },
    { name: 'color', label: 'Color', placeholder: 'Ingrese el color del vehículo' },
    { name: 'brand', label: 'Marca', placeholder: 'Ingrese la marca del vehículo' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-4 text-primary-100">Agregar Nuevo Vehículo</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {fields.map((field) => (
          <div key={field.name}>
            <label className="block text-lg font-medium text-primary-100">
              {field.label}
            </label>
            <input
              type="text"
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              className={`border p-2 mt-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-primary-100 ${errors[field.name] ? 'border-red-500' : ''}`}
              required
            />
            {errors[field.name] && (
              <p className="text-red-500 text-sm mt-1">{errors[field.name].join(' ')}</p>
            )}
          </div>
        ))}
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-primary-100 text-white px-4 py-2 rounded hover:bg-primary-200"
          >
            Crear Vehículo
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateVehicle;