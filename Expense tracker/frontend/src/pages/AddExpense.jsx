import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import ExpenseForm from '../components/ExpenseForm';
import { ChevronLeft } from 'lucide-react';

const AddExpense = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (data) => {
        setIsLoading(true);
        setError('');
        try {
            await api.post('/expenses', data);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add expense. Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 bg-gray-50 min-h-[calc(100vh-64px)]">
            <div className="max-w-2xl mx-auto">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center text-gray-500 hover:text-indigo-600 transition-colors mb-6 group"
                >
                    <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium">Back to Dashboard</span>
                </button>

                <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100/50 border border-gray-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-10 text-white">
                        <h1 className="text-3xl font-bold text-center">Add New Expense</h1>
                        <p className="text-indigo-100 text-center mt-2 opacity-90">Keep track of your spending instantly</p>
                    </div>

                    <div className="p-8">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm">
                                {error}
                            </div>
                        )}

                        <ExpenseForm
                            onSubmit={handleSubmit}
                            onCancel={() => navigate('/')}
                            isLoading={isLoading}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddExpense;
