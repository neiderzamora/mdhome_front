"use client";

import { useState, useEffect } from "react";

const ObtainGeolocation = ({ onLocation }) => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = {
            latitude: Number(position.coords.latitude.toFixed(8)),
            longitude: Number(position.coords.longitude.toFixed(8)),
          };
          setLocation(loc);
          if (onLocation) {
            onLocation(loc);
          }
        },
        (err) => {
          setError(err.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, [onLocation]);

  // No se renderiza nada en la UI, solo se obtiene la ubicación
  return null;
};

export default ObtainGeolocation;