import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import sliderImg1 from '../../../assets/banner/banner1.png'
import sliderImg2 from '../../../assets/banner/banner2.png'
import sliderImg3 from '../../../assets/banner/banner3.png'

const Banner = () => {
    return (
         
            <Carousel
         autoPlay={true}
         infiniteLoop={true}
         interval="3000">
                <div className='h-48 md:h-[400px] lg:h-[450px]'>
                    <img src={sliderImg1} className='w-full h-full object-cover'/>   
                </div>
                <div className='h-48 md:h-80 lg:h-96'>
                    <img src={sliderImg2} className='w-full h-full object-cover'/>  
                </div>
                <div className='h-48 md:h-80 lg:h-96'>
                    <img src={sliderImg3} className='w-full h-full object-cover'/>
                </div>
            </Carousel>
         
    );
};

export default Banner;