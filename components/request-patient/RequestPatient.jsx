"use client"

// components/request-patient.jsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaCheck, FaExclamationTriangle, FaFlagCheckered } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

// Configurar el icono del marcador
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const RequestPatient = ({ params }) => {
  const { id } = params;
  const [status, setStatus] = useState(null);
  const [doctorPosition, setDoctorPosition] = useState([4.142, -73.626]); // Posición inicial del doctor en Villavicencio, Meta, Colombia
  const arrivalPosition = [4.153, -73.634]; // Posición del Condominio Amarilo en Villavicencio, Meta, Colombia
  const [route, setRoute] = useState([]);
  const router = useRouter();

  // Simulación de datos del paciente
  const patientData = {
    id: id,
    patientName: "Juan Pérez",
    address: "Calle 123, Barrio Central",
    symptoms: ["Fiebre", "Tos"],
  };

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const response = await axios.get(`http://router.project-osrm.org/route/v1/driving/${doctorPosition[1]},${doctorPosition[0]};${arrivalPosition[1]},${arrivalPosition[0]}?overview=full&geometries=geojson`);
        const data = response.data;
        setRoute(data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]));
      } catch (error) {
        console.error("Error fetching route:", error);
      }
    };

    fetchRoute();
  }, [doctorPosition, arrivalPosition]);

  useEffect(() => {
    // Simulación de actualización de la posición del doctor
    const interval = setInterval(() => {
      setDoctorPosition(prevPosition => [prevPosition[0] + 0.001, prevPosition[1] + 0.001]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleArrived = () => {
    setStatus('arrived');
  };

  const handleError = () => {
    router.push(`/dashboard/request/${id}/failed-service`);
  };

  const handleFinishService = () => {
    router.push(`/dashboard/request/${id}/service-end`);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 pt-44">
      <h1 className="text-4xl font-bold mb-4 text-primary-100">Detalles de la Solicitud</h1>
      <div className="border p-4 rounded-lg shadow-md mb-6">
        <p><strong>Paciente:</strong> {patientData.patientName}</p>
        <p><strong>Dirección:</strong> {patientData.address}</p>
        <p><strong>Síntomas:</strong> {patientData.symptoms.join(', ')}</p>
      </div>
      <div className="mb-6">
        <MapContainer center={doctorPosition} zoom={13} style={{ height: "400px", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={doctorPosition}>
            <Popup>
              Doctor en camino
            </Popup>
          </Marker>
          <Marker position={arrivalPosition}>
            <Popup>
              Condominio Amarilo
            </Popup>
          </Marker>
          {route.length > 0 && <Polyline positions={route} color="darkblue" />}
        </MapContainer>
      </div>
      <div className="flex flex-col space-y-2">
        <button 
          onClick={handleArrived} 
          className="bg-primary-100 text-white py-2 px-4 rounded w-full sm:w-auto"
        >
          <FaCheck className="inline mr-2" /> Confirmar Llegada
        </button>
        <button 
          onClick={handleError} 
          className="bg-secondary-100 text-white py-2 px-4 rounded w-full sm:w-auto"
        >
          <FaExclamationTriangle className="inline mr-2" /> Reportar Error
        </button>
        {status && (
          <button 
            onClick={handleFinishService} 
            className="bg-primary-200 text-white py-2 px-4 rounded w-full sm:w-auto"
          >
            <FaFlagCheckered className="inline mr-2" /> Finalizar Servicio
          </button>
        )}
      </div>
    </div>
  );
};

export default RequestPatient;