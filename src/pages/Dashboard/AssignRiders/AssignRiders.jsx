import React, { useState } from 'react';
import useAxiosSecure from '../../../assets/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import Swal from 'sweetalert2';

const AssignRiders = () => {
    const [ selectedParcel, setSelectedParcel] = useState(null);
    const riderModalRef = useRef();
    const axiosSecure = useAxiosSecure();
    const { data: parcels = [], refetch: parcelRefetch } = useQuery({
        queryKey: ['parcels', 'pending-pickup'],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcels?deliveryStatus=pending-pickup');
            return res.data;
        }
    })


      const {data: riders = []}= useQuery({
    queryKey:['riders',selectedParcel?.senderDistrict,'available'],
    enabled: !!selectedParcel,
    queryFn: async()=>{
        const res = await axiosSecure.get(`/riders?status=approved&district=${selectedParcel?.senderDistrict}&workStatus=available`);
        return res.data;
    }
  })

  const handleAssignRider = rider =>{

    const riderAssignInfo = {
        riderId: rider._id,
        riderEmail: rider.email,
        riderName: rider.name,
        parcelId: selectedParcel._id,
        trackingId: selectedParcel.trackingId,
    }

    axiosSecure.patch(`/parcels/${selectedParcel._id}`, riderAssignInfo)
    .then(res=>{
        if(res.data.modifiedCount){
            parcelRefetch();
            riderModalRef.current.close();
             Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Rider has been assigned.`,
                        showConfirmButton: false,
                        timer: 1500
                    });
        }
    })
  }

    const openRiderModal = parcel=>{
        setSelectedParcel(parcel);
        riderModalRef.current.showModal();
    }




    return (
        <div className='my-20 px-5 md:px-10'>
            <h1 className='text-secondary-content my-5'>Assign Riders</h1>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Parcel Name</th>
                            <th>Cost</th>
                            <th>TrakingId</th>
                            <th>CreatedAt</th>
                            <th>Pickup District</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            parcels.map((parcel, index) => <tr key={parcel._id}>
                                <th>{index + 1}</th>
                                <td>{parcel?.parcelName}</td>
                                <td>{parcel?.cost}</td>
                                <td>{parcel?.trackingId}</td>
                                <td>{parcel?.createdAt}</td>
                                <td>{parcel?.senderDistrict}</td>
                                <td>
                                    <button
                                    onClick={()=> openRiderModal(parcel)}
                                    className="btn1">
                                        Find Riders
                                    </button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>



             
                
                <dialog ref={riderModalRef} className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Riders: {riders.length}</h3>
                       
                        <div className="modal-action">
                              <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>email</th>
                                    <th>district</th>
                                </tr>
                            </thead>
                            <tbody>
                                {riders.map((rider, i) => <tr key={rider._id}>
                                    <th>{i + 1}</th>
                                    <td>{rider.name}</td>
                                    <td>{rider.email}</td>
                                    <td>{rider.district}</td>
                                    <td>
                                        <button
                                            onClick={()=>handleAssignRider(rider)}
                                            className='btn btn-primary text-black'>Assign</button>
                                    </td>
                                </tr>)}


                            </tbody>
                        </table>
                    </div>
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>

            </div>
        </div>
    );
};

export default AssignRiders;