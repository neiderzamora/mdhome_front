"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'nextjs-toast-notify';
import "nextjs-toast-notify/dist/nextjs-toast-notify.css";
import { confirmDoctorArrival } from '@/api/service_api';
import { useServiceRequest } from '../../hooks/useServiceRequest';
import MapView from './MapView';
import ServiceDetails from './ServiceDetails';
import ActionButtons from './ActionButtons';
import ObtainGeolocation from '@/components/geolocation/ObtainGeolocation';

const STATUS = {
  PENDING: "PENDIENTE",
  ACCEPTED: "ACEPTADA Y EN CAMINO",
  ARRIVED: "LLEGADA AL DOMICILIO",
  COMPLETED: "COMPLETADA",
};

const RequestPatient = ({ requestId }) => {
  const router = useRouter();
  const [hasConfirmedArrival, setHasConfirmedArrival] = useState(false);
  const [status, setStatus] = useState(null);
  const [doctorPosition, setDoctorPosition] = useState([4.142, -73.626]);
  const arrivalPosition = [4.134970188524484, -73.63587218689933];
  const { serviceData, loading, error } = useServiceRequest(requestId);

  useEffect(() => {
    const confirmedStatus = localStorage.getItem(`confirmed_arrival_${requestId}`);
    if (confirmedStatus === "true") {
      setHasConfirmedArrival(true);
      setStatus(STATUS.ARRIVED);
    }
  }, [requestId]);

  const handleLocation = (loc) => {
    setDoctorPosition([loc.latitude, loc.longitude]);
  };


  const handleConfirmArrival = async () => {
    try {
      await confirmDoctorArrival(serviceData.patientRequestId);
      setStatus(STATUS.ARRIVED);
      setHasConfirmedArrival(true);
      localStorage.setItem(`confirmed_arrival_${requestId}`, "true");
      toast.success("Llegada confirmada exitosamente");
    } catch (error) {
      console.error("Error al confirmar llegada:", error);
      toast.error("Error al confirmar la llegada");
    }
  };

  if (loading) return <p>Cargando datos del servicio...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!serviceData) return <p>No se encontraron datos del servicio</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 pt-44">
      <h1 className="text-4xl font-bold mb-4 text-primary-100">
        Detalles del Servicio
      </h1>

      <ServiceDetails {...serviceData} />
      <ObtainGeolocation onLocation={handleLocation} />
      <div className="mb-6">
        <MapView 
          //doctorPosition={serviceData.doctorPosition}
          doctorPosition={doctorPosition}
          //patientLocation={serviceData.location}
          arrivalPosition={arrivalPosition}
        />
      </div>

      <ActionButtons
        hasConfirmedArrival={hasConfirmedArrival}
        onConfirmArrival={handleConfirmArrival}
        patientRequestId={serviceData.patientRequestId}
        status={status || serviceData.status}
        router={router}
      />
    </div>
  );
};

export default RequestPatient;