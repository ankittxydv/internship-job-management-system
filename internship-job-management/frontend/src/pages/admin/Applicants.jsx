import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import { Check, X, Mail, Phone, Download, Loader2 } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { getApplicants, updateApplicationStatus } from '../../services/api'

const Applicants = () => {
    const { id } = useParams();
    const [applicants, setApplicants] = useState([]);
    const [jobTitle, setJobTitle] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                const res = await getApplicants(id);
                if (res.data.success) {
                    setApplicants(res.data.job.applications);
                    setJobTitle(res.data.job.title);
                }
            } catch (error) {
                console.error('Error fetching applicants:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchApplicants();
        }
    }, [id]);

    const handleStatusUpdate = async (applicationId, status) => {
        try {
            const res = await updateApplicationStatus(applicationId, status);
            if (res.data.success) {
                // Update local state
                setApplicants(prev =>
                    prev.map(app =>
                        app._id === applicationId
                            ? { ...app, status }
                            : app
                    )
                );
                alert(`Application ${status} successfully!`);
            }
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update status');
        }
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
            <div className='max-w-6xl mx-auto my-10 px-4'>
                <div className='mb-8'>
                    <h1 className='text-3xl font-bold text-slate-900'>Applicants</h1>
                    <p className='text-slate-500'>Review candidates for {jobTitle} position</p>
                </div>

                <div className='bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden'>
                    {applicants.length === 0 ? (
                        <div className='p-12 text-center'>
                            <p className='text-slate-400 text-xl'>No applicants yet</p>
                        </div>
                    ) : (
                        <table className='w-full text-left'>
                            <thead className='bg-slate-50 border-b border-slate-100 font-bold text-slate-700 uppercase p-4 text-xs tracking-wider'>
                                <tr>
                                    <th className='px-6 py-4'>Full Name</th>
                                    <th className='px-6 py-4'>Contact</th>
                                    <th className='px-6 py-4'>Date Applied</th>
                                    <th className='px-6 py-4'>Status</th>
                                    <th className='px-6 py-4 text-right'>Action</th>
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-slate-100'>
                                {applicants.map((item) => (
                                    <tr key={item._id} className='hover:bg-slate-50 transition'>
                                        <td className='px-6 py-4'>
                                            <p className='font-bold text-slate-900'>{item.applicant?.fullname}</p>
                                        </td>
                                        <td className='px-6 py-4'>
                                            <div className='space-y-1'>
                                                <div className='flex items-center gap-2 text-xs text-slate-500'>
                                                    <Mail size={12} /> {item.applicant?.email}
                                                </div>
                                                <div className='flex items-center gap-2 text-xs text-slate-500'>
                                                    <Phone size={12} /> {item.applicant?.phoneNumber}
                                                </div>
                                            </div>
                                        </td>
                                        <td className='px-6 py-4 text-slate-500 text-sm'>
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className='px-6 py-4'>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.status === 'accepted' ? 'bg-green-100 text-green-700' :
                                                    item.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                                        'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {item.status.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className='px-6 py-4 text-right'>
                                            <div className='flex items-center justify-end gap-2'>
                                                <button
                                                    onClick={() => handleStatusUpdate(item._id, 'accepted')}
                                                    disabled={item.status === 'accepted'}
                                                    className='p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition disabled:opacity-50 disabled:cursor-not-allowed'
                                                    title="Accept"
                                                >
                                                    <Check size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleStatusUpdate(item._id, 'rejected')}
                                                    disabled={item.status === 'rejected'}
                                                    className='p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition disabled:opacity-50 disabled:cursor-not-allowed'
                                                    title="Reject"
                                                >
                                                    <X size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Applicants
