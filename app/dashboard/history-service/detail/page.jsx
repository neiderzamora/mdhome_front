import Head from "next/head";
import Navbar from "@/components/navbar/Navbar";
import ServiceHistoryDetail from "@/components/service-history/ServiceHistoryDetail";
import React from "react";

export default function Home() {
  return (
    <>
      <Head>
        <title>Página de Ejemplo</title>
      </Head>
      <Navbar />
      <ServiceHistoryDetail />
    </>
  );
}
