import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api'; // Reemplaza con la URL de tu servidor

// Configurar axios para incluir el token JWT en los encabezados de las solicitudes
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token JWT a cada solicitud
api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('api_key');
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
      localStorage.setItem('api_key', token);
      console.log('Token almacenado:', token);
    } else {
      console.error('Token no encontrado en la respuesta');
      throw new Error('Token no encontrado en la respuesta');
    }
    return response.data;
  } catch (error) {
    console.error('Error en loginUser:', error);
    throw error;
  }
};

// Función para registrar un nuevo usuario
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Funciones CRUD para pacientes
export const getPatients = async () => {
  try {
    const response = await api.get('/patient/');
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
    const response = await api.put(`/patient/${id}/`, patientData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};