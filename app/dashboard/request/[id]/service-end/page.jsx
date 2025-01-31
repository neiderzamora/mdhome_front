import Navbar from "@/components/navbar/Navbar";
import ServiceEndForm from "@/components/doctor/service-end/ServiceEndForm";

const Home = async ({ params }) => {
  const { id } = await Promise.resolve(params);

  return (
    <div>
      <Navbar />
      <ServiceEndForm requestId={id} />
    </div>
  );
}

export default Home;