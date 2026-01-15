import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import LatestJobs from '../components/LatestJobs'
import Footer from '../components/Footer'
import { getAllJobs } from '../services/api'

const Home = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await getAllJobs();
                if (res.data.success) {
                    setJobs(res.data.jobs);
                }
            } catch (error) {
                console.error('Error fetching jobs:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <HeroSection />
            <LatestJobs jobs={jobs} loading={loading} />
            <Footer />
        </div>
    )
}

export default Home
