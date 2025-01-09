// components/user-details/UserDetails.jsx

"use client";

import React, { useState, useEffect } from 'react';
import { getPatientById, getDoctorById } from '@/api/service_api';
import { toast } from 'nextjs-toast-notify';
import Link from 'next/link';

const UserDetails = ({ userId, userType }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('api_key');
      try {
        let data = null;

        if (userType === 'patient') {
          data = await getPatientById(userId, token);
        } else if (userType === 'doctor') {
          data = await getDoctorById(userId, token);
        }

        if (data) {
          setUser(data);
        } else {
          toast.error("No se pudo cargar la información del usuario.", { duration: 3000 });
        }
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
        toast.error("Error al obtener los datos del usuario.", { duration: 3000 });
      }
    };
    fetchUser();
  }, [userId, userType]);

  if (!user) {
    return <p className="text-center">Cargando...</p>;
  }

  // Definir los campos base comunes a ambos tipos de usuario
  const baseFields = [
    { name: "first_name", label: "Nombre" },
    { name: "last_name", label: "Apellido" },
    { name: "identification_type", label: "Tipo de Identificación" },
    { name: "identification_number", label: "Número de Identificación" },
    { name: "birthdate", label: "Fecha de Nacimiento" },
    { name: "phone_number", label: "Teléfono" },
    { name: "address_departament", label: "Departamento" },
    { name: "address_city", label: "Ciudad" },
    { name: "address_line", label: "Línea de Dirección" },
    { name: "email", label: "Email" },
  ];

  // Campos adicionales para pacientes
  const patientFields = [
    { name: "eps", label: "EPS" },
    { name: "prepaid_medicine", label: "Medicina Prepagada" },
  ];

  // Campos adicionales para doctores
  const doctorFields = [
    { name: "rethus", label: "Rethus" },
    { name: "doctor_type", label: "Tipo de Doctor" },
  ];

  // Determinar los campos a mostrar según el tipo de usuario
  const userFields = userType === 'doctor' ? [...baseFields, ...doctorFields] : [...baseFields, ...patientFields];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-4xl font-semibold mb-6 text-gray-800">Detalles del Usuario</h2>
      <div className="bg-white shadow-lg rounded-3xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {userFields.map(field => (
            <div key={field.name} className="flex flex-col">
              <span className="text-sm text-primary-200 uppercase tracking-wide">{field.label}</span>
              <span className="text-lg font-medium text-gray-700">{user[field.name] || '-'}</span>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-end">
          <Link href="/profile/edit">
            <button className="bg-primary-100 text-white px-6 py-3 rounded-full shadow-md hover:bg-primary-200 transition">
              Editar Usuario
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;