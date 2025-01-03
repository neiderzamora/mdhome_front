"use client";

import React, { useState } from 'react';
import { toast } from 'nextjs-toast-notify';
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

const ServiceEndForm = () => {
    const [formData, setFormData] = useState({
        incapacity: '',
        daysOfIncapacity: '',
        observations: '',
        cie10Code: '',
        cie10Description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!formData.incapacity || !formData.daysOfIncapacity) {
            toast.error("Por favor, complete todos los campos obligatorios.", {
                position: "top-right", // Cambia la posición del toast
                duration: 3000, // Duración en milisegundos
            });
            return;
        }

        console.log(formData);
        toast.success('Formulario enviado con éxito', {
            position: "top-right", // Cambia la posición del toast
            duration: 3000, // Duración en milisegundos
        });

        // Aquí puedes agregar la lógica para enviar los datos a la API o manejar el formulario
    };

    return (
        <div className="max-w-5xl mx-auto px-4 pt-44">
            <h1 className="text-4xl font-bold mb-4 text-primary-100">Finalizar Servicio</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <InputField 
                    label="Incapacidad"
                    type="text"
                    value={formData.incapacity}
                    onChange={handleChange}
                    placeholder="Descripción de la incapacidad"
                    name="incapacity"
                />
                <InputField 
                    label="Días de Incapacidad"
                    type="number"
                    value={formData.daysOfIncapacity}
                    onChange={handleChange}
                    placeholder="Número de días"
                    name="daysOfIncapacity"
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
                    value={formData.cie10Code}
                    onChange={handleChange}
                    placeholder="Código CIE10"
                    name="cie10Code"
                />
                <InputField 
                    label="Descripción CIE10"
                    type="text"
                    value={formData.cie10Description}
                    onChange={handleChange}
                    placeholder="Descripción CIE10"
                    name="cie10Description"
                    isTextArea={true} // Indica que este campo es un textarea
                />
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

export default ServiceEndForm;