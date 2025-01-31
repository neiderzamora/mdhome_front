import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api"; // Reemplaza con la URL de tu servidor

// Configurar axios para incluir el token JWT en los encabezados de las solicitudes
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar el token JWT a cada solicitud
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("api_key");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Función para iniciar sesión
export const loginUser = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/sign-in`, formData);
    const token = response.data.access_token;
    if (token) {
      localStorage.setItem("api_key", token);
      console.log("Token almacenado:", token);
      localStorage.setItem("refresh_token", response.data.refresh_token);
    } else {
      console.error("Token no encontrado en la respuesta");
      throw new Error("Token no encontrado en la respuesta");
    }
    return response.data;
  } catch (error) {
    console.error("Error en loginUser:", error);
    throw error;
  }
};

export const RefreshToken = async () => {
  try {
    const refresh = localStorage.getItem('refresh_token');
    if (!refresh) {
      throw new Error('No refresh token available');
    }

    const response = await api.post('/token/refresh/', {
      refresh: refresh
    });

    console.log('Token refrescado exitosamente:', {
      access: response.data.access_token ? 'Token recibido' : 'No token',
      refresh: response.data.refresh_token ? 'Token recibido' : 'No token'
    });

    return response.data;
  } catch (error) {
    console.error("Error in RefreshToken:", error);
    throw error;
  }
};

// Funciones para UserContext
export const getPatientByEmail = async (email, token) => {
  try {
    const response = await api.get(`/patient/?email=${email}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const patients = response.data;
    return patients.length > 0 ? patients[0] : null;
  } catch (error) {
    console.error('Error al obtener paciente por email:', error);
    throw error;
  }
};

export const getDoctorByEmail = async (email, token) => {
  try {
    const response = await api.get(`/doctor/?email=${email}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const doctors = response.data;
    return doctors.length > 0 ? doctors[0] : null;
  } catch (error) {
    console.error('Error en getDoctorByEmail:', error);
    throw error;
  }
};

// Funciones CRUD para pacientes
export const getPatients = async () => {
  try {
    const response = await api.get("/patient/");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getPatientById = async (id) => {
  try {
    const response = await api.get(`/patient/${id}/`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createPatient = async (patientData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/patient/`, patientData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updatePatient = async (id, patientData) => {
  try {
    const response = await api.patch(`/patient/${id}/`, patientData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Funciones CRUD para doctores

export const updateDoctor = async (id, data, token) => {
  try {
    const response = await api.patch(`/doctor/${id}/`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error en updateDoctor:", error);
    throw error;
  }
};

export const getDoctorById = async (id, token) => {
  try {
    const response = await api.get(`/doctor/${id}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener doctor por ID:', error);
    throw error;
  }
};

// Funciones CRUD para direcciones
const ADDRESS_API_URL = `${API_BASE_URL}/service-addresses/`;

export const fetchAddresses = async () => {
  try {
    const response = await api.get(ADDRESS_API_URL);
    return response.data.results;
  } catch (error) {
    console.error("Error en fetchAddresses:", error);
    throw error;
  }
};

export const createAddress = async (address) => {
  try {
    const response = await api.post(ADDRESS_API_URL, address);
    return response.data;
  } catch (error) {
    console.error("Error en createAddress:", error);
    throw error;
  }
};

export const updateAddress = async (id, address) => {
  try {
    const response = await api.put(`${ADDRESS_API_URL}${id}/`, address);
    return response.data;
  } catch (error) {
    console.error("Error en updateAddress:", error);
    throw error;
  }
};

export const deleteAddress = async (id) => {
  try {
    await api.delete(`${ADDRESS_API_URL}${id}/`);
  } catch (error) {
    console.error("Error en deleteAddress:", error);
    throw error;
  }
};

// -------------------- Funciones CRUD para Vehículos -------------------- //

// Ruta base para la API de vehículos
const VEHICLE_API_URL = `${API_BASE_URL}/vehicle/`;

/**
 * Obtener la lista de vehículos
 */
export const fetchVehicles = async () => {
  try {
    const response = await api.get(VEHICLE_API_URL);
    return response.data.results;
  } catch (error) {
    console.error("Error en fetchVehicles:", error);
    throw error;
  }
};

export const createVehicle = async (vehicle) => {
  try {
    const response = await api.post(VEHICLE_API_URL, vehicle);
    return response.data;
  } catch (error) {
    console.error("Error en createVehicle:", error);
    throw error;
  }
};

export const updateVehicle = async (id, vehicle) => {
  try {
    const response = await api.put(`${VEHICLE_API_URL}${id}/`, vehicle);
    return response.data;
  } catch (error) {
    console.error("Error en updateVehicle:", error);
    throw error;
  }
};

export const deleteVehicle = async (id) => {
  try {
    await api.delete(`${VEHICLE_API_URL}${id}/`);
  } catch (error) {
    console.error("Error en deleteVehicle:", error);
    throw error;
  }
};


// -------------------- Funciones CRUD para Solicitudes de Servicio -------------------- //

export const createServiceRequest = async (data) => {
  try {
    const response = await api.post('/patient/service_request/new/', data);
    console.log("Respuesta de createServiceRequest:", response.data); // Agrega esta línea
    return response.data;
  } catch (error) {
    console.error("Error en createServiceRequest:", error);
    throw error;
  }
};

export const getServiceRequestById = async (id) => {
  try {
    const response = await api.get(`/patient/service_request/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error en getServiceRequestById:", error);
    throw error;
  }
};


// Funciones para obtener solicitudes de servicio pendientes
export const fetchPendingServiceRequests = async () => {
  try {
    const response = await api.get('/service_requests/pending/');
    return response.data;
  } catch (error) {
    console.error('Error en fetchPendingServiceRequests:', error);
    throw error;
  }
};

// Funciones para responder a solicitudes de servicio
export const respondToServiceRequest = async (requestId, data) => {
  try {
    const response = await api.post(`/doctor/service_request/${requestId}/respond/`, data);
    return response.data;
  } catch (error) {
    console.error("Error en respondToServiceRequest:", error);
    throw error;
  }
};

export const getServiceRespondById = async (id) => {
  try {
    const response = await api.get(`/doctor/service_request/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error en getGetServiceRespondById:", error);
    throw error;
  }
}

export const confirmDoctorArrival = async (id) => {
  try {
    const response = await api.patch(`/doctor/service_request/${id}/arrive/`);
    return response.data;
  } catch (error) {
    console.error("Error en confirmDoctorArrival:", error);
    throw error;
  }
};

export const completeServiceRequest = async (id, data) => {
  try {
    const response = await api.post(`/service_end/${id}/complete/`, data);
    return response.data;
  } catch (error) {
    console.error("Error en completeServiceRequest:", error);
    throw error;
  }
};

// Función para obtener el historial de servicios del doctor
export const getDoctorServiceHistory = async (token, page = 1, filters = {}) => {
  try {
    const params = { page, ...filters };
    const response = await api.get('/doctor/service_request/detail/', {
      headers: { Authorization: `Bearer ${token}` },
      params,
    });
    return response.data; // Retorna los datos del historial con paginación
  } catch (error) {
    console.error('Error al obtener el historial de servicios del doctor:', error);
    throw error.response ? error.response.data : 'Error desconocido';
  }
};

export const getDoctorServiceById = async (token, id) => {
  try {
    const response = await api.get(`/doctor/service_request/detail/${id}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; // Retorna los detalles del servicio
  } catch (error) {
    console.error(`Error al obtener los detalles del servicio con ID ${id}:`, error);
    throw error.response ? error.response.data : 'Error desconocido';
  }
};


// Funciones para obtener servicios pendientes del paciente
export const getPendingServiceRequests = async () => {
  try {
    const response = await api.get("/patient/service_request/pending/");
    return response.data;
  } catch (error) {
    console.error("Error en getPendingServiceRequests:", error);
    throw error;
  }
};

export const deleteServiceRequest = async (id) => {
  try {
    const response = await api.delete(`/patient/service_request/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar la solicitud de servicio:", error);
    throw error;
  }
};

export const getDoctorServiceRequestList = async () => {
  try {
    const response = await api.get('/doctor/service_request/list/');
    return response.data;
  } catch (error) {
    console.error('Error en getDoctorServiceRequestList:', error);
    throw error;
  }
};

export const getCIE10Codes = async (code = "", description = "", page = 1) => {
  try {
    const response = await api.get("/cie10-code/", {
      params: {
        code,         // Parámetro específico para filtrar por código
        description,  // Parámetro específico para filtrar por descripción
        page,         // Parámetro de paginación
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error en getCIE10Codes:", error);
    throw error;
  }
};