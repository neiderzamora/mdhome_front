"use client";

import { useState, useEffect } from "react";

const ObtainGeolocation = ({ onLocation }) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    let intervalId;

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const loc = {
              latitude: Number(position.coords.latitude.toFixed(8)),
              longitude: Number(position.coords.longitude.toFixed(8)),
            };
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
    };

    // Get initial location and then update every 5 seconds.
    updateLocation();
    intervalId = setInterval(updateLocation, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [onLocation]);

  // No UI rendering, only obtaining geolocation.
  return null;
};

export default ObtainGeolocation;