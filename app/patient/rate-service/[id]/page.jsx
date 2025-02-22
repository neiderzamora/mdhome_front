import RateServiceSection from "@/components/patient/rate-service/RateService";
import Navbar from "@/components/navbar/Navbar";

const RatePage = async ({ params }) => {
  const { id } = await Promise.resolve(params);

  return (
    <div>
      <Navbar />
      <RateServiceSection requestId={id} />
    </div>
  );
};

export default RatePage;
