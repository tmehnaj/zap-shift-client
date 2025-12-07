import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../assets/Hooks/useAuth';
import GoogleLogin from '../SocialLogin/GoogleLogin';
import { Link, useLocation, useNavigate } from 'react-router';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { loginUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    // console.log(location)

    const handleLogIn = (data) => {
        // console.log(data);
        loginUser(data.email, data.password)
            .then(result => {
                // console.log("after login", result);
                navigate(location?.state || '/');
            })
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <div className='space-y-8'>
            <div>
                <h1 className='text-secondary pb-3'>Welcome back!</h1>
                <p className='text-accent'>Log In with Zap-Shift</p>
            </div>
            <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl p-6">
                <title>Register</title>
                <div className="card-body">
                    <form onSubmit={handleSubmit(handleLogIn)}>
                        <fieldset className="fieldset">
                            {/* email */}
                            <label className="label">Email</label>
                            <input type="email" className="input w-full rounded-xl" placeholder="Email" {...register("email", { required: true })} />
                            {errors.email?.type === 'required' && <p className='text-error'>Email is required</p>}
                            {/* password */}
                            <label className="label">Password</label>
                            <input type="password" className="input w-full rounded-xl" placeholder="Password" {...register("password", {
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
                            <div><a className="link link-hover">Forgot password?</a></div>

                            <button className="btn1 mt-4 font-bold">Login</button>
                        </fieldset>
                        <p className='text-accent py-2'>New to Our Website? Please <Link className='text-blue-700 underline' state={location?.state} to="/register">Register</Link></p>
                        <GoogleLogin></GoogleLogin>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;