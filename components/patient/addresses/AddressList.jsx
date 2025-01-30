import React, { useMemo, useCallback } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import PropTypes from "prop-types";

const AddressList = ({ addresses, onEditAddress, onDeleteAddress }) => {
  // Memorizar la lista de direcciones para evitar re-renderizados innecesarios
  const renderedAddresses = useMemo(() => {
    return addresses.map((address) => (
      <AddressItem
        key={address.id}
        address={address}
        onEditAddress={onEditAddress}
        onDeleteAddress={onDeleteAddress}
      />
    ));
  }, [addresses, onEditAddress, onDeleteAddress]);

  return <section>{renderedAddresses}</section>;
};

AddressList.displayName = "AddressList";

const AddressItem = React.memo(
  ({ address, onEditAddress, onDeleteAddress }) => {
    // Memorizar el manejador de edición para cada dirección
    const handleEdit = useCallback(() => {
      onEditAddress(address);
    }, [onEditAddress, address]);

    // Memorizar el manejador de eliminación para cada dirección
    const handleDelete = useCallback(() => {
      onDeleteAddress(address);
    }, [onDeleteAddress, address]);

    return (
      <div className="flex justify-between items-center border-b py-4">
        <div>
          <p className="text-gray-600 font-bold">{address.line_address}</p>
          <p className="text-gray-600">{address.neighborhood}</p>
        </div>
        <div className="flex gap-x-2 my-auto">
          <button
            className="bg-primary-100 text-white py-2 px-4 rounded flex items-center"
            onClick={handleEdit}
            aria-label="Editar dirección"
          >
            <FaEdit />
          </button>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded flex items-center"
            onClick={handleDelete}
            aria-label="Eliminar dirección"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    );
  }
);

AddressItem.displayName = "AddressItem";

AddressList.propTypes = {
  addresses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      address_line: PropTypes.string.isRequired,
      neighborhood: PropTypes.string.isRequired,
      description: PropTypes.string,
    })
  ).isRequired,
  onEditAddress: PropTypes.func.isRequired,
  onDeleteAddress: PropTypes.func.isRequired,
};

export default React.memo(AddressList);
AddressList.displayName = "AddressList";