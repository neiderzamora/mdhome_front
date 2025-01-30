"use client";

import React, { useState, useContext, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "nextjs-toast-notify";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importar los iconos necesarios
import { loginUser } from "@/api/service_api";
import { UserContext } from "@/context/UserContext";
import "nextjs-toast-notify/dist/nextjs-toast-notify.css";

const SignInForm = () => {
  const { fetchUserData } = useContext(UserContext);
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const toggleShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(formData);
      localStorage.setItem("user_email", formData.email);
      await fetchUserData(true);
      toast.success("Inicio de sesión exitoso", {
        duration: 5000,
        position: "top-center",
      });
      //router.push("/request-service");
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || "Error durante el inicio de sesión";
      toast.error(errorMessage, {
        duration: 5000,
        position: "top-center",
      });
    }
  };

  return (
    <div className="mx-auto w-full max-w-sm">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-lg font-medium text-gray-900"
          >
            Correo electrónico
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="relative">
          <label
            htmlFor="password"
            className="block text-lg font-medium text-gray-900"
          >
            Contraseña
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute inset-y-0 right-0 mt-8 pr-3 flex items-center text-gray-600 focus:outline-none"
            aria-label={
              showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
            }
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-primary-100 text-white py-2 px-4 rounded hover:bg-primary-200 transition-colors"
        >
          Iniciar Sesión
        </button>

        <div className="text-center">
          <Link href="/register" className="text-blue-500 hover:underline">
            ¿No tienes una cuenta? Regístrate
          </Link>
        </div>
      </form>
    </div>
  );
};

export default React.memo(SignInForm);
