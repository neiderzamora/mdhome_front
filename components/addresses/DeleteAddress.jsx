import React from 'react';
import { toast } from 'nextjs-toast-notify';
import { deleteAddress } from '@/api/service_api'; // Importar deleteAddress
import 'nextjs-toast-notify/dist/nextjs-toast-notify.css';

const DeleteAddress = ({ address, onDeleteAddress, onCancel }) => {
  const handleDelete = async () => {
    try {
      await deleteAddress(address.id);
      onDeleteAddress(address.id);
      toast.success('Dirección eliminada con éxito.', {
        position: 'top-right',
        duration: 3000,
      });
    } catch (error) {
      toast.error('Error al eliminar la dirección.', {
        position: 'top-right',
        duration: 3000,
      });
      console.error('Error en handleDelete:', error);
    }
  };

  if (!address) {
    return <div>No se ha seleccionado una dirección para eliminar.</div>;
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Eliminar Dirección</h2>
      <p>¿Estás seguro de que deseas eliminar la siguiente dirección?</p>
      <p className="mt-2 font-medium">{address.line_address}, {address.city}</p>
      <div className="flex space-x-4 mt-4">
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
        >
          Eliminar
        </button>
        <button
          onClick={onCancel} // Botón de Cancelar
          className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default DeleteAddress;