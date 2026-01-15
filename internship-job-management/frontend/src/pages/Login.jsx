import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '../utils/constant'
import { useAuth } from '../context/AuthContext'
import { Loader2 } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                login(res.data.user);
                navigate("/");
            }
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto py-12 px-4'>
                <form onSubmit={submitHandler} className='w-full max-w-md bg-white border border-slate-200 p-8 rounded-2xl shadow-sm'>
                    <h1 className='font-bold text-2xl mb-2 text-slate-900 text-center'>Welcome Back</h1>
                    <p className='text-slate-500 text-center mb-8'>Login to access your internship dashboard</p>

                    <div className='space-y-4'>
                        <div>
                            <label className='block text-sm font-medium text-slate-700 mb-1'>Email Address</label>
                            <input
                                type="email"
                                value={input.email}
                                name="email"
                                onChange={changeEventHandler}
                                className='w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition'
                                placeholder="name@company.com"
                                required
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-slate-700 mb-1'>Password</label>
                            <input
                                type="password"
                                value={input.password}
                                name="password"
                                onChange={changeEventHandler}
                                className='w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition'
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <div className='flex items-center justify-between py-2'>
                            <label className='text-sm font-medium text-slate-700'>Role</label>
                            <div className='flex items-center gap-6'>
                                <div className='flex items-center gap-2'>
                                    <input
                                        type="radio"
                                        name="role"
                                        value="student"
                                        checked={input.role === 'student'}
                                        onChange={changeEventHandler}
                                        className='cursor-pointer accent-primary-600'
                                        required
                                    />
                                    <span className='text-sm text-slate-600 font-medium'>Student</span>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <input
                                        type="radio"
                                        name="role"
                                        value="recruiter"
                                        checked={input.role === 'recruiter'}
                                        onChange={changeEventHandler}
                                        className='cursor-pointer accent-primary-600'
                                        required
                                    />
                                    <span className='text-sm text-slate-600 font-medium'>Recruiter</span>
                                </div>
                            </div>
                        </div>

                        {loading ? (
                            <button className='w-full bg-primary-600 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2 cursor-not-allowed'>
                                <Loader2 className='animate-spin' /> Logging in...
                            </button>
                        ) : (
                            <button type='submit' className='w-full bg-primary-600 text-white py-2 rounded-lg font-semibold hover:bg-primary-700 transition shadow-sm'>
                                Login
                            </button>
                        )}

                        <p className='text-center text-sm text-slate-600 mt-6'>
                            Don't have an account? <Link to="/signup" className='text-primary-600 font-semibold hover:underline'>Sign up</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
