import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../assets/Hooks/useAuth';
import GoogleLogin from '../SocialLogin/GoogleLogin';
import { Link, useLocation, useNavigate } from 'react-router';
import axios from 'axios';
import { imageOverlay } from 'leaflet';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../../assets/Hooks/useAxiosSecure';

const Register = () => {
    const { register, handleSubmit, formState: {errors}} = useForm();
    const { createUser, updateUserProfile } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    // console.log(location);

    const handleRegister = data=>{
        // console.log(data);
        const imageFile = data.photo[0];

        createUser(data.email,data.password)
        .then(result=>{
            // console.log("after create user",result);
           //store image in formdata and get the link
           const formData = new FormData();
           formData.append('image',imageFile);

 const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`

           axios.post(image_API_URL,formData)
           .then(res=>{
            // console.log('after axios',res.data.data.url);
            //update profile
            const updateProfile = {
                displayName: data.name,
                photoURL: res.data.data.url
            }


            //put user in database
            const userInfo = {
                displayName: data.name,
                email: data.email,
                photoURL: res.data.data.url,
            }
            axiosSecure.post('/users',userInfo)
            .then(res=>{
                // console.log('users after post',res.data);
                if(res.data.insertedId){
                    console.log('user is stored in database');
                }
            })
            

            updateUserProfile(updateProfile)
            .then(()=>{
                console.log('user profile updated successfully');
                toast.success('registration successful!');
                navigate(location?.state || "/");
            })
            .catch(err=>{
                console.log(err)
            })
           })
            
        })
        .catch(err=>{
            console.log(err);
        })
    }

    return (
        <div className='space-y-8'>
            <div>
                <h1 className='text-secondary pb-3'>Create An Account</h1>
                <p className='text-accent'>Register with Zap-Shift</p>
            </div>
            <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl p-6">
                <title>Register</title>
                <div className="card-body">
                    <form onSubmit={handleSubmit(handleRegister)}>
                        <fieldset className="fieldset">
                            {/* Name */}
                            <label className="label">Name</label>
                            <input type="text" className="input w-full rounded-xl" placeholder="Your Name" {...register("name",{required: true})} />
                            {errors.name?.type === 'required' && <p className='text-error'>Name is required</p>}

                             {/* image file */}
                            <label className="label">Upload Photo</label>
                            <input type="file" className="file-input w-full rounded-xl" placeholder="Photo" {...register("photo",{
                                required: "Image is required",
                                validate:{
                                    fileType: value=> ["image/jpeg","image/png"].includes(value[0]?.type) || "Only JPG or PNG allowed",

                                    fileSize: value=> value[0]?.size < 2 * 1024 * 1024 || "Max file size is 2MB",
                                }
                                })} />
                            {errors.photo && <p className='text-error'>{errors.photo.message}</p>}


                            {/* email */}
                            <label className="label">Email</label>
                            <input type="email" className="input w-full rounded-xl" placeholder="Email" {...register("email",{required: true})} />
                            {errors.email?.type === 'required' && <p className='text-error'>Email is required</p>}
                            {/* password */}
                            <label className="label">Password</label>
                            <input type="password" className="input w-full rounded-xl" placeholder="Password" {...register("password",{
                                 required: true,
                                 minLength: 8,
                                 pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9\s]).{8,}$/
                                }
                            )} />
                            {errors.password?.type === 'required' && <p className='text-error'>Password is required</p>}
                            {
                                errors.password?.type === 'minLength' && <p className='text-error'>Password must have 8 characters</p>
                            }
                             {
                                errors.password?.type === 'pattern' && <p className='text-error'>Password must have at least one capital letter, one small letter and one special character.</p>
                            }

                            <button className="btn1 mt-4 font-bold">Register</button>
                        </fieldset>
                             <p className='text-accent py-2'>Already have an Account? Please <Link className='text-blue-700 underline' state={location?.state} to="/login">LogIn</Link></p>
                        <GoogleLogin></GoogleLogin>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;