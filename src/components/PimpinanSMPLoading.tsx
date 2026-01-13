// src/components/PimpinanSMPLoading.tsx
// Komponen loading untuk halaman pimpinan SMP

import React from 'react';
import { Header } from './Header';

export function PimpinanSMPLoading() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="pt-0 flex-1">
        {/* Loading Banner */}
        <div className="relative w-full md:h-screen h-64 bg-gray-200 animate-pulse">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Memuat data pimpinan SMP...</p>
            </div>
          </div>
        </div>

        {/* Loading Content Sections */}
        {[1, 2, 3, 4, 5].map((index) => (
          <section key={index} className="relative lg:h-[554px] h-auto bg-gray-100 animate-pulse">
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-2"></div>
                <p className="text-gray-500 text-sm">Memuat profil pimpinan...</p>
              </div>
            </div>
          </section>
        ))}

        {/* Loading Boxes Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <div className="h-8 bg-gray-200 rounded animate-pulse mx-auto mb-4 w-96"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse mx-auto w-64"></div>
            </div>
            
            <div className="flex flex-wrap bg-gray-200 animate-pulse">
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <div key={index} className="w-1/2 lg:w-1/3 h-64 bg-gray-300"></div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 