// components/request-service/ServiceRequestDetails.jsx

"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getServiceRequestById } from '@/api/service_api';
import { toast } from 'nextjs-toast-notify';
import "nextjs-toast-notify/dist/nextjs-toast-notify.css";

const ServiceRequestDetails = ({ id }) => {
  const router = useRouter();

  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequestDetails = async () => {
      if (!id) {
        toast.error("id de la solicitud no proporcionado.", { duration: 3000 });
        return;
      }

      try {
        const data = await getServiceRequestById(id);
        setRequest(data);
      } catch (error) {
        toast.error("Error al obtener los detalles de la solicitud.", { duration: 3000 });
        console.error("Error al obtener los detalles de la solicitud:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequestDetails();
  }, [id, router]);

  if (loading) {
    return <p className="text-center">Cargando detalles de la solicitud...</p>;
  }

  if (!request) {
    return <p className="text-center">No se encontraron detalles para esta solicitud.</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 pt-44">
      <h2 className="text-4xl font-semibold mb-6 text-gray-800">Detalles de la Solicitud</h2>
      <div className="bg-white shadow-lg rounded-2xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DetailField label="Ubicación" value={`${request.location_detail.line_address}, ${request.location_detail.neighborhood}`}  />
          <DetailField label="Síntomas" value={request.symptoms} />
          <DetailField label="Método de Pago" value={request.type_payment} />
          <DetailField label="Estado" value={request.status} />
          <DetailField label="Fecha de Creación" value={new Date(request.created_at).toLocaleString()} />
        </div>
        <div className="mt-8 flex justify-end">
          <button
            onClick={() => router.push('/request-service')}
            className="bg-primary-100 text-white px-6 py-3 rounded shadow-md hover:opacity-80 transition"
          >
            Regresar
          </button>
        </div>
      </div>
    </div>
  );
};

const DetailField = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-sm text-primary-200 uppercase tracking-wide">{label}</span>
    <span className="text-lg font-medium text-gray-700">{value || '-'}</span>
  </div>
);

export default ServiceRequestDetails;