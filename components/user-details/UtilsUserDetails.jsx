import UserDetails from "@/components/user-details/UserDetails";

const CmpUserDetails = () => {
  // Suponiendo que tienes los datos del usuario en algún lugar
  const user = {
    name: "Juan",
    last_name: "Pérez",
    identification_type: "CC",
    identification_number: "123456789",
    birthdate: "1990-01-01",
    telephone: "3001234567",
    address: "Barrio - Calle 123",
    email: "juan.perez@example.com",
    eps: "EPS Salud",
    prepaid_medicine: "Medicina Prepagada XYZ",
    profile_photo: null, // Aquí podrías tener un archivo de imagen si se subió
  };

  return (
    <div className="pt-44 px-3 mx-auto max-w-5xl">
      {/* Otros componentes */}
      <UserDetails user={user} />
      <div className="mt-4">
        <button className="mr-4 bg-primary-100 text-white px-4 py-2 rounded">
          Editar Perfil
        </button>
      </div>
    </div>
  );
};

export default CmpUserDetails;
