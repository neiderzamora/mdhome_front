import React from 'react';

const UserDetails = ({ user }) => {
    const {
        name,
        last_name,
        identification_type,
        identification_number,
        birthdate,
        telephone,
        address,
        email,
        eps,
        prepaid_medicine,
        profile_photo,
    } = user;

    const renderProfilePhoto = () => {
        if (profile_photo) {
            return (
                <img
                    src={URL.createObjectURL(profile_photo)}
                    alt="Foto de Perfil"
                    className="mt-2 w-24 h-24 rounded-full border-4 border-primary-100 shadow-lg"
                />
            );
        }
        return <span className="text-gray-500">No se ha subido ninguna foto de perfil.</span>;
    };

    const userDetails = [
        { label: 'Nombre', value: name },
        { label: 'Apellido', value: last_name },
        { label: 'Tipo de Identificación', value: identification_type },
        { label: 'Número de Identificación', value: identification_number },
        { label: 'Fecha de Nacimiento', value: birthdate },
        { label: 'Teléfono', value: telephone },
        { label: 'Dirección', value: address },
        { label: 'Email', value: email },
        { label: 'EPS', value: eps },
        { label: 'Medicina Prepagada', value: prepaid_medicine },
    ];

    const renderUserDetail = ({ label, value }) => (
        <div key={label} className="flex justify-between py-2 px-2 border-b border-gray-200">
            <p className="text-secondary-100">{label}:</p>
            <span className="text-gray-700">{value}</span>
        </div>
    );

    return (
        <div className="max-w-5xl mx-auto py-6 px-2 sm:px-6 bg-white shadow-md rounded-lg border border-gray-300">
            <h2 className="text-3xl font-bold mb-6 ml-2 text-primary-100 text-left">Detalles de Usuario</h2>
            <div className="flex flex-col items-center">
                {renderProfilePhoto()}
            </div>
            <div className="bg-gray-50 rounded-lg shadow-inner mt-4">
                {userDetails.map(renderUserDetail)}
            </div>
        </div>
    );
};

export default UserDetails;