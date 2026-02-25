// src/components/FacilityLoading.tsx
// Komponen loading untuk fasilitas

import React from 'react';

export const FacilityLoading: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header Skeleton */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
      
      {/* Banner Skeleton */}
      <section className="relative">
        <div className="w-full h-64 md:h-96 bg-gray-200 animate-pulse"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="w-full lg:w-1/2">
              <div className="animate-pulse">
                <div className="h-12 bg-gray-300 rounded mb-4 w-3/4"></div>
                <div className="h-24 bg-gray-300 rounded w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Margin */}
      <section>
        <div className="w-full" style={{height: '100px'}}></div>
      </section>

      {/* Boxes Skeleton */}
      <section>
        <div className="flex flex-wrap bg-blue-600">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="w-1/2 lg:w-1/3 p-1 sm:p-2 md:p-3 lg:p-4">
              <div className="w-full py-2 sm:py-2 md:py-3 lg:py-4 px-1 sm:px-2 md:px-3 lg:px-3 text-white">
                <div className="animate-pulse">
                  <div className="w-12 h-12 bg-gray-300 rounded mx-auto mb-2"></div>
                  <div className="h-6 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-1"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <div className="bg-gray-50 flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Search Bar Skeleton */}
          <div className="mb-8">
            <div className="relative max-w-md mx-auto">
              <div className="animate-pulse">
                <div className="h-12 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          </div>

          {/* Title Skeleton */}
          <div className="text-center mb-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded mx-auto mb-2 w-1/3"></div>
              <div className="w-12 h-1 bg-gray-200 mx-auto"></div>
            </div>
          </div>

          {/* Facilities Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="animate-pulse">
                  <div className="w-full h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2 w-1/3"></div>
                    <div className="h-4 bg-gray-200 rounded mb-1"></div>
                    <div className="h-4 bg-gray-200 rounded mb-1"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4 w-2/3"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4 w-1/3"></div>
                    <div className="h-10 bg-gray-200 rounded w-1/2"></div>
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