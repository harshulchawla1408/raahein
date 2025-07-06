'use client';

import React from 'react';
import { ExclamationTriangleIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const ErrorState = ({ message, onRetry, onBack }) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md mx-auto p-8"
      >
        <div className="mb-6">
          <ExclamationTriangleIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-6">{message}</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {onBack && (
            <button 
              onClick={onBack}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              Go Back
            </button>
          )}
          
          {onRetry && (
            <button 
              onClick={onRetry}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ErrorState; 