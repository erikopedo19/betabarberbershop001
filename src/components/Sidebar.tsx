import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Calendar, Users, Scissors, BarChart2, Settings, LogOut, Menu } from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { icon: LayoutDashboard, text: 'Dashboard', href: '/' },
    { icon: Calendar, text: 'Agenda', href: '/agenda' },
    { icon: Users, text: 'Customers', href: '/customers' },
    { icon: Scissors, text: 'Stylists', href: '/stylists' },
    { icon: BarChart2, text: 'Report', href: '/report' },
    { icon: Settings, text: 'Settings', href: '/settings' },
  ];

  return (
    <div className={`bg-white text-gray-800 h-screen ${isOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out shadow-lg flex flex-col`}>
      <div className="flex justify-between items-center p-4 border-b">
        {isOpen && <h1 className="text-2xl font-bold text-blue-500">BARBERS</h1>}
        <button onClick={toggleSidebar} className="p-2 rounded-md hover:bg-gray-100 text-gray-600">
          <Menu size={24} />
        </button>
      </div>
      <nav className="mt-8 flex-grow">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.href}
            className="flex items-center py-3 px-4 text-gray-600 hover:bg-blue-50 hover:text-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-md"
          >
            <item.icon className={`${isOpen ? 'mr-4' : 'mx-auto'}`} size={20} />
            {isOpen && <span>{item.text}</span>}
          </Link>
        ))}
      </nav>
      <div className="p-4">
        <a
          href="#"
          className="flex items-center py-3 px-4 text-gray-600 hover:bg-blue-50 hover:text-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-md"
        >
          <LogOut className={`${isOpen ? 'mr-4' : 'mx-auto'}`} size={20} />
          {isOpen && <span>Log out</span>}
        </a>
      </div>
    </div>
  );
};

export default Sidebar;