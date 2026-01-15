import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import FilterCard from '../components/FilterCard'
import JobCard from '../components/JobCard'
import { useSearchParams } from 'react-router-dom'
import { getAllJobs } from '../services/api'
import { Loader2 } from 'lucide-react'

const Jobs = () => {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || '';
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setLoading(true);
                const res = await getAllJobs(searchQuery);
                if (res.data.success) {
                    setJobs(res.data.jobs);
                }
            } catch (error) {
                console.error('Error fetching jobs:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, [searchQuery]);

    return (
        <div className='min-h-screen bg-white'>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5 px-4'>
                {searchQuery && (
                    <div className='mb-6'>
                        <h2 className='text-2xl font-bold text-slate-900'>
                            Showing results for: <span className='text-primary-600'>"{searchQuery}"</span>
                        </h2>
                    </div>
                )}
                <div className='flex gap-10'>
                    <div className='w-1/5 hidden md:block'>
                        <FilterCard />
                    </div>
                    {loading ? (
                        <div className='flex-1 flex justify-center items-center h-[88vh]'>
                            <Loader2 className='animate-spin text-primary-600' size={48} />
                        </div>
                    ) : jobs.length <= 0 ? (
                        <div className='flex-1 flex justify-center items-center h-[88vh]'>
                            <span className='text-slate-400 text-xl'>No jobs found</span>
                        </div>
                    ) : (
                        <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pr-4'>
                                {jobs.map((job) => (
                                    <div key={job._id}>
                                        <JobCard job={job} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Jobs
