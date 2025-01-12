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
          <strong>Género:</strong> {selectedRequest.patiend.gender}
        </p>
        <p>
          <strong>Edad:</strong> {selectedRequest.patient.age}
        </p>

        <p>
          <strong>Dirección:</strong>{" "}
          {selectedRequest.location_detail.neighborhood}
        </p>

        <p>
          <strong>Síntomas:</strong> {selectedRequest.symptoms.join(", ")}
        </p>
      </div>
    </div>
  );
};

export default RequestModal;
