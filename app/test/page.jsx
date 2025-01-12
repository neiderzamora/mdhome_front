"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const TestPage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          ' http://127.0.0.1:8000/api/doctor/service_request/2353edb4-f4c8-483b-811a-e784f707154f/',
          {
            headers: {
              'Content-Type': 'application/json',
              // Add Authorization header if needed
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM2NzA1MTUwLCJpYXQiOjE3MzY3MDE1NTAsImp0aSI6ImM5MDViOTUxNDdlMzQ3YzA4MDdiNjAyOTViZWQxNmQ3IiwidXNlcl9pZCI6ImU4NTU5N2QxLWEyMmEtNDYzZC1iMDYxLWVhOWQ0Y2QzNWY1MiJ9.XciFkDHT08k1v19A3CBGmZIk-xOTGEpeu6jF3uaSvT4'
            }
          }
        );
        console.log('Response:', response.data);
        setData(response.data);
      } catch (err) {
        console.error('Error:', err);
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
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