import React from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';

export default function FilterBadge({ label, icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200
        ${active ? 'bg-[#FF7A3D] text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
    >
      {icon && <span className="text-lg">{icon}</span>}
      <span>{label}</span>
      {active && <CheckIcon className="w-4 h-4" />}
    </button>
  );
}
