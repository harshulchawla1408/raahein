import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CloudIcon,
  BuildingLibraryIcon,
  ArrowPathIcon,
  BuildingOfficeIcon
} from "@heroicons/react/24/outline";

const INTERESTS = [
  { 
    label: "Nature & Mountains", 
    value: "mountains",
    icon: <CloudIcon className="w-5 h-5 text-white" />,
    color: "from-[#1A6FA3] to-[#15567D]"
  },
  { 
    label: "Beach Vibes", 
    value: "beach",
    icon: <CloudIcon className="w-5 h-5 text-white" />,
    color: "from-[#1A6FA3] to-[#15567D]"
  },
  { 
    label: "Heritage & Culture", 
    value: "heritage",
    icon: <BuildingLibraryIcon className="w-5 h-5 text-white" />,
    color: "from-[#1A6FA3] to-[#15567D]"
  },
  { 
    label: "Adventurous Escapes", 
    value: "adventure",
    icon: <ArrowPathIcon className="w-5 h-5 text-white" />,
    color: "from-[#1A6FA3] to-[#15567D]"
  },
  { 
    label: "City Life & Food", 
    value: "city",
    icon: <BuildingOfficeIcon className="w-5 h-5 text-white" />,
    color: "from-[#1A6FA3] to-[#15567D]"
  },
  { 
    label: "Luxury Getaways", 
    value: "luxury",
    icon: <BuildingLibraryIcon className="w-5 h-5 text-white" />,
    color: "from-[#1A6FA3] to-[#15567D]"
  },
  { 
    label: "Spiritual Journeys", 
    value: "spiritual",
    icon: <ArrowPathIcon className="w-5 h-5 text-white" />,
    color: "from-[#1A6FA3] to-[#15567D]"
  },
  { 
    label: "Wildlife Adventures", 
    value: "wildlife",
    icon: <BuildingOfficeIcon className="w-5 h-5 text-white" />,
    color: "from-[#1A6FA3] to-[#15567D]"
  },
];

export default function InterestCheckboxes({ selected, setSelected, className = "" }) {
  const [localSelected, setLocalSelected] = useState(selected || []);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setLocalSelected(selected || []);
  }, [selected]);

  const toggleInterest = (val) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    let newSelected;
    if (localSelected.includes(val)) {
      newSelected = localSelected.filter((i) => i !== val);
    } else {
      newSelected = [...localSelected, val];
      
      // If more than 3 interests selected, remove the first one
      if (newSelected.length > 3) {
        newSelected = newSelected.slice(1);
      }
    }
    
    setLocalSelected(newSelected);
    setSelected(newSelected);
    
    // Reset animation lock after a short delay
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="flex flex-wrap gap-3">
        <AnimatePresence>
          {INTERESTS.map((item, index) => {
            const isSelected = localSelected.includes(item.value);
            
            return (
              <motion.div
                key={item.value}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.label 
                  className={`
                    relative flex items-center gap-3 px-5 py-3.5 rounded-xl cursor-pointer transition-all duration-300
                    ${isSelected 
                      ? `bg-gradient-to-r ${item.color} text-white shadow-lg` 
                      : 'bg-[#E6F3FF] text-[#1A6FA3] hover:bg-[#D9EAFB] shadow-md'}
                    overflow-hidden
                  `}
                  whileHover={{ y: -2 }}
                >
                  {/* Animated checkmark */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.span 
                        className="absolute -left-1 -top-1 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <motion.svg 
                          className="w-4 h-4 text-white" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                        >
                          <motion.path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M5 13l4 4L19 7" 
                          />
                        </motion.svg>
                      </motion.span>
                    )}
                  </AnimatePresence>
                  
                  <span className={`transition-colors ${isSelected ? 'text-white' : 'text-gray-400'}`}>
                    {React.cloneElement(item.icon, {
                      className: `w-5 h-5 ${isSelected ? 'text-white' : item.color.replace('from-', 'text-').split(' ')[0]}`
                    })}
                  </span>
                  
                  <span className="text-sm font-medium whitespace-nowrap">
                    {item.label}
                  </span>
                  
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={isSelected}
                    onChange={() => toggleInterest(item.value)}
                  />
                </motion.label>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      
      <AnimatePresence>
        {localSelected.length > 0 && (
          <motion.div 
            className="mt-4 text-sm text-gray-500"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            Selected: {localSelected.length}/3 interests
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
