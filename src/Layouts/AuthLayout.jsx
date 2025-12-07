import React from 'react';
import Logo from '../Components/Logo';
import { Outlet } from 'react-router';
import authImg from '../assets/others/authImage.png'

const AuthLayout = () => {
    return (
        <div className='max-w-7xl mx-auto min-h-screen px-6'>
            <div className='pt-5'>
                <Logo></Logo>
            </div>
            <div className='flex flex-col-reverse md:flex-row gap-5 items-center my-20'>
                <div className='flex-1'>
                    <Outlet></Outlet>
                </div>
                <div className='flex-1'>
                    <figure>
                        <img src={authImg} alt="" />
                    </figure>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;