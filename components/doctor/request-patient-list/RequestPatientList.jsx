"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { getDoctorServiceRequestList } from '@/api/service_api';
import { toast } from "nextjs-toast-notify";
import { useRouter } from 'next/navigation';

// Componente Memorístico para la Tarjeta de Solicitud
const ServiceRequestCard = React.memo(({ request, onViewDetails }) => (
  <div className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row items-start md:items-center">
    <div className="flex-1">
      <p className="text-lg font-semibold text-gray-800">Edad: {request.service_request.patient.age}</p>
      <p className="text-md text-gray-600">Género: {request.service_request.patient.gender}</p>
      <p className="text-md text-gray-600">Barrio: {request.service_request.location_detail.neighborhood}</p>
    </div>
    <button
      onClick={() => onViewDetails(request.service_request.id)} // Navega a la página de detalles
      className="mt-4 md:mt-0 bg-primary-100 text-white py-2 px-4 rounded hover:bg-primary-200 transition"
    >
      Ver Detalles
    </button>
  </div>
));

ServiceRequestCard.displayName = "ServiceRequestCard";

const RequestPatientList = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter(); // Inicializa el router

  // Función memorizada para manejar la navegación
  const handleViewDetails = useCallback((serviceRequestId) => {
    router.push(`/dashboard/request/${serviceRequestId}`);
  }, [router]);

  useEffect(() => {
    const fetchServiceRequests = async () => {
      try {
        const data = await getDoctorServiceRequestList();
        setResults(data.results); // Asigna solo el array de resultados
      } catch (err) {
        console.error('Error fetching service requests:', err);
        setError('Error al obtener las solicitudes.');
        toast.error('Error al obtener las solicitudes.', {
          position: "top-right",
          duration: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchServiceRequests();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-600">Cargando solicitudes...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="grid gap-6">
      {results.map((request) => (
        <ServiceRequestCard
          key={request.id}
          request={request}
          onViewDetails={() => handleViewDetails(request.id)}
        />
      ))}
    </div>
  );
};

const MemoizedRequestPatientList = React.memo(RequestPatientList);
MemoizedRequestPatientList.displayName = "RequestPatientList";

export default MemoizedRequestPatientList;