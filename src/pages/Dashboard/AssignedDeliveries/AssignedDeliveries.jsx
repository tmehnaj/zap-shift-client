import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../assets/Hooks/useAxiosSecure';
import useAuth from '../../../assets/Hooks/useAuth';
import Swal from 'sweetalert2';

const AssignedDeliveries = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: parcels = [] ,refetch} = useQuery({
        queryKey: ['parcels', user?.email, 'driver_assigned'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/rider?riderEmail=${user.email}&deliveryStatus=driver_assigned`);
            return res.data;
        }
    })


    const handleDelivery = (parcel, status) => {
        const updateInfo = { 
            deliveryStatus: status,
             riderId: parcel.riderId,
             trackingId: parcel.trackingId,
         };
        axiosSecure.patch(`/parcels/${parcel._id}/status`, updateInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Delivery status is set to ${status}.`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
    }


    const handleAcceptDelivery = parcel => {
        handleDelivery(parcel, 'rider-arriving');
    }

    const handleRejectDelivery = parcel => {
        handleDelivery(parcel, 'pending-pickup');
    }

    return (
        <div>
            <h2 className="text-5xl">Riders Pending Approval: {parcels.length} </h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>PickUp District</th>
                            <th>Confirm</th>
                            <th>Other Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parcels.map((parcel, i) => <tr key={parcel._id}>
                            <th>{i + 1}</th>
                            <td>{parcel.parcelName}</td>
                            <td>{parcel.senderDistrict}</td>
                            <td>
                                {
                                    parcel?.deliveryStatus === 'driver_assigned'
                                        ? <> <button
                                            onClick={() => handleAcceptDelivery(parcel)}
                                            className='btn btn-primary text-black'>Accept</button>
                                            <button
                                                onClick={() => handleRejectDelivery(parcel)}
                                                className='btn btn-warning text-black ms-2'>Reject</button></>
                                        : <span className='text-success'>Accepted</span>
                                }


                            </td>
                            <td>
                                <button
                                    onClick={() => handleDelivery(parcel, 'parcel_picked_up')}
                                    className='btn btn-primary text-black'>{
                                        parcel?.deliveryStatus === 'parcel_picked_up' ? 'pickedUp' : 'mark pick up'
                                        }</button>
                                <button
                                    onClick={() => handleDelivery(parcel, 'parcel_delivered')}
                                    className='btn btn-primary text-black mx-2'>{
                                        parcel?.deliveryStatus === 'parcel_delivered' ? 'delivered' : 'mark deliverd'
                                        }</button>
                            </td>
                        </tr>)}


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssignedDeliveries;