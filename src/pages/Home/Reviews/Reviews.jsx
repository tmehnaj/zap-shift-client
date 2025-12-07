import React, { use } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

// import required modules
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import ReviewCard from './ReviewCard';

const reviewPromise = fetch('/reviews.json').then(res => res.json());
const Reviews = () => {
    const reviews = use(reviewPromise);
    // console.log(reviews)

    return (
        <div className='my-20'>
            <div className='max-w-[600px] mx-auto pb-12  space-y-5  text-center'>
                <h2 className='text-secondary-content'>What our customers are sayings</h2>
                <p className='text-accent-content'>Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!</p>
            </div>
            <Swiper
            loop={true}
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={3}
            coverflowEffect={{
                rotate: 30,
                stretch: "50%",
                depth: 200,
                modifier: 1,
                scale: 0.75,
                slideShadows: true,
            }}
             autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
            modules={[EffectCoverflow, Pagination,Autoplay]}
            className="mySwiper">
            {
                reviews.map((review) => <SwiperSlide key={review.id}>
                    <ReviewCard  review={review}></ReviewCard>
                </SwiperSlide>)
            }
        </Swiper>
        </div>
    );
};

export default Reviews;