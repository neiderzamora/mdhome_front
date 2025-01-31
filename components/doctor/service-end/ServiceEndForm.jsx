"use client";

import React, { useState } from "react";
import { toast } from "nextjs-toast-notify";
import { useRouter } from "next/navigation";
import { completeServiceRequest, getCIE10Codes } from "@/api/service_api";
import Select from "react-select";
import "nextjs-toast-notify/dist/nextjs-toast-notify.css";

const InputField = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  name,
  isTextArea,
}) => (
  <div className="mb-4">
    <label className="block text-lg font-medium text-primary-100 mb-2">
      {label}
    </label>
    {isTextArea ? (
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-primary-100 resize-none"
        name={name}
        rows={3}
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-primary-100"
        name={name}
      />
    )}
  </div>
);

const customSelectStyles = {
  control: (provided) => ({
    ...provided,
    borderColor: "#3b82f6", // primary-600
    boxShadow: "none",
    "&:hover": {
      borderColor: "#2563eb", // primary-700
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#bfdbfe" : "white",
    color: "black",
    cursor: "pointer",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "black",
  }),
};

const ServiceEndForm = ({ requestId }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    cie10_code_id: null,
    inability: "",
    inability_days: "",
    observations: "",
    cie10_description: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCie10Change = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      cie10_code_id: selectedOption ? selectedOption.value : null,
      cie10_description: selectedOption
        ? selectedOption.label.split(" - ")[1]
        : "",
    }));
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      toast.error("Por favor, ingresa un término de búsqueda.", {
        position: "top-right",
        duration: 3000,
      });
      return;
    }

    setLoading(true);
    try {
      const data = await getCIE10Codes(searchTerm, searchTerm, 1);
      const formattedOptions = data.results.map((code) => ({
        value: code.id,
        label: `${code.code} - ${code.description}`,
      }));
      setOptions(formattedOptions);
      setLoading(false);
    } catch (error) {
      console.error("Error al cargar los códigos CIE10:", error);
      toast.error("Error al cargar los códigos CIE10.", {
        position: "top-right",
        duration: 3000,
      });
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form Data Antes del Envío:", formData);

    if (
      !formData.cie10_code_id ||
      !formData.inability ||
      !formData.inability_days
    ) {
      toast.error("Por favor, completa todos los campos obligatorios.", {
        position: "top-right",
        duration: 3000,
      });
      return;
    }

    try {
      const payload = {
        cie10_code_id: formData.cie10_code_id, // Cambio aquí
        inability: formData.inability,
        inability_days: parseInt(formData.inability_days, 10),
        observations: formData.observations,
        service_request: requestId,
      };

      console.log("Payload Enviado:", payload);

      const response = await completeServiceRequest(requestId, payload);

      toast.success(response.message || "Servicio finalizado con éxito", {
        position: "top-right",
        duration: 3000,
      });

      // Redireccionar al dashboard después de completar
      router.push("/dashboard");
    } catch (error) {
      if (error.response && error.response.data) {
        Object.keys(error.response.data).forEach((key) => {
          error.response.data[key].forEach((msg) => {
            toast.error(`${key}: ${msg}`, {
              position: "top-right",
              duration: 3000,
            });
          });
        });
      } else {
        toast.error("Error al finalizar el servicio.", {
          position: "top-right",
          duration: 3000,
        });
      }
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 pt-44">
      <h1 className="text-4xl font-bold mb-4 text-primary-100">
        Finalizar Servicio
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Campo de Búsqueda */}
        <div className="mb-4">
          <label className="block text-lg font-medium text-primary-100 mb-2">
            Buscar Código CIE10
          </label>
          <div className="flex">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Ingresa un código o descripción..."
              className="border p-2 w-full rounded-l focus:outline-none focus:ring-2 focus:ring-primary-100"
            />
            <button
              type="button"
              onClick={handleSearch}
              className="bg-primary-600 text-white p-2 rounded-r hover:bg-primary-700 transition-colors"
              disabled={loading}
            >
              {loading ? "Buscando..." : "Buscar"}
            </button>
          </div>
        </div>

        {/* Campo CIE10 Code */}
        <div>
          <label className="block text-lg font-medium text-primary-100 mb-2">
            Código CIE10
          </label>
          <Select
            value={
              formData.cie10_code_id
                ? options.find(
                    (option) => option.value === formData.cie10_code_id
                  )
                : null
            }
            onChange={handleCie10Change}
            options={options}
            placeholder="Seleccione un código CIE10..."
            isClearable
            styles={customSelectStyles}
          />
          {!formData.cie10_code_id && (
            <p className="text-red-500 text-sm mt-1">
              Por favor, seleccione un código CIE10.
            </p>
          )}
        </div>

        {/* Campo Incapacidad */}
        <InputField
          label="Incapacidad"
          type="text"
          value={formData.inability}
          onChange={handleChange}
          placeholder="Descripción de la incapacidad"
          name="inability"
        />

        {/* Campo Días de Incapacidad */}
        <InputField
          label="Días de Incapacidad"
          type="number"
          value={formData.inability_days}
          onChange={handleChange}
          placeholder="Número de días"
          name="inability_days"
        />

        {/* Campo Observaciones */}
        <InputField
          label="Observaciones"
          type="text"
          value={formData.observations}
          onChange={handleChange}
          placeholder="Observaciones adicionales"
          name="observations"
          isTextArea={true}
        />

        {/* Botón de Envío */}
        <button
          type="submit"
          className="bg-primary-600 text-white py-2 px-4 rounded w-full sm:w-auto hover:bg-primary-700 transition-colors"
        >
          Finalizar Servicio
        </button>
      </form>
    </div>
  );
};

export default ServiceEndForm;
