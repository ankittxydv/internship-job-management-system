import React from 'react'
import JobCard from './JobCard';
import { Loader2 } from 'lucide-react';

const LatestJobs = ({ jobs = [], loading = false }) => {

    return (
        <div className='max-w-7xl mx-auto my-20 px-4'>
            <h1 className='text-4xl font-bold text-slate-900 mb-10'>
                <span className='text-primary-600'>Latest & Top</span> Job Openings
            </h1>

            {loading ? (
                <div className='flex justify-center items-center py-20'>
                    <Loader2 className='animate-spin text-primary-600' size={48} />
                </div>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {
                        jobs.length <= 0 ? (
                            <span className='text-slate-400 text-lg'>No Jobs Available</span>
                        ) : (
                            jobs.slice(0, 6).map((job) => <JobCard key={job._id} job={job} />)
                        )
                    }
                </div>
            )}
        </div>
    )
}

export default LatestJobs
