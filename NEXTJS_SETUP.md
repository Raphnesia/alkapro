# Next.js Frontend Setup Guide

## Configuration untuk Koneksi ke Laravel Backend

### 1. Environment Variables

Update file `.env.local` dengan konfigurasi berikut:

```bash
# Laravel Backend API Configuration
NEXT_PUBLIC_API_URL=http://api.alkapro.id/api

# Production (ganti dengan domain shared hosting Anda)
# NEXT_PUBLIC_API_URL=https://your-shared-hosting-domain.com/api

# Image Configuration
NEXT_PUBLIC_IMAGE_BASE_URL=http://api.alkapro.id/storage

# Site Information
NEXT_PUBLIC_SITE_NAME="Sekolah Islam Terpadu"
NEXT_PUBLIC_SITE_DESCRIPTION="Website resmi Sekolah Islam Terpadu"
NEXT_PUBLIC_SITE_URL=http://localhost:3001

# Contact Information
NEXT_PUBLIC_SCHOOL_PHONE="+62 xxx-xxxx-xxxx"
NEXT_PUBLIC_SCHOOL_EMAIL="info@yourschool.sch.id"
NEXT_PUBLIC_SCHOOL_ADDRESS="Jl. Contoh No. 123, Kota"
```

### 2. API Integration Usage

#### Basic Usage
```typescript
import { homeApi, teacherApi, postApi } from '@/lib/api';

// Home sections
const sections = await homeApi.getSections();

// Teachers
const teachers = await teacherApi.getTeachers();
const staff = await teacherApi.getStaff();

// Posts (News & Articles)
const news = await postApi.getNews();
const articles = await postApi.getArticles();
const postDetail = await postApi.getBySlug('judul-berita');
```

#### In React Components
```typescript
'use client';

import { useEffect, useState } from 'react';
import { homeApi, Teacher } from '@/lib/api';

export default function TeachersSection() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const data = await teacherApi.getTeachers();
        setTeachers(data);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {teachers.map(teacher => (
        <div key={teacher.id}>
          <img src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${teacher.photo}`} alt={teacher.name} />
          <h3>{teacher.name}</h3>
          <p>{teacher.subject}</p>
        </div>
      ))}
    </div>
  );
}
```

### 3. Image Handling

#### Image URLs
```typescript
// Contoh penggunaan image URL
const imageUrl = `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${post.image}`;

// Atau gunakan helper function
export const getImageUrl = (path: string) => {
  if (!path) return '/placeholder.jpg';
  if (path.startsWith('http')) return path;
  return `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${path}`;
};
```

### 4. Error Handling

#### Error Boundary Component
```typescript
// src/components/ApiErrorBoundary.tsx
'use client';

import { useState } from 'react';

export function ApiErrorBoundary({ children }: { children: React.ReactNode }) {
  const [error, setError] = useState<string | null>(null);

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-red-800 font-semibold">Terjadi Kesalahan</h3>
        <p className="text-red-600">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  return children;
}
```

### 5. Loading States

#### Skeleton Component
```typescript
// src/components/Skeleton.tsx
export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
  );
}

// Usage
<Skeleton className="h-64 w-full" />
```

### 6. API Caching (Optional)

#### React Query Setup
```typescript
// npm install @tanstack/react-query

// src/providers.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 3,
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
```

### 7. Production Deployment Checklist

#### Before Deploying to Vercel:
1. **Update API URL**: Ganti `NEXT_PUBLIC_API_URL` dengan domain shared hosting
2. **Test CORS**: Pastikan Laravel backend sudah mengizinkan domain Vercel
3. **Image URLs**: Pastikan image URLs menggunakan HTTPS
4. **Error Handling**: Pastikan semua error sudah ditangani

#### Environment Variables di Vercel:
```bash
NEXT_PUBLIC_API_URL=https://your-shared-hosting-domain.com/api
NEXT_PUBLIC_IMAGE_BASE_URL=https://your-shared-hosting-domain.com/storage
NEXT_PUBLIC_SITE_URL=https://your-vercel-domain.vercel.app
```

### 8. Testing Connection

#### Test Script
```typescript
// src/lib/test-connection.ts
export async function testApiConnection() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home-sections`);
    if (response.ok) {
      console.log('✅ API Connection successful');
      return true;
    } else {
      console.error('❌ API Connection failed:', response.status);
      return false;
    }
  } catch (error) {
    console.error('❌ API Connection error:', error);
    return false;
  }
}
```

### 9. Debugging Tips

#### Common Issues:
1. **CORS Error**: Check Laravel CORS configuration
2. **404 API**: Check API URL configuration
3. **Image Not Loading**: Check image URL format
4. **Slow Loading**: Implement loading states and caching

#### Debug Mode
```typescript
// Enable debug mode
const DEBUG = process.env.NODE_ENV === 'development';

if (DEBUG) {
  console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
  console.log('Image Base:', process.env.NEXT_PUBLIC_IMAGE_BASE_URL);
}
```

## Quick Start

1. **Clone Laravel Backend**: Pisahkan folder `laravel-backend` ke repository baru
2. **Setup Laravel**: Ikuti `SETUP.md` di folder Laravel
3. **Update Next.js**: Ganti `.env.local` dengan konfigurasi yang sesuai
4. **Test Connection**: Jalankan kedua server dan test koneksi
5. **Deploy**: Deploy Next.js ke Vercel dan Laravel ke shared hosting

## Support

Untuk masalah teknis, silakan:
1. Check console untuk error messages
2. Pastikan semua environment variables sudah benar
3. Test API endpoints menggunakan Postman/Thunder Client
4. Check network tab di browser developer tools