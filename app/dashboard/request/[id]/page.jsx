import React from 'react';
import RequestPatient from '@/components/request-patient/RequestPatient';
import Navbar from '@/components/navbar/Navbar';

const RequestPage = ({ params }) => {
    return (
        <>
            <Navbar/>
            <RequestPatient params={params} />
        </>
    );
};

export default RequestPage;