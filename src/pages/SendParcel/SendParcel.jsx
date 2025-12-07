import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAuth from '../../assets/Hooks/useAuth';
import useAxiosSecure from '../../assets/Hooks/useAxiosSecure';

const SendParcel = () => {
    const stores = useLoaderData();
    const navigate = useNavigate();

    const { register, handleSubmit, control, formState: { errors } } = useForm();

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const duplicateRegions = stores.map(r => r.region);
    const regions = [...new Set(duplicateRegions)];

    const senderRegion = useWatch({ control, name: 'senderRegion' });
    const receiverRegion = useWatch({ control, name: 'receiverRegion' });
    // const senderRegion = watch('senderRegion');

    const districtsByRegion = (region) => {
        const regionDistricts = stores.filter(d => d.region === region);
        const districts = regionDistricts.map(d => d.district);
        return districts;
    }

    const handleSendParcel = data => {
        // console.log(data);
        const isDocument = data.parcelType === 'document';
        const isSameDistrict = data.senderDistrict === data.receiverDistrict;
        const parcelWeight = parseFloat(data.parcelWeight);
        let cost = 0;

        if (isDocument) {
            cost = isSameDistrict ? 60 : 80;
        } else {
            if (parcelWeight <= 3) {
                cost = isSameDistrict ? 110 : 150;
            } else {
                const minCharge = isSameDistrict ? 110 : 150;
                const extreaWeight = parcelWeight - 3;
                const extraCharge = isSameDistrict ? extreaWeight * 40 : extreaWeight * 40 + 40;
                cost = minCharge + extraCharge;
            }
        }
        // console.log('cost', cost);
        data.cost = cost;
        
        Swal.fire({
            title: "Agree with the cost?",
            text: `You will be charged only ${cost} BDT!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm and Continue Payment!"
        }).then((result) => {
            if (result.isConfirmed) {

                //store tha parcel data in database
                axiosSecure.post('/parcels', data)
                    .then(result => {
                        // console.log('after insertion', result.data);
                        if (result.data.insertedId) {
                            navigate("/dashboard/my-parcels");

                            Swal.fire({
                                title: "Confirmed!",
                                text: "Your parcel has been confirmed and payment now!.",
                                icon: "success"
                            });
                        }
                    })


            }
        });


        // console.log('cost', cost);
    }

    return (
        <div className='my-20'>
            <title>Send Parcel</title>
            <h1 className='text-secondary-content pb-5'>Send A Parcel</h1>
            <h2 className='text-secondary-content'>Enter Your Parcel Details</h2>
            <hr className='border-secondary border-dashed my-7' />
            <form onSubmit={handleSubmit(handleSendParcel)} className='space-y-7 text-black text-sm font-bold'>
                {/* parcel type  document/non document */}
                <div>
                    <label className="label mr-6">
                        <input type="radio" {...register("parcelType")} value="document" className="radio radio-default " defaultChecked />
                        Document</label>
                    <label className="label">
                        <input type="radio" {...register("parcelType")} value="non-document" className="radio radio-default" />
                        Non-Document</label>
                </div>
                {/* product info */}
                <div className='grid grid-cols-1 md:grid-cols-2 mx-auto gap-12'>
                    {/* product name */}
                    <fieldset className="fieldset">
                        <label className="label">Parcel Name</label>
                        <input type="text" {...register("parcelName")} className="input w-full" placeholder="Parcel Name" />
                    </fieldset>
                    {/* product weight */}
                    <fieldset className="fieldset">
                        <label className="label">Parcel Weight (kg)</label>
                        <input type="number" {...register("parcelWeight")} className="input w-full" placeholder="Parcel Weight" />
                    </fieldset>
                </div>
                {/* two columns */}
                <div className='grid grid-cols-1 md:grid-cols-2 mx-auto gap-12'>
                    {/* sender column */}
                    <fieldset className="fieldset">
                        <h3 className='text-secondary'>Sender Details</h3>
                        {/* sender name */}
                        <label className="label">Sender Name</label>
                        <input type="text" {...register("senderName")} defaultValue={user?.displayName} className="input w-full" placeholder="Sender Name" />
                        {/* sender email */}
                        <label className="label">Sender Email</label>
                        <input type="email" {...register("senderEmail")} defaultValue={user?.email} className="input w-full" placeholder="Sender Email" />
                        {/* sender phone */}
                        <label className="label">Sender Phone Number</label>
                        <input type="tel" {...register("senderPhone")} className="input w-full" placeholder="+880" />
                        {/* sender region */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Sender Region</legend>
                            <select {...register("senderRegion")} defaultValue="Pick a Region" className="select text-accent w-full">
                                <option disabled={true}>Pick a Region</option>
                                {
                                    regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                                }
                            </select>
                        </fieldset>
                        {/* sender districts */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Sender District</legend>
                            <select {...register("senderDistrict")} defaultValue="Pick a District" className="select text-accent w-full">
                                <option disabled={true}>Pick a District</option>
                                {
                                    districtsByRegion(senderRegion).map((d, i) => <option key={i} value={d}>{d}</option>)
                                }
                            </select>
                        </fieldset>
                        {/* sender  address*/}
                        <label className="label">Sender Address</label>
                        <input type="text" {...register("senderAddress")} className="input w-full" placeholder="Sender Address" />
                        {/* pickup instructions*/}
                        <label className="label">Pickup Instructions</label>
                        <textarea {...register("pickupInfo")} cols="30" rows="10" className="textarea w-full" placeholder='Pickup Instructions'></textarea>
                    </fieldset>


                    {/* reciever column */}
                    <fieldset className="fieldset">
                        <h3 className='text-secondary'>Receiver Details</h3>
                        {/* sender name */}
                        <label className="label">Receiver Name</label>
                        <input type="text" {...register("receiverName")} className="input w-full" placeholder="Receiver Name" />
                        {/* sender email */}
                        <label className="label">Receiver Email</label>
                        <input type="email" {...register("receiverEmail")} className="input w-full" placeholder="Receiver Email" />
                        {/* sender phone */}
                        <label className="label">Receiver Phone Number</label>
                        <input type="tel" {...register("receiverPhone")} className="input w-full" placeholder="+880" />
                        {/* sender region */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Receiver Region</legend>
                            <select {...register("receiverRegion")} defaultValue="Pick a Region" className="select text-accent w-full">
                                <option disabled={true}>Pick a Region</option>
                                {
                                    regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                                }
                            </select>
                        </fieldset>
                        {/* sender districts */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Receiver District</legend>
                            <select {...register("receiverDistrict")} defaultValue="Pick a District" className="select text-accent w-full">
                                <option disabled={true}>Pick a District</option>
                                {
                                    districtsByRegion(receiverRegion).map((d, i) => <option key={i} value={d}>{d}</option>)
                                }
                            </select>
                        </fieldset>
                        {/* sender  address*/}
                        <label className="label">Receiver Address</label>
                        <input type="text" {...register("receiverAddress")} className="input w-full" placeholder="Receiver Address" />
                        {/* pickup instructions*/}
                        <label className="label">Delivery Instructions</label>
                        <textarea {...register("deliveryInfo")} cols="30" rows="10" className="textarea w-full" placeholder='Delivery Instructions'></textarea>
                    </fieldset>

                </div>
                <input type="submit" value="Proceed to Confirm Booking" className='btn1' />

            </form>
        </div>
    );
};

export default SendParcel;