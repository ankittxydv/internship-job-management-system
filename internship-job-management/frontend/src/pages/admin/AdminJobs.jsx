import React from 'react'
import Navbar from '../../components/Navbar'
import { Plus, Users, Briefcase, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const AdminJobs = () => {
    const navigate = useNavigate();
    // Mock data
    const jobs = [
        { _id: "1", title: "Frontend Developer", company: { name: "Google" }, createdAt: "2024-03-01", applicants: 45 },
        { _id: "2", title: "Backend Developer", company: { name: "Microsoft" }, createdAt: "2024-03-05", applicants: 12 },
    ];

    return (
        <div className='min-h-screen bg-slate-50'>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10 px-4'>
                <div className='flex items-center justify-between mb-8'>
                    <div>
                        <h1 className='text-3xl font-bold text-slate-900'>Posted Jobs</h1>
                        <p className='text-slate-500'>Manage your job listings and view applicants</p>
                    </div>
                    <button
                        onClick={() => navigate("/admin/jobs/create")}
                        className='bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-full font-bold flex items-center gap-2 transition shadow-lg'
                    >
                        <Plus size={20} /> Post New Job
                    </button>
                </div>

                <div className='grid grid-cols-1 gap-4'>
                    {jobs.map((job) => (
                        <div key={job._id} className='bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition'>
                            <div className='flex items-center gap-6'>
                                <div className='w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100'>
                                    <Briefcase className='text-primary-600' size={24} />
                                </div>
                                <div>
                                    <h2 className='text-xl font-bold text-slate-900'>{job.title}</h2>
                                    <p className='text-slate-500 font-medium'>{job.company.name}</p>
                                </div>
                            </div>

                            <div className='flex items-center gap-8'>
                                <div className='text-center hidden sm:block'>
                                    <p className='text-slate-400 text-xs font-bold uppercase tracking-wider mb-1'>Applicants</p>
                                    <div className='flex items-center gap-1 justify-center text-primary-600 font-bold'>
                                        <Users size={16} /> {job.applicants}
                                    </div>
                                </div>
                                <div className='text-center hidden md:block'>
                                    <p className='text-slate-400 text-xs font-bold uppercase tracking-wider mb-1'>Date Posted</p>
                                    <p className='text-slate-900 font-semibold'>{job.createdAt}</p>
                                </div>
                                <button
                                    onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                    className='flex items-center gap-2 text-primary-600 font-bold hover:bg-primary-50 px-4 py-2 rounded-xl transition'
                                >
                                    Review <ChevronRight size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AdminJobs
