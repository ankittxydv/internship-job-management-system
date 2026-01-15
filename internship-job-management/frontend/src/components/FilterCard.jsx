import React from 'react'

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer", "Data Science", "Graphic Designer"]
    },
    {
        filterType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
]

const FilterCard = () => {
    return (
        <div className='w-full bg-white p-6 rounded-2xl border border-slate-100'>
            <h1 className='font-bold text-lg text-slate-900 mb-4'>Filter Jobs</h1>
            <hr className='border-slate-100 mb-6' />
            <div className='space-y-6'>
                {
                    filterData.map((data, index) => (
                        <div key={index}>
                            <h2 className='font-semibold text-slate-800 mb-3 text-sm uppercase tracking-wider'>{data.filterType}</h2>
                            <div className='space-y-2'>
                                {
                                    data.array.map((item, idx) => {
                                        const itemId = `id${index}-${idx}`;
                                        return (
                                            <div key={itemId} className='flex items-center space-x-2'>
                                                <input
                                                    type="radio"
                                                    id={itemId}
                                                    name={data.filterType}
                                                    className='w-4 h-4 accent-primary-600 rounded-full border-slate-300 focus:ring-primary-500'
                                                />
                                                <label htmlFor={itemId} className='text-sm text-slate-600 font-medium cursor-pointer'>{item}</label>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default FilterCard
