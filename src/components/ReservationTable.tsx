import React from 'react';

interface Appointment {
  id: number;
  date: string;
  time: string;
  client: string;
  service: string;
  status: 'Confirmed' | 'Pending' | 'Canceled';
}

interface ReservationTableProps {
  appointments: Appointment[];
}

const ReservationTable: React.FC<ReservationTableProps> = ({ appointments }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.date}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.time}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{appointment.client}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.service}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationTable;