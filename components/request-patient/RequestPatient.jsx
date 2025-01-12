"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FaCheck,
  FaExclamationTriangle,
  FaFlagCheckered,
} from "react-icons/fa";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { getServiceRespondById, confirmDoctorArrival } from "@/api/service_api";
import L from "leaflet";
import axios from "axios";
import { toast } from "nextjs-toast-notify";
import "nextjs-toast-notify/dist/nextjs-toast-notify.css";

// Configurar el icono del marcador
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const STATUS = {
  PENDING: 'PENDIENTE',
  ACCEPTED: 'ACEPTADA Y EN CAMINO',
  ARRIVED: 'LLEGADA AL DOMICILIO',
  COMPLETED: 'COMPLETADA'
};

const RequestPatient = ({ requestId }) => {
  const [status, setStatus] = useState(null);
  const [serviceData, setServiceData] = useState(null);
  const [patientRequestId, setPatientRequestId] = useState(null);
  const router = useRouter();
  const [route, setRoute] = useState([]);

  useEffect(() => {
    const fetchServiceData = async () => {
      if (!requestId) {
        console.error("ID no proporcionado");
        toast.error("Error: ID de solicitud no encontrado");
        return;
      }

      try {
        const response = await getServiceRespondById(requestId); // Use correct function name
        const data = response;

        setPatientRequestId(data.service_request.id);
        setServiceData({
          doctor: data.doctor,
          patient: data.service_request.patient,
          location: data.service_request.location_detail,
          symptoms: data.service_request.symptoms,
          status: data.service_request.status,
          doctorPosition: [
            parseFloat(data.doctor_latitude),
            parseFloat(data.doctor_longitude),
          ],
        });
      } catch (error) {
        console.error("Error fetching service data:", error);
        toast.error("Error al obtener los datos del servicio");
      }
    };

    fetchServiceData();
  }, [requestId]);
  
  useEffect(() => {
    if (serviceData) {
      const fetchRoute = async () => {
        try {
          const response = await axios.get(
            `http://router.project-osrm.org/route/v1/driving/${serviceData.doctorPosition[1]},${serviceData.doctorPosition[0]};${serviceData.location.longitude},${serviceData.location.latitude}?overview=full&geometries=geojson`
          );
          const routeData = response.data;
          setRoute(
            routeData.routes[0].geometry.coordinates.map((coord) => [
              coord[1],
              coord[0],
            ])
          );
        } catch (error) {
          console.error("Error fetching route:", error);
        }
      };

      fetchRoute();
    }
  }, [serviceData]);

  const handleConfirmArrival = async () => {
    try {
      await confirmDoctorArrival(patientRequestId);
      setStatus(STATUS.ARRIVED);
      toast.success("Llegada confirmada exitosamente");
    } catch (error) {
      console.error("Error al confirmar llegada:", error);
      toast.error("Error al confirmar la llegada");
    }
  };

  if (!serviceData) {
    return <p>Cargando datos del servicio...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 pt-44">
      <h1 className="text-4xl font-bold mb-4 text-primary-100">
        Detalles del Servicio
      </h1>
      <div className="border p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4">Datos del Paciente</h2>
        <p>
          <strong>Edad:</strong> {serviceData.patient.age}
        </p>
        <p>
          <strong>Género:</strong> {serviceData.patient.gender}
        </p>
        <p>
          <strong>Barrio:</strong> {serviceData.location.neighborhood}
        </p>
        <p>
          <strong>Dirección:</strong> {serviceData.location.line_address}
        </p>
        <p>
          <strong>Síntomas:</strong> {serviceData.symptoms}
        </p>
        <p>
          <strong>Estado:</strong> {serviceData.status}
        </p>
      </div>

      <div className="mb-6">
        <MapContainer
          center={serviceData.doctorPosition}
          zoom={13}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={serviceData.doctorPosition}>
            <Popup>Doctor: {serviceData.doctor.first_name}</Popup>
          </Marker>
          {route.length > 0 && <Polyline positions={route} color="darkblue" />}
        </MapContainer>
      </div>

      <div className="flex flex-col space-y-2">
      <button
          onClick={handleConfirmArrival}
          className="bg-primary-100 text-white py-2 px-4 rounded"
        >
          <FaCheck className="inline mr-2" /> Confirmar Llegada
        </button>
        <button
          onClick={() => router.push(`/dashboard/request/${patientRequestId}/failed-service`)}
          className="bg-red-500 text-white py-2 px-4 rounded"
        >
          <FaExclamationTriangle className="inline mr-2" /> Reportar Error
        </button>
        {status === STATUS.ARRIVED && (
          <button
            onClick={() => router.push(`/dashboard/request/${patientRequestId}/service-end`)}
            className="bg-green-500 text-white py-2 px-4 rounded"
          >
            <FaFlagCheckered className="inline mr-2" /> Finalizar Servicio
          </button>
        )}
      </div>
    </div>
  );
};

export default RequestPatient;
