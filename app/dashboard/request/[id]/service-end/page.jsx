import Navbar from "@/components/navbar/Navbar";
import ServiceEndForm from "@/components/doctor/service-end/ServiceEndForm";

export default function Home({ params }) {
  const { id } = params;

  return (
    <div>
      <Navbar />
      <ServiceEndForm requestId={id} />
    </div>
  );
}