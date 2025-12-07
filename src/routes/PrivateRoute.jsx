import React from 'react';
import useAuth from '../assets/Hooks/useAuth';
import Loader from '../Components/Loader';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
    const { user, loading} = useAuth();
    const location = useLocation();
    // console.log(location.pathname);

    if(loading){
        return <Loader></Loader>
    }
    if(!user){
        return <Navigate state={location.pathname} to="/login"></Navigate>
    }
    return children;
};

export default PrivateRoute;