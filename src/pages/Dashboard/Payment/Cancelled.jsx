import React from 'react';
import { Link } from 'react-router';

const Cancelled = () => {
    return (
        <div className=' my-20 px-5'>
            <h1 className='text-secondary mb-10'>Payment is Cancelled</h1>
            <Link to="/dashboard/my-parcels"><button className='btn1'>Try Again</button></Link>
        </div>
    );
};

export default Cancelled;