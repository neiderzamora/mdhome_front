import React from 'react';
import { FaUser  } from 'react-icons/fa';

const RequestList = ({ requests, onRequestSelect }) => {
    return (
        <ul>
            {requests.map(request => (
                <li key={request.id} onClick={() => onRequestSelect(request)}>
                    <FaUser  /> {request.patientName} {request.patientLastName}
                </li>
            ))}
        </ul>
    );
};

export default RequestList;