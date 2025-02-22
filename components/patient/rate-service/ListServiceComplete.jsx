"use client";

import React, { useState, useEffect } from "react";
import { getPatientServiceRequestStatusDetails } from "@/api/service_api";
import { toast } from "nextjs-toast-notify";
import "nextjs-toast-notify/dist/nextjs-toast-notify.css";
import Link from "next/link";

const ListServiceComplete = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServiceStatus = async () => {
      try {
        const data = await getPatientServiceRequestStatusDetails();
        // Asumimos que la respuesta tiene una propiedad "results" con el array de solicitudes
        setServices(data.results);
      } catch (err) {
        console.error("Error al obtener solicitudes por estado:", err);
        setError("Error al obtener solicitudes completadas.");
        toast.error("Error al obtener solicitudes completadas.", {
          position: "top-center",
          duration: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchServiceStatus();
  }, []);

  if (loading) return <p>Cargando solicitudes completadas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pt-44">
      <h1 className="text-3xl font-bold mb-6 text-primary-100">
        Servicios pendientes de calificación
      </h1>
      {services && services.length > 0 ? (
        <ul className="space-y-4">
          {services.map((service) => (
            <li
              key={service.id}
              className="bg-white border rounded-lg shadow-md p-4"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p>
                    <strong>Estado:</strong>{" "}
                    {service.patient_service_request.status}
                  </p>
                  <p>
                    <strong>Síntomas:</strong>{" "}
                    {service.patient_service_request.symptoms}
                  </p>
                  <p>
                    <strong>Ubicación:</strong>{" "}
                    {service.location
                      ? `${service.location.line_address}, ${service.location.neighborhood}`
                      : "No disponible"}
                  </p>
                  <p>
                    <strong>Doctor:</strong> {service.doctor.first_name}{" "}
                    {service.doctor.last_name}
                  </p>
                </div>
                <Link href={`/patient/rate-service/${service.patient_service_request.id}`}>
                  <button className="bg-primary-100 text-white py-2 px-4 rounded hover:bg-primary-200 transition duration-300">
                    Calificar
                  </button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">
          No se encontraron solicitudes pendientes por calificar.
        </p>
      )}
    </div>
  );
};

export default ListServiceComplete;
