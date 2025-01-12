"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaUser, FaClock, FaMapMarkerAlt, FaStethoscope } from "react-icons/fa";
import { FaBirthdayCake } from "react-icons/fa";
import { fetchPendingServiceRequests, respondToServiceRequest } from "@/api/service_api";
import { toast } from "nextjs-toast-notify";
import "nextjs-toast-notify/dist/nextjs-toast-notify.css";

const DoctorDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );
  const [selectedRequest, setSelectedRequest] = useState(null);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPendingRequests = async () => {
      try {
        const data = await fetchPendingServiceRequests();
        setRequests(data.results);
      } catch (error) {
        console.error("Error al obtener solicitudes pendientes:", error);
        setError("No se pudieron obtener las solicitudes pendientes.");
        toast.error("Error al obtener las solicitudes pendientes.", {
          duration: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    getPendingRequests();

    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAcceptRequest = async (requestId) => {
    try {
      const data = {
        doctor_latitude: "4.145201",
        doctor_longitude: "-73.62783",
      };
      const response = await respondToServiceRequest(requestId, data);
      console.log("Respuesta completa:", response);
  
      // Verificar la estructura correcta de la respuesta
      if (!response.data.id) {
        console.error("ID no encontrado en la respuesta:", response);
        toast.error("Error: No se pudo obtener el ID de la solicitud aceptada");
        return;
      }
      
      // Obtener el ID correcto de la estructura anidada
      const acceptedRequestId = response.data.id;
      console.log("ID de la solicitud aceptada:", acceptedRequestId);
      
      toast.success(response.data.status || "Solicitud aceptada exitosamente.", { 
        duration: 3000 
      });
      
      // Redireccionar con el ID correcto
      router.push(`/dashboard/request/${acceptedRequestId}`);
    } catch (error) {
      toast.error("Error al aceptar la solicitud.", { duration: 3000 });
      console.error("Error al aceptar la solicitud:", error);
    }
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
  };

  const handleCloseModal = () => {
    setSelectedRequest(null);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 pt-44">
      <h1 className="text-4xl font-bold mb-4 text-primary-100">
        Panel del Doctor
      </h1>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">
          <FaClock className="inline mr-2" /> Hora Actual: {currentTime}
        </h2>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Solicitudes de Pacientes</h2>
        {loading ? (
          <p>Cargando solicitudes pendientes...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : requests.length > 0 ? (
          <ul className="space-y-4">
            {requests.map((request) => (
              <li key={request.id} className="border p-4 rounded-lg shadow-md">
                <p>
                  <FaUser className="inline mr-2" />
                  <strong>Genero:</strong> {request.patient.gender}
                </p>

                <p>
                  <FaMapMarkerAlt className="inline mr-2" />
                  <strong>Barrio:</strong>{" "}
                  {request.location_detail.neighborhood}
                </p>

                <p>
                  <FaBirthdayCake className="inline mr-2" />
                  <strong>Edad:</strong> {request.patient.age}
                </p>

                <p>
                  <FaStethoscope className="inline mr-2" />
                  <strong>Síntomas:</strong> {request.symptoms}
                </p>

                <div className="mt-2">
                  <button
                    onClick={() => handleAcceptRequest(request.id)}
                    className="bg-primary-100 text-white py-2 px-4 rounded mr-2"
                  >
                    Aceptar Solicitud
                  </button>
                  <button
                    onClick={() => handleViewDetails(request)}
                    className="bg-secondary-100 text-white py-2 px-4 rounded"
                  >
                    Ver Detalles
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay solicitudes pendientes.</p>
        )}
      </div>

      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">
              Detalles de la Solicitud
            </h2>
            <p>
                <strong>Genero:</strong> {selectedRequest.patient.gender}
            </p>
            <p>
              <strong>Barrio:</strong>
              {selectedRequest.location_detail.neighborhood}
            </p>
            <p>
              <strong>Edad:</strong> {selectedRequest.patient.age}
            </p>
           
            <p>
              <strong>Síntomas:</strong> {selectedRequest.symptoms}
            </p>
            <p>
              <strong>Fecha de Creación:</strong>{" "}
              {new Date(selectedRequest.created_at).toLocaleString()}
            </p>
            <p>
              <strong>Tipo de Pago:</strong> {selectedRequest.type_payment}
            </p>
            <p>
              <strong>Estado:</strong> {selectedRequest.status}
            </p>
            <button
              onClick={handleCloseModal}
              className="mt-4 bg-primary-100 text-white py-2 px-4 rounded w-full sm:w-auto"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;
