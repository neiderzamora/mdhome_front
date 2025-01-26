import RequestPatientList from "@/components/doctor/request-patient-list/RequestPatientList";
import Navbar from "@/components/navbar/Navbar";

export default function page() {
  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-8 pt-44">
        <h1 className="text-3xl font-bold mb-6 text-primary-600">
          Servicios Activos
        </h1>
        <RequestPatientList />
      </div>
    </div>
  );
}
