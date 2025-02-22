"use client";

import React, { useContext, useState, useEffect } from "react";
import usePatientServiceHistory from "@/components/hooks/usePatientServiceHistory";
import { UserContext } from "@/context/UserContext";
import Link from "next/link";

const ServiceHistory = () => {
  const { user } = useContext(UserContext);
  const [token, setToken] = useState("");
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    status: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    setToken(localStorage.getItem("api_key"));
  }, []);

  const { serviceHistory, count, next, previous, loading, error } =
    usePatientServiceHistory(token, page, filters);

  // Si no hay token aún, mostrar loading
  if (!token)
    return <p className="text-center text-lg text-gray-600">Cargando...</p>;

  // Resto del código permanece igual...
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    setPage(1);
  };

  const handleNextPage = () => {
    if (next) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (previous) {
      setPage(page - 1);
    }
  };

  if (loading)
    return (
      <p className="text-center text-lg text-gray-600">
        Cargando historial de servicios...
      </p>
    );

  if (error)
    return (
      <p className="text-center text-red-500">
        Error: {error.message || "Ha ocurrido un error"}
      </p>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 pt-36 lg:pt-44">
      <h1 className="text-3xl font-bold mb-6 text-primary-100">
        Historial de Servicios
      </h1>
      {/* Sección de Filtros */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Filtro por Fecha de Inicio */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Fecha de Inicio:
            </label>
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Filtro por Fecha de Fin */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Fecha de Fin:
            </label>
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          {/* Botón para Resetear Filtros */}
          <div className="flex items-end justify-start">
            <button
              onClick={() =>
                setFilters({ status: "", startDate: "", endDate: "" })
              }
              className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
            >
              Resetear Filtros
            </button>
          </div>
        </div>
      </div>

      {serviceHistory.length === 0 ? (
        <p className="text-center text-gray-600">
          No tienes servicios aceptados.
        </p>
      ) : (
        <>
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="py-3 px-6 bg-primary-200 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Doctor
                  </th>
                  <th className="py-3 px-6 bg-primary-200 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Fecha y Hora
                  </th>
                  <th className="py-3 px-6 bg-primary-200 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Dirección
                  </th>
                  <th className="py-3 px-6 bg-primary-200 text-center text-xs font-medium text-white uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {serviceHistory.map((service) => (
                  <tr key={service.id} className="border-t">
                    <td className="py-4 px-6 text-sm text-gray-700">
                      {`${service.doctor.first_name} ${service.doctor.last_name}`}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-700">
                      {new Date(service.created_at).toLocaleDateString("es-ES")}{" "}
                      {new Date(service.created_at).toLocaleTimeString("es-ES")}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-700">
                      {service.location.line_address}
                    </td>
                    <td className="py-4 px-6 text-sm text-center">
                      <Link href={`/patient/service-history/${service.id}`}>
                        <p className="text-blue-500 hover:underline">
                          Ver Detalles
                        </p>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Sección de Paginación */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={handlePreviousPage}
              disabled={!previous}
              className={`py-2 px-4 rounded-md ${
                previous
                  ? "bg-primary-500 text-white hover:bg-primary-600"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              } transition-colors`}
            >
              Página Anterior
            </button>
            <span className="text-gray-700">
              Página {page} de {Math.ceil(count / 10)}
            </span>
            <button
              onClick={handleNextPage}
              disabled={!next}
              className={`py-2 px-4 rounded-md ${
                next
                  ? "bg-primary-500 text-white hover:bg-primary-600"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              } transition-colors`}
            >
              Siguiente Página
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ServiceHistory;
