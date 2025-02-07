"use client"

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import ReactDOMServer from "react-dom/server";
import { FaLocationDot } from "react-icons/fa6";
import { FaUserDoctor } from "react-icons/fa6";
import 'leaflet/dist/leaflet.css';

// Delete default icon settings
delete L.Icon.Default.prototype._getIconUrl;

// Configure default marker icon
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

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

const doctorIcon = L.divIcon({
  html: ReactDOMServer.renderToString(
      <div style={{ filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.5))", display: "inline-block" }}>
        <FaUserDoctor color="#042159" size={30} />
      </div>
    ),
iconSize: [30, 30],
className: "custom-div-icon", // Clear default styles with custom CSS if needed.
iconAnchor: [10, 20],
popupAnchor: [0, -40],
});


const MapView = ({ doctorPosition, arrivalPosition }) => {
  const [route, setRoute] = useState([]);

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const response = await axios.get(
          `https://router.project-osrm.org/route/v1/driving/${doctorPosition[1]},${doctorPosition[0]};${arrivalPosition[1]},${arrivalPosition[0]}?overview=full&geometries=geojson`
        );
        const routeData = response.data;
        setRoute(
          routeData.routes[0].geometry.coordinates.map((coord) => [
            coord[1],
            coord[0],
          ])
        );
      } catch (error) {
        console.error("Error fetching route:", error);
      }
    };

    fetchRoute();
  }, [doctorPosition, arrivalPosition]);

  return (
    <MapContainer
      center={doctorPosition}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer 
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={doctorPosition} icon={doctorIcon}>
        <Popup>Doctor en camino</Popup>
      </Marker>
      <Marker position={arrivalPosition} icon={patientIcon}>
        <Popup>Ubicación del paciente</Popup>
      </Marker>
      {route.length > 0 && <Polyline positions={route} color="darkblue" />}
    </MapContainer>
  );
};

export default MapView;