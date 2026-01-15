import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Plus, Search, Filter, Trash2, Edit2, TrendingUp, IndianRupee, PieChart as PieChartIcon, Calendar } from 'lucide-react';
import { CategoryChart, MonthlyChart } from '../components/Charts';
import ExpenseForm from '../components/ExpenseForm';

const Dashboard = () => {
    const [expenses, setExpenses] = useState([]);
    const [summary, setSummary] = useState({ categorySummary: [], monthlySummary: [] });
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingExpense, setEditingExpense] = useState(null);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [expRes, sumRes] = await Promise.all([
                api.get('/expenses'),
                api.get('/expenses/summary')
            ]);
            setExpenses(expRes.data.data);
            setSummary(sumRes.data);
        } catch (err) {
            console.error('Error fetching data', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveExpense = async (data) => {
        try {
            setLoading(true);
            if (editingExpense) {
                await api.put(`/expenses/${editingExpense._id}`, data);
            } else {
                await api.post('/expenses', data);
            }
            setShowForm(false);
            setEditingExpense(null);
            await fetchData(); // Refresh both expenses and summary
        } catch (err) {
            console.error('Error saving expense', err);
            alert(err.response?.data?.message || 'Failed to save expense');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteExpense = async (id) => {
        if (window.confirm('Are you sure you want to delete this expense?')) {
            try {
                await api.delete(`/expenses/${id}`);
                fetchData();
            } catch (err) {
                console.error('Error deleting expense', err);
            }
        }
    };

    const totalThisMonth = summary.monthlySummary.find(m => m._id === new Date().getMonth() + 1)?.total || 0;

    const filteredExpenses = filter === 'All'
        ? expenses
        : expenses.filter(e => e.category === filter);

    if (loading && expenses.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-500 mt-1">Monitor your spending and manage expenses</p>
                </div>
                <Link
                    to="/add-expense"
                    className="flex items-center justify-center space-x-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                >
                    <Plus size={20} />
                    <span>Add Expense</span>
                </Link>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm transition-transform hover:scale-[1.02]">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                            <IndianRupee size={24} />
                        </div>
                        <span className="text-sm font-medium text-gray-400">Total Balance</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">₹{expenses.reduce((acc, cur) => acc + cur.amount, 0).toFixed(2)}</h3>
                    <p className="text-sm text-gray-500 mt-1">All time spending</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm transition-transform hover:scale-[1.02]">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                            <Calendar size={24} />
                        </div>
                        <span className="text-sm font-medium text-gray-400">This Month</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">₹{totalThisMonth.toFixed(2)}</h3>
                    <p className="text-sm text-gray-500 mt-1">Spending in {new Date().toLocaleString('default', { month: 'long' })}</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm transition-transform hover:scale-[1.02]">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                            <PieChartIcon size={24} />
                        </div>
                        <span className="text-sm font-medium text-gray-400">Transactions</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{expenses.length}</h3>
                    <p className="text-sm text-gray-500 mt-1">Total recorded items</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Analytics */}
                <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-6 font-primary">Category Distribution</h3>
                    {summary.categorySummary.length > 0 ? (
                        <div className="h-64 flex items-center justify-center">
                            <CategoryChart data={summary.categorySummary} />
                        </div>
                    ) : (
                        <div className="h-64 flex items-center justify-center text-gray-400">No data available</div>
                    )}
                </div>

                <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-6 font-primary">Spending Trend (Current Year)</h3>
                    <div className="h-64">
                        <MonthlyChart data={summary.monthlySummary} />
                    </div>
                </div>
            </div>

            {/* Expense List */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h3 className="text-lg font-bold text-gray-900 font-primary">Recent Transactions</h3>
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <select
                                className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            >
                                <option value="All">All Categories</option>
                                <option value="Food">Food</option>
                                <option value="Travel">Travel</option>
                                <option value="Rent">Rent</option>
                                <option value="Shopping">Shopping</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
                                <th className="px-6 py-4 font-semibold">Description</th>
                                <th className="px-6 py-4 font-semibold">Category</th>
                                <th className="px-6 py-4 font-semibold">Date</th>
                                <th className="px-6 py-4 font-semibold">Amount</th>
                                <th className="px-6 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredExpenses.map((expense) => (
                                <tr key={expense._id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <span className="font-medium text-gray-900">{expense.description}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${expense.category === 'Food' ? 'bg-orange-50 text-orange-600' :
                                                expense.category === 'Travel' ? 'bg-blue-50 text-blue-600' :
                                                    expense.category === 'Rent' ? 'bg-purple-50 text-purple-600' :
                                                        expense.category === 'Shopping' ? 'bg-pink-50 text-pink-600' : 'bg-gray-100 text-gray-600'}`}>
                                            {expense.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 text-sm">
                                        {new Date(expense.date).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 font-bold text-gray-900">
                                        ₹{expense.amount.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => { setEditingExpense(expense); setShowForm(true); }}
                                                className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                                                title="Edit"
                                            >
                                                <Edit2 size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteExpense(expense._id)}
                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                                title="Delete"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredExpenses.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                        No transactions found. Start by adding one!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Overlay */}
            {showForm && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="w-full max-w-lg animate-in zoom-in-95 duration-200">
                        <ExpenseForm
                            expense={editingExpense}
                            onSubmit={handleSaveExpense}
                            onCancel={() => { setShowForm(false); setEditingExpense(null); }}
                            isLoading={loading}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
