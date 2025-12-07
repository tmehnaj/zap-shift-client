import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const ReviewCard = ({review}) => {
    const {userName, user_photoURL, review: testimonial} = review;
    return (
          <div className="max-w-sm bg-white shadow-lg rounded-xl px-6 py-8 border border-gray-200">
            {/* Quote Icon */}
            <FaQuoteLeft className="text-primary text-2xl mb-5" />

            {/* Review Text */}
            <p className="mb-5 text-accent">
                {testimonial}
            </p>

            {/* Divider */}
            <div className="border-t border-dashed border-secondary my-5"></div>

            {/* Profile */}
            <div className="flex items-center gap-4">
                <div >
                    <img src={user_photoURL} alt=""className="w-10 h-10 rounded-full bg-primary"/>
                </div>
                <div>
                    <h3 className="text-secondary font-bold">{userName}</h3>
                    <p className="text-sm text-accent">Senior Product Designer</p>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;