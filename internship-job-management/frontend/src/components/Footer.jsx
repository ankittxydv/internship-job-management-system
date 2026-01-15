import React from 'react'
import { Github, Twitter, Linkedin, Mail } from 'lucide-react'

const Footer = () => {
    return (
        <footer className="bg-slate-950 text-slate-300 py-12 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="col-span-1 md:col-span-2">
                    <h2 className="text-2xl font-bold text-white mb-6">Intern<span className='text-primary-500'>Hire</span></h2>
                    <p className="text-slate-400 max-w-sm leading-relaxed">
                        The ultimate destination for students to kickstart their careers and for recruiters to find the next generation of talent.
                    </p>
                    <div className="flex space-x-4 mt-8">
                        <a href="#" className="hover:text-primary-500 transition"><Twitter size={20} /></a>
                        <a href="#" className="hover:text-primary-500 transition"><Linkedin size={20} /></a>
                        <a href="#" className="hover:text-primary-500 transition"><Github size={20} /></a>
                    </div>
                </div>

                <div>
                    <h3 className="text-white font-bold mb-6">Platform</h3>
                    <ul className="space-y-4">
                        <li><a href="#" className="hover:text-primary-500 transition">Browse Jobs</a></li>
                        <li><a href="#" className="hover:text-primary-500 transition">Companies</a></li>
                        <li><a href="#" className="hover:text-primary-500 transition">Pricing</a></li>
                        <li><a href="#" className="hover:text-primary-500 transition">Terms of Service</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-white font-bold mb-6">Support</h3>
                    <ul className="space-y-4">
                        <li><a href="#" className="hover:text-primary-500 transition">Help Center</a></li>
                        <li><a href="#" className="hover:text-primary-500 transition">Contact Us</a></li>
                        <li><a href="#" className="hover:text-primary-500 transition">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-primary-500 transition">System Status</a></li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto border-t border-slate-800 mt-12 pt-8 text-center text-sm text-slate-500">
                <p>&copy; 2026 InternHire. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer
