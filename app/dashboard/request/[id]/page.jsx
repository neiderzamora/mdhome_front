import RequestPatient from "@/components/doctor/request-patient/RequestPatient";
import Navbar from "@/components/navbar/Navbar";

const RequestPage = async ({ params }) => {
  const { id } = await Promise.resolve(params);

  return (
    <>
      <Navbar />
      <RequestPatient requestId={id} />
    </>
  );
};

export default RequestPage;
