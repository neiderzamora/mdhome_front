"use client";

import React, { useState, useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import ReactDOMServer from "react-dom/server";
import { FaLocationDot } from "react-icons/fa6";
import "leaflet/dist/leaflet.css";

const LocationMap = ({ initialPosition = [4.142, -73.626], onLocationSelect }) => {
  const [mounted, setMounted] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(initialPosition);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Crear el icono solo cuando se esté en el entorno cliente.
const patientIcon = L.icon({
  iconUrl:
    "/location_user.png",
  iconSize: [40, 40],
  className: "custom-div-icon",
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const lat = Number(e.latlng.lat.toFixed(8));
        const lng = Number(e.latlng.lng.toFixed(8));
        setSelectedPosition([lat, lng]);
        onLocationSelect && onLocationSelect({ latitude: lat, longitude: lng });
      },
    });
    return null;
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = Number(position.coords.latitude.toFixed(8));
          const lng = Number(position.coords.longitude.toFixed(8));
          setSelectedPosition([lat, lng]);
          onLocationSelect && onLocationSelect({ latitude: lat, longitude: lng });
        },
        (err) => {
          console.error("Error obtaining current location:", err);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    }
  };

  if (!mounted) return null;

  return (
    <div>
      <MapContainer
        center={selectedPosition}
        zoom={13}
        style={{ height: "300px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapClickHandler />
        {selectedPosition && <Marker position={selectedPosition} icon={patientIcon} />}
      </MapContainer>
      <div style={{ marginTop: "8px", textAlign: "center" }}>
        <button
          type="button"
          onClick={handleUseCurrentLocation}
          className="bg-primary-200 text-white px-4 py-2 rounded hover:bg-primary-200/80"
        >
          Usar ubicación actual
        </button>
      </div>
    </div>
  );
};

export default LocationMap;