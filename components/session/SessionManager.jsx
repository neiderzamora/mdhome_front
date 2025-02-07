"use client";

import { useEffect, useContext, useState } from 'react';
import { UserContext } from '@/context/UserContext';
import { RefreshToken } from '@/api/service_api';
import { useRouter } from 'next/navigation';

const SESSION_WARNING_TIME = 60 * 60 * 1000; // 59 minutos en milisegundos
const SESSION_CHECK_INTERVAL = 1000 * 1; // Revisar cada minuto

const SessionManager = () => {
  const router = useRouter();
  const { user, fetchUserData } = useContext(UserContext);
  const [showNotification, setShowNotification] = useState(false);

  const handleRefreshSession = async () => {
    try {
      const response = await RefreshToken();
      if (response.access) {
        localStorage.setItem('api_key', response.access);
        // Keep refresh token if needed
        if (response.refresh) {
          localStorage.setItem('refresh_token', response.refresh);
        }
        await fetchUserData();
        setShowNotification(false);
      }
    } catch (error) {
      console.error('Error al refrescar la sesión:', error);
      // If refresh fails, redirect to login
      router.push('/login');
    }
  };

  useEffect(() => {
    let sessionTimer;
    let checkInterval;

    const checkAndNotify = () => {
      const token = localStorage.getItem('api_key');
      if (token && user) {
        setShowNotification(true);
      }
    };

    if (user) {
      sessionTimer = setTimeout(checkAndNotify, SESSION_WARNING_TIME);
      checkInterval = setInterval(() => {
        const token = localStorage.getItem('api_key');
        if (!token) {
          clearInterval(checkInterval);
          clearTimeout(sessionTimer);
          setShowNotification(false);
        }
      }, SESSION_CHECK_INTERVAL);
    }

    return () => {
      if (sessionTimer) clearTimeout(sessionTimer);
      if (checkInterval) clearInterval(checkInterval);
    };
  }, [user]);

  if (!showNotification) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-fade-in">
      <div className="bg-white rounded-lg shadow-lg p-4 border border-gray-200 w-80">
        <div className="flex flex-col items-center">
          <div className="text-yellow-500 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-gray-800 font-medium text-center mb-3">
            Tu sesión expirará pronto
          </p>
          <button
            onClick={handleRefreshSession}
            className="bg-primary-100 text-white px-4 py-2 rounded hover:bg-primary-200 w-full transition-colors duration-200"
          >
            Extender Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionManager;