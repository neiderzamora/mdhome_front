import React from 'react';
import { toast } from 'nextjs-toast-notify';
import { deleteVehicle } from '@/api/service_api';
import 'nextjs-toast-notify/dist/nextjs-toast-notify.css';

const DeleteVehicle = ({ vehicle, onDeleteVehicle, onCancel }) => {
  const showSuccessToast = (message) => {
    toast.success(message, {
      position: 'top-center',
      duration: 3000,
    });
  };

  const showErrorToast = (message) => {
    toast.error(message, {
      position: 'top-center',
      duration: 3000,
    });
  };

  const handleDelete = async () => {
    try {
      await deleteVehicle(vehicle.id);
      onDeleteVehicle(vehicle.id);
      showSuccessToast('Vehículo eliminado con éxito.');
    } catch (error) {
      showErrorToast('Error al eliminar el vehículo.');
      console.error('Error en handleDelete:', error);
    }
  };

  if (!vehicle) {
    return <div>No se ha seleccionado un vehículo para eliminar.</div>;
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Eliminar Vehículo</h2>
      <p>¿Estás seguro de que deseas eliminar el siguiente vehículo?</p>
      <p className="mt-2 font-medium">
        {vehicle.brand} - {vehicle.plate} - {vehicle.color}
      </p>
      <div className="flex space-x-4 mt-4">
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
        >
          Eliminar
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default DeleteVehicle;