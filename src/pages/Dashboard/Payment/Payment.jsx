import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../assets/Hooks/useAxiosSecure';
import Loader from '../../../Components/Loader';

const Payment = () => {
    const {parcelId} = useParams();
    const axiosSecure = useAxiosSecure();

    const { isLoading, data: parcel} = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/parcels/${parcelId}`)
            return res.data;
        }
    })
    
 if (isLoading) {
        return <Loader></Loader>
    }

    return (
        <div>
             <h2>Please Pay ${parcel.cost} for : {parcel.parcelName} </h2>
        </div>
    );
};

export default Payment;