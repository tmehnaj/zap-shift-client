import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../assets/Hooks/useAuth';
import useAxiosSecure from '../../../assets/Hooks/useAxiosSecure';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { FaEdit } from 'react-icons/fa';
import { BsTrash3Fill } from 'react-icons/bs';
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const MyParcels = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    //data load with tanstack query 
    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['my-parcels', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
            return res.data;
        }
    })


    const handleParcelDelete = (id) => {

        console.log(id);

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/parcels/${id}`)
                    .then(res => {
                        // console.log(res.data);
                        if (res.data.deletedCount) {
                             // refresh the data in the ui
                            refetch();

                            Swal.fire({
                                title: "Deleted!",
                                text: "Your parcel request has been deleted.",
                                icon: "success"
                            });
                            
                        }
                    })


            }
        });


    }


    const handlePayment = async(parcel)=>{
        const paymentInfo = {
            parcelId: parcel._id,
            senderEmail: parcel.senderEmail,
            parcelName: parcel.parcelName,
            cost: parcel.cost,
            trackingId: parcel.trackingId,
        }

        const res = await axiosSecure.post(`/payment-checkout-session`,paymentInfo);
        console.log(res.data.url);
        window.location.assign(res.data.url);
    }


    return (
        <div className='my-20 px-5 md:px-10'>
            <h1 className='text-secondary-content my-5'>my parcels</h1>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Parcel Name</th>
                            <th>Cost</th>
                            <th>TrakingId</th>
                            <th>Payment Status</th>
                            <th>Delivery Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            parcels.map((parcel, index) => <tr key={parcel._id}>
                                <th>{index + 1}</th>
                                <td>{parcel?.parcelName}</td>
                                <td>{parcel?.cost}</td>
                                <td><Link to={`/parcel-track/${parcel?.trackingId}`}>{parcel?.trackingId}</Link></td>
                                <td>
                                    {
                                        parcel?.paymentStatus === 'paid' ? <span className='text-neutral btn bg-success'>Paid</span> : <button onClick={()=>handlePayment(parcel)} className="text-neutral btn bg-warning">Pay</button>
                                    }
                                    </td>
                                <td>{parcel?.deliveryStatus}</td>
                                <td>
                                    <button className="btn btn-square">
                                        <FaMagnifyingGlass />
                                    </button>
                                    <button className="btn btn-square mx-2">
                                        <FaEdit />
                                    </button>
                                    <button onClick={() => handleParcelDelete(parcel._id)} className="btn btn-square">
                                        <BsTrash3Fill />
                                    </button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyParcels;