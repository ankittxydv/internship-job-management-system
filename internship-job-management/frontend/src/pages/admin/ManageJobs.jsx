import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import { Plus, Edit, Trash2, Eye, MoreVertical, Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { getAdminJobs } from '../../services/api'

const ManageJobs = () => {
    const navigate = useNavigate();
    const [activeMenu, setActiveMenu] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await getAdminJobs();
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
    }, []);

    const handleDelete = (jobId) => {
        if (window.confirm('Are you sure you want to delete this job posting?')) {
            console.log('Deleting job:', jobId);
            // API call would go here
        }
    };

    const stats = {
        totalJobs: jobs.length,
        totalPositions: jobs.reduce((acc, job) => acc + job.position, 0),
        totalApplications: jobs.reduce((acc, job) => acc + (job.applications?.length || 0), 0)
    };

    if (loading) {
        return (
            <div className='min-h-screen bg-slate-50'>
                <Navbar />
                <div className='flex justify-center items-center h-[80vh]'>
                    <Loader2 className='animate-spin text-primary-600' size={48} />
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-slate-50'>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10 px-4'>
                {/* Header */}
                <div className='flex items-center justify-between mb-8'>
                    <div>
                        <h1 className='text-3xl font-bold text-slate-900 mb-2'>Manage Job Postings</h1>
                        <p className='text-slate-500'>Create, edit, and manage your job listings</p>
                    </div>
                    <button
                        onClick={() => navigate("/admin/jobs/create")}
                        className='bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 transition shadow-lg hover:shadow-xl'
                    >
                        <Plus size={20} /> Post New Job
                    </button>
                </div>

                {/* Stats */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
                    <div className='bg-white p-6 rounded-2xl border border-slate-100 shadow-sm'>
                        <div className='text-slate-500 text-sm font-semibold mb-1'>Total Jobs Posted</div>
                        <div className='text-3xl font-bold text-slate-900'>{stats.totalJobs}</div>
                    </div>
                    <div className='bg-blue-50 p-6 rounded-2xl border border-blue-100 shadow-sm'>
                        <div className='text-blue-700 text-sm font-semibold mb-1'>Active Positions</div>
                        <div className='text-3xl font-bold text-blue-900'>{stats.totalPositions}</div>
                    </div>
                    <div className='bg-green-50 p-6 rounded-2xl border border-green-100 shadow-sm'>
                        <div className='text-green-700 text-sm font-semibold mb-1'>Total Applications</div>
                        <div className='text-3xl font-bold text-green-900'>{stats.totalApplications}</div>
                    </div>
                </div>

                {/* Jobs List */}
                <div className='space-y-4'>
                    {jobs.length === 0 ? (
                        <div className='bg-white p-12 rounded-3xl text-center'>
                            <p className='text-slate-400 text-xl'>No jobs posted yet. Create your first job posting!</p>
                        </div>
                    ) : (
                        jobs.map((job) => (
                            <div key={job._id} className='bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition'>
                                <div className='flex items-center justify-between'>
                                    <div className='flex-1'>
                                        <div className='flex items-start justify-between mb-4'>
                                            <div>
                                                <h2 className='text-2xl font-bold text-slate-900 mb-1'>{job.title}</h2>
                                                <p className='text-slate-500 font-medium'>{job.company?.name} • {job.location}</p>
                                            </div>
                                            <div className='relative'>
                                                <button
                                                    onClick={() => setActiveMenu(activeMenu === job._id ? null : job._id)}
                                                    className='p-2 hover:bg-slate-100 rounded-lg transition'
                                                >
                                                    <MoreVertical size={20} className='text-slate-400' />
                                                </button>
                                                {activeMenu === job._id && (
                                                    <div className='absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-10'>
                                                        <button
                                                            onClick={() => navigate(`/admin/jobs/${job._id}/edit`)}
                                                            className='w-full px-4 py-2 text-left hover:bg-slate-50 flex items-center gap-2 text-slate-700'
                                                        >
                                                            <Edit size={16} /> Edit Job
                                                        </button>
                                                        <button
                                                            onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                                            className='w-full px-4 py-2 text-left hover:bg-slate-50 flex items-center gap-2 text-slate-700'
                                                        >
                                                            <Eye size={16} /> View Applicants
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(job._id)}
                                                            className='w-full px-4 py-2 text-left hover:bg-red-50 flex items-center gap-2 text-red-600'
                                                        >
                                                            <Trash2 size={16} /> Delete Job
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className='flex flex-wrap gap-3 mb-4'>
                                            <span className='px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-bold'>
                                                {job.position} Positions
                                            </span>
                                            <span className='px-3 py-1.5 rounded-full bg-green-50 text-green-700 text-sm font-bold'>
                                                💰 {job.salary} LPA
                                            </span>
                                            <span className='px-3 py-1.5 rounded-full bg-orange-50 text-orange-700 text-sm font-bold'>
                                                {job.jobType}
                                            </span>
                                            <span className='px-3 py-1.5 rounded-full bg-purple-50 text-purple-700 text-sm font-bold'>
                                                📝 {job.applications?.length || 0} Applications
                                            </span>
                                        </div>

                                        <div className='flex items-center justify-between'>
                                            <p className='text-sm text-slate-400'>
                                                Posted on {new Date(job.createdAt).toLocaleDateString()}
                                            </p>
                                            <button
                                                onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                                className='text-primary-600 font-bold hover:underline flex items-center gap-1'
                                            >
                                                View Applicants <Eye size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default ManageJobs
