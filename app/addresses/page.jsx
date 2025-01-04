import AddAddress from "@/components/addresses/AddAddress";
import Navbar from "@/components/navbar/Navbar";
import React from "react";

export default function home() {
  return (
    <div>
      <Navbar />
      <AddAddress />
    </div>
  );
}
