"use client";

import Link from "next/link";
import React, { useState } from "react";

const ServiceHistory = () => {
  const services = [
    {
      id: 1,
      fullName: "Juan Pérez",
      dateTime: "2023-10-01 10:30",
      address: "Calle 123, Barrio Central",
    },
    {
      id: 2,
      fullName: "María Gómez",
      dateTime: "2023-10-02 14:00",
      address: "Avenida 456, Barrio Norte",
    },
    // Agrega más servicios según sea necesario
  ];

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleServiceClick = (id) => {
    // Aquí puedes navegar a la página de detalle del servicio
    // Por ejemplo: history.push(`/service-history/${id}`);
  };

  const filteredServices = services.filter((service) => {
    const serviceDate = new Date(service.dateTime);
    const start = new Date(startDate);
    const end = new Date(endDate);
    return (
      (!startDate || serviceDate >= start) && (!endDate || serviceDate <= end)
    );
  });

  return (
    <div className="max-w-5xl mx-auto px-4 pt-44">
      <h1 className="text-4xl font-bold mb-4 text-primary-100">
        Historial de Servicios
      </h1>

      <div className="mb-4">
        <label className="block mb-2 text-gray-700">Fecha de Inicio:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2 rounded-lg w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-gray-700">Fecha de Fin:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-2 rounded-lg w-full"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {filteredServices.map((service) => (
          <Link
            href="./history-service/detail"
            key={service.id}
            className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            onClick={() => handleServiceClick(service.id)}
          >
            <h2 className="text-xl font-semibold">{service.fullName}</h2>
            <p className="text-gray-600">Fecha y Hora: {service.dateTime}</p>
            <p className="text-gray-600">Dirección: {service.address}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ServiceHistory;
