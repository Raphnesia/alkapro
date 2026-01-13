// src/components/SejarahLoading.tsx
// Komponen loading untuk halaman sejarah

import React from 'react';

export function SejarahLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner Loading */}
      <div className="relative h-64 md:h-96 bg-gray-200 animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="h-8 bg-gray-300 rounded w-64 mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-96 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Content Loading */}
      <div className="container mx-auto px-4 py-16">
        <div className="space-y-8">
          {/* Section 1 */}
          <div className="bg-white p-6 rounded-lg shadow-lg border animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              <div className="h-4 bg-gray-300 rounded w-4/6"></div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg border animate-pulse">
              <div className="h-6 bg-gray-300 rounded w-2/3 mb-4"></div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-300 rounded w-full"></div>
                <div className="h-3 bg-gray-300 rounded w-4/5"></div>
                <div className="h-3 bg-gray-300 rounded w-3/5"></div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border animate-pulse">
              <div className="h-6 bg-gray-300 rounded w-2/3 mb-4"></div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-300 rounded w-full"></div>
                <div className="h-3 bg-gray-300 rounded w-4/5"></div>
                <div className="h-3 bg-gray-300 rounded w-3/5"></div>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="bg-white p-6 rounded-lg shadow-lg border animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/2 mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              <div className="h-4 bg-gray-300 rounded w-4/6"></div>
              <div className="h-4 bg-gray-300 rounded w-3/6"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 