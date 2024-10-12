import React from 'react';
import { Star } from 'lucide-react';

const StylistList = () => {
  const stylists = [
    { name: 'Tatiana Kenter', role: 'Hair Spa', rating: 4.7, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
    { name: 'James Vaccaro', role: 'Hair Cut', rating: 4.8, image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
    { name: 'Kierra Donin', role: 'Hair Spa', rating: 4.5, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
    { name: 'Cooper Rosser', role: 'Hair Cut', rating: 4.8, image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
    { name: 'Carla Passaquindici', role: 'Hair Spa', rating: 4.9, image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  ];

  return (
    <div className="bg-white rounded-lg shadow mt-6 p-6">
      <h2 className="text-xl font-semibold mb-4">Stylist</h2>
      <div className="space-y-4">
        {stylists.map((stylist, index) => (
          <div key={index} className="flex items-center space-x-4">
            <img src={stylist.image} alt={stylist.name} className="w-10 h-10 rounded-full" />
            <div className="flex-1">
              <h3 className="text-sm font-medium">{stylist.name}</h3>
              <p className="text-xs text-gray-500">{stylist.role}</p>
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 mr-1" />
              <span className="text-sm font-medium">{stylist.rating}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StylistList;