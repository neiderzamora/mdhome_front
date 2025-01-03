import React from "react";
import { FaTimes } from "react-icons/fa";

const RequestModal = ({ request, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          <FaTimes />
        </span>
        <h2>Detalles de la Solicitud</h2>
        <p>
          <strong>Nombre:</strong> {selectedRequest.patientName}{" "}
          {selectedRequest.patientLastName}
        </p>
        <p>
          <strong>Género:</strong> {selectedRequest.gender}
        </p>
        <p>
          <strong>Edad:</strong> {selectedRequest.age}
        </p>
        <p>
          <strong>Teléfono:</strong> {selectedRequest.phone}
        </p>
        <p>
          <strong>Email:</strong> {selectedRequest.email}
        </p>
        <p>
          <strong>Dirección:</strong> {selectedRequest.address}
        </p>
        <p>
          <strong>EPS:</strong> {selectedRequest.eps}
        </p>
        <p>
          <strong>Medicina Prepagada:</strong> {selectedRequest.prepagada}
        </p>
        <p>
          <strong>Síntomas:</strong> {selectedRequest.symptoms.join(", ")}
        </p>
      </div>
    </div>
  );
};

export default RequestModal;
