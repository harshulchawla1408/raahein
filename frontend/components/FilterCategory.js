import React from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';

export default function FilterCategory({ name, icon, count, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300
        ${active 
          ? 'bg-[#1A6FA3] text-white shadow-lg hover:shadow-xl transform hover:scale-105'
          : 'bg-white text-gray-700 hover:bg-[#E6F3FF] hover:shadow-lg transition-all'
        }`}
    >
      <span className="text-2xl text-[#1A6FA3]">{icon}</span>
      <span className="font-medium flex-1 text-[#1A6FA3]">{name}</span>
      <span className="text-sm text-gray-600 bg-[#E6F3FF] px-2 py-1 rounded-full">{count}</span>
      {active && <CheckIcon className="w-5 h-5 text-white" />}
    </button>
  );
}
