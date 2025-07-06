'use client';

import React from 'react';
import { motion } from 'framer-motion';

const DestinationSkeleton = () => {
  const shimmer = "animate-pulse bg-gray-200";
  
  return (
    <div className="bg-gradient-to-b from-gray-50 to-blue-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back button skeleton */}
        <div className="mb-8">
          <div className={`w-32 h-6 ${shimmer} rounded`}></div>
        </div>

        {/* Header skeleton */}
        <div className="relative text-center mb-12 py-24 rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-gray-200">
          <div className="relative px-4">
            <div className={`w-64 h-16 mx-auto ${shimmer} rounded mb-4`}></div>
            <div className="flex items-center justify-center gap-6 flex-wrap">
              <div className={`w-32 h-8 ${shimmer} rounded-full`}></div>
              <div className={`w-40 h-8 ${shimmer} rounded-full`}></div>
              <div className={`w-24 h-8 ${shimmer} rounded-full`}></div>
            </div>
          </div>
        </div>

        {/* Content skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            {/* Image gallery skeleton */}
            <div className="grid grid-cols-2 gap-4">
              <div className={`col-span-2 h-[500px] ${shimmer} rounded-2xl`}></div>
              <div className={`h-64 ${shimmer} rounded-2xl`}></div>
              <div className={`h-64 ${shimmer} rounded-2xl`}></div>
            </div>

            {/* Description skeleton */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className={`w-48 h-8 ${shimmer} rounded mb-5`}></div>
              <div className="space-y-3">
                <div className={`w-full h-4 ${shimmer} rounded`}></div>
                <div className={`w-3/4 h-4 ${shimmer} rounded`}></div>
                <div className={`w-5/6 h-4 ${shimmer} rounded`}></div>
                <div className={`w-2/3 h-4 ${shimmer} rounded`}></div>
              </div>
            </div>
          </div>

          {/* Sidebar skeleton */}
          <div className="lg:col-span-1 space-y-8">
            <div className={`w-full h-16 ${shimmer} rounded-xl`}></div>
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className={`w-32 h-6 ${shimmer} rounded mb-5`}></div>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className={`w-full h-12 ${shimmer} rounded-lg`}></div>
                ))}
              </div>
            </div>
            <div className={`w-full h-32 ${shimmer} rounded-lg`}></div>
            <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100">
              <div className={`w-32 h-6 ${shimmer} rounded mb-3`}></div>
              <div className={`w-full h-32 ${shimmer} rounded-lg`}></div>
            </div>
          </div>
        </div>

        {/* Hotels section skeleton */}
        <div className="mt-20">
          <div className={`w-48 h-8 mx-auto ${shimmer} rounded mb-12`}></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                <div className={`h-60 ${shimmer}`}></div>
                <div className="p-5">
                  <div className={`w-3/4 h-6 ${shimmer} rounded mb-2`}></div>
                  <div className={`w-full h-4 ${shimmer} rounded mb-3`}></div>
                  <div className="flex justify-between items-center">
                    <div className={`w-20 h-6 ${shimmer} rounded`}></div>
                    <div className={`w-24 h-8 ${shimmer} rounded-lg`}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Restaurants section skeleton */}
        <div className="mt-20">
          <div className={`w-48 h-8 mx-auto ${shimmer} rounded mb-12`}></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                <div className={`h-60 ${shimmer}`}></div>
                <div className="p-5">
                  <div className={`w-3/4 h-6 ${shimmer} rounded mb-2`}></div>
                  <div className={`w-full h-4 ${shimmer} rounded mb-2`}></div>
                  <div className={`w-full h-4 ${shimmer} rounded mb-3`}></div>
                  <div className="flex justify-between items-center">
                    <div className={`w-20 h-6 ${shimmer} rounded`}></div>
                    <div className={`w-24 h-8 ${shimmer} rounded-lg`}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationSkeleton; 