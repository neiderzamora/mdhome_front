"use client";

import React, { useState } from "react";

const GeoLocationTest = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: Number(position.coords.latitude.toFixed(8)),
            longitude: Number(position.coords.longitude.toFixed(8)),
          });
          setIsModalOpen(false);
        },
        (err) => {
          setError(err.message);
          setIsModalOpen(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setIsModalOpen(false);
    }
  };

  return (
    <div>
      <h2>Datos de Geolocalización</h2>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {location ? (
        <p>
          Latitud: {location.latitude}, Longitud: {location.longitude}
        </p>
      ) : (
        !error && <p>Obteniendo ubicación...</p>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl mb-4">Permitir Geolocalización</h3>
            <p className="mb-4">
              Para continuar, por favor permite el acceso a tu ubicación.
            </p>
            <button
              onClick={requestLocation}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Permitir
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeoLocationTest;