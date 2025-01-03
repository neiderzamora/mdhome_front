"use client";

import React, { useState } from 'react';
import { toast } from 'nextjs-toast-notify';
import "nextjs-toast-notify/dist/nextjs-toast-notify.css";

const FailedService = () => {
    const [selectedReason, setSelectedReason] = useState('');
    const reasons = [
        "Paciente no disponible",
        "Problemas de transporte",
        "Condiciones climáticas adversas",
        "Error en la dirección",
        "Otro"
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedReason) {
            toast.error("Por favor, selecciona una razón.", {
                position: "top-right",
                duration: 3000,
            });
            return;
        }

        // Aquí puedes agregar la lógica para enviar la razón seleccionada
        console.log("Razón seleccionada:", selectedReason);
        toast.success('Razón enviada con éxito', {
            position: "top-right",
            duration: 3000,
        });
    };

    return (
        <div className="max-w-5xl mx-auto px-4 pt-44">
            <h1 className="text-4xl font-bold mb-4 text-primary-100">Selecciona la Razón de No Llegada</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Elige una razón</h2>
                    <ul className="space-y-2">
                        {reasons.map((reason, index) => (
                            <li key={index} className="flex items-center">
                                <input
                                    type="radio"
                                    id={`reason-${index}`}
                                    name="reason"
                                    value={reason}
                                    onChange={(e) => setSelectedReason(e.target.value)}
                                    className="mr-2"
                                />
                                <label htmlFor={`reason-${index}`} className="text-gray-800">{reason}</label>
                            </li>
                        ))}
                    </ul>
                </div>
                <button 
                    type="submit" 
                    className="bg-primary-100 text-white py-2 px-4 rounded w-full sm:w-auto"
                >
                    Enviar
                </button>
            </form>
        </div>
    );
};

export default FailedService;