import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const AddressList = ({ addresses, onEditAddress, onDeleteAddress }) => {
  return (
    <section className="flex flex-wrap justify-center mb-4 p-4 bg-white rounded-lg shadow-md">
      {addresses.map((address) => (
        <div key={address.id} className="w-full lg:w-1/2 py-4 lg:px-4">
          <div className="flex justify-between bg-gray-100 p-4 rounded-lg shadow-md">
            <div>
              <h2 className="text-xl font-bold mb-2 text-primary-100">
                {address.line_address}
              </h2>
              <p className="text-gray-600">
                {address.neighborhood}
              </p>
              <p className="text-gray-600">
                {address.description}
              </p>
            </div>
            <div className="flex gap-x-2 my-auto">
              <button
                className="bg-primary-100 text-white py-2 px-4 rounded flex items-center"
                onClick={() => onEditAddress(address)}
              >
                <FaEdit />
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded flex items-center"
                onClick={() => onDeleteAddress(address)}
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

export default AddressList;