import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../../assets/Hooks/useAxiosSecure';

const Success = () => {
    const [searchParams] = useSearchParams();
    const [paymentInfo,setPaymentInfo] = useState({});
    const session_Id = searchParams.get('session_id');
    const axiosSecure = useAxiosSecure();
    // console.log(session_Id);

    useEffect(()=>{
        // `/dashboard/payment-success?session_id=${session_Id}`
        if(session_Id){
            axiosSecure.patch(`/payment-success?session_id=${session_Id}`)
            .then(res=>{
                console.log(res.data);
                setPaymentInfo({
                    transactionId: res.data.transactionId,
                    trackingId: res.data.trackingId,
                    email: res.data.customer_email,
                    parcelName: res.data.parcelName,
                });
            })
        }
    },[session_Id, axiosSecure])

    return (
        <div className=' my-20 px-5 '>
            <h1 className='text-secondary'>Payment is Successful!</h1>
            <div className='my-10 text-accent-content space-y-4'>
                <p> <strong>Parcel Name:</strong> {paymentInfo.parcelName}</p>
                <p> <strong>Sender Email:</strong> {paymentInfo.email}</p>
                <p> <strong>Your Transaction Id:</strong> {paymentInfo.transactionId}</p>
            <p><strong>Your Tracking Id:</strong> {paymentInfo.trackingId}</p>
            </div>
        </div>
    );
};

export default Success;