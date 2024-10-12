import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { ArrowUpRight } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend);

const RevenueChart = () => {
  const data = {
    labels: ['Service', 'Product'],
    datasets: [
      {
        data: [73, 27],
        backgroundColor: ['#3b82f6', '#fbbf24'],
        hoverBackgroundColor: ['#2563eb', '#f59e0b']
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '80%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Revenue</h2>
        <ArrowUpRight className="text-blue-500" size={20} />
      </div>
      <div className="relative" style={{ height: '200px' }}>
        <Doughnut data={data} options={options} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <p className="text-3xl font-bold">73%</p>
          <p className="text-sm text-gray-500">Service</p>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
            <span className="text-sm">Service</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
            <span className="text-sm">Product</span>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-2xl font-bold">$505.28</p>
          <p className="text-sm text-green-500 flex items-center">
            <ArrowUpRight size={16} className="mr-1" />
            +1.3%
          </p>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;