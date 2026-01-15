import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Contact, Mail, Pen, Globe } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import AppliedJobTable from '../components/AppliedJobTable'

const Profile = () => {
    const [open, setOpen] = useState(false);
    const { user } = useAuth();

    return (
        <div className='min-h-screen bg-slate-50'>
            <Navbar />
            <div className='max-w-4xl mx-auto my-10 px-4'>
                <div className='bg-white border border-slate-100 rounded-3xl p-8 shadow-sm mb-10'>
                    <div className='flex justify-between items-start mb-8'>
                        <div className='flex items-center gap-6'>
                            <div className='w-24 h-24 rounded-2xl bg-primary-50 border-2 border-white shadow-xl flex items-center justify-center overflow-hidden'>
                                <span className='text-3xl font-bold text-primary-600'>{user?.fullname[0]}</span>
                            </div>
                            <div>
                                <h1 className='font-bold text-2xl text-slate-900'>{user?.fullname}</h1>
                                <p className='text-slate-500 max-w-sm'>{user?.profile?.bio || "No bio added yet"}</p>
                            </div>
                        </div>
                        <button onClick={() => setOpen(true)} className='p-2 hover:bg-slate-100 rounded-lg transition text-slate-400 hover:text-primary-600'>
                            <Pen size={20} />
                        </button>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
                        <div className='flex items-center gap-3 text-slate-600'>
                            <Mail className='text-primary-500' size={18} />
                            <span>{user?.email}</span>
                        </div>
                        <div className='flex items-center gap-3 text-slate-600'>
                            <Contact className='text-primary-500' size={18} />
                            <span>{user?.phoneNumber}</span>
                        </div>
                    </div>

                    <div className='mb-8'>
                        <h2 className='font-bold text-lg text-slate-900 mb-4'>Skills</h2>
                        <div className='flex flex-wrap gap-2'>
                            {
                                user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => (
                                    <span key={index} className='px-4 py-1.5 rounded-full bg-slate-900 text-white text-xs font-bold'>{item}</span>
                                )) : <span className='text-slate-400 italic'>NA</span>
                            }
                        </div>
                    </div>

                    <div>
                        <h2 className='font-bold text-lg text-slate-900 mb-4'>Resume</h2>
                        {
                            user?.profile?.resume ? (
                                <a target='blank' href={user?.profile?.resume} className='text-primary-600 hover:underline font-bold flex items-center gap-2'>
                                    <Globe size={18} /> {user?.profile?.resumeOriginalName}
                                </a>
                            ) : <span className='text-slate-400 italic'>NA</span>
                        }
                    </div>
                </div>

                <div className='bg-white border border-slate-100 rounded-3xl p-8 shadow-sm'>
                    <h2 className='font-bold text-xl text-slate-900 mb-8'>Applied Jobs</h2>
                    <AppliedJobTable />
                </div>
            </div>
        </div>
    )
}

export default Profile
