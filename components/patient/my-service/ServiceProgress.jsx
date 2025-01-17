// components/ServiceProgress.jsx

"use client";

import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { getPendingServiceRequests } from "@/api/service_api";
import { toast } from "nextjs-toast-notify";

const ServiceProgress = () => {
  const { user } = useContext(UserContext);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      if (!user || !user.token) {
        toast.error("No estás autenticado. Por favor, inicia sesión.", {
          duration: 3000,
        });
        return;
      }

      try {
        const data = await getPendingServiceRequests(user.token);
        setServices(data.results);
      } catch (err) {
        console.error("Error al obtener servicios pendientes:", err);
        setError("No se pudieron obtener los servicios pendientes.");
        toast.error("Error al obtener los servicios pendientes.", {
          duration: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [user]);

  const handleViewDetails = (serviceId) => {
    // Implementa la lógica para ver detalles, por ahora solo alerta
    alert(`Ver detalles de la solicitud: ${serviceId}`);
  };

  if (loading) {
    return <p className="text-center">Cargando tus solicitudes pendientes...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 pt-44">
      <h1 className="text-4xl font-bold mb-4 text-primary-100">Mis Solicitudes Pendientes</h1>
      {services.length > 0 ? (
        <ul className="space-y-4">
          {services.map((service) => (
            <li key={service.id} className="border p-4 rounded-lg shadow-md">
              <p>
                <strong>Fecha de Creación:</strong>{" "}
                {new Date(service.created_at).toLocaleString("es-ES")}
              </p>
              <p>
                <strong>Síntomas:</strong> {service.symptoms}
              </p>
              <p>
                <strong>Tipo de Pago:</strong> {service.type_payment}
              </p>
              <p>
                <strong>Estado:</strong> {service.status}
              </p>
              <button
                onClick={() => handleViewDetails(service.id)}
                className="mt-2 bg-primary-500 text-white py-1 px-3 rounded hover:bg-primary-600 transition-colors"
              >
                Ver Detalle
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tienes solicitudes pendientes.</p>
      )}
    </div>
  );
};

export default ServiceProgress;