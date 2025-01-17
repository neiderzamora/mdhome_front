"use client";

import ServiceHistoryDetail from '@/components/doctor/service-history/ServiceHistoryDetail';
import Navbar from '@/components/navbar/Navbar';

const ServiceHistoryDetailPage = ({ params }) => {
  return (
    <>
      <Navbar />
      <ServiceHistoryDetail id={params.id} />
    </>
  );
};

export default ServiceHistoryDetailPage;