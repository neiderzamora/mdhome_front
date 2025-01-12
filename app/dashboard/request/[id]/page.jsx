
// app/dashboard/request/[id]/page.jsx
import RequestPatient from '@/components/request-patient/RequestPatient';
import Navbar from '@/components/navbar/Navbar';
const RequestPage = ({ params }) => {
    return (
        <>
            <Navbar />
            <RequestPatient requestId={params.id} />
        </>
    );
};

export default RequestPage;
/* import React from 'react';
import RequestPatient from '@/components/request-patient/RequestPatient';
import Navbar from '@/components/navbar/Navbar';

async function RequestPage({ params }) {
  const id = await params.id;
  
  return (
    <>
      <Navbar />
      <RequestPatient id={id} />
    </>
  );
}

export default RequestPage; */