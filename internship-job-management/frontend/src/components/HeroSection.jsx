import React, { useState } from 'react'
import { Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const searchJobHandler = () => {
        if (query.trim()) {
            navigate(`/jobs?search=${encodeURIComponent(query)}`);
        } else {
            navigate('/jobs');
        }
    }

    return (
        <div className='text-center py-20 px-4'>
            <div className='flex flex-col gap-6 my-10'>
                <span className='mx-auto px-4 py-1.5 rounded-full bg-primary-50 text-primary-600 font-semibold text-sm tracking-wide uppercase'>
                    No. 1 Job & Internship Portal
                </span>
                <h1 className='text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight'>
                    Search, Apply & <br /> Get Your <span className='text-primary-600'>Dream Job</span>
                </h1>
                <p className='text-slate-600 max-w-2xl mx-auto text-lg'>
                    Connecting ambitious students with top-tier companies. Explore thousands of internships and full-time opportunities tailored to your skills.
                </p>
                <div className='flex w-full md:w-[60%] lg:w-[45%] shadow-xl border border-slate-100 pl-6 rounded-full items-center gap-4 mx-auto bg-white p-1'>
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && searchJobHandler()}
                        className='outline-none border-none w-full text-slate-700 placeholder:text-slate-400'
                    />
                    <button
                        onClick={searchJobHandler}
                        className='bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-full transition-all group'
                    >
                        <Search className='h-5 w-5 transform group-hover:scale-110 transition' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection
