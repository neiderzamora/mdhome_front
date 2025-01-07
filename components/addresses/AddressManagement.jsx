"use client";

import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import AddressList from "./AddressList";
import EditAddress from "./EditAddress";
import DeleteAddress from "./DeleteAddress";
import AddAddress from "./AddAddress";
import { fetchAddresses } from "@/api/service_api";
import "nextjs-toast-notify/dist/nextjs-toast-notify.css";

const AddressManagement = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const getAddresses = async () => {
      try {
        const data = await fetchAddresses();
        setAddresses(data);
      } catch (error) {
        console.error("Error al obtener las direcciones:", error);
      }
    };
    getAddresses();
  }, []);

  const handleEditAddress = (updatedAddress) => {
    setAddresses(
      addresses.map((addr) =>
        addr.id === updatedAddress.id ? updatedAddress : addr
      )
    );
    setSelectedAddress(null);
    setIsEditing(false);
  };

  const handleDeleteAddress = (id) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
    setSelectedAddress(null);
    setIsDeleting(false);
  };

  const handleSelectAddress = (address, action) => {
    setSelectedAddress(address);
    if (action === "edit") {
      setIsEditing(true);
      setIsDeleting(false);
      setIsAdding(false);
    } else if (action === "delete") {
      setIsDeleting(true);
      setIsEditing(false);
      setIsAdding(false);
    }
  };

  const handleAddAddressClick = () => {
    setIsAdding(true);
    setSelectedAddress(null);
    setIsEditing(false);
    setIsDeleting(false);
  };

  const handleAddAddress = (newAddress) => {
    setAddresses([...addresses, newAddress]);
    setIsAdding(false);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setIsEditing(false);
    setIsDeleting(false);
    setSelectedAddress(null);
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8 pt-36">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="flex lg:justify-between mb-4 lg:mb-8">
          <h1 className="text-4xl font-bold text-primary-100 flex items-center">
            Gestión de Direcciones
          </h1>
          <button
            className="hidden bg-primary-100 text-white py-2 px-4 rounded lg:flex items-center"
            onClick={handleAddAddressClick}
          >
            <FaPlus className="mr-2" /> Agregar Dirección
          </button>
        </div>

        {/* Botón de Agregar Dirección */}
        <div className="flex justify-start">
          <button
            onClick={handleAddAddressClick}
            className="bg-primary-100 text-white py-2 px-4 rounded lg:hidden flex items-center"
          >
            <FaPlus className="mr-2" /> Agregar Dirección
          </button>
        </div>

        <AddressList
          addresses={addresses}
          onEditAddress={(address) => handleSelectAddress(address, "edit")}
          onDeleteAddress={(address) => handleSelectAddress(address, "delete")}
        />

        {/* Formulario de Edición */}
        {isEditing && selectedAddress && (
          <div className="mt-8">
            <EditAddress
              address={selectedAddress}
              onEditAddress={handleEditAddress}
              onCancel={handleCancel}
            />
          </div>
        )}

        {/* Confirmación de Eliminación */}
        {isDeleting && selectedAddress && (
          <div className="mt-8">
            <DeleteAddress
              address={selectedAddress}
              onDeleteAddress={handleDeleteAddress}
              onCancel={handleCancel}
            />
          </div>
        )}

        {/* Formulario de Agregar */}
        {isAdding && (
          <div className="mt-8">
            <AddAddress
              onAddAddress={handleAddAddress}
              onCancel={handleCancel}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressManagement;
