"use client"

import dynamic from "next/dynamic";

const AddressManagement = dynamic(
  () => import("@/components/patient/addresses/AddressManagement"),
  { ssr: false }
);
import Navbar from "@/components/navbar/Navbar";
import React from "react";

export default function Home() {
  return (
    <div>
      <Navbar />
      <AddressManagement />
    </div>
  );
}