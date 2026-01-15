import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import { Loader2, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { postJob } from '../../services/api'
import { getCompanies } from '../../services/api'

const PostJob = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [companies, setCompanies] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        requirements: '',
        salary: '',
        location: '',
        jobType: 'Full Time',
        experienceLevel: '',
        position: '',
        companyId: ''
    });

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await getCompanies();
                if (res.data.success) {
                    setCompanies(res.data.companies);
                }
            } catch (error) {
                console.error('Error fetching companies:', error);
            }
        };
        fetchCompanies();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!formData.companyId) {
            alert('Please select a company first');
            return;
        }

        if (!formData.title || !formData.description || !formData.salary || !formData.location || !formData.position) {
            alert('Please fill in all required fields');
            return;
        }

        try {
            setLoading(true);

            // Convert requirements string to array
            const requirementsArray = formData.requirements
                .split(',')
                .map(req => req.trim())
                .filter(req => req);

            const jobData = {
                title: formData.title,
                description: formData.description,
                requirements: requirementsArray,
                salary: Number(formData.salary),
                location: formData.location,
                jobType: formData.jobType,
                experienceLevel: Number(formData.experienceLevel),
                position: Number(formData.position),
                company: formData.companyId
            };

            const res = await postJob(jobData);

            if (res.data.success) {
                alert('Job posted successfully!');
                navigate('/admin/jobs/manage');
            }
        } catch (error) {
            console.error('Error posting job:', error);
            alert(error.response?.data?.message || 'Failed to post job. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen bg-slate-50'>
            <Navbar />
            <div className='max-w-4xl mx-auto my-10 px-4'>
                <button
                    onClick={() => navigate('/admin/jobs/manage')}
                    className='flex items-center gap-2 text-slate-600 hover:text-primary-600 mb-6 font-medium transition'
                >
                    <ArrowLeft size={20} /> Back to Manage Jobs
                </button>

                <div className='bg-white rounded-3xl p-8 border border-slate-100 shadow-sm'>
                    <h1 className='text-3xl font-bold text-slate-900 mb-2'>Post a New Job</h1>
                    <p className='text-slate-500 mb-8'>Fill in the details below to create a new job listing</p>

                    <form onSubmit={handleSubmit} className='space-y-6'>
                        {/* Company Selection */}
                        <div>
                            <label className='block text-sm font-bold text-slate-700 mb-2'>
                                Select Company <span className='text-red-500'>*</span>
                            </label>
                            <select
                                name='companyId'
                                value={formData.companyId}
                                onChange={handleChange}
                                required
                                className='w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent'
                            >
                                <option value=''>Choose a company</option>
                                {companies.map(company => (
                                    <option key={company._id} value={company._id}>
                                        {company.name}
                                    </option>
                                ))}
                            </select>
                            {companies.length === 0 && (
                                <p className='text-sm text-orange-600 mt-2'>
                                    No companies found. Please register a company first.
                                </p>
                            )}
                        </div>

                        {/* Job Title */}
                        <div>
                            <label className='block text-sm font-bold text-slate-700 mb-2'>
                                Job Title <span className='text-red-500'>*</span>
                            </label>
                            <input
                                type='text'
                                name='title'
                                value={formData.title}
                                onChange={handleChange}
                                placeholder='e.g., Senior Frontend Developer'
                                required
                                className='w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent'
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className='block text-sm font-bold text-slate-700 mb-2'>
                                Job Description <span className='text-red-500'>*</span>
                            </label>
                            <textarea
                                name='description'
                                value={formData.description}
                                onChange={handleChange}
                                placeholder='Describe the role, responsibilities, and what you are looking for...'
                                rows={5}
                                required
                                className='w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none'
                            />
                        </div>

                        {/* Requirements */}
                        <div>
                            <label className='block text-sm font-bold text-slate-700 mb-2'>
                                Requirements <span className='text-slate-400 font-normal'>(comma separated)</span>
                            </label>
                            <textarea
                                name='requirements'
                                value={formData.requirements}
                                onChange={handleChange}
                                placeholder='e.g., React, Node.js, 3+ years experience, TypeScript'
                                rows={3}
                                className='w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none'
                            />
                        </div>

                        {/* Two Columns Layout */}
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            {/* Salary */}
                            <div>
                                <label className='block text-sm font-bold text-slate-700 mb-2'>
                                    Salary (LPA) <span className='text-red-500'>*</span>
                                </label>
                                <input
                                    type='number'
                                    name='salary'
                                    value={formData.salary}
                                    onChange={handleChange}
                                    placeholder='e.g., 12'
                                    required
                                    min='0'
                                    className='w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent'
                                />
                            </div>

                            {/* Location */}
                            <div>
                                <label className='block text-sm font-bold text-slate-700 mb-2'>
                                    Location <span className='text-red-500'>*</span>
                                </label>
                                <input
                                    type='text'
                                    name='location'
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder='e.g., Mumbai, India'
                                    required
                                    className='w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent'
                                />
                            </div>

                            {/* Job Type */}
                            <div>
                                <label className='block text-sm font-bold text-slate-700 mb-2'>
                                    Job Type <span className='text-red-500'>*</span>
                                </label>
                                <select
                                    name='jobType'
                                    value={formData.jobType}
                                    onChange={handleChange}
                                    required
                                    className='w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent'
                                >
                                    <option value='Full Time'>Full Time</option>
                                    <option value='Part Time'>Part Time</option>
                                    <option value='Contract'>Contract</option>
                                    <option value='Internship'>Internship</option>
                                </select>
                            </div>

                            {/* Experience Level */}
                            <div>
                                <label className='block text-sm font-bold text-slate-700 mb-2'>
                                    Experience (Years) <span className='text-red-500'>*</span>
                                </label>
                                <input
                                    type='number'
                                    name='experienceLevel'
                                    value={formData.experienceLevel}
                                    onChange={handleChange}
                                    placeholder='e.g., 3'
                                    required
                                    min='0'
                                    className='w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent'
                                />
                            </div>

                            {/* Number of Positions */}
                            <div>
                                <label className='block text-sm font-bold text-slate-700 mb-2'>
                                    No. of Positions <span className='text-red-500'>*</span>
                                </label>
                                <input
                                    type='number'
                                    name='position'
                                    value={formData.position}
                                    onChange={handleChange}
                                    placeholder='e.g., 5'
                                    required
                                    min='1'
                                    className='w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent'
                                />
                            </div>
                        </div>

                        {/* Submit Buttons */}
                        <div className='flex gap-4 pt-4'>
                            <button
                                type='submit'
                                disabled={loading || companies.length === 0}
                                className='flex-1 bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-full font-bold transition shadow-lg hover:shadow-xl disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className='animate-spin' size={20} />
                                        Posting...
                                    </>
                                ) : (
                                    'Post Job'
                                )}
                            </button>
                            <button
                                type='button'
                                onClick={() => navigate('/admin/jobs/manage')}
                                className='px-8 py-3 rounded-full font-bold border-2 border-slate-200 text-slate-700 hover:bg-slate-50 transition'
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PostJob
