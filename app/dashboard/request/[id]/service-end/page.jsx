import Navbar from "@/components/navbar/Navbar";
import ServiceEndForm from "@/components/service-end/ServiceEndForm";
import React from "react";

export default function Home({ params }) {
  const { id } = params;

  return (
    <div>
      <Navbar />
      <ServiceEndForm requestId={id} />
    </div>
  );
}