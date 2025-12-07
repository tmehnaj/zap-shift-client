import React from 'react';
import Navbar from '../pages/Shared/Navbar/Navbar';
import Footer from '../pages/Shared/Footer/Footer';
import { Outlet } from 'react-router';

const RootLayout = () => {
    return (
      <div className='max-w-7xl mx-auto flex flex-col min-h-screen px-3'>
          <header>
            <Navbar></Navbar>
        </header>
        <main className='flex-1'>
            <Outlet></Outlet>
        </main>
        <footer>
            <Footer></Footer>
        </footer>
      </div>
    );
};

export default RootLayout;