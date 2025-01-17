import AddressManagement from "@/components/patient/addresses/AddressManagement";
import Navbar from "@/components/navbar/Navbar";
import React from "react";

export default function home() {
  return (
    <div>
      <Navbar />
      <AddressManagement />
    </div>
  );
}
