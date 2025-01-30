"use client";

import React, { createContext, useState, useEffect } from "react";
import {
  getPatientByEmail,
  getDoctorByEmail,
  RefreshToken,
} from "@/api/service_api";
import { useRouter } from "next/navigation";
import { toast } from "nextjs-toast-notify";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [sessionExpiring, setSessionExpiring] = useState(false);

  const refreshUserSession = async () => {
    try {
      const response = await RefreshToken();
      if (response.access_token) {
        localStorage.setItem("api_key", response.access_token);
        await fetchUserData();
        setSessionExpiring(false);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error al refrescar la sesión:", error);
      return false;
    }
  };

  /**
   * Fetches the user data.
   * @param {boolean} doRedirect - If true, redirects the user based on their group after fetching data.
   */
  const fetchUserData = async (doRedirect = false) => {
    const token = localStorage.getItem("api_key");
    const email = localStorage.getItem("user_email");

    if (token && email) {
      try {
        let userDetails = null;
        let userType = null;

        // Intentar obtener los datos como paciente
        try {
          const patientData = await getPatientByEmail(email, token);
          if (patientData) {
            userDetails = patientData;
            userType = "patient";
            localStorage.setItem("patient_id", userDetails.id);
            // console.log("Usuario identificado como Paciente:", userDetails);
          }
        } catch (error) {
          if (error.response && error.response.status === 403) {
            console.log(
              "Permiso denegado al intentar obtener datos como Paciente."
            );
          } else {
            console.error("Error al obtener paciente por email:", error);
            toast.error("Error al obtener datos del paciente.", {
              duration: 3000,
            });
          }
        }

        // Si no es paciente, intentar como doctor
        if (!userDetails) {
          try {
            const doctorData = await getDoctorByEmail(email, token);
            if (doctorData) {
              userDetails = doctorData;
              userType = "doctor";
              localStorage.setItem("doctor_id", userDetails.id);
              // console.log("Usuario identificado como Doctor:", doctorData);
            }
          } catch (error) {
            if (error.response && error.response.status === 403) {
              console.log(
                "Permiso denegado al intentar obtener datos como Doctor."
              );
            } else {
              console.error("Error al obtener doctor por email:", error);
              toast.error("Error al obtener datos del doctor.", {
                duration: 3000,
              });
            }
          }
        }

        if (userDetails) {
          setUser({ ...userDetails, type: userType });

          if (doRedirect) {
            const userGroups = userDetails.groups || [];

            if (userGroups.includes(1)) {
              // Si el usuario pertenece al grupo 2 (Doctor), redirigir a /dashboard
              router.push("/dashboard");
            } else if (userGroups.includes(2)) {
              // Si el usuario pertenece al grupo 1 (Paciente), redirigir a /request-service
              router.push("/request-service");
            } else {
              // Opcional: manejar otros grupos o usuarios sin grupo asignado
              console.warn(
                "El usuario no pertenece a ningún grupo conocido."
              );
            }
          }
        } else {
          console.error(
            "Usuario no encontrado como Paciente ni como Doctor."
          );
          toast.error("Usuario no encontrado.", { duration: 3000 });
        }
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
        toast.error("Error al obtener los datos del usuario.", {
          duration: 3000,
        });
      }
    } else {
      console.log("No se encontró token o email en localStorage.");
    }
  };

  useEffect(() => {
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("api_key");
    localStorage.removeItem("user_email");
    localStorage.removeItem("doctor_id");
    localStorage.removeItem("patient_id");
    localStorage.removeItem("refresh_token");
    toast.success("Has cerrado sesión exitosamente.", { duration: 3000 });
    router.push("/sign-in"); // Redirigir al inicio de sesión después de cerrar sesión
  };

  return (
    <UserContext.Provider
      value={{
        user,
        fetchUserData,
        logout,
        refreshUserSession,
        sessionExpiring,
        setSessionExpiring,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};