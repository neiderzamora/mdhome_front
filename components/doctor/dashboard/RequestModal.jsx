// components/dashboard/RequestModal.jsx

import React from "react";
import { FaTimes } from "react-icons/fa";

const RequestModal = ({ request, onClose }) => {
  if (!request) return null; // Asegura que el request exista antes de renderizar

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <span className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer" onClick={onClose}>
          <FaTimes size={20} />
        </span>
        <h2 className="text-2xl font-bold mb-4">Detalles de la Solicitud</h2>

        <p>
          <strong>Género:</strong> {request.patient.gender}
        </p>
        <p>
          <strong>Edad:</strong> {request.patient.age}
        </p>

        <p>
          <strong>Barrio:</strong> {request.location_detail.neighborhood}
        </p>

        <p>
          <strong>Síntomas:</strong> {request.symptoms}
        </p>

        <p>
          <strong>Tipo de Pago:</strong> {request.type_payment}
        </p>
        <p>
          <strong>Estado:</strong> {request.status}
        </p>
        <p>
          <strong>Fecha de Creación:</strong> {new Date(request.created_at).toLocaleString('es-ES')}
        </p>

        <button
          onClick={onClose}
          className="mt-4 bg-primary-100 text-white py-2 px-4 rounded w-full sm:w-auto hover:bg-primary-600 transition-colors"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default RequestModal;
