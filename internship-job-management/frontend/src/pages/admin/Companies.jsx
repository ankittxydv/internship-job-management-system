import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import { Plus, Search, MapPin, Globe, Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { getCompanies } from '../../services/api'

const Companies = () => {
    const navigate = useNavigate();
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await getCompanies();
                if (res.data.success) {
                    setCompanies(res.data.companies);
                }
            } catch (error) {
                console.error('Error fetching companies:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCompanies();
    }, []);

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
                <div className='flex items-center justify-between mb-8'>
                    <div>
                        <h1 className='text-3xl font-bold text-slate-900'>Your Companies</h1>
                        <p className='text-slate-500'>Manage and register your business entities</p>
                    </div>
                    <button
                        onClick={() => navigate("/admin/companies/create")}
                        className='bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-full font-bold flex items-center gap-2 transition shadow-lg'
                    >
                        <Plus size={20} /> Register Company
                    </button>
                </div>

                {companies.length === 0 ? (
                    <div className='bg-white rounded-3xl p-12 text-center'>
                        <p className='text-slate-400 text-xl mb-4'>No companies registered yet</p>
                        <button
                            onClick={() => navigate("/admin/companies/create")}
                            className='bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-full font-bold inline-flex items-center gap-2 transition'
                        >
                            <Plus size={20} /> Register Your First Company
                        </button>
                    </div>
                ) : (
                    <div className='bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden'>
                        <table className='w-full text-left'>
                            <thead className='bg-slate-50 border-b border-slate-100 font-bold text-slate-700 uppercase p-4 text-xs tracking-wider'>
                                <tr>
                                    <th className='px-6 py-4'>Logo</th>
                                    <th className='px-6 py-4'>Name</th>
                                    <th className='px-6 py-4'>Location</th>
                                    <th className='px-6 py-4'>Website</th>
                                    <th className='px-6 py-4 text-right'>Action</th>
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-slate-100'>
                                {companies.map((company) => (
                                    <tr key={company._id} className='hover:bg-slate-50 transition'>
                                        <td className='px-6 py-4'>
                                            <div className='w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center font-bold text-primary-600'>
                                                {company.name[0]}
                                            </div>
                                        </td>
                                        <td className='px-6 py-4 font-semibold text-slate-900'>{company.name}</td>
                                        <td className='px-6 py-4 text-slate-500 flex items-center gap-1 mt-3'>
                                            <MapPin size={14} /> {company.location || 'N/A'}
                                        </td>
                                        <td className='px-6 py-4 text-primary-600 font-medium'>
                                            <div className='flex items-center gap-1'>
                                                <Globe size={14} /> {company.website || 'N/A'}
                                            </div>
                                        </td>
                                        <td className='px-6 py-4 text-right'>
                                            <button className='text-slate-400 hover:text-primary-600 transition font-bold'>Edit</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Companies
