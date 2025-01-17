"use client";

import React, { useState, useEffect } from "react";
import { toast } from "nextjs-toast-notify";
import { updateAddress } from "@/api/service_api";
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

const EditAddress = ({ address, onEditAddress, onCancel }) => {
  const [formData, setFormData] = useState({
    line_address: "",
    neighborhood: "",
    city: "VILLAVICENCIO",
    department: "META",
    description: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (address) {
      setFormData({
        line_address: address.line_address,
        neighborhood: address.neighborhood,
        city: address.city,
        department: address.department,
        description: address.description,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedAddress = await updateAddress(address.id, formData);
      onEditAddress(updatedAddress);
      showSuccessToast("Dirección editada con éxito.");
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
        showErrorToast("Error al actualizar la dirección.");
      }
      console.error("Error al actualizar dirección:", error);
    }
  };

  if (!address) {
    return <div>No se ha seleccionado una dirección para editar.</div>;
  }

  const addressFields = [
    { name: "department", label: "Departamento", placeholder: "Departamento", disabled: true },
    { name: "city", label: "Ciudad", placeholder: "Ciudad", disabled: true },
    { name: "neighborhood", label: "Barrio", placeholder: "Ingrese el barrio" },
    { name: "line_address", label: "Línea de Dirección", placeholder: "Ingrese la línea de dirección" },
    { name: "description", label: "Descripción", placeholder: "Ingrese una descripción" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-4 text-primary-100">Editar Dirección</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {addressFields.map((field) => (
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

export default EditAddress;