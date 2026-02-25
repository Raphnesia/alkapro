// src/components/IPMLoading.tsx
// Loading component untuk IPM page

import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';

export function IPMLoading() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header Placeholder */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>

      {/* Banner Placeholder */}
      <div className="relative w-full md:h-screen h-64 bg-gray-200">
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingSpinner size="large" />
        </div>
      </div>

      {/* Content Placeholder */}
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          {/* Title Placeholder */}
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-6"></div>
          
          {/* Cards Placeholder */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md">
                {/* Image Placeholder */}
                <div className="h-64 bg-gray-200"></div>
                
                {/* Content Placeholder */}
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 