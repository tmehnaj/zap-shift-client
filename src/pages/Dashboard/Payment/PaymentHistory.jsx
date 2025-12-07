import React from 'react';
import useAxiosSecure from '../../../assets/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../assets/Hooks/useAuth';

const PaymentHistory = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data: payments = []} = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/payments?email=${user?.email}`)
            return res.data;
        }
    })

    // console.log('payments list',payments.length);

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
                                   <th>Transaction Id</th>
                                    <th>Paid At</th>
                               </tr>
                           </thead>
                           <tbody>
       
                               {
                                   payments.map((payment, index) => <tr key={payment._id}>
                                       <th>{index + 1}</th>
                                       <td>{payment?.parcelName}</td>
                                       <td>{payment?.amount}</td>
                                       <td>{payment?.transactionId}</td>
                                       <td>{payment?.paidAt}</td>
                                     
                                   </tr>)
                               }
       
                           </tbody>
                       </table>
                   </div>
               </div>
    );
};

export default PaymentHistory;