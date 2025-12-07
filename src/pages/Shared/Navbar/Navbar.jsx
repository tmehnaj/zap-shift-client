import React from 'react';
import Logo from '../../../Components/Logo';
import { Link, NavLink} from 'react-router';
import useAuth from '../../../assets/Hooks/useAuth';

const Navbar = () => {
  const { user, logOutUser} = useAuth();

  const handleLogOut = ()=>{
    logOutUser()
    .then(()=>{
      console.log('logout successfully');
      // navigate('/');
    })
    .catch(err=>{
      console.log(err);
    })
  }

    const links = <>
        <NavLink to="/"><li className='mr-3'>Home</li></NavLink>
        <NavLink to="/coverage"><li className='mr-3'>Coverage</li></NavLink>
        <NavLink to="/about"><li>About</li></NavLink>


        {
          user && <>
          <NavLink to="/send-parcel"><li className='mr-3'>Send Parcel</li></NavLink>
          <NavLink to="/dashboard/my-parcels"><li className='mr-3'>My Parcels</li></NavLink>
          </>
        }
    </>
    return (
        <nav className="navbar bg-base-100 shadow-sm rounded-2xl my-5 sm:px-8 ">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {links}
      </ul>
    </div>
    
        <Logo></Logo>
    
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 ">
      {links}
    </ul>
  </div>
  <div className="navbar-end">
    {/* theme controller */}

    {/* theme controller end */}
    {
      user ? <Link onClick={handleLogOut} to="/" className='mx-3 btn2'>Sign Out</Link> :
      <Link to="/login" className='mx-3 btn2'>Sign In</Link>
    }
    <Link to="/be-rider" className="btn1">Be A Rider</Link>
  </div>
</nav>
    );
};

export default Navbar;