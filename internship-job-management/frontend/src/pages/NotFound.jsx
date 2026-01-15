import React from 'react'
import { Link } from 'react-router-dom'
import { Home as HomeIcon, Search } from 'lucide-react'

const NotFound = () => {
    return (
        <div className='min-h-screen bg-slate-50 flex items-center justify-center px-4'>
            <div className='text-center max-w-md'>
                <h1 className='text-9xl font-bold text-primary-600 mb-4'>404</h1>
                <h2 className='text-3xl font-bold text-slate-900 mb-4'>Page Not Found</h2>
                <p className='text-slate-500 mb-8'>
                    Sorry, the page you're looking for doesn't exist or has been moved.
                </p>
                <div className='flex gap-4 justify-center'>
                    <Link
                        to="/"
                        className='bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 transition'
                    >
                        <HomeIcon size={20} /> Go Home
                    </Link>
                    <Link
                        to="/jobs"
                        className='bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-6 py-3 rounded-full font-bold flex items-center gap-2 transition'
                    >
                        <Search size={20} /> Browse Jobs
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NotFound
