"use client";

import React, { useState, useEffect } from "react";
import {
  getPendingServiceRequests,
  deleteServiceRequest,
} from "@/api/service_api";
import { toast } from "nextjs-toast-notify";

const ServiceProgress = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estado para el modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getPendingServiceRequests();
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
  }, []);

  const openModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedService(null);
    setIsModalOpen(false);
  };

  const confirmDelete = async () => {
    if (!selectedService) return;

    try {
      await deleteServiceRequest(selectedService.id);
      setServices(
        services.filter((service) => service.id !== selectedService.id)
      );
      toast.success("Solicitud eliminada correctamente.", {
        duration: 3000,
      });
    } catch (err) {
      console.error("Error al eliminar la solicitud:", err);
      toast.error("Error al eliminar la solicitud.", {
        duration: 3000,
      });
    } finally {
      closeModal();
    }
  };

  if (loading) {
    return (
      <p className="text-center">Cargando tus solicitudes pendientes...</p>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 pt-44">
      <h1 className="text-4xl font-bold mb-4 text-primary-100">
        Mis Solicitudes Pendientes
      </h1>
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
                onClick={() => openModal(service)}
                className="mt-2 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition-colors"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tienes solicitudes pendientes.</p>
      )}

      {/* Modal de Confirmación */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md mx-auto p-6">
            <h2 className="text-xl font-semibold mb-4">
              Confirmar Eliminación
            </h2>
            <p className="mb-6">
              ¿Estás seguro de que deseas eliminar esta solicitud de servicio
              creada el{" "}
              {selectedService?.created_at
                ? new Date(selectedService.created_at).toLocaleDateString(
                    "es-ES"
                  )
                : ""}
              &quot;? Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceProgress;
