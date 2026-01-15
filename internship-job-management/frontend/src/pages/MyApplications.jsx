import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'
import { Briefcase, Clock, CheckCircle, XCircle, Loader2 } from 'lucide-react'
import { getAppliedJobs } from '../services/api'

const MyApplications = () => {
    const { user } = useAuth();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const res = await getAppliedJobs();
                if (res.data.success) {
                    setApplications(res.data.application);
                }
            } catch (error) {
                console.error('Error fetching applications:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchApplications();
        }
    }, [user]);

    const getStatusBadge = (status) => {
        switch (status.toLowerCase()) {
            case 'accepted':
                return (
                    <div className='flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-700 font-bold'>
                        <CheckCircle size={16} /> Accepted
                    </div>
                );
            case 'rejected':
                return (
                    <div className='flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-700 font-bold'>
                        <XCircle size={16} /> Rejected
                    </div>
                );
            default:
                return (
                    <div className='flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-50 text-yellow-700 font-bold'>
                        <Clock size={16} /> Pending
                    </div>
                );
        }
    };

    const stats = {
        total: applications.length,
        pending: applications.filter(a => a.status === 'pending').length,
        accepted: applications.filter(a => a.status === 'accepted').length,
        rejected: applications.filter(a => a.status === 'rejected').length,
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
                <div className='mb-8'>
                    <h1 className='text-3xl font-bold text-slate-900 mb-2'>My Applications</h1>
                    <p className='text-slate-500'>Track the status of all your job applications</p>
                </div>

                {/* Stats Cards */}
                <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-8'>
                    <div className='bg-white p-6 rounded-2xl border border-slate-100 shadow-sm'>
                        <div className='text-slate-500 text-sm font-semibold mb-1'>Total Applications</div>
                        <div className='text-3xl font-bold text-slate-900'>{stats.total}</div>
                    </div>
                    <div className='bg-yellow-50 p-6 rounded-2xl border border-yellow-100 shadow-sm'>
                        <div className='text-yellow-700 text-sm font-semibold mb-1'>Pending</div>
                        <div className='text-3xl font-bold text-yellow-900'>{stats.pending}</div>
                    </div>
                    <div className='bg-green-50 p-6 rounded-2xl border border-green-100 shadow-sm'>
                        <div className='text-green-700 text-sm font-semibold mb-1'>Accepted</div>
                        <div className='text-3xl font-bold text-green-900'>{stats.accepted}</div>
                    </div>
                    <div className='bg-red-50 p-6 rounded-2xl border border-red-100 shadow-sm'>
                        <div className='text-red-700 text-sm font-semibold mb-1'>Rejected</div>
                        <div className='text-3xl font-bold text-red-900'>{stats.rejected}</div>
                    </div>
                </div>

                {/* Applications List */}
                <div className='bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden'>
                    {applications.length === 0 ? (
                        <div className='p-12 text-center'>
                            <Briefcase className='mx-auto text-slate-300 mb-4' size={48} />
                            <h3 className='text-xl font-bold text-slate-400 mb-2'>No Applications Yet</h3>
                            <p className='text-slate-400'>Start applying to jobs to see them here</p>
                        </div>
                    ) : (
                        <div className='divide-y divide-slate-100'>
                            {applications.map((application) => (
                                <div key={application._id} className='p-6 hover:bg-slate-50 transition'>
                                    <div className='flex items-center justify-between'>
                                        <div className='flex items-start gap-4 flex-1'>
                                            <div className='w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center border border-primary-100'>
                                                <Briefcase className='text-primary-600' size={24} />
                                            </div>
                                            <div className='flex-1'>
                                                <h3 className='text-xl font-bold text-slate-900 mb-1'>
                                                    {application.job?.title}
                                                </h3>
                                                <p className='text-slate-600 font-medium mb-2'>
                                                    {application.job?.company?.name} • {application.job?.location}
                                                </p>
                                                <div className='flex items-center gap-4 text-sm text-slate-500'>
                                                    <span>💰 {application.job?.salary} LPA</span>
                                                    <span>📅 Applied on {new Date(application.createdAt).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            {getStatusBadge(application.status)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MyApplications
