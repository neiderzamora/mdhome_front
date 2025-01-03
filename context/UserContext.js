"use client";

import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUserData = async () => {
    const token = localStorage.getItem("api_key");
    const email = localStorage.getItem("user_email");
    if (token && email) {
      try {
        let userDetails;

        // Intentar obtener los datos del usuario como paciente
        try {
          const patientResponse = await axios.get("http://127.0.0.1:8000/api/patient/", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log("Patient data fetched:", patientResponse.data);
          if (Array.isArray(patientResponse.data.results)) {
            userDetails = patientResponse.data.results.find(user => user.email === email);
          }
        } catch (error) {
          if (error.response && error.response.status === 403) {
            console.log("No permissions for patient, trying doctor...");
            // Si no se encuentra como paciente, intentar obtener los datos como doctor
            const doctorResponse = await axios.get("http://127.0.0.1:8000/api/doctor/", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            console.log("Doctor data fetched:", doctorResponse.data);
            if (Array.isArray(doctorResponse.data.results)) {
              userDetails = doctorResponse.data.results.find(user => user.email === email);
            }
          } else {
            throw error;
          }
        }

        if (userDetails) {
          console.log("User details fetched:", userDetails);
          setUser(userDetails);
        } else {
          console.error("User not found.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    } else {
      console.log("No token or email found in localStorage.");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("api_key");
    localStorage.removeItem("user_email");
  };

  return (
    <UserContext.Provider value={{ user, fetchUserData, logout }}>
      {children}
    </UserContext.Provider>
  );
};