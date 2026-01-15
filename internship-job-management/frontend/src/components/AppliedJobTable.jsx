import React from 'react'

const AppliedJobTable = () => {
    // Mock data
    const appliedJobs = [
        { _id: "1", createdAt: "12-07-2024", job: { title: "Frontend Developer", company: { name: "Google" } }, status: "Pending" },
        { _id: "2", createdAt: "15-07-2024", job: { title: "Backend Developer", company: { name: "Microsoft" } }, status: "Accepted" },
    ];

    return (
        <div className="overflow-x-auto">
            <table className='w-full text-left'>
                <thead className='bg-slate-50 border-b border-slate-100 font-bold text-slate-700 uppercase p-4 text-xs tracking-wider'>
                    <tr>
                        <th className='px-6 py-4'>Date</th>
                        <th className='px-6 py-4'>Job Role</th>
                        <th className='px-6 py-4'>Company</th>
                        <th className='px-6 py-4 text-right'>Status</th>
                    </tr>
                </thead>
                <tbody className='divide-y divide-slate-100'>
                    {
                        appliedJobs.length <= 0 ? <tr><td colSpan="4" className="p-4 text-center">You haven't applied any job yet.</td></tr> : (
                            appliedJobs.map((appliedJob) => (
                                <tr key={appliedJob._id} className='hover:bg-slate-50 transition'>
                                    <td className='px-6 py-4 text-slate-500 text-sm'>{appliedJob.createdAt}</td>
                                    <td className='px-6 py-4 font-bold text-slate-900'>{appliedJob.job.title}</td>
                                    <td className='px-6 py-4 text-slate-600 font-medium'>{appliedJob.job.company.name}</td>
                                    <td className='px-6 py-4 text-right'>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${appliedJob.status === 'Accepted' ? 'bg-green-100 text-green-700' :
                                                appliedJob.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'
                                            }`}>
                                            {appliedJob.status.toUpperCase()}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default AppliedJobTable
