import React from 'react'
import { Link, useRouteError } from 'react-router-dom'
import { AlertCircle, Home } from 'lucide-react'

const ErrorBoundary = () => {
    const error = useRouteError();

    return (
        <div className='min-h-screen bg-slate-50 flex items-center justify-center px-4'>
            <div className='text-center max-w-md'>
                <div className='mb-6 flex justify-center'>
                    <div className='w-20 h-20 rounded-full bg-red-100 flex items-center justify-center'>
                        <AlertCircle className='text-red-600' size={40} />
                    </div>
                </div>
                <h1 className='text-3xl font-bold text-slate-900 mb-4'>Oops! Something went wrong</h1>
                <p className='text-slate-500 mb-2'>
                    {error?.statusText || error?.message || 'An unexpected error occurred'}
                </p>
                {error?.status && (
                    <p className='text-slate-400 text-sm mb-8'>Error Code: {error.status}</p>
                )}
                <Link
                    to="/"
                    className='inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-full font-bold transition'
                >
                    <Home size={20} /> Back to Home
                </Link>
            </div>
        </div>
    )
}

export default ErrorBoundary
