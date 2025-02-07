"use client";

import React, { useState } from "react";
import { toast } from "nextjs-toast-notify";
import { createAddress } from "@/api/service_api";
import "nextjs-toast-notify/dist/nextjs-toast-notify.css";
import LocationMap from "@/components/geolocation/LocationMap";

const AddAddress = ({ onAddAddress, onCancel }) => {
  const [address, setAddress] = useState({
    department: "META",
    city: "VILLAVICENCIO",
    line_address: "",
    neighborhood: "",
    description: "",
    latitude: 0,
    longitude: 0,
  });

  const [errors, setErrors] = useState({});

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
    setAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
    // Limpiar el error para el campo que se está editando
    setErrors((prevErrors) => ({ ...prevErrors, [name]: [] }));
  };

  const handleLocationSelect = (loc) => {
    setAddress((prevAddress) => ({
      ...prevAddress,
      latitude: loc.latitude,
      longitude: loc.longitude,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newAddress = await createAddress(address);
      onAddAddress(newAddress);
      showSuccessToast("Dirección creada con éxito.");
      setAddress({
        department: "META",
        city: "VILLAVICENCIO",
        line_address: "",
        neighborhood: "",
        description: "",
        latitude: 0,
        longitude: 0,
      });
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
        showErrorToast("Error al crear la dirección.");
      }
      console.error("Error al crear dirección:", error);
    }
  };

  const addressFields = [
    { name: "department", placeholder: "Departamento", disabled: true },
    { name: "city", placeholder: "Ciudad", disabled: true },
    { name: "neighborhood", placeholder: "Barrio" },
    { name: "line_address", placeholder: "Línea de Dirección" },
    { name: "description", placeholder: "Descripción" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4 text-primary-100">
        Agregar Nueva Dirección
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {addressFields.map((field) => (
          <div key={field.name}>
            <label className="block text-lg font-medium text-primary-100">
              {field.placeholder}
            </label>
            <input
              type="text"
              name={field.name}
              value={address[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              disabled={field.disabled}
              className={`border p-2 mt-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-primary-100 ${
                errors[field.name] ? "border-red-500" : ""
              }`}
            />
            {errors[field.name] && (
              <p className="text-red-500 text-sm mt-1">
                {errors[field.name].join(" ")}
              </p>
            )}
          </div>
        ))}

        <div>
          <p>
            Selecciona la ubicación en el mapa para obtener la latitud y
            longitud:
          </p>
          <LocationMap
            initialPosition={[
              address.latitude || 4.142,
              address.longitude || -73.626,
            ]}
            onLocationSelect={handleLocationSelect}
          />
          <p>
            {address.latitude && address.longitude
              ? `Latitud: ${address.latitude.toFixed(
                  8
                )}, Longitud: ${address.longitude.toFixed(8)}`
              : "No se ha seleccionado ninguna ubicación."}
          </p>
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-primary-100 text-white px-4 py-2 rounded hover:bg-primary-200"
          >
            Crear Dirección
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

export default AddAddress;
