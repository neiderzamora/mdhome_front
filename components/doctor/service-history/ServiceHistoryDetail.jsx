"use client";

import React, { useEffect, useState, useCallback } from "react";
import { getDoctorServiceById } from "@/api/service_api";
import DetailItem from "./DetailItem";
import ReadMore from "./ReadMore";
import { useRouter } from "next/navigation";

const ServiceHistoryDetail = ({ id }) => {
  const router = useRouter();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchServiceDetail = useCallback(async () => {
    const token = localStorage.getItem("api_key");
    try {
      const data = await getDoctorServiceById(token, id);
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
    patient_service_request: { patient, service_end, location_detail, symptoms },
    doctor_service_response: { doctor },
    created_at,
  } = service;

  const patientDetails = (
    <>
      <DetailItem label="Nombre" value={<ReadMore text={`${patient.first_name} ${patient.last_name}`} />} />
      <DetailItem label="Género" value={patient.gender} />
      <DetailItem label="Tipo de Documento" value={patient.identification_type} />
      <DetailItem label="Documento" value={<ReadMore text={patient.identification_number} />} />
      <DetailItem label="EPS" value={<ReadMore text={patient.eps} />} />
      <DetailItem label="Medicina Prepagada" value={<ReadMore text={patient.prepaid_medicine} />} />
      <DetailItem label="Edad" value={patient.age.toString()} />
      <DetailItem label="Fecha de nacimiento" value={patient.birthdate} />
    </>
  );

  const serviceDetails = (
    <>
      <DetailItem label="Síntomas" value={<ReadMore text={symptoms} />} />
      <DetailItem label="Dirección" value={<ReadMore text={`${location_detail.line_address}, ${location_detail.neighborhood}`} />} />
      <DetailItem label="Fecha de Creación" value={location_detail.created_at} />
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
        <h3 className="text-xl font-medium mb-4 text-primary-500">Información del Paciente</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {patientDetails}
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