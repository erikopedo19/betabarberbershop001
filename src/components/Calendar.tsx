import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    return { daysInMonth, firstDayOfMonth };
  };

  const { daysInMonth, firstDayOfMonth } = getDaysInMonth(currentDate);

  const dates = Array.from({ length: 42 }, (_, i) => {
    const day = i - firstDayOfMonth + 1;
    return day > 0 && day <= daysInMonth ? day : null;
  });

  const changeMonth = (increment: number) => {
    setIsLoading(true);
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + increment, 1);
    setCurrentDate(newDate);
    setTimeout(() => setIsLoading(false), 300);
  };

  const isCurrentDay = (day: number | null) => {
    const today = new Date();
    return day === today.getDate() &&
           currentDate.getMonth() === today.getMonth() &&
           currentDate.getFullYear() === today.getFullYear();
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{months[currentDate.getMonth()]}, {currentDate.getFullYear()}</h2>
        <div className="flex space-x-2">
          <button onClick={() => changeMonth(-1)} className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200">
            <ChevronLeft size={20} />
          </button>
          <button onClick={() => changeMonth(1)} className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center items-center h-48"
          >
            <div className="loader"></div>
          </motion.div>
        ) : (
          <motion.div
            key="calendar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="grid grid-cols-7 gap-2 text-center">
              {days.map((day) => (
                <div key={day} className="text-gray-500 font-medium">{day}</div>
              ))}
              {dates.map((date, index) => (
                <motion.div
                  key={index}
                  className={`p-2 rounded-full ${
                    date
                      ? isCurrentDay(date)
                        ? 'bg-blue-500 text-white glow'
                        : 'hover:bg-gray-100 transition-colors duration-200'
                      : 'text-gray-300'
                  }`}
                  whileHover={date ? { scale: 1.1 } : {}}
                  whileTap={date ? { scale: 0.95 } : {}}
                >
                  {date}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Calendar;