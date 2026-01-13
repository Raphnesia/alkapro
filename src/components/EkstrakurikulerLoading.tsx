// src/components/EkstrakurikulerLoading.tsx
// Komponen loading untuk halaman ekstrakurikuler

import React from 'react';
import { Header } from './Header';
import { LoadingSpinner } from './LoadingSpinner';

export function EkstrakurikulerLoading() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="large" />
          <p className="mt-4 text-gray-600">Memuat data ekstrakurikuler...</p>
        </div>
      </main>
    </div>
  );
} 