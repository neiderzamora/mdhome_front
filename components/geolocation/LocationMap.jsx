"use client";

import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import ReactDOMServer from "react-dom/server";
import { FaLocationDot } from "react-icons/fa6";
import "leaflet/dist/leaflet.css";

// Create a custom patient icon using a react-icon (FaUser) rendered to string.
const patientIcon = L.divIcon({
    html: ReactDOMServer.renderToString(
        <div style={{ filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.5))", display: "inline-block" }}>
          <FaLocationDot color="#f00" size={30} />
        </div>
      ),
  iconSize: [30, 30],
  className: "custom-div-icon", // Clear default styles with custom CSS if needed.
  iconAnchor: [10, 20],
  popupAnchor: [0, -40],
});

const LocationMap = ({
  initialPosition = [4.142, -73.626],
  onLocationSelect,
}) => {
  const [selectedPosition, setSelectedPosition] = useState(initialPosition);

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
        {selectedPosition && (
          <Marker position={selectedPosition} icon={patientIcon} />
        )}
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