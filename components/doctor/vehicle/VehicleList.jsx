import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const VehicleList = ({ vehicles, onEditVehicle, onDeleteVehicle }) => {
  return (
    <section className="flex flex-wrap justify-center mb-4 p-4 bg-white rounded-lg shadow-md">
      {vehicles.map((vehicle) => (
        <div key={vehicle.id} className="w-full lg:w-1/2 py-4 lg:px-4">
          <div className="flex justify-between bg-gray-100 p-4 rounded-lg shadow-md">
            <div>
              <h2 className="text-xl font-bold mb-2 text-primary-100">
                {vehicle.brand} - {vehicle.plate}
              </h2>
              <p className="text-gray-600">Color: {vehicle.color}</p>
            </div>

            <div className="flex gap-x-2 my-4">
              <button
                className="bg-primary-100 text-white py-2 px-4 rounded flex items-center"
                onClick={() => onEditVehicle(vehicle)}
              >
                <FaEdit />
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded flex items-center"
                onClick={() => onDeleteVehicle(vehicle)}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default VehicleList;
