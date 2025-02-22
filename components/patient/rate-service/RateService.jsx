"use client";

import React, { useState } from "react";
import { toast } from "nextjs-toast-notify";
import { rateServiceRequest } from "@/api/service_api";
import { useRouter } from "next/navigation";
import "nextjs-toast-notify/dist/nextjs-toast-notify.css";

const RateServiceSection = ({ requestId }) => {
  const router = useRouter();
  const [rating, setRating] = useState(undefined);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await rateServiceRequest(requestId, { rating, comment });
      toast.success("Servicio calificado con éxito", {
        position: "top-center",
        duration: 3000,
      });
      router.push("/request-service");
    } catch (error) {
      toast.error("Error al calificar el servicio", {
        position: "top-center",
        duration: 3000,
      });
      console.error("Error al calificar:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 pt-44">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold mb-6 text-primary-100">
          Califica el servicio
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-primary-100 mb-2">
              Puntuación (1-5)
            </label>
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="border p-2 mt-1 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-primary-100"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-primary-100 mb-2">
              Comentarios
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="border p-2 mt-1 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-primary-100"
              rows={4}
              required
            />
          </div>
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-primary-100 text-white px-6 py-2 rounded-md hover:bg-primary-200 transition-colors duration-300"
            >
              Enviar Calificación
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RateServiceSection;