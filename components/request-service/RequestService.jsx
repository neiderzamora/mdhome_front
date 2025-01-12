// components/request-service/RequestService.jsx

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "nextjs-toast-notify";
import "nextjs-toast-notify/dist/nextjs-toast-notify.css";
import { fetchAddresses, createServiceRequest } from "@/api/service_api";

const RequestService = () => {
  const [address, setAddress] = useState("");
  const [symptomInput, setSymptomInput] = useState("");
  const [symptoms, setSymptoms] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [savedAddresses, setSavedAddresses] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const getAddresses = async () => {
      try {
        const addresses = await fetchAddresses();
        setSavedAddresses(addresses);
      } catch (err) {
        toast.error("Error al obtener direcciones", {
          position: "top-center",
          autoHideDuration: 3000,
        });
      }
    };

    getAddresses();
  }, []);

  const handleAddSymptom = () => {
    if (symptomInput.trim()) {
      setSymptoms([...symptoms, symptomInput.trim()]);
      setSymptomInput("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (address && symptoms.length > 0 && paymentMethod) {
      const data = {
        location: address,
        symptoms: symptoms.join(", "),
        type_payment: paymentMethod,
      };

      try {
        const response = await createServiceRequest(data);
        const id = response.data.id;
        toast.success(response.status || "Solicitud enviada con éxito.", {
          position: "top-center",
          autoHideDuration: 6000,
        });
        toast.success(response.message || "Solicitud enviada con éxito.", {
          position: "top-center",
          autoHideDuration: 6000,
        });
        router.push(`/request-service/details/${id}`);
      } catch (error) {
        toast.error("Error al enviar la solicitud.", {
          position: "top-center",
          autoHideDuration: 3000,
        });
        console.error("Error en el envío de la solicitud:", error);
      }
    } else {
      toast.error("Por favor, completa todos los campos requeridos.", {
        position: "top-center",
        autoHideDuration: 3000,
      });
    }
  };

  const handleAddAddress = () => {
    router.push("/addresses");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 pt-44">
      <h1 className="text-4xl font-bold mb-4 text-primary-100">
        Solicitar Servicio
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <AddressSection
          address={address}
          setAddress={setAddress}
          savedAddresses={savedAddresses}
          handleAddAddress={handleAddAddress}
        />
        <SymptomsSection
          symptomInput={symptomInput}
          setSymptomInput={setSymptomInput}
          handleAddSymptom={handleAddSymptom}
          symptoms={symptoms}
        />
        <PaymentMethodSection
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
        />
        <button
          type="submit"
          className="mt-4 bg-primary-100 text-lg text-white py-2 px-6 rounded shadow-lg hover:bg-primary-200 transition duration-300"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

const AddressSection = ({
  address,
  setAddress,
  savedAddresses,
  handleAddAddress,
}) => {
  const handleAddressChange = (e) => {
    const { value } = e.target;
    setAddress(value);
  };

  return (
    <div>
      <label className="block text-lg font-medium text-primary-100 mb-2">
        Seleccionar Dirección
      </label>
      <div className="flex items-center space-x-4">
        <select
          value={address}
          onChange={handleAddressChange}
          className="border p-2 w-full rounded focus:outline-none focus:ring-1 focus:ring-primary-100"
        >
          <option value="">Selecciona una dirección</option>
          {savedAddresses.map((addr) => (
            <option key={addr.id} value={addr.id}>
              {addr.line_address} - {addr.neighborhood}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={handleAddAddress}
          className="bg-primary-100 text-white py-2 px-4 rounded shadow-lg hover:bg-primary-200 transition duration-300"
        >
          Agregar
        </button>
      </div>
    </div>
  );
};

const SymptomsSection = ({
  symptomInput,
  setSymptomInput,
  handleAddSymptom,
  symptoms,
}) => {
  return (
    <div>
      <label className="block text-lg font-medium text-primary-100 mb-2">
        Agregar Síntomas
      </label>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          value={symptomInput}
          onChange={(e) => setSymptomInput(e.target.value)}
          placeholder="Síntomas"
          className="border p-2 w-full rounded focus:outline-none focus:ring-1 focus:ring-primary-100"
        />
        <button
          type="button"
          onClick={handleAddSymptom}
          className="bg-primary-100 text-white py-2 px-4 rounded shadow-lg hover:bg-primary-200 transition duration-300"
        >
          Agregar
        </button>
      </div>
      <ul className="mt-4">
        {symptoms.map((symptom, index) => (
          <li key={index} className="text-primary-100">
            {symptom}
          </li>
        ))}
      </ul>
    </div>
  );
};

const PaymentMethodSection = ({ paymentMethod, setPaymentMethod }) => {
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <div>
      <label className="block text-lg font-medium text-primary-100 mb-2">
        Método de Pago
      </label>
      <select
        value={paymentMethod}
        onChange={handlePaymentMethodChange}
        className="border p-2 w-full rounded focus:outline-none focus:ring-1 focus:ring-primary-100"
      >
        <option value="">Selecciona un método de pago</option>
        <option value="TRANSFERENCIA">Transferencia</option>
        <option value="EFECTIVO">Efectivo</option>
      </select>
    </div>
  );
};

export default RequestService;
