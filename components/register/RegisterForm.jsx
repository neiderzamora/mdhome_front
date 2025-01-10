"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "nextjs-toast-notify";
import "nextjs-toast-notify/dist/nextjs-toast-notify.css";

import Logo from "../sign-in/Logo";
import { createPatient } from "@/api/service_api";
import { SelectField } from "./SelectField";
import { InputField } from "./InputField";

const formatDate = (dateString) => {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
};

export default function RegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    identification_type: "",
    identification_number: "",
    birthdate: "",
    gender: "",
    phone_number: "",
    address_line: "",
    eps: "",
    prepaid_medicine: "",
    password: "",
    password2: "",
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validación simple
    if (!formData.first_name || !formData.email || !formData.password) {
      toast.error("Por favor, completa todos los campos requeridos.", {
        duration: 5000,
        position: "top-center",
      });
      return;
    }

    // Validación de términos y condiciones
    if (!formData.termsAccepted) {
      toast.error("Debes aceptar los términos y condiciones.", {
        duration: 5000,
        position: "top-center",
      });
      return;
    }

    // Formatear la fecha de nacimiento
    const formattedData = {
      ...formData,
      birthdate: formatDate(formData.birthdate),
    };

    //console.log("Datos del formulario:", formattedData);

    try {
      const response = await createPatient(formattedData);
      toast.success("Registro exitoso!", {
        duration: 5000,
        position: "top-center",
      });
      router.push("/sign-in");
      //console.log('Response:', response);
    } catch (error) {
      const errorMessage = error.error || 'Error durante el registro';
      if (typeof error === 'object') {
        Object.keys(error).forEach((key) => {
          if (Array.isArray(error[key])) {
            error[key].forEach((msg) => {
              toast.error(`${msg}`, {
                duration: 5000,
                position: "top-center",
              });
            });
          } else {
            toast.error(`${error[key]}`, {
              duration: 5000,
              position: "top-center",
            });
          }
        });
      } else {
        toast.error(errorMessage, {
          duration: 5000,
          position: "top-center",
        });
      }
      //console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 py-8 lg:px-6 lg:py-12">
      <Logo />
      <form onSubmit={handleSubmit} className="w-full max-w-5xl space-y-8">
        {/* Sección de Información Personal */}
        <fieldset className="border p-4 rounded-md">
          <legend className="text-xl font-bold text-primary-100">
            Información Personal
          </legend>
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <InputField
              id="first_name"
              name="first_name"
              label="Nombre"
              required
              value={formData.first_name}
              onChange={handleChange}
            />
            <InputField
              id="last_name"
              name="last_name"
              label="Apellido"
              required
              value={formData.last_name}
              onChange={handleChange}
            />
            <InputField
              id="identification_number"
              name="identification_number"
              label="Número de Identificación"
              required
              value={formData.identification_number}
              onChange={handleChange}
            />
            <SelectField
              id="identification_type"
              name="identification_type"
              label="Tipo de Identificación"
              required
              options={[
                { value: "CC", label: "Cédula de Ciudadanía" },
                { value: "TI", label: "Tarjeta de Identidad" },
                { value: "CE", label: "Cédula de Extranjería" },
              ]}
              value={formData.identification_type}
              onChange={handleChange}
            />
            <InputField
              id="birthdate"
              name="birthdate"
              type="date"
              label="Fecha de Nacimiento"
              required
              value={formData.birthdate}
              onChange={handleChange}
            />
            <SelectField
              id="gender"
              name="gender"
              label="Género"
              required
              options={[
                { value: "MASCULINO", label: "Masculino" },
                { value: "FEMENINO", label: "Femenino" },
                { value: "OTRO", label: "Otro" },
              ]}
              value={formData.gender}
              onChange={handleChange}
            />
          </div>
        </fieldset>

        {/* Sección de Contacto */}
        <fieldset className="border p-4 rounded-md">
          <legend className="text-xl font-bold text-primary-100">
            Información de Contacto
          </legend>
          <div className=" grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <InputField
              id="phone_number"
              name="phone_number"
              type="tel"
              label="Teléfono"
              required
              value={formData.phone_number}
              onChange={handleChange}
            />
            <InputField
              id="address_line"
              name="address_line"
              type="text"
              label="Dirección"
              placeholder="Barrio - dirección"
              required
              value={formData.address_line}
              onChange={handleChange}
            />
            <InputField
              id="email"
              name="email"
              type="email"
              label="Correo Electrónico"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </fieldset>

        {/* Sección de Salud */}
        <fieldset className="border p-4 rounded-md">
          <legend className="text-xl font-bold text-primary-100">
            Información de Salud
          </legend>
          <div className=" grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <InputField
              id="eps"
              name="eps"
              label="EPS"
              required
              value={formData.eps}
              onChange={handleChange}
            />
            <InputField
              id="prepaid_medicine"
              name="prepaid_medicine"
              label="Medicina Prepagada"
              required
              value={formData.prepaid_medicine}
              onChange={handleChange}
            />
          </div>
        </fieldset>

        {/* Sección de Contraseña */}
        <fieldset className="border p-4 rounded-md">
          <legend className="text-xl font-bold text-primary-100">
            Contraseña
          </legend>
          <div className=" grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <InputField
              id="password"
              name="password"
              type="password"
              label="Contraseña"
              required
              value={formData.password}
              onChange={handleChange}
            />
            <InputField
              id="password2"
              name="password2"
              type="password"
              label="Confirmar Contraseña"
              required
              value={formData.password2}
              onChange={handleChange}
            />
          </div>
        </fieldset>

        {/* Aceptación de Términos */}
        <div className="flex items-center">
          <input
            id="termsAccepted"
            name="termsAccepted"
            type="checkbox"
            checked={formData.termsAccepted}
            onChange={handleChange}
            className="h-4 w-4 text-primary-100 border-gray-300 rounded"
          />
          <label htmlFor="termsAccepted" className="ml-2 block text-lg text-gray-900">
            Acepto los términos y condiciones
          </label>
        </div>

        {/* Botones de Envío */}
        <div className=" grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <button
            type="submit"
            className="sm:col-span-1 bg-primary-100 text-white font-bold text-center py-2 rounded-lg text-lg hover:bg-primary-200 transition duration-300"
          >
            Registrarse
          </button>
          <div className="sm:col-span-1 bg-secondary-200 text-white font-bold text-center py-2 rounded-lg text-lg">
            <Link href="/sign-in">Iniciar Sesión</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
