import React from 'react';
import card1Img from '../../../assets/others/live-tracking.png'
import card2Img from '../../../assets/others/safe-delivery.png'


const cards = [
    {
        id: 1,
        title:"Live Parcel Tracking",
        img: card1Img,
        description:"Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    },
      {
        id: 2,
        title:"100% Safe Delivery",
        img: card2Img,
        description:"We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    },
      {
        id: 3,
        title:"24/7 Call Center Support",
        img: card2Img,
        description:"We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    }
]
const Facilities = () => {
    return (
        <div className='border-y-2 border-dashed border-secondary-content py-20 my-20 space-y-8'>
         {
            cards.map((card)=>   <div className='bg-white rounded-2xl p-4 flex items-center gap-8'>
                <figure className='p-4 border-r-2 border-dashed border-secondary'>
                    <img src={card.img} alt="" />
                </figure>
                <div className='text-left space-y-5'>
                    <h3 className='text-secondary'>{card.title}</h3>
                    <p className='text-accent'>{card.description}</p>
                </div>
            </div>)
         }
        </div>
    );
};

export default Facilities;