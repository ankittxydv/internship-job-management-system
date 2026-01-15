import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import { USER_API_END_POINT } from '../utils/constant'
import { LogOut, User as UserIcon } from 'lucide-react'

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, {
                withCredentials: true
            });
            if (res.data.success) {
                logout();
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="text-2xl font-bold text-primary-600">Intern<span className='text-slate-900'>Hire</span></Link>
                    </div>

                    <div className="hidden md:flex space-x-8 items-center">
                        {user && user.role === 'recruiter' ? (
                            <>
                                <Link to="/admin/companies" className="text-gray-600 hover:text-primary-600 font-medium">Companies</Link>
                                <Link to="/admin/jobs/manage" className="text-gray-600 hover:text-primary-600 font-medium">Manage Jobs</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/jobs" className="text-gray-600 hover:text-primary-600 font-medium">Browse Jobs</Link>
                                {user && <Link to="/my-applications" className="text-gray-600 hover:text-primary-600 font-medium">My Applications</Link>}
                            </>
                        )}
                    </div>

                    <div className="flex items-center space-x-4">
                        {!user ? (
                            <>
                                <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">Login</Link>
                                <Link to="/signup" className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition">Signup</Link>
                            </>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link to="/profile" className="flex items-center space-x-2 text-gray-700 hover:text-primary-600">
                                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                                        <UserIcon size={18} className="text-primary-600" />
                                    </div>
                                    <span className="font-medium hidden sm:inline">{user.fullname}</span>
                                </Link>
                                <button
                                    onClick={logoutHandler}
                                    className="flex items-center space-x-1 text-gray-500 hover:text-red-600 px-3 py-1 rounded-md transition"
                                >
                                    <LogOut size={18} />
                                    <span className="font-medium hidden sm:inline">Logout</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
