import { FaCheck, FaExclamationTriangle, FaFlagCheckered } from 'react-icons/fa';

const ActionButtons = ({ 
  hasConfirmedArrival, 
  onConfirmArrival, 
  patientRequestId, 
  status,
  router 
}) => {
  return (
    <div className="flex flex-col space-y-2">
      {!hasConfirmedArrival ? (
        <button
          onClick={onConfirmArrival}
          className="bg-primary-100 text-white py-2 px-4 rounded hover:bg-primary-200"
        >
          <FaCheck className="inline mr-2" /> Confirmar Llegada
        </button>
      ) : (
        <>
          <button
            disabled
            className="bg-gray-400 text-white py-2 px-4 rounded cursor-not-allowed"
          >
            <FaCheck className="inline mr-2" /> Llegada Confirmada
          </button>
          <button
            onClick={() => router.push(`/dashboard/request/${patientRequestId}/service-end`)}
            className="bg-primary-200 text-white py-2 px-4 rounded hover:opacity-80"
          >
            <FaFlagCheckered className="inline mr-2" /> Finalizar Servicio
          </button>
        </>
      )}

      <button
        onClick={() => router.push(`/dashboard/request/${patientRequestId}/failed-service`)}
        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
      >
        <FaExclamationTriangle className="inline mr-2" /> Reportar Error
      </button>
    </div>
  );
};

export default ActionButtons;