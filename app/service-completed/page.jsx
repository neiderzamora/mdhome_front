import Navbar from "@/components/navbar/Navbar";
import ServiceEndForm from "@/components/doctor/service-end/ServiceEndForm";
import React from "react";

export default function Home() {
  return (
    <div>
      <Navbar />
      <ServiceEndForm />
    </div>
  );
}
