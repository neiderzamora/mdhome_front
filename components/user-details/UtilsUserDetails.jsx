"use client"

import React, { useContext } from 'react';
import UserDetails from '@/components/user-details/UserDetails';
import { UserContext } from '@/context/UserContext';

const UtilsUserDetails = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <p className="text-center">Cargando...</p>;
  }

  // Determinar si es doctor o paciente y obtener el ID correspondiente
  const userId = user.type === 'doctor' ? localStorage.getItem('doctor_id') : localStorage.getItem('patient_id');

  if (!userId) {
    return <p className="text-center">ID de usuario no encontrado.</p>;
  }

  return (
    <div className="pt-44 px-3 mx-auto max-w-5xl">
      <UserDetails userId={userId} userType={user.type} />
    </div>
  );
};

export default UtilsUserDetails;