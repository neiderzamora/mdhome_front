const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return "";
  const cleaned = phoneNumber.replace(/\D/g, "");
  if (cleaned.length === 10) {
    const areaCode = cleaned.substring(0, 3);
    const firstPart = cleaned.substring(3, 6);
    const secondPart = cleaned.substring(6);
    return `(${areaCode}) ${firstPart}-${secondPart}`;
  }
  return phoneNumber;
};

const ServiceDetails = ({ doctor, patient, location, symptoms }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <h3 className="font-semibold">Edad</h3>
          <p>{patient.age}</p>
        </div>
        <div>
          <h3 className="font-semibold">Género</h3>
          <p>{patient.gender}</p>
        </div>
        <div>
          <h3 className="font-semibold">Ubicación</h3>
          <p>{`${location.line_address}, ${location.neighborhood}`}</p>
        </div>
        <div>
          <h3 className="font-semibold">Síntomas</h3>
          <p>{symptoms}</p>
        </div>
        <div>
          <h3 className="font-semibold">Teléfono</h3>
          <p className="text-lg text-gray-700">
            {formatPhoneNumber(patient.phone_number)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;