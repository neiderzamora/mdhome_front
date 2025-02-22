"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";

const VehicleSelectionModal = React.memo(
  ({
    vehicles,
    selectedVehicle,
    setSelectedVehicle,
    handleConfirmVehicle,
    setShowVehicleModal,
    isLoading,
  }) => {
    const router = useRouter();

    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        aria-modal="true"
        role="dialog"
        aria-labelledby="vehicle-selection-title"
      >
        <div className="bg-white p-6 rounded-lg shadow-xl w-11/12 max-w-md mx-auto">
          <h2
            id="vehicle-selection-title"
            className="text-2xl font-semibold mb-4 text-gray-800"
          >
            Seleccionar Vehículo
          </h2>
          {vehicles.length > 0 ? (
            <>
              <label htmlFor="vehicle-select" className="sr-only">
                Seleccione un vehículo
              </label>
              <select
                id="vehicle-select"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white text-gray-800"
                value={selectedVehicle || ""}
                onChange={(e) => setSelectedVehicle(e.target.value)}
              >
                <option value="">Seleccione un vehículo</option>
                {vehicles.map((vehicle) => (
                  <option
                    key={vehicle.id}
                    value={vehicle.id}
                    className="bg-white"
                  >
                    {`${vehicle.brand} - ${vehicle.plate} (${vehicle.color})`}
                  </option>
                ))}
              </select>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => router.push("/dashboard/vehicle")}
                  className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                >
                  <FaPlus className="mr-2" /> Agregar
                </button>
                <button
                  onClick={handleConfirmVehicle}
                  className={`flex items-center px-4 py-2 bg-primary-100 text-white rounded-md hover:bg-primary-700 transition-colors ${
                    !selectedVehicle || isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={!selectedVehicle || isLoading}
                >
                  {isLoading ? (
                    <>
                      <ImSpinner2 className="animate-spin mr-2" /> Confirmando...
                    </>
                  ) : (
                    "Confirmar"
                  )}
                </button>
                <button
                  onClick={() => {
                    setShowVehicleModal(false);
                    setSelectedVehicle(null);
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </>
          ) : (
            <div className="text-center">
              <p className="text-gray-700 mb-6">
                No tienes vehículos registrados.
              </p>
              <button
                onClick={() => router.push("/dashboard/vehicle")}
                className="flex items-center justify-center px-4 py-2 bg-primary-100 text-white rounded-md hover:bg-primary-100/80 transition-colors mx-auto"
              >
                <FaPlus className="mr-2" /> Registrar Vehículo
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
);

VehicleSelectionModal.displayName = "VehicleSelectionModal";

export default VehicleSelectionModal;