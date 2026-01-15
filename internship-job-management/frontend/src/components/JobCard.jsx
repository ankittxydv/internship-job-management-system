import React from 'react'
import { BadgeCheck, MapPin, DollarSign, Clock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const JobCard = ({ job }) => {
    const navigate = useNavigate();

    // Using mock data if job prop is not provided (for demo purposes)
    const jobData = job || {
        _id: '1',
        title: 'Frontend Developer',
        company: { name: 'Google Inc.' },
        position: 12,
        jobType: 'Full Time',
        salary: 24,
        location: 'Mumbai, India',
        createdAt: new Date().toISOString()
    };

    return (
        <div className='p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group'>
            <div className='flex items-center justify-between mb-4'>
                <div className='w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden'>
                    <span className='text-xl font-bold text-primary-600'>{jobData.company?.name?.[0] || 'C'}</span>
                </div>
                <span className='text-xs font-medium text-slate-400 flex items-center gap-1'>
                    <Clock size={12} /> 2 days ago
                </span>
            </div>

            <div>
                <h2 className='font-bold text-lg text-slate-900 group-hover:text-primary-600 transition'>{jobData.title}</h2>
                <p className='text-sm text-slate-500 mb-4'>{jobData.company?.name}</p>
            </div>

            <div className='flex flex-wrap gap-2 mb-6'>
                <div className='flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold'>
                    <BadgeCheck size={12} /> {jobData.position} Positions
                </div>
                <div className='flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-50 text-orange-600 text-xs font-semibold'>
                    <Clock size={12} /> {jobData.jobType}
                </div>
                <div className='flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-50 text-green-600 text-xs font-semibold'>
                    <DollarSign size={12} /> {jobData.salary} LPA
                </div>
            </div>

            <div className='flex items-center justify-between pt-4 border-t border-slate-50'>
                <div className='flex items-center gap-1 text-slate-400 text-sm'>
                    <MapPin size={14} /> {jobData.location}
                </div>
                <button
                    onClick={() => navigate(`/description/${jobData._id}`)}
                    className='text-primary-600 text-sm font-bold hover:underline'
                >
                    Details
                </button>
            </div>
        </div>
    )
}

export default JobCard
