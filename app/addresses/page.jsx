import AddAddress from "@/components/addresses/AddAddress";
import AddressManagement from "@/components/addresses/AddressManagement";
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
