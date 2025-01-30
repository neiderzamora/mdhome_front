import ServiceHistoryDetail from '@/components/doctor/service-history/ServiceHistoryDetail';
import Navbar from '@/components/navbar/Navbar';

const ServiceHistoryDetailPage = async ({ params }) => {
  const { id } = await Promise.resolve(params);

  return (
    <>
      <Navbar />
      <ServiceHistoryDetail id={id} />
    </>
  );
};

export default ServiceHistoryDetailPage;