"use client";

import React, { useEffect, useState, useCallback } from "react";
import { getPatientServiceById } from "@/api/service_api";
import DetailItem from "@/components/doctor/service-history/DetailItem";
import ReadMore from "@/components/doctor/service-history/ReadMore";
import { useRouter } from "next/navigation";

const ServiceHistoryDetail = ({ id }) => {
  const router = useRouter();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchServiceDetail = useCallback(async () => {
    const token = localStorage.getItem("api_key");
    try {
      const data = await getPatientServiceById (token, id);
      setService(data);
    } catch (err) {
      setError(err.message || "Error al cargar los detalles del servicio.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchServiceDetail();
    }
  }, [id, fetchServiceDetail]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600">Cargando detalles del servicio...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{`Error: ${error}`}</p>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Servicio no encontrado.</p>
      </div>
    );
  }

  const {
    patient_service_request,
    service_end,
    location,
    doctor,
  } = service;

  const doctorDetails = (
    <>
      <DetailItem label="Nombre" value={<ReadMore text={`${doctor.first_name} ${doctor.last_name}`} />} />
      <DetailItem label="Tipo de Documento" value={doctor.identification_type} />
      <DetailItem label="Documento" value={<ReadMore text={doctor.identification_number} />} />
    </>
  );

  const serviceDetails = (
    <>
      <DetailItem label="Síntomas" value={<ReadMore text={patient_service_request.symptoms} />} />
      <DetailItem label="Dirección" value={<ReadMore text={`${location.line_address}, ${location.neighborhood}`} />} />
      <DetailItem label="Fecha de Creación" value={patient_service_request.created_at} />
    </>
  );

  const serviceEndDetails = (
    <>
      <DetailItem label="Incapacidad" value={service_end.inability} />
      <DetailItem label="Días de Incapacidad" value={service_end.inability_days.toString()} />
      <DetailItem label="Descripción CIE-10" value={<ReadMore text={service_end.cie10_code_detail.description} />} />
      <DetailItem label="Código CIE-10" value={service_end.cie10_code_detail.code} />
      <DetailItem label="Observaciones" value={<ReadMore text={service_end.observations} />} />
      <DetailItem label="Fecha de Finalización" value={service_end.created_at} />
    </>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pt-36 lg:pt-44">
      <h2 className="text-3xl font-semibold mb-6 text-primary-600">Detalles del Servicio</h2>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-xl font-medium mb-4 text-primary-500">Información del Doctor</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {doctorDetails}
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-xl font-medium mb-4 text-primary-500">Detalles del Servicio</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {serviceDetails}
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-xl font-medium mb-4 text-primary-500">Detalles de Finalización</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {serviceEndDetails}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => router.back()}
          className="bg-primary-100 text-white px-6 py-2 rounded-md hover:opacity-80 transition-colors"
        >
          Regresar
        </button>
      </div>
    </div>
  );
};

export default ServiceHistoryDetail;