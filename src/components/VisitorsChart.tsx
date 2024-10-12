import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface Appointment {
  id: number;
  date: string;
  time: string;
  client: string;
  service: string;
  status: 'Confirmed' | 'Pending' | 'Canceled';
  stylist: string;
}

interface VisitorsChartProps {
  appointments: Appointment[];
}

const VisitorsChart: React.FC<VisitorsChartProps> = ({ appointments }) => {
  const [timeRange, setTimeRange] = useState('week');
  const [chartData, setChartData] = useState({ labels: [], data: [] });

  useEffect(() => {
    updateChartData();
  }, [timeRange, appointments]);

  const updateChartData = () => {
    const { labels, data } = getChartData();
    setChartData({ labels, data });
  };

  const getChartData = () => {
    const today = new Date();
    let labels: string[] = [];
    let data: number[] = [];

    switch (timeRange) {
      case 'day':
        labels = ['9AM', '11AM', '1PM', '3PM', '5PM', '7PM', '9PM'];
        data = new Array(7).fill(0);
        appointments.forEach(app => {
          const appDate = new Date(app.date);
          if (appDate.toDateString() === today.toDateString()) {
            const hour = parseInt(app.time.split(':')[0]);
            const index = Math.floor((hour - 9) / 2);
            if (index >= 0 && index < 7) data[index]++;
          }
        });
        break;
      case 'week':
        labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        data = new Array(7).fill(0);
        appointments.forEach(app => {
          const appDate = new Date(app.date);
          const diffTime = Math.abs(today.getTime() - appDate.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          if (diffDays <= 7) {
            const dayIndex = appDate.getDay();
            data[dayIndex]++;
          }
        });
        break;
      case 'month':
        labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
        data = new Array(4).fill(0);
        appointments.forEach(app => {
          const appDate = new Date(app.date);
          const diffTime = Math.abs(today.getTime() - appDate.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          if (diffDays <= 30) {
            const weekIndex = Math.floor(diffDays / 7);
            if (weekIndex < 4) data[weekIndex]++;
          }
        });
        break;
    }

    return { labels, data };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const totalBookings = appointments.length;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold">Total Visitors</h2>
          <p className="text-3xl font-bold mt-2">{totalBookings}</p>
          <p className="text-sm text-gray-500 mt-1">Total Bookings</p>
        </div>
        <select 
          className="border rounded px-2 py-1 text-sm"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="day">Today</option>
          <option value="week">Last week</option>
          <option value="month">Last month</option>
        </select>
      </div>
      <div style={{ height: '200px' }}>
        <Line 
          data={{
            labels: chartData.labels,
            datasets: [
              {
                label: 'Bookings',
                data: chartData.data,
                fill: false,
                borderColor: 'rgba(59, 130, 246, 1)',
                tension: 0.4,
                pointBackgroundColor: 'rgba(59, 130, 246, 1)',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6,
              }
            ]
          }} 
          options={chartOptions} 
        />
      </div>
    </div>
  );
};

export default VisitorsChart;