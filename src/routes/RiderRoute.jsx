import React from 'react';
import useAuth from '../assets/Hooks/useAuth';
import useRole from '../assets/Hooks/useRole';
import Loader from '../Components/Loader';
import Forbidden from '../Components/Forbidden';

const RiderRoute = ({children}) => {
   const { user, loading} = useAuth();
    const {role, roleLoading} = useRole();
    console.log('role inside adminroute',role);

    if( loading || roleLoading || !user){
        return <Loader></Loader>
    }
    if( role !== 'rider'){
        return <Forbidden></Forbidden>
    }

    return children;
};

export default RiderRoute;