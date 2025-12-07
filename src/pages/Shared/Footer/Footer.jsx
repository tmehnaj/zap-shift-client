import React from 'react';
import { Link } from 'react-router';
import { FaXTwitter } from 'react-icons/fa6';
import LogoWhite from '../../../Components/LogoWhite';

const Footer = () => {
      
    return (
       <footer className="container mx-auto rounded-2xl footer footer-horizontal footer-center bg-neutral text-white p-10">
         <aside>
         <LogoWhite></LogoWhite>
    <p className="pt-2 text-center max-w-2xl">
     Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
    </p>
   
  </aside>
  <nav className="grid grid-flow-col gap-4">
    <Link to="/" className="link link-hover">Home</Link>
    <Link to="coverage" className="link link-hover">Coverage</Link>
    <Link to="about" className="link link-hover">About</Link>
  </nav>
  <nav>
    <div className="grid grid-flow-col gap-4">
      <a>
        <FaXTwitter className='fill-current w-6 h-6'/>
      </a>
      <a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current">
          <path
            d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
        </svg>
      </a>
      <a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current">
          <path
            d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
        </svg>
      </a>
    </div>
  </nav>
  <aside>
    <p>Copyright © {new Date().getFullYear()} - All right reserved by ACME Industries Ltd</p>
  </aside>
</footer>
    );
};

export default Footer;