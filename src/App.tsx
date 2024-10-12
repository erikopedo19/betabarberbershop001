import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Agenda from './pages/Agenda';
import Customers from './pages/Customers';
import Stylists from './pages/Stylists';
import Report from './pages/Report';
import Settings from './pages/Settings';

export interface Appointment {
  id: number;
  date: string;
  time: string;
  client: string;
  service: string;
  status: 'Confirmed' | 'Pending' | 'Canceled';
  stylist: string;
}

function App() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    // Load appointments from localStorage on initial render
    const savedAppointments = localStorage.getItem('appointments');
    if (savedAppointments) {
      setAppointments(JSON.parse(savedAppointments));
    }
  }, []);

  useEffect(() => {
    // Save appointments to localStorage whenever they change
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);

  const addAppointment = (newAppointment: Appointment) => {
    setAppointments([...appointments, newAppointment]);
  };

  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <Routes>
            <Route path="/" element={<Dashboard appointments={appointments} />} />
            <Route path="/agenda" element={<Agenda appointments={appointments} addAppointment={addAppointment} />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/stylists" element={<Stylists />} />
            <Route path="/report" element={<Report />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;