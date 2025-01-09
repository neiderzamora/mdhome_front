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

/**
 * Crear un nuevo vehículo
 * @param {Object} vehicle - Datos del vehículo a crear
 */
export const createVehicle = async (vehicle) => {
  try {
    const response = await api.post(VEHICLE_API_URL, vehicle);
    return response.data;
  } catch (error) {
    console.error("Error en createVehicle:", error);
    throw error;
  }
};

/**
 * Actualizar un vehículo existente
 * @param {number} id - ID del vehículo a actualizar
 * @param {Object} vehicle - Datos actualizados del vehículo
 */
export const updateVehicle = async (id, vehicle) => {
  try {
    const response = await api.put(`${VEHICLE_API_URL}${id}/`, vehicle);
    return response.data;
  } catch (error) {
    console.error("Error en updateVehicle:", error);
    throw error;
  }
};

/**
 * Eliminar un vehículo
 * @param {number} id - ID del vehículo a eliminar
 */
export const deleteVehicle = async (id) => {
  try {
    await api.delete(`${VEHICLE_API_URL}${id}/`);
  } catch (error) {
    console.error("Error en deleteVehicle:", error);
    throw error;
  }
};
