import React from 'react';
import { BsTruck } from 'react-icons/bs';

const miniCard = [
    {
        id: 1,
        title: "Booking Pick & Drop",
        description: "From personal packages to business shipments — we deliver on time, every time."
    },
    {
        id: 2,
        title: "Cash On Delivery",
        description: "From personal packages to business shipments — we deliver on time, every time."
    },
    {
        id: 3,
        title: "Delivery Hub",
        description: "From personal packages to business shipments — we deliver on time, every time."
    },
    {
        id: 4,
        title: "Booking Pick & Drop",
        description: "From personal packages to business shipments — we deliver on time, every time."
    }
]
const HowItWorks = () => {
    return (
        <div className='my-20'>
             <h2 className='text-secondary-content text-center lg:text-left'>How It Works</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 my-5'>
            {
                miniCard.map((card, index)=> <div key={index} className='max-w-80  mx-auto  rounded-2xl shadow-xl bg-white text-left px-5 py-6'>
                <BsTruck className='my-5 h-10 w-10 text-accent font-bold'/>
                <h3 className='font-bold text-secondary text-lg pb-4'>{card.title}</h3>
                <p className='text-accent'>{card.description}</p>
            </div>)
            }
        </div>
        </div>
    );
};

export default HowItWorks;