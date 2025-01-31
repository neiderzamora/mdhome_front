"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { FaUser, FaMapMarkerAlt, FaStethoscope, FaBirthdayCake } from "react-icons/fa";
import {
  fetchPendingServiceRequests,
  respondToServiceRequest,
  fetchVehicles,
} from "@/api/service_api";
import { toast } from "nextjs-toast-notify";
import "nextjs-toast-notify/dist/nextjs-toast-notify.css";

import Header from "./Header";
import RequestModal from "./RequestModal";
import VehicleSelectionModal from "./VehicleSelectionModal";

const DoctorDashboard = () => {
  const router = useRouter();
  const [requests, setRequests] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [pendingRequestId, setPendingRequestId] = useState(null);

  // Función para obtener los vehículos del doctor
  const fetchDoctorVehicles = useCallback(async () => {
    try {
      const data = await fetchVehicles();
      setVehicles(data);
    } catch (error) {
      console.error("Error al obtener vehículos:", error);
      toast.error("Error al obtener los vehículos disponibles.");
    }
  }, []);

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
    fetchDoctorVehicles(); // Cargar vehículos al montar el componente
  }, [fetchDoctorVehicles]);

  // Función para manejar el inicio del proceso de aceptar solicitud
  const handleAcceptRequest = useCallback((requestId) => {
    setPendingRequestId(requestId);
    setShowVehicleModal(true);
  }, []);

  // Función para confirmar la selección del vehículo y proceder con la aceptación
  const handleConfirmVehicle = useCallback(async () => {
    if (!selectedVehicle || !pendingRequestId) {
      toast.error("Por favor seleccione un vehículo");
      return;
    }

    try {
      const data = {
        doctor_latitude: "4.145201",
        doctor_longitude: "-73.62783",
        vehicle: selectedVehicle, // Enviar el ID del vehículo seleccionado
      };
      console.log("Datos a enviar:", data); // Log datos a enviar

      const response = await respondToServiceRequest(pendingRequestId, data);

      if (!response.data.id) {
        throw new Error("ID no encontrado en la respuesta");
      }

      toast.success("Solicitud aceptada exitosamente.", { duration: 3000 });
      router.push(`/dashboard/request/${response.data.id}`);
    } catch (error) {
      console.error("Error al aceptar la solicitud:", error);
      toast.error("Error al aceptar la solicitud.", { duration: 3000 });
    } finally {
      setShowVehicleModal(false);
      setPendingRequestId(null);
      setSelectedVehicle(null);
    }
  }, [selectedVehicle, pendingRequestId, router]);

  // Función para ver detalles de la solicitud
  const handleViewDetails = useCallback((request) => {
    setSelectedRequest(request);
  }, []);

  // Función para cerrar el modal de detalles
  const handleCloseModal = useCallback(() => {
    setSelectedRequest(null);
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 pt-44">
      <Header /> {/* No se pasa currentTime como prop */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Solicitudes de Pacientes</h2>
        {loading ? (
          <p className="text-gray-600">Cargando solicitudes pendientes...</p>
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
                    className="bg-primary-100 text-white py-2 px-4 rounded mr-2 hover:bg-primary-200 transition-colors"
                  >
                    Aceptar Solicitud
                  </button>
                  <button
                    onClick={() => handleViewDetails(request)}
                    className="bg-secondary-100 text-white py-2 px-4 rounded hover:bg-secondary-200 transition-colors"
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

      {showVehicleModal && (
        <VehicleSelectionModal
          vehicles={vehicles}
          selectedVehicle={selectedVehicle}
          setSelectedVehicle={setSelectedVehicle}
          handleConfirmVehicle={handleConfirmVehicle}
          setShowVehicleModal={setShowVehicleModal}
        />
      )}
      {selectedRequest && (
        <RequestModal request={selectedRequest} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default DoctorDashboard;