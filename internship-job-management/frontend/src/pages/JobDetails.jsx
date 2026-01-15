import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { BadgeCheck, MapPin, DollarSign, Clock, Users, Loader2 } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { getJobById, applyToJob } from '../services/api'
import { useAuth } from '../context/AuthContext'

const JobDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [job, setJob] = useState(null);
    const [isApplied, setIsApplied] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const res = await getJobById(id);
                if (res.data.success) {
                    setJob(res.data.job);
                    // Check if user already applied
                    const applied = res.data.job.applications?.some(
                        app => app.applicant === user?._id
                    );
                    setIsApplied(applied);
                }
            } catch (error) {
                console.error('Error fetching job details:', error);
            } finally {
                setPageLoading(false);
            }
        };

        if (id) {
            fetchJobDetails();
        }
    }, [id, user]);

    const handleApply = async () => {
        if (!user) {
            alert('Please login to apply');
            return;
        }

        try {
            setLoading(true);
            const res = await applyToJob(id);

            if (res.data.success) {
                setIsApplied(true);
                alert('Application submitted successfully!');
            }
        } catch (error) {
            console.error('Error applying to job:', error);
            alert(error.response?.data?.message || 'Failed to apply. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (pageLoading) {
        return (
            <div className='min-h-screen bg-slate-50'>
                <Navbar />
                <div className='flex justify-center items-center h-[80vh]'>
                    <Loader2 className='animate-spin text-primary-600' size={48} />
                </div>
            </div>
        );
    }

    if (!job) {
        return (
            <div className='min-h-screen bg-slate-50'>
                <Navbar />
                <div className='flex justify-center items-center h-[80vh]'>
                    <p className='text-slate-400 text-xl'>Job not found</p>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-slate-50'>
            <Navbar />
            <div className='max-w-4xl mx-auto my-10 px-4'>
                <div className='bg-white rounded-3xl p-8 border border-slate-100 shadow-sm'>
                    <div className='flex items-center justify-between mb-8'>
                        <div>
                            <h1 className='font-bold text-3xl text-slate-900 mb-2'>{job.title}</h1>
                            <div className='flex flex-wrap gap-2'>
                                <span className='px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold'>
                                    {job.position} Positions
                                </span>
                                <span className='px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-xs font-bold'>
                                    {job.jobType}
                                </span>
                                <span className='px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-bold'>
                                    {job.salary} LPA
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={handleApply}
                            disabled={isApplied || loading || user?.role === 'recruiter'}
                            className={`px-8 py-3 rounded-full font-bold text-white transition-all shadow-lg ${isApplied || user?.role === 'recruiter'
                                    ? 'bg-slate-400 cursor-not-allowed shadow-none'
                                    : loading
                                        ? 'bg-primary-500 cursor-not-allowed'
                                        : 'bg-primary-600 hover:bg-primary-700 hover:-translate-y-1 active:translate-y-0'
                                }`}
                        >
                            {loading ? (
                                <span className='flex items-center gap-2'>
                                    <Loader2 className='animate-spin' size={20} /> Applying...
                                </span>
                            ) : isApplied ? (
                                'Already Applied'
                            ) : user?.role === 'recruiter' ? (
                                'Recruiter Account'
                            ) : (
                                'Apply Now'
                            )}
                        </button>
                    </div>

                    <div className='border-t border-slate-100 pt-8'>
                        <h2 className='font-bold text-xl text-slate-900 mb-6'>Job Description</h2>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-y-6 text-sm'>
                            <div className='flex items-center gap-2'>
                                <span className='font-bold text-slate-900 w-32'>Role:</span>
                                <span className='text-slate-600'>{job.title}</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <span className='font-bold text-slate-900 w-32'>Location:</span>
                                <span className='text-slate-600'>{job.location}</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <span className='font-bold text-slate-900 w-32'>Description:</span>
                                <span className='text-slate-600'>{job.description}</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <span className='font-bold text-slate-900 w-32'>Salary:</span>
                                <span className='text-slate-600'>{job.salary} LPA</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <span className='font-bold text-slate-900 w-32'>Experience:</span>
                                <span className='text-slate-600'>{job.experienceLevel} Years</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <span className='font-bold text-slate-900 w-32'>Total Applicants:</span>
                                <span className='text-slate-600'>{job.applications?.length || 0}</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <span className='font-bold text-slate-900 w-32'>Posted Date:</span>
                                <span className='text-slate-600'>
                                    {new Date(job.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        </div>

                        {job.requirements && job.requirements.length > 0 && (
                            <div className='mt-8'>
                                <h3 className='font-bold text-lg text-slate-900 mb-4'>Requirements</h3>
                                <ul className='list-disc list-inside space-y-2 text-slate-600'>
                                    {job.requirements.map((req, index) => (
                                        <li key={index}>{req}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobDetails
