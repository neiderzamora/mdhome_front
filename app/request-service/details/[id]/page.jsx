"use client";

import Navbar from "@/components/navbar/Navbar";
import ServiceRequestDetails from "@/components/request-service/ServiceRequestDetails";
import { useParams } from "next/navigation";

const ServiceRequestDetailsPage = () => {
  const params = useParams();
  const { id } = params;

  return (
    <>
      <Navbar />
      <ServiceRequestDetails id={id} />
    </>
  );
};

export default ServiceRequestDetailsPage;
