"use client";

import React, { useState } from 'react';
import { toast } from 'nextjs-toast-notify';
import { useRouter } from 'next/navigation';
import { completeServiceRequest } from '@/api/service_api';
import "nextjs-toast-notify/dist/nextjs-toast-notify.css";

const InputField = ({ label, type, value, onChange, placeholder, name, isTextArea }) => (
    <div>
        <label className="block text-lg font-medium text-primary-100">{label}</label>
        {isTextArea ? (
            <textarea
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="border p-2 mt-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-primary-100 resize-none"
                name={name}
                rows={3} // Puedes ajustar el número de filas iniciales
            />
        ) : (
            <input 
                type={type} 
                value={value} 
                onChange={onChange} 
                placeholder={placeholder} 
                className="border p-2 mt-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-primary-100"
                name={name}
            />
        )}
    </div>
);

const ServiceEndForm = ({ requestId }) => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        inability: '',
        inability_days: '',
        observations: '',
        cie10_code: '',
        cie10_description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.inability || !formData.inability_days) {
            toast.error("Por favor, complete todos los campos obligatorios.", {
                position: "top-right",
                duration: 3000,
            });
            return;
        }

        try {
            const response = await completeServiceRequest(requestId, formData);
            
            toast.success(response.message || 'Servicio finalizado con éxito', {
                position: "top-right",
                duration: 3000,
            });

            // Redireccionar al dashboard después de completar
            router.push('/dashboard');
        } catch (error) {
            toast.error("Error al finalizar el servicio.", {
                position: "top-right",
                duration: 3000,
            });
            console.error("Error:", error);
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 pt-44">
            <h1 className="text-4xl font-bold mb-4 text-primary-100">Finalizar Servicio</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <InputField 
                    label="Incapacidad"
                    type="text"
                    value={formData.inability}
                    onChange={handleChange}
                    placeholder="Descripción de la incapacidad"
                    name="inability"
                />
                <InputField 
                    label="Días de Incapacidad"
                    type="number"
                    value={formData.inability_days}
                    onChange={handleChange}
                    placeholder="Número de días"
                    name="inability_days"
                />
                <InputField 
                    label="Observaciones"
                    type="text"
                    value={formData.observations}
                    onChange={handleChange}
                    placeholder="Observaciones adicionales"
                    name="observations"
                    isTextArea={true}
                />
                <InputField 
                    label="Código CIE10"
                    type="text"
                    value={formData.cie10_code}
                    onChange={handleChange}
                    placeholder="Código CIE10"
                    name="cie10_code"
                />
                <InputField 
                    label="Descripción CIE10"
                    type="text"
                    value={formData.cie10_description}
                    onChange={handleChange}
                    placeholder="Descripción CIE10"
                    name="cie10_description"
                    isTextArea={true}
                />
                <button 
                    type="submit" 
                    className="bg-primary-100 text-white py-2 px-4 rounded w-full sm:w-auto"
                >
                    Finalizar Servicio
                </button>
            </form>
        </div>
    );
};

export default ServiceEndForm;