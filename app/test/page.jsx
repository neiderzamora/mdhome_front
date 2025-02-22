"use client";

import React from "react";
import RateServiceSection from "@/components/patient/rate-service/RateService.jsx";

export default function RateServicePage() {
  // Puedes obtener el requestId según tu lógica
  const requestId = "b6b98275-83b7-444c-ad8d-24241fb6cd3f";

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Calificación del Servicio</h1>
      <RateServiceSection requestId={requestId} onRateComplete={() => console.log("Calificación completada")} />
    </div>
  );
}