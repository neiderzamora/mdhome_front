"use client";

import React, { useState, useEffect } from 'react';
import { FaUser, FaClock, FaMapMarkerAlt, FaStethoscope, FaInfoCircle } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const DoctorDashboard = () => {
    const [requests, setRequests] = useState([]);
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
    const [selectedRequest, setSelectedRequest] = useState(null);
    const router = useRouter();

    // Simulación de solicitudes de pacientes
    useEffect(() => {
        const simulatedRequests = [
            { 
                id: 1, 
                patientName: "Juan",
                patientLastName: "Pérez",
                address: "Calle 123, Barrio Central", 
                symptoms: ["Fiebre", "Tos"],
                age: 30,
                sex: "Masculino",
                documentType: "DNI",
                documentNumber: "12345678",
                phoneNumber: "123-456-7890"
            },
            { 
                id: 2, 
                patientName: "María",
                patientLastName: "Gómez",
                address: "Avenida 456, Barrio Norte", 
                symptoms: ["Dolor de cabeza"], 
                age: 25,
                sex: "Femenino",
                documentType: "Pasaporte",
                documentNumber: "A1234567",
                phoneNumber: "987-654-3210"
            },
        ];
        setRequests(simulatedRequests);

        // Actualizar la hora cada segundo
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleAcceptRequest = (requestId) => {
        router.push(`./dashboard/request/${requestId}`);
    };

    const handleViewDetails = (request) => {
        setSelectedRequest(request);
    };

    const handleCloseModal = () => {
        setSelectedRequest(null);
    };

    return (
        <div className="max-w-5xl mx-auto px-4 pt-44">
            <h1 className="text-4xl font-bold mb-4 text-primary-100">Panel del Doctor</h1>
            <div className="mb-6">
                <h2 className="text-2xl font-semibold"><FaClock className="inline mr-2" /> Hora Actual: {currentTime}</h2>
            </div>
            <div className="mb-6">
                <h2 className="text-2xl font-semibold">Solicitudes de Pacientes</h2>
                {requests.length > 0 ? (
                    <ul className="space-y-4">
                        {requests.map(request => (
                            <li key={request.id} className="border p-4 rounded-lg shadow-md">
                                <p><FaUser className="inline mr-2" /><strong>Paciente:</strong> {request.patientName} {request.patientLastName}</p>
                                <p><FaMapMarkerAlt className="inline mr-2" /><strong>Dirección:</strong> {request.address}</p>
                                <p><FaStethoscope className="inline mr-2" /><strong>Síntomas:</strong> {request.symptoms.join(', ')}</p>
                                <button 
                                    onClick={() => handleAcceptRequest(request.id)} 
                                    className="mt-2 bg-primary-100 text-white py-2 px-4 rounded w-full sm:w-auto mr-2"
                                >
                                    Aceptar Solicitud
                                </button>
                                <button 
                                    onClick={() => handleViewDetails(request)} 
                                    className="mt-2 bg-secondary-100 text-white py-2 px-4 rounded w-full sm:w-auto"
                                >
                                    Ver Detalles
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No hay solicitudes pendientes.</p>
                )}
            </div>

            {selectedRequest && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-2xl font-bold mb-4">Detalles de la Solicitud</h2>
                        <p><strong>Paciente:</strong> {selectedRequest.patientName} {selectedRequest.patientLastName}</p>
                        <p><strong>Edad:</strong> {selectedRequest.age}</p>
                        <p><strong>Sexo:</strong> {selectedRequest.sex}</p>
                        <p><strong>Dirección:</strong> {selectedRequest.address}</p>
                        <p><strong>Síntomas:</strong> {selectedRequest.symptoms.join(', ')}</p>
                        <p><strong>Tipo de Documento:</strong> {selectedRequest.documentType}</p>
                        <p><strong>Número de Documento:</strong> {selectedRequest.documentNumber}</p>
                        <p><strong>Número de Teléfono:</strong> {selectedRequest.phoneNumber}</p>
                        <button 
                            onClick={handleCloseModal} 
                            className="mt-4 bg-primary-100 text-white py-2 px-4 rounded w-full sm:w-auto"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DoctorDashboard;