// components/user-details/EditUser.jsx

"use client";

import React, { useState, useEffect } from 'react';
import {
  getPatientById,
  getDoctorById,
  updatePatient,
  updateDoctor
} from '@/api/service_api';
import { toast } from 'nextjs-toast-notify';
import { useRouter } from 'next/navigation';
import { FormField } from '@/components/forms/FormField';
import "nextjs-toast-notify/dist/nextjs-toast-notify.css";

const EditUser = ({ userId, userType }) => {
  // Definir los campos base comunes a ambos tipos de usuario
  const baseFormData = {
    first_name: "",
    last_name: "",
    identification_type: "",
    identification_number: "",
    birthdate: "",
    phone_number: "",
    address_departament: "",
    address_city: "",
    address_line: "",
    email: "",
  };

  // Campos adicionales según el tipo de usuario
  const additionalFormData = userType === 'doctor' ? {
    rethus: "",
    doctor_type: "",
  } : {
    eps: "",
    prepaid_medicine: "",
  };

  const [formData, setFormData] = useState({
    ...baseFormData,
    ...additionalFormData,
  });

  const [errors, setErrors] = useState({});
  const router = useRouter();

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
          // Campos base
          const updatedFormData = {
            first_name: data.first_name || "",
            last_name: data.last_name || "",
            identification_type: data.identification_type || "",
            identification_number: data.identification_number || "",
            birthdate: data.birthdate ? formatDateForInput(data.birthdate) : "",
            phone_number: data.phone_number || "",
            address_departament: data.address_departament || "",
            address_city: data.address_city || "",
            address_line: data.address_line || "",
            email: data.email || "",
          };

          // Campos adicionales según el tipo de usuario
          if (userType === 'patient') {
            updatedFormData.eps = data.eps || "";
            updatedFormData.prepaid_medicine = data.prepaid_medicine || "";
          } else if (userType === 'doctor') {
            updatedFormData.rethus = data.rethus || "";
            updatedFormData.doctor_type = data.doctor_type || "";
          }

          setFormData(updatedFormData);
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

  // Función para formatear la fecha del servidor al formato yyyy-mm-dd para el input de tipo date
  const formatDateForInput = (dateString) => {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };

  // Función para formatear la fecha del input de tipo date al formato dd/mm/yyyy para el servidor
  const formatDateForServer = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
    setErrors(prevErrors => ({ ...prevErrors, [name]: [] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('api_key');

    // Formatear la fecha antes de enviar
    const formattedData = {
      ...formData,
      birthdate: formatDateForServer(formData.birthdate),
    };

    try {
      let updatedUser;
      if (userType === 'patient') {
        updatedUser = await updatePatient(userId, formattedData, token);
      } else if (userType === 'doctor') {
        updatedUser = await updateDoctor(userId, formattedData, token);
      }

      toast.success('Información actualizada exitosamente.', { duration: 3000 });
      router.push('/profile');
    } catch (error) {
      if (error.response && error.response.data) {
        const serverErrors = error.response.data;
        const formattedErrors = {};
        const messages = [];

        Object.keys(serverErrors).forEach(field => {
          formattedErrors[field] = serverErrors[field];
          messages.push(...serverErrors[field]);
        });

        setErrors(formattedErrors);
        toast.error(messages.join(" "), { duration: 3000 });
      } else {
        toast.error('Error al actualizar la información.', { duration: 3000 });
      }
      console.error("Error al actualizar la información del usuario:", error);
    }
  };

  // Campos adicionales según el tipo de usuario
  const additionalFields = userType === 'doctor' ? (
    <>
      <FormField
        id="rethus"
        name="rethus"
        label="Rethus"
        required={false}
        type="text"
        value={formData.rethus}
        onChange={handleChange}
        error={errors.rethus || []}
      />
      <FormField
        id="doctor_type"
        name="doctor_type"
        label="Tipo de Doctor"
        required
        type="text"
        value={formData.doctor_type}
        onChange={handleChange}
        error={errors.doctor_type || []}
      />
    </>
  ) : (
    <>
      <FormField
        id="eps"
        name="eps"
        label="EPS"
        required
        type="text"
        value={formData.eps}
        onChange={handleChange}
        error={errors.eps || []}
      />
      <FormField
        id="prepaid_medicine"
        name="prepaid_medicine"
        label="Medicina Prepagada"
        required
        type="text"
        value={formData.prepaid_medicine}
        onChange={handleChange}
        error={errors.prepaid_medicine || []}
      />
    </>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-4xl font-semibold mb-6 text-gray-800">Editar Usuario</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            id="first_name"
            name="first_name"
            label="Nombre"
            required
            value={formData.first_name}
            onChange={handleChange}
            error={errors.first_name || []}
          />
          <FormField
            id="last_name"
            name="last_name"
            label="Apellido"
            required
            value={formData.last_name}
            onChange={handleChange}
            error={errors.last_name || []}
          />
          <FormField
            id="identification_type"
            name="identification_type"
            label="Tipo de Identificación"
            required
            type="select"
            options={[
              { value: "CC", label: "Cédula de Ciudadanía" },
              { value: "TI", label: "Tarjeta de Identidad" },
              { value: "CE", label: "Cédula de Extranjería" },
              // Agrega más opciones según sea necesario
            ]}
            value={formData.identification_type}
            onChange={handleChange}
            error={errors.identification_type || []}
          />
          <FormField
            id="identification_number"
            name="identification_number"
            label="Número de Identificación"
            required
            type="text"
            value={formData.identification_number}
            onChange={handleChange}
            error={errors.identification_number || []}
          />
          <FormField
            id="birthdate"
            name="birthdate"
            label="Fecha de Nacimiento"
            required
            type="date"
            value={formData.birthdate}
            onChange={handleChange}
            error={errors.birthdate || []}
          />
          <FormField
            id="phone_number"
            name="phone_number"
            label="Teléfono"
            required
            type="tel"
            value={formData.phone_number}
            onChange={handleChange}
            error={errors.phone_number || []}
          />
          <FormField
            id="address_departament"
            name="address_departament"
            label="Departamento"
            required
            type="text"
            value={formData.address_departament}
            onChange={handleChange}
            error={errors.address_departament || []}
          />
          <FormField
            id="address_city"
            name="address_city"
            label="Ciudad"
            required
            type="text"
            value={formData.address_city}
            onChange={handleChange}
            error={errors.address_city || []}
          />
          <FormField
            id="address_line"
            name="address_line"
            label="Línea de Dirección"
            required
            type="text"
            value={formData.address_line}
            onChange={handleChange}
            error={errors.address_line || []}
          />
          <FormField
            id="email"
            name="email"
            label="Email"
            required
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email || []}
          />
          {/* Campos adicionales según el tipo de usuario */}
          {additionalFields}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            className="bg-primary-100 text-white px-4 py-2 rounded-md shadow hover:bg-primary-200 transition"
          >
            Guardar Cambios
          </button>
          <button
            type="button"
            onClick={() => router.push('/profile')}
            className="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600 transition"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;