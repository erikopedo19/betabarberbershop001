import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plus, Search, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Appointment } from '../App';

interface AgendaProps {
  appointments: Appointment[];
  addAppointment: (appointment: Appointment) => void;
}

const Agenda: React.FC<AgendaProps> = ({ appointments, addAppointment }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [newAppointment, setNewAppointment] = useState<Partial<Appointment>>({
    date: '',
    time: '',
    client: '',
    service: '',
    status: 'Pending'
  });

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const prevWeek = () => {
    setCurrentDate(new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000));
  };

  const nextWeek = () => {
    setCurrentDate(new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000));
  };

  const handleCreateAppointment = () => {
    if (newAppointment.date && newAppointment.time && newAppointment.client && newAppointment.service) {
      const appointment: Appointment = {
        ...newAppointment as Appointment,
        id: Date.now(),
        stylist: 'Unassigned'
      };
      addAppointment(appointment);
      setNewAppointment({ date: '', time: '', client: '', service: '', status: 'Pending' });
      setShowModal(false);
    }
  };

  const getAppointmentsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return appointments.filter(app => app.date === dateString);
  };

  const getWeekDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() - currentDate.getDay() + i + 1);
      dates.push(date);
    }
    return dates;
  };

  const weekDates = getWeekDates();

  const getAppointmentColor = (service: string) => {
    const colors = {
      'Haircut': 'bg-green-100 border-green-300',
      'Color': 'bg-yellow-100 border-yellow-300',
      'Beard Trim': 'bg-orange-100 border-orange-300',
      'Styling': 'bg-blue-100 border-blue-300',
      'Shave': 'bg-red-100 border-red-300',
      'Massage': 'bg-purple-100 border-purple-300',
      'Waxing': 'bg-pink-100 border-pink-300',
    };
    return colors[service as keyof typeof colors] || 'bg-gray-100 border-gray-300';
  };

  const timeSlots = Array.from({ length: 13 }, (_, i) => {
    const hour = i + 9;
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  const renderAppointment = (app: Appointment, dateIndex: number) => {
    const [hour, minute] = app.time.split(':').map(Number);
    const startIndex = hour - 9;
    const top = `${startIndex * 60 + minute}px`;
    const left = `${(100 / 7) * dateIndex}%`;
    const width = `${100 / 7}%`;

    return (
      <div
        key={app.id}
        className={`absolute p-2 rounded-md ${getAppointmentColor(app.service)} text-xs border`}
        style={{ top, left, width, height: '60px' }}
      >
        <div className="font-semibold">{app.service}</div>
        <div className="flex items-center mt-1">
          <div className="w-5 h-5 rounded-full bg-gray-300 mr-2"></div>
          <span>{app.client}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">{months[currentDate.getMonth()]}, {currentDate.getFullYear()}</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 border rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
          <button className="p-2 rounded-full bg-gray-200">
            <Settings size={20} />
          </button>
          <div className="w-8 h-8 rounded-full bg-red-500"></div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <button onClick={prevWeek} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
              <ChevronLeft size={20} />
            </button>
            <button onClick={nextWeek} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
              <ChevronRight size={20} />
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-md">Week</button>
            <button className="px-4 py-2 text-gray-600 rounded-md">Month</button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-300"
            >
              <Plus size={20} className="inline-block mr-2" />
              Add New
            </motion.button>
          </div>
        </div>

        <div className="flex">
          <div className="w-20 flex-shrink-0">
            {timeSlots.map((time, index) => (
              <div key={index} className="h-[60px] text-right pr-2 text-sm text-gray-500">{time}</div>
            ))}
          </div>
          <div className="flex-grow relative">
            <div className="grid grid-cols-7 gap-4">
              {weekDates.map((date, dateIndex) => (
                <div key={dateIndex} className="text-center">
                  <p className="font-medium">{daysOfWeek[dateIndex]}</p>
                  <p className="text-sm text-gray-500">{date.getDate()}.{(date.getMonth() + 1).toString().padStart(2, '0')}</p>
                </div>
              ))}
            </div>
            <div className="relative" style={{ height: `${timeSlots.length * 60}px` }}>
              {timeSlots.map((_, timeIndex) => (
                <div key={timeIndex} className="absolute left-0 right-0 h-[60px] border-t border-gray-100" style={{ top: `${timeIndex * 60}px` }}></div>
              ))}
              {weekDates.map((date, dateIndex) => (
                getAppointmentsForDate(date).map(app => renderAppointment(app, dateIndex))
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white p-6 rounded-lg w-96 shadow-xl"
          >
            <h2 className="text-xl font-bold mb-4">New Appointment</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  value={newAppointment.date}
                  onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Time</label>
                <input
                  type="time"
                  value={newAppointment.time}
                  onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Client</label>
                <input
                  type="text"
                  value={newAppointment.client}
                  onChange={(e) => setNewAppointment({ ...newAppointment, client: e.target.value })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Client Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Service</label>
                <select
                  value={newAppointment.service}
                  onChange={(e) => setNewAppointment({ ...newAppointment, service: e.target.value })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a service</option>
                  <option value="Haircut">Haircut</option>
                  <option value="Color">Color</option>
                  <option value="Styling">Styling</option>
                  <option value="Beard Trim">Beard Trim</option>
                  <option value="Shave">Shave</option>
                  <option value="Massage">Massage</option>
                  <option value="Waxing">Waxing</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateAppointment}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600"
              >
                Create
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Agenda;