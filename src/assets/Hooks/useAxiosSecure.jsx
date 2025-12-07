import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    baseURL: "http://localhost:3000",
})
const useAxiosSecure = () => {
    const { user, logOutUser } = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        const requestInterceptors = axiosSecure.interceptors.request.use(config=>{
            config.headers.Authorization = `Bearer ${user?.accessToken}`;
            return config;
        })

        // //response
        // const responseInterceptors = axiosSecure.interceptors.response.use((response)=>{
        //     return response;
        // },(err)=>{
        //     console.log(err);
        //     const statusCode = err.status;
        //     if(statusCode === 401 || statusCode === 403){
        //         logOutUser()
        //         .then(()=>{
        //             navigate('/login');
        //         })
        //     }
        //     return Promise.reject(err);
        // })

        return ()=>{
            axiosSecure.interceptors.request.eject(requestInterceptors);
            // axiosSecure.interceptors.response.eject(responseInterceptors);
        }
    },[user])
    
    return axiosSecure;
};

export default useAxiosSecure;