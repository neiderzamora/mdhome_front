import Navbar from "@/components/navbar/Navbar";
import ServiceEndForm from "@/components/service-end/ServiceEndForm";
import React from "react";

export default function home() {
  return (
    <div>
      <Navbar />
      <ServiceEndForm />
    </div>
  );
}
