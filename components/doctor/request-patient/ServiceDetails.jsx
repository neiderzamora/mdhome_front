const ServiceDetails = ({ doctor, patient, location, symptoms }) => {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold">Edad</h3>
            <p>{patient.age}</p>
          </div>
          <div>
            <h3 className="font-semibold">Genero</h3>
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
        </div>
      </div>
    );
  };
  
  export default ServiceDetails;