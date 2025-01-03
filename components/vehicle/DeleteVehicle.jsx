import React from 'react';

const DeleteVehicle = ({ vehicles, onDeleteVehicle }) => {
  const handleDelete = (id) => {
    onDeleteVehicle(id);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Eliminar Vehículo</h2>
      <ul>
        {vehicles.map((vehicle) => (
          <li key={vehicle.id} className="py-2">
            <span className="text-lg font-medium text-gray-700">{vehicle.plateNumber}</span>
            <button
              onClick={() => handleDelete(vehicle.id)}
              className="ml-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeleteVehicle;