import React, { use } from 'react';
import serviceImg from '../../../assets/others/service.png'

// const miniCard = [
//     {
//         id: 1,
//         title: "Express  & Standard Delivery",
//         description: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off."
//     },
//     {
//         id: 2,
//         title: "Nationwide Delivery",
//         description: "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
//     },
//     {
//         id: 3,
//         title: "Fulfillment Solution",
//         description: "We also offer customized service with inventory management support, online order processing, packaging, and after sales support."
//     },
//     {
//         id: 4,
//         title: "Cash on Home Delivery",
//         description: "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product."
//     },
//     {
//         id: 5,
//         title: "Corporate Service / Contract In Logistics",
//         description: "Customized corporate services which includes warehouse and inventory management support."
//     },
//     {
//         id: 5,
//         title: "Parcel Return",
//         description: "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants."
//     }
// ]

const servicePromise = fetch('/services.json').then(res=>res.json());

const Services = () => {
    const services = use(servicePromise);
    return (
       <div className='my-20 bg-secondary px-10 py-12 rounded-3xl'>
                    <div className='text-white text-center max-w-[600px] pb-12 mx-auto space-y-5'>
                        <h2>Our Services</h2>
                        <p>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
                    </div>
                   <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-5 my-5'>
                   {
                       services.map((card, index)=> <div key={index} className='max-w-96  mx-auto  rounded-2xl shadow-xl bg-white text-center px-5 py-10 flex flex-col items-center justify-center hover:bg-primary'>
                       <figure className='bg-linear-to-t from-transparent via-gray-200 to-gray-400 rounded-full mb-3 p-10 '>
                        <img src={serviceImg} alt="" className='w-10 h-10 z-10'/>
                       </figure>
                       <h3 className='font-bold text-secondary text-lg pb-4'>{card.title}</h3>
                       <p className='text-accent'>{card.description}</p>
                   </div>)
                   }
               </div>
               </div>
    );
};

export default Services;