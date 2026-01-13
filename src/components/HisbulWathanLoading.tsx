// src/components/HisbulWathanLoading.tsx
// Loading skeleton untuk halaman Hisbul Wathan

import React from 'react';
import { Header } from '@/components/Header';

export function HisbulWathanLoading() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      {/* Banner Loading */}
      <div className="relative w-full md:h-screen h-64">
        <div className="w-full h-full bg-gray-200 animate-pulse"></div>
        
        {/* Overlay Loading untuk Desktop */}
        <div className="absolute inset-0 hidden md:flex md:items-end">
          <div className="w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent">
            <div className="container mx-auto px-8 pb-16">
              <div className="max-w-3xl">
                {/* Title Panel Loading */}
                <div className="block">
                  <div className="bg-green-600 inline-flex p-5">
                    <div className="h-8 bg-green-500 rounded animate-pulse w-80"></div>
                  </div>
                </div>
                
                {/* Subtitle Panel Loading */}
                <div className="bg-green-700 p-4 opacity-90 inline-flex rounded-b-lg">
                  <div className="h-6 bg-green-600 rounded animate-pulse w-96"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Loading */}
      <div className="w-full bg-green-700 py-4 md:hidden">
        <div className="container mx-auto px-4">
          <div className="block">
            {/* Title Panel Loading untuk Mobile */}
            <div className="bg-green-600 inline-flex p-3">
              <div className="h-6 bg-green-500 rounded animate-pulse w-64"></div>
            </div>
            
            {/* Subtitle Panel Loading untuk Mobile */}
            <div className="bg-green-700 mb-0 p-3 opacity-90 inline-flex">
              <div className="h-4 bg-green-600 rounded animate-pulse w-72"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Loading */}
      <main className="flex-grow container mx-auto px-4 py-8 bg-white">
        {/* Content Section Loading */}
        <div className="mb-12">
          <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-1 bg-gray-200 rounded-full mr-3 animate-pulse"></div>
              <div className="h-8 bg-gray-200 rounded animate-pulse w-64"></div>
              <div className="w-16 h-1 bg-gray-200 rounded-full ml-3 animate-pulse"></div>
            </div>
            
            {/* Content Description Loading */}
            <div className="mb-6 space-y-3">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
            </div>
            
            {/* Bidang Structure Loading */}
            <div className="grid grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                  {/* Header Bidang Loading */}
                  <div className="bg-gray-200 px-4 py-3">
                    <div className="h-6 bg-gray-300 rounded animate-pulse w-32"></div>
                  </div>
                  
                  {/* Daftar Anggota Loading */}
                  <div className="p-4">
                    <div className="space-y-2">
                      {[1, 2, 3, 4, 5].map((member) => (
                        <div key={member} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                          <div className="flex items-center">
                            <div className="w-6 h-6 bg-gray-200 rounded-full mr-3 animate-pulse"></div>
                            <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                          </div>
                          <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pengurus Section Loading */}
        <div>
          <div className="h-10 bg-gray-200 rounded animate-pulse w-64 mx-auto mb-8"></div>
          <div className="space-y-8">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <div className="h-64 md:h-full bg-gray-200 animate-pulse"></div>
                  </div>
                  <div className="md:w-2/3 p-6">
                    <div className="space-y-4">
                      <div className="h-6 bg-gray-200 rounded animate-pulse w-32"></div>
                      <div className="h-8 bg-gray-200 rounded animate-pulse w-48"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
