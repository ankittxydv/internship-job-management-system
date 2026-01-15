import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import { Loader2, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { registerCompany } from '../../services/api'

const RegisterCompany = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        website: '',
        location: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!formData.name) {
            alert('Company name is required');
            return;
        }

        try {
            setLoading(true);

            const res = await registerCompany(formData);

            if (res.data.success) {
                alert('Company registered successfully!');
                navigate('/admin/companies');
            }
        } catch (error) {
            console.error('Error registering company:', error);
            alert(error.response?.data?.message || 'Failed to register company. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen bg-slate-50'>
            <Navbar />
            <div className='max-w-3xl mx-auto my-10 px-4'>
                <button
                    onClick={() => navigate('/admin/companies')}
                    className='flex items-center gap-2 text-slate-600 hover:text-primary-600 mb-6 font-medium transition'
                >
                    <ArrowLeft size={20} /> Back to Companies
                </button>

                <div className='bg-white rounded-3xl p-8 border border-slate-100 shadow-sm'>
                    <h1 className='text-3xl font-bold text-slate-900 mb-2'>Register Your Company</h1>
                    <p className='text-slate-500 mb-8'>Add your company details to start posting jobs</p>

                    <form onSubmit={handleSubmit} className='space-y-6'>
                        {/* Company Name */}
                        <div>
                            <label className='block text-sm font-bold text-slate-700 mb-2'>
                                Company Name <span className='text-red-500'>*</span>
                            </label>
                            <input
                                type='text'
                                name='name'
                                value={formData.name}
                                onChange={handleChange}
                                placeholder='e.g., TechCorp Solutions'
                                required
                                className='w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent'
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className='block text-sm font-bold text-slate-700 mb-2'>
                                Company Description
                            </label>
                            <textarea
                                name='description'
                                value={formData.description}
                                onChange={handleChange}
                                placeholder='Brief description of your company, what you do, your mission...'
                                rows={5}
                                className='w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none'
                            />
                        </div>

                        {/* Website */}
                        <div>
                            <label className='block text-sm font-bold text-slate-700 mb-2'>
                                Company Website
                            </label>
                            <input
                                type='url'
                                name='website'
                                value={formData.website}
                                onChange={handleChange}
                                placeholder='e.g., https://www.techcorp.com'
                                className='w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent'
                            />
                            <p className='text-xs text-slate-400 mt-1'>Include https:// or http://</p>
                        </div>

                        {/* Location */}
                        <div>
                            <label className='block text-sm font-bold text-slate-700 mb-2'>
                                Location
                            </label>
                            <input
                                type='text'
                                name='location'
                                value={formData.location}
                                onChange={handleChange}
                                placeholder='e.g., Bangalore, India'
                                className='w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent'
                            />
                        </div>

                        {/* Submit Buttons */}
                        <div className='flex gap-4 pt-4'>
                            <button
                                type='submit'
                                disabled={loading}
                                className='flex-1 bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-full font-bold transition shadow-lg hover:shadow-xl disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className='animate-spin' size={20} />
                                        Registering...
                                    </>
                                ) : (
                                    'Register Company'
                                )}
                            </button>
                            <button
                                type='button'
                                onClick={() => navigate('/admin/companies')}
                                className='px-8 py-3 rounded-full font-bold border-2 border-slate-200 text-slate-700 hover:bg-slate-50 transition'
                            >
                                Cancel
                            </button>
                        </div>
                    </form>

                    {/* Info Box */}
                    <div className='mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100'>
                        <p className='text-sm text-blue-800'>
                            <strong>💡 Note:</strong> After registering your company, you can start posting job opportunities.
                            You can manage multiple companies from your profile.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterCompany
