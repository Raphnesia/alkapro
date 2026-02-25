// src/components/VisiMisiLoading.tsx
// Loading component untuk Visi Misi page

import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';

export function VisiMisiLoading() {
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
          
          {/* Content Sections Placeholder */}
          <div className="space-y-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className={`${item % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border border-gray-200 rounded-lg p-6`}>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 