import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import casioImg from '../../../assets/brands/casio.png'
import amazonImg from '../../../assets/brands/amazon.png'
import moonImg from '../../../assets/brands/moonstar.png'
import starImg from '../../../assets/brands/star.png'
import peopleImg from '../../../assets/brands/start_people.png'
import radstandImg from '../../../assets/brands/randstad.png'
import { Autoplay } from 'swiper/modules';

const brandLogos = [casioImg, amazonImg, moonImg, starImg, peopleImg, radstandImg];

const Brands = () => {
    return (
        <div className='my-20'>

            <h2 className='text-secondary-content max-w-[600px] pb-12 mx-auto'>We've helped thousands of sales teams</h2>

            <Swiper
                loop={true}
                slidesPerView={4}
                centeredSlides={true}
                spaceBetween={30}
                grabCursor={true}
                autoplay={{
                    delay: 1000,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                className="mySwiper">
                {
                    brandLogos.map((logo, index) => <SwiperSlide key={index}>
                        <img src={logo} alt="" />
                    </SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default Brands;