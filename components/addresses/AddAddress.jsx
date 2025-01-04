"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const AddAddress = () => {
    const [address, setAddress] = useState({
        department: '',
        city: '',
        line: '',
        neighborhood: '',
        description: ''
    });
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress(prevAddress => ({ ...prevAddress, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí deberías guardar la nueva dirección en tu base de datos o estado global
        // Luego redirigir de vuelta a la página de solicitud de servicio
        router.push('/request-service');
    };

    const addressFields = [
        { name: 'department', placeholder: 'Departamento' },
        { name: 'city', placeholder: 'Ciudad' },
        { name: 'line', placeholder: 'Línea de Dirección' },
        { name: 'neighborhood', placeholder: 'Barrio' },
        { name: 'description', placeholder: 'Descripción' }
    ];

    return (
        <div className="max-w-5xl mx-auto px-4 pt-44">
            <h1 className="text-4xl font-bold mb-4 text-primary-100">Agregar Nueva Dirección</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                {addressFields.map(field => (
                    <input 
                        key={field.name}
                        type="text" 
                        name={field.name} 
                        value={address[field.name]} 
                        onChange={handleChange} 
                        placeholder={field.placeholder} 
                        className="border p-2 mt-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-primary-100"
                    />
                ))}
                <button type="submit" className="mt-4 bg-primary-100 text-lg text-white py-2 px-6 rounded shadow-lg hover:bg-primary-200 transition duration-300">
                    Guardar
                </button>
            </form>
        </div>
    );
};

export default AddAddress;