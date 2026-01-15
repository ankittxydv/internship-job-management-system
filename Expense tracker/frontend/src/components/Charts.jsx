import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
} from 'chart.js';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title
);

export const CategoryChart = ({ data }) => {
    const chartData = {
        labels: data.map(item => item._id),
        datasets: [
            {
                data: data.map(item => item.total),
                backgroundColor: [
                    '#6366f1', // Indigo
                    '#8b5cf6', // Violet
                    '#ec4899', // Pink
                    '#f59e0b', // Amber
                    '#10b981', // Emerald
                ],
                borderWidth: 0,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    padding: 20,
                    usePointStyle: true,
                    font: { size: 12 }
                }
            }
        },
        cutout: '70%',
    };

    return <Doughnut data={chartData} options={options} />;
};

export const MonthlyChart = ({ data }) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const chartData = {
        labels: data.map(item => monthNames[item._id - 1]),
        datasets: [
            {
                label: 'Expenses',
                data: data.map(item => item.total),
                backgroundColor: '#6366f1',
                borderRadius: 8,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: false },
        },
        scales: {
            y: { beginAtZero: true, grid: { display: false } },
            x: { grid: { display: false } }
        }
    };

    return <Bar data={chartData} options={options} />;
};
