"use client";

import React from 'react';
import PropTypes from 'prop-types';
import { FaCalendar, FaClock, FaHome, FaUser  } from 'react-icons/fa';

const PatientInfo = ({ firstName, lastName, date, time, street, neighborhood }) => (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
        <h2 className="text-xl font-semibold mb-2">Información del Paciente</h2>
        <div className="flex items-center mb-2">
            <FaUser  className="text-primary-100 mr-2" />
            <span className="text-gray-800 font-medium">Nombre: </span>
            <span className="text-gray-600">{firstName} {lastName}</span>
        </div>
        <div className="flex items-center mb-2">
            <FaCalendar className="text-primary-100 mr-2" />
            <span className="text-gray-800 font-medium">Fecha: </span>
            <span className="text-gray-600">{date}</span>
        </div>
        <div className="flex items-center mb-2">
            <FaClock className="text-primary-100 mr-2" />
            <span className="text-gray-800 font-medium">Hora: </span>
            <span className="text-gray-600">{time}</span>
        </div>
        <div className="flex items-center mb-2">
            <FaHome className="text-primary-100 mr-2" />
            <span className="text-gray-800 font-medium">Dirección: </span>
            <span className="text-gray-600">{street}, {neighborhood}</span>
        </div>
    </div>
);

const IncapacityDetails = ({ incapacity, daysOfIncapacity, observations, cie10Code, cie10Description }) => (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">Detalles de la Incapacidad</h2>
        <p className="text-gray-800 font-medium">Incapacidad: <span className="text-gray-600">{incapacity}</span></p>
        <p className="text-gray-800 font-medium">Días de Incapacidad: <span className="text-gray-600">{daysOfIncapacity}</span></p>
        <p className="text-gray-800 font-medium">Observaciones: <span className="text-gray-600">{observations}</span></p>
        <p className="text-gray-800 font-medium">Código CIE-10: <span className="text-gray-600">{cie10Code}</span></p>
        <p className="text-gray-800 font-medium">Descripción CIE-10: <span className="text-gray-600">{cie10Description}</span></p>
    </div>
);

const ServiceHistoryDetail = () => {
    // Simulación de datos del servicio
    const serviceDetails = {
        firstName: "Andres",
        lastName: "Gómez",
        date: "2023-10-02",
        time: "14:00",
        street: "Avenida 456",
        neighborhood: "Barrio Norte",
        incapacity: "Fiebre alta",
        daysOfIncapacity: 5,
        observations: "Requiere reposo absoluto.",
        cie10Code: "A00",
        cie10Description: "Cólera",
    };

    return (
        <div className="max-w-5xl mx-auto px-4 pt-44">
            <h1 className="text-4xl font-bold mb-4 text-primary-100">Detalles del Servicio</h1>
            <div className="p-4 rounded-lg shadow-md bg-white">
                <PatientInfo 
                    firstName={serviceDetails.firstName} 
                    lastName={serviceDetails.lastName} 
                    date={serviceDetails.date} 
                    time={serviceDetails.time} 
                    street={serviceDetails.street} 
                    neighborhood={serviceDetails.neighborhood} 
                />
                <IncapacityDetails 
                    incapacity={serviceDetails.incapacity} 
                    daysOfIncapacity={serviceDetails.daysOfIncapacity} 
                    observations={serviceDetails.observations} 
                    cie10Code={serviceDetails.cie10Code} 
                    cie10Description={serviceDetails.cie10Description} 
                />
            </div>
        </div>
    );
};

// Prop Types for better type safety
PatientInfo.propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    street: PropTypes.string.isRequired,
    neighborhood: PropTypes.string.isRequired,
};

IncapacityDetails.propTypes = {
    incapacity: PropTypes.string.isRequired,
    daysOfIncapacity: PropTypes.number.isRequired,
    observations: PropTypes.string.isRequired,
    cie10Code: PropTypes.string.isRequired,
    cie10Description: PropTypes.string.isRequired,
};

export default ServiceHistoryDetail;