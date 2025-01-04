"use client"

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'nextjs-toast-notify';

const RequestService = () => {
    const [address, setAddress] = useState('');
    const [symptomInput, setSymptomInput] = useState('');
    const [symptoms, setSymptoms] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [savedAddresses, setSavedAddresses] = useState([]);
    const router = useRouter();

    const handleAddSymptom = () => {
        if (symptomInput.trim()) {
            setSymptoms([...symptoms, symptomInput]);
            setSymptomInput('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (address && symptoms.length > 0 && paymentMethod) {
            // Aquí deberías manejar la lógica de envío del formulario
            toast.success('Solicitud enviada con éxito.');
        } else {
            toast.error('Por favor, completa todos los campos requeridos.', {
                duration: 5000,
                progress: true,
                position: "top-center",
            });
        }
    };

    const handleAddAddress = () => {
        router.push('/addresses');
    };

    return (
        <div className="max-w-5xl mx-auto px-4 pt-44">
            <h1 className="text-4xl font-bold mb-4 text-primary-100">Solicitar Servicio</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <AddressSection 
                    address={address} 
                    setAddress={setAddress} 
                    savedAddresses={savedAddresses} 
                    handleAddAddress={handleAddAddress} 
                />
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

const AddressSection = ({ address, setAddress, savedAddresses, handleAddAddress }) => {
    const handleAddressChange = (e) => {
        const { value } = e.target;
        setAddress(value);
    };

    return (
        <div>
            <label className="block text-lg font-medium text-primary-100 mb-2">Agregar Dirección</label>
            <div className="flex items-center space-x-4">
                <select 
                    value={address} 
                    onChange={handleAddressChange} 
                    className="block border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-primary-100"
                >
                    <option value="">Selecciona una dirección</option>
                    {savedAddresses.map((addr, index) => (
                        <option key={index} value={addr}>
                            {addr}
                        </option>
                    ))}
                </select>
                <button 
                    type="button" 
                    onClick={handleAddAddress} 
                    className="bg-primary-100 text-white py-2 px-4 rounded shadow-lg hover:bg-primary-200 transition duration-300"
                >
                    Agregar
                </button>
            </div>
        </div>
    );
};

const SymptomsSection = ({ symptomInput, setSymptomInput, handleAddSymptom, symptoms }) => {
    return (
        <div>
            <label className="block text-lg font-medium text-primary-100 mb-2">Agregar Síntomas</label>
            <div className="flex items-center space-x-4">
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
                    className="bg-primary-100 text-white py-2 px-4 rounded shadow-lg hover:bg-primary-200 transition duration-300"
                >
                    Agregar
                </button>
            </div>
            <ul className="mt-4">
                {symptoms.map((symptom, index) => (
                    <li key={index} className="text-primary-100">{symptom}</li>
                ))}
            </ul>
        </div>
    );
};

const PaymentMethodSection = ({ paymentMethod, setPaymentMethod }) => {
    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    return (
        <div>
            <label className="block text-lg font-medium text-primary-100">Método de Pago</label>
            <select 
                value={paymentMethod} 
                onChange={handlePaymentMethodChange} 
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
            >
                <option value="">Selecciona un método de pago</option>
                <option value="credit-card">Tarjeta de Crédito</option>
                <option value="paypal">PayPal</option>
                <option value="bank-transfer">Transferencia Bancaria</option>
            </select>
        </div>
    );
};

export default RequestService;