import { useState, useEffect } from 'react';
import { getServiceRespondById } from '@/api/service_api';
import { toast } from 'nextjs-toast-notify';

export const useServiceRequest = (requestId) => {
  const [serviceData, setServiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServiceData = async () => {
      if (!requestId) {
        setError("ID no proporcionado");
        toast.error("Error: ID de solicitud no encontrado");
        return;
      }

      try {
        const response = await getServiceRespondById(requestId);
        setServiceData({
          doctor: response.doctor,
          patient: response.service_request.patient,
          location: response.service_request.location_detail,
          symptoms: response.service_request.symptoms,
          status: response.service_request.status,
          doctorPosition: [
            parseFloat(response.doctor_latitude),
            parseFloat(response.doctor_longitude),
          ],
          patientRequestId: response.service_request.id,
          patientLatitude: response.service_request.location_detail.latitude,
          patientLongitude: response.service_request.location_detail.longitude,
        });
      } catch (error) {
        setError(error.message);
        toast.error("Error al obtener los datos del servicio");
      } finally {
        setLoading(false);
      }
    };

    fetchServiceData();
  }, [requestId]);

  return { serviceData, loading, error };
};