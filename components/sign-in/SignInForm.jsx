"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { toast } from "nextjs-toast-notify";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(formData);
      localStorage.setItem("user_email", formData.email);
      await fetchUserData();
      toast.success("Inicio de sesión exitoso", {
        duration: 5000,
        position: "top-center",
      });
      router.push("/");
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Error durante el inicio de sesión";
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
          <label htmlFor="email" className="block text-lg font-medium text-gray-900">
            Correo electrónico
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              className="block border p-2 mt-2 w-full"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-lg font-medium text-gray-900">
            Contraseña
          </label>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              className="block border p-2 mt-2 w-full"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-primary-100 px-3 py-1.5 text-lg font-semibold text-white shadow-sm hover:bg-primary-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-100"
          >
            Iniciar Sesión
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;