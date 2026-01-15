import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Wallet } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-sm border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="bg-indigo-600 p-2 rounded-lg text-white">
                                <Wallet size={20} />
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                                ExpenseTracker
                            </span>
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        {user ? (
                            <>
                                <span className="text-gray-600 hidden sm:block">Welcome, <span className="font-semibold">{user.name}</span></span>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center space-x-1 text-gray-500 hover:text-red-600 transition-colors py-2 px-3 rounded-md hover:bg-red-50"
                                >
                                    <LogOut size={18} />
                                    <span className="font-medium">Logout</span>
                                </button>
                            </>
                        ) : (
                            <div className="flex space-x-3">
                                <Link to="/login" className="text-gray-600 hover:text-indigo-600 font-medium py-2 px-4">Login</Link>
                                <Link to="/signup" className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-all shadow-md shadow-indigo-200">
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
