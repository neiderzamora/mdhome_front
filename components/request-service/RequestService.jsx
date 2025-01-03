"use client";

import { toast } from 'nextjs-toast-notify';
import "nextjs-toast-notify/dist/nextjs-toast-notify.css";
import React, { useState, useEffect } from 'react';

const RequestService = () => {
    const [address, setAddress] = useState({ neighborhood: '', line: '', description: '' });
    const [symptoms, setSymptoms] = useState([]);
    const [symptomInput, setSymptomInput] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (message) {
            toast.success(message, {
                duration: 5000,
                progress: true,
                position: "top-center",
                transition: "popUp",
                icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>',
                sonido: false,
            });

            const timer = setTimeout(() => setMessage(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const handleAddSymptom = () => {
        if (symptomInput.trim()) {
            setSymptoms(prevSymptoms => [...prevSymptoms, symptomInput]);
            setSymptomInput('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (address.neighborhood && address.line && symptoms.length > 0) {
            console.log({ address, symptoms, paymentMethod });
            setMessage('Petición enviada al médico más cercano');
        } else {
            toast.error('Por favor, completa todos los campos requeridos.', {
                duration: 5000,
                progress: true,
                position: "top-center",
            });
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 pt-44">
            <h1 className="text-4xl font-bold mb-4 text-primary-100">Solicitar Servicio</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <AddressSection address={address} setAddress={setAddress} />
                <SymptomsSection 
                    symptomInput={symptomInput} 
                    setSymptomInput={setSymptomInput} 
                    handleAddSymptom={handleAddSymptom} 
                    symptoms={symptoms} 
                />
                <PaymentMethodSection paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
                <button type="submit" className="mt-4 bg-primary-100 text-lg text-white py-2 px-6 rounded shadow-lg hover:bg-primary-200 transition duration-300">
                    Enviar
                </button>
            </form>
        </div>
    );
};

const AddressSection = ({ address, setAddress }) => {
    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setAddress(prevAddress => ({ ...prevAddress, [name]: value }));
    };

    return (
        <div>
            <label className="block text-lg font-medium text-primary-100">Agregar Dirección</label>
            <input 
                type="text" 
                name="neighborhood" 
                value={address.neighborhood} 
                onChange={handleAddressChange} 
                placeholder="Barrio" 
                className="border p-2 mt-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-primary-100"
            />
            <input 
                type="text" 
                name="line" 
                value={address.line} 
                onChange={handleAddressChange} 
                placeholder="Linea de dirección" 
                className="border p-2 mt-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-primary-100"
            />
            <input 
                type="text" 
                name="description" 
                value={address.description} 
                onChange={handleAddressChange} 
                placeholder="Descripción" 
                className="border p-2 mt-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-primary-100"
            />
        </div>
    );
};

const SymptomsSection = ({ symptomInput, setSymptomInput, handleAddSymptom, symptoms }) => {
    return (
        <div>
            <label className="block text-lg font-medium text-primary-100">Agregar Síntomas</label>
            <div className="flex mt-2">
                <input 
                    type="text" 
                    value={symptomInput} 
                    onChange={(e) => setSymptomInput(e.target.value)} 
                    placeholder="Síntoma" 
                    className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-primary-100"
                />
                <button 
                    type="button" 
                    onClick={handleAddSymptom} 
                    className="ml-2 bg-primary-100 text-white py-2 px-4 rounded shadow-lg hover:bg-primary-200 transition duration-300"
                >
                    Agregar
                </button>
            </div>
            <ul className="mt-2">
                {symptoms.map((symptom, index) => (
                    <li key={index} className="border-b py-1">{symptom}</li>
                ))}
            </ul>
        </div>
    );
};

const PaymentMethodSection = ({ paymentMethod, setPaymentMethod }) => {
    return (
        <div>
            <label className="block text-lg font-medium text-primary-100">Método de Pago</label>
            <select 
                value={paymentMethod} 
                onChange={(e) => setPaymentMethod(e.target.value)} 
                className="border p-2 mt-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-primary-100"
            >
                <option value="card">Tarjeta</option>
                <option value="cash">Efectivo</option>
            </select>
        </div>
    );
};

export default RequestService;