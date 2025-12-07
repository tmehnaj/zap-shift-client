import React, { useState } from 'react';
import { FaUserShield } from 'react-icons/fa6';
import { FiShieldOff } from 'react-icons/fi';
import useAxiosSecure from '../../../assets/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const UsersManagement = () => {
    const [searchText,setSearchText] = useState('');
    const axiosSecure = useAxiosSecure();

    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users', searchText],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?searchText=${searchText}`);
            return res.data;
        }
    })


    const handleMakeAdmin = user => {
        const userUpdateInfo = {
            role: 'admin',
        }
        axiosSecure.patch(`/users/${user._id}/role`, userUpdateInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user?.displayName} is now Admin`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleRemoveAdmin = user => {
        const userUpdateInfo = {
            role: 'user',
        }
        axiosSecure.patch(`/users/${user._id}/role`, userUpdateInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user?.displayName} is removed from Admin`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
            .catch(err => {
                console.log(err);
            })

    }



    return (
        <div>
            <h2 className='text-4xl'>Manage Users: {users.length}</h2>
            <label className="input m-10">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                <input
                onChange={(e)=>setSearchText(e.target.value)}
                 type="search" required placeholder="Search" />
            </label>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Admin Action</th>
                            <th>Others Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => <tr>
                            <td>
                                {index + 1}
                            </td>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src={user.photoURL}
                                                alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{user.displayName}</div>
                                        <div className="text-sm opacity-50">United States</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {user.email}
                            </td>
                            <td>
                                {user.role}
                            </td>
                            <td>
                                {user.role === 'admin' ?
                                    <button
                                        onClick={() => handleRemoveAdmin(user)}
                                        className='btn bg-red-300'>
                                        <FiShieldOff></FiShieldOff>                                  </button> :
                                    <button
                                        onClick={() => handleMakeAdmin(user)}
                                        className='btn bg-green-400'>
                                        <FaUserShield></FaUserShield>
                                    </button>
                                }
                            </td>
                            <th>
                                Actions
                            </th>
                        </tr>)}



                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersManagement;