"use client";

import React, { useContext } from 'react';
import { UserContext } from '@/context/UserContext';
import EditUser from '@/components/user-details/EditUser';

const EditUserPage = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <p className="text-center">Cargando...</p>;
  }

  return <EditUser userId={user.id} userType={user.type} />;
};

export default EditUserPage;