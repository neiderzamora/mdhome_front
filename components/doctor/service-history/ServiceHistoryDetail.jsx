// components/service-history/ServiceHistoryDetail.jsx

"use client";

import React, { useEffect, useState } from 'react';
import { getDoctorServiceById } from '@/api/service_api';

const ServiceHistoryDetail = ({ id }) => {
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServiceDetail = async () => {
      const token = localStorage.getItem('api_key');
      try {
        const data = await getDoctorServiceById(token, id);
        setService(data); // Assumes the API returns the service object directly
      } catch (err) {
        setError(err.message || 'Error al cargar los detalles del servicio.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchServiceDetail();
    }
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600">Cargando detalles del servicio...</p>
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{`Error: ${error}`}</p>
      </div>
    );
  if (!service)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Servicio no encontrado.</p>
      </div>
    );

  const {
    patient_service_request: { 
      patient, 
      service_end, 
      location_detail, 
      symptoms,  
    },
    doctor_service_response: { doctor },
    created_at,
  } = service;

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-8 pt-44">
        <h2 className="text-3xl font-semibold mb-6 text-primary-600">Detalles del Servicio</h2>
        
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          {/* Información del Paciente */}
          <h3 className="text-xl font-medium mb-4 text-primary-500">Información del Paciente</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DetailItem label="Nombre" value={`${patient.first_name} ${patient.last_name}`} />
            <DetailItem label="Género" value={patient.gender} />
            <DetailItem label="Tipo de Documento" value={patient.identification_type} />
            <DetailItem label="Documento" value={patient.identification_number} />
            <DetailItem label="EPS" value={patient.eps} />
            <DetailItem label="Medicina Prepagada" value={patient.prepaid_medicine} />
            <DetailItem label="Edad" value={patient.age} />
            <DetailItem label="Email" value={patient.email} />
            <DetailItem label="Teléfono" value={patient.phone_number} />
            
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          {/* Detalles del Servicio */}
          <h3 className="text-xl font-medium mb-4 text-primary-500">Detalles del Servicio</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DetailItem label="Síntomas" value={symptoms} />
            <DetailItem 
              label="Dirección" 
              value={`${location_detail.line_address}, ${location_detail.neighborhood}`} 
            />
            <DetailItem 
              label="Fecha de Creación" 
              value={new Date(created_at).toLocaleDateString('es-ES')} 
            />
          </div>
        </div>

        {/* <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          
          <h3 className="text-xl font-medium mb-4 text-primary-500">Detalles del Doctor</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DetailItem label="Nombre" value={`${doctor.first_name} ${doctor.last_name}`} />
            <DetailItem label="Email" value={doctor.email} />
            <DetailItem label="Teléfono" value={doctor.phone_number} />
            <DetailItem label="Especialidad" value={doctor.specialty || 'No especificada'} />
          </div>
        </div> */}

        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          {/* Detalles de Finalización */}
          <h3 className="text-xl font-medium mb-4 text-primary-500">Detalles de Finalización</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DetailItem label="Incapacidad" value={service_end.inability} />
            <DetailItem label="Días de Incapacidad" value={service_end.inability_days} />
            <DetailItem label="Observaciones" value={service_end.observations} />
            <DetailItem label="Código CIE-10" value={service_end.cie10_code} />
            <DetailItem label="Descripción CIE-10" value={service_end.cie10_description} />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => window.history.back()}
            className="bg-primary-100  text-white px-6 py-2 rounded-md hover:opacity-80 transition-colors"
          >
            Regresar
          </button>
        </div>
      </div>
    </>
  );
};

// Componente Reutilizable para Mostrar Detalles
const DetailItem = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-sm text-primary-200 uppercase tracking-wide">{label}</span>
    <span className="text-lg font-medium text-gray-700">{value || '-'}</span>
  </div>
);

export default ServiceHistoryDetail;