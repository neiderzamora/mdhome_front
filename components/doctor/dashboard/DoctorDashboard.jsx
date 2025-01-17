"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaUser, FaMapMarkerAlt, FaStethoscope } from "react-icons/fa";
import { FaBirthdayCake } from "react-icons/fa";
import { fetchPendingServiceRequests, respondToServiceRequest } from "@/api/service_api";
import { toast } from "nextjs-toast-notify";
import "nextjs-toast-notify/dist/nextjs-toast-notify.css";

import Header from "./Header";
import RequestModal from "./RequestModal";

const DoctorDashboard = () => {
  const router = useRouter();
  const [requests, setRequests] = useState([]);
  const [currentTime, setCurrentTime] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
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

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString('es-ES');
      setCurrentTime(formattedTime);
    };

    updateTime(); // Inicializa el tiempo al montar el componente

    const interval = setInterval(updateTime, 1000); // Actualiza cada segundo

    return () => clearInterval(interval); // Limpia el intervalo al desmontar
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
      <Header currentTime={currentTime} />
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
        <RequestModal request={selectedRequest} onClose={handleCloseModal} />
        )}
    </div>
  );
};

export default DoctorDashboard;
