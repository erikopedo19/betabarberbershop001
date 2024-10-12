import React from 'react';
import { CheckCircle, Clock, XCircle } from 'lucide-react';

interface StatusCardsProps {
  confirmed: number;
  pending: number;
  canceled: number;
}

const StatusCards: React.FC<StatusCardsProps> = ({ confirmed, pending, canceled }) => {
  const statuses = [
    { label: 'Confirmed', count: confirmed, icon: CheckCircle, color: 'green' },
    { label: 'Pending', count: pending, icon: Clock, color: 'yellow' },
    { label: 'Canceled', count: canceled, icon: XCircle, color: 'red' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {statuses.map((status) => (
        <div key={status.label} className="bg-white p-6 rounded-lg shadow flex items-center space-x-4 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
          <div className={`p-3 rounded-full bg-${status.color}-100`}>
            <status.icon className={`text-${status.color}-500`} size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">{status.label}</p>
            <p className="text-2xl font-bold">{status.count.toString().padStart(2, '0')}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatusCards;