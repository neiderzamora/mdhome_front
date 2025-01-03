"use client";

import { useState } from "react";
import axios from "axios";

const API_URL = 'http://127.0.0.1:8000/api/sign-in';

const TestPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(API_URL, formData);
      setResponse(res.data);
      setError(null);
      console.log('Response:', res.data);

      // Verificar la estructura de la respuesta
      console.log('Response data:', JSON.stringify(res.data, null, 2));

      // Guardar el api_key en el almacenamiento local
      const token = res.data.token || res.data.api_key || res.data.access_token;
      if (token) {
        localStorage.setItem('api_key', token);
        console.log('Token almacenado:', token);
      } else {
        console.error('Token no encontrado en la respuesta');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Error during sign-in');
      setResponse(null);
      console.error('Error:', err);
    }
  };

  return (
    <div>
      <h1>Sign In Test</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-lg font-medium text-gray-900"
          >
            Correo electrónico
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              className="block border p-2 mt-2 w-full"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-lg font-medium text-gray-900"
          >
            Contraseña
          </label>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              className="block border p-2 mt-2 w-full"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-primary-100 px-3 py-1.5 text-lg font-semibold text-white shadow-sm hover:bg-primary-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-100"
          >
            Iniciar Sesión
          </button>
        </div>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {response && (
        <div>
          <h2>Response Data</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default TestPage;

/* "use client";

import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = 'http://127.0.0.1:8000/api/patient/';

const TestPage = () => {
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM1NzY0MzQwLCJpYXQiOjE3MzU3NjA3NDAsImp0aSI6IjgyMjMxM2JhODljYTRjYjc4MDhlMjRiMGNmNGU1YzRlIiwidXNlcl9pZCI6ImM1ZDNkZjcxLWUwMTItNDBhNC1hNjIwLTNhZjE0YzgxMDExYiJ9.1w7U2DjG73W1pkD8iT2soluX3u-TF8_ZMrWgT_QHEfo"

      try {
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data && Array.isArray(response.data.results)) {
          setPatients(response.data.results);
        } else {
          setError('Unexpected response format');
        }
        console.log('Patients:', response.data.results);
      } catch (err) {
        setError(err.response?.data?.error || 'Error fetching patients');
      }
    };

    fetchPatients();
  }, []);

  return (
    <div>
      <h1>Patients List</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {patients.length > 0 ? (
          patients.map((patient) => (
            <li key={patient.id}>
              <p><strong>Nombre:</strong> {patient.first_name} {patient.last_name}</p>
              <p><strong>Email:</strong> {patient.email}</p>
              <p><strong>Fecha de nacimiento:</strong> {patient.birthdate}</p>
              <p><strong>Dirección:</strong> {patient.address_line}, {patient.address_city}, {patient.address_departament}</p>
              <p><strong>EPS:</strong> {patient.eps}</p>
              <p><strong>Tipo de identificación:</strong> {patient.identification_type}</p>
              <p><strong>Número de identificación:</strong> {patient.identification_number}</p>
            </li>
          ))
        ) : (
          <p>No patients found</p>
        )}
      </ul>
    </div>
  );
};

export default TestPage; */