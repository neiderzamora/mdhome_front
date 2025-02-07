"use client";

import React, { useState, useEffect } from "react";
import { toast } from "nextjs-toast-notify";
import { updateAddress } from "@/api/service_api";
import "nextjs-toast-notify/dist/nextjs-toast-notify.css";
import LocationMap from "@/components/geolocation/LocationMap";

const EditAddress = ({ address, onEditAddress, onCancel }) => {
  const [formData, setFormData] = useState({
    line_address: "",
    neighborhood: "",
    city: "VILLAVICENCIO",
    department: "META",
    description: "",
    latitude: "",
    longitude: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (address) {
      setFormData({
        line_address: address.line_address,
        neighborhood: address.neighborhood,
        city: address.city || "VILLAVICENCIO",
        department: address.department || "META",
        description: address.description,
        // Initialize latitude and longitude if available; otherwise default values.
        latitude: address.latitude,
        longitude: address.longitude,
      });
    }
  }, [address]);

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

  // Callback from the LocationMap to update latitude and longitude.
  const handleLocationSelect = (loc) => {
    console.log("location:", loc)
    setFormData((prevData) => ({
      ...prevData,
      latitude: loc.latitude,
      longitude: loc.longitude,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedAddress = await updateAddress(address.id, formData);
      onEditAddress(updatedAddress);
      showSuccessToast("Dirección actualizada con éxito.");
    } catch (error) {
      if (error.response && error.response.data) {
        const serverErrors = error.response.data;
        const formattedErrors = {};
        Object.keys(serverErrors).forEach((field) => {
          formattedErrors[field] = serverErrors[field];
        });
        setErrors(formattedErrors);
      } else {
        showErrorToast("Error al actualizar la dirección.");
      }
      console.error("Error al actualizar dirección:", error);
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
        Editar Dirección
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
              value={formData[field.name]}
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
            Selecciona la ubicación en el mapa para editar la latitud y
            longitud:
          </p>
          <LocationMap
            initialPosition={[
              formData.latitude || 4.142,
              formData.longitude || -73.626,
            ]}
            onLocationSelect={handleLocationSelect}
          />
          <p>
            {formData.latitude && formData.longitude
              ? `Latitud: ${formData.latitude}, Longitud: ${formData.longitude}`
              : "No se ha seleccionado ninguna ubicación."}
          </p>
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-primary-100 text-white px-4 py-2 rounded hover:bg-primary-200"
          >
            Actualizar Dirección
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

export default EditAddress;
