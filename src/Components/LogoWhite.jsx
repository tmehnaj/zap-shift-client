import React from 'react';
import logoImg from '../assets/others/logo.png'
import { Link } from 'react-router';

const LogoWhite = () => {
    return (
          <Link to="/">
        <div className='flex items-end'>
            <img src={logoImg} alt="" className='w-8'/>
            <h3 className='text-2xl font-bold -ml-3 text-white'>ZapShift</h3>
        </div>
        </Link>
    );
};

export default LogoWhite;