import React from 'react';
import Banner from '../Banner/Banner';
import HowItWorks from '../HowItWorks/HowItWorks';
import Services from '../Services/Services';
import Brands from '../Brands/Brands';
import Facilities from '../Facilities/Facilities';
import Reviews from '../Reviews/Reviews';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <Services></Services>
            <Brands></Brands>
            <Facilities></Facilities>
            <Reviews></Reviews>
        </div>
    );
};

export default Home;