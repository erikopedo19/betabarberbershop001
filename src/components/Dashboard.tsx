import React from 'react';
import Header from './Header';
import StatusCards from './StatusCards';
import BookingTab from './BookingTab';
import Calendar from './Calendar';
import StylistList from './StylistList';
import VisitorsChart from './VisitorsChart';
import RevenueChart from './RevenueChart';
import { Appointment } from '../App';

interface DashboardProps {
  appointments: Appointment[];
}

const Dashboard: React.FC<DashboardProps> = ({ appointments }) => {
  const confirmedAppointments = appointments.filter(app => app.status === 'Confirmed');
  const pendingAppointments = appointments.filter(app => app.status === 'Pending');
  const canceledAppointments = appointments.filter(app => app.status === 'Canceled');

  return (
    <div className="p-6">
      <Header />
      <StatusCards
        confirmed={confirmedAppointments.length}
        pending={pendingAppointments.length}
        canceled={canceledAppointments.length}
      />
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <BookingTab appointments={appointments} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <VisitorsChart appointments={appointments} />
            <RevenueChart />
          </div>
        </div>
        <div>
          <Calendar />
          <StylistList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;