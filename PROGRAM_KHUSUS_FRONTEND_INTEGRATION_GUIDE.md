# 📚 Program Khusus - Panduan Integrasi Frontend Lengkap

> **Dokumentasi Komprehensif untuk Frontend Developer**  
> Semua yang Anda butuhkan untuk mengintegrasikan Program Khusus di frontend

---

## 📋 Daftar Isi

1. [🎯 Overview](#-overview)
2. [🔗 API Endpoints](#-api-endpoints)
3. [📊 Struktur Data](#-struktur-data)
4. [⚡ Custom Hooks](#-custom-hooks)
5. [🎨 Komponen Frontend](#-komponen-frontend)
6. [📱 Implementasi Halaman](#-implementasi-halaman)
7. [🔧 Utilities & Helpers](#-utilities--helpers)
8. [🚀 Quick Start Guide](#-quick-start-guide)
9. [❗ Error Handling](#-error-handling)
10. [🎭 Loading States](#-loading-states)

---

## 🎯 Overview

Sistem Program Khusus memiliki 2 tipe utama:
- **📖 Tahfidz** - Program hafalan Al-Quran
- **💻 ICT** - Program teknologi informasi

Setiap tipe memiliki:
- ✅ Pengaturan konfigurasi (settings)
- ✅ Daftar program/item
- ✅ Halaman dedicated (`/program-khusus/tahfidz` dan `/program-khusus/ict`)

---

## 🔗 API Endpoints

### 📌 Base URL
```
http://api.alkapro.id/api/v1
```

### 🎯 Endpoint Utama

#### 1. **Semua Program Khusus**
```http
GET /special-programs
```

#### 2. **Pengaturan per Tipe**
```http
GET /special-programs/type/{type}/settings
```
- `{type}`: `tahfidz` atau `ict`

#### 3. **Program Lengkap per Tipe**
```http
GET /special-programs/type/{type}/complete
```
- Menggabungkan settings + items dalam satu response

---

## 📊 Struktur Data

### 🏗️ Settings Response

```typescript
interface SpecialProgramSettings {
  id: number;
  type: 'tahfidz' | 'ict';
  is_active: boolean;
  
  // Basic Info
  title: string;
  subtitle: string | null;
  
  // Banners
  banner_desktop: string | null;
  banner_mobile: string | null;
  
  // Hero Section
  hero_desktop_image: string | null;
  hero_mobile_image: string | null;
  
  // Intro Section
  intro_badge_text: string | null;
  intro_main_title: string | null;
  intro_description: string | null;
  
  // Featured Image
  featured_image: string | null;
  featured_image_title: string | null;
  featured_image_description: string | null;
  
  // Key Points
  key_points: KeyPoint[];
  
  // Gallery
  gallery_images: GalleryImage[];
  
  // Call to Action
  cta_background_image: string | null;
  cta_badge_text: string | null;
  cta_title: string | null;
  cta_description: string | null;
  cta_primary_button_text: string | null;
  cta_primary_button_link: string | null;
  cta_secondary_button_text: string | null;
  cta_secondary_button_link: string | null;
  cta_contact_info: string | null;
  
  // Timestamps
  created_at: string;
  updated_at: string;
}

interface KeyPoint {
  title: string;
  description: string;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'emerald';
}

interface GalleryImage {
  image: string;
  title: string;
  description: string;
}
```

### 📋 Programs Response

```typescript
interface SpecialProgram {
  id: number;
  type: 'tahfidz' | 'ict';
  title: string;
  description: string | null;
  image: string | null;
  is_featured: boolean;
  is_active: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}
```

### 🔄 Complete Response

```typescript
interface CompleteSpecialProgram {
  settings: SpecialProgramSettings;
  programs: SpecialProgram[];
}
```

---

## ⚡ Custom Hooks

### 🎯 useProgramKhususByType

```typescript
// hooks/useProgramKhusus.ts
import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api';

interface UseProgramKhususByTypeResult {
  settings: SpecialProgramSettings | null;
  programs: SpecialProgram[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useProgramKhususByType(type: 'tahfidz' | 'ict'): UseProgramKhususByTypeResult {
  const [settings, setSettings] = useState<SpecialProgramSettings | null>(null);
  const [programs, setPrograms] = useState<SpecialProgram[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch complete data (settings + programs)
      const response = await apiClient.get(`/special-programs/type/${type}/complete`);
      
      if (response.data.success) {
        setSettings(response.data.data.settings);
        setPrograms(response.data.data.programs || []);
      } else {
        throw new Error(response.data.message || 'Failed to fetch data');
      }
    } catch (err: any) {
      console.error(`Error fetching ${type} program data:`, err);
      setError(err.message || 'Terjadi kesalahan saat mengambil data');
      
      // Set default empty state
      setSettings(null);
      setPrograms([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (type) {
      fetchData();
    }
  }, [type]);

  return {
    settings,
    programs,
    loading,
    error,
    refetch: fetchData
  };
}
```

### 🔄 useProgramKhususAll

```typescript
// hooks/useProgramKhusus.ts
export function useProgramKhususAll() {
  const [programs, setPrograms] = useState<SpecialProgram[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiClient.get('/special-programs');
      
      if (response.data.success) {
        setPrograms(response.data.data || []);
      } else {
        throw new Error(response.data.message || 'Failed to fetch programs');
      }
    } catch (err: any) {
      console.error('Error fetching all programs:', err);
      setError(err.message || 'Terjadi kesalahan saat mengambil data');
      setPrograms([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { programs, loading, error, refetch: fetchData };
}
```

---

## 🎨 Komponen Frontend

### 🖼️ HeroSection Component

```typescript
// components/program-khusus/HeroSection.tsx
import Image from 'next/image';
import { SpecialProgramSettings } from '@/types/program-khusus';

interface HeroSectionProps {
  settings: SpecialProgramSettings;
}

export function HeroSection({ settings }: HeroSectionProps) {
  const heroImage = settings.hero_desktop_image;
  const heroImageMobile = settings.hero_mobile_image;
  
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      {heroImage && (
        <>
          <Image
            src={heroImage}
            alt={settings.title}
            fill
            className="object-cover hidden md:block"
            priority
          />
          {heroImageMobile && (
            <Image
              src={heroImageMobile}
              alt={settings.title}
              fill
              className="object-cover md:hidden"
              priority
            />
          )}
        </>
      )}
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          {settings.title}
        </h1>
        {settings.subtitle && (
          <p className="text-xl md:text-2xl opacity-90">
            {settings.subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
```

### 📝 IntroSection Component

```typescript
// components/program-khusus/IntroSection.tsx
import { SpecialProgramSettings } from '@/types/program-khusus';

interface IntroSectionProps {
  settings: SpecialProgramSettings;
}

export function IntroSection({ settings }: IntroSectionProps) {
  if (!settings.intro_main_title && !settings.intro_description) {
    return null;
  }
  
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {settings.intro_badge_text && (
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
            {settings.intro_badge_text}
          </span>
        )}
        
        {settings.intro_main_title && (
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            {settings.intro_main_title}
          </h2>
        )}
        
        {settings.intro_description && (
          <p className="text-lg text-gray-600 leading-relaxed">
            {settings.intro_description}
          </p>
        )}
      </div>
    </section>
  );
}
```

### 🎯 KeyPointsSection Component

```typescript
// components/program-khusus/KeyPointsSection.tsx
import { SpecialProgramSettings } from '@/types/program-khusus';

interface KeyPointsSectionProps {
  settings: SpecialProgramSettings;
}

const colorClasses = {
  blue: 'bg-blue-50 border-blue-200 text-blue-800',
  green: 'bg-green-50 border-green-200 text-green-800',
  purple: 'bg-purple-50 border-purple-200 text-purple-800',
  orange: 'bg-orange-50 border-orange-200 text-orange-800',
  red: 'bg-red-50 border-red-200 text-red-800',
  emerald: 'bg-emerald-50 border-emerald-200 text-emerald-800',
};

export function KeyPointsSection({ settings }: KeyPointsSectionProps) {
  if (!settings.key_points || settings.key_points.length === 0) {
    return null;
  }
  
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          Keunggulan Program
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {settings.key_points.map((point, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg border-2 ${colorClasses[point.color] || colorClasses.blue}`}
            >
              <h3 className="font-semibold text-lg mb-3">
                {point.title}
              </h3>
              <p className="opacity-80">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### 🖼️ GallerySection Component

```typescript
// components/program-khusus/GallerySection.tsx
import Image from 'next/image';
import { SpecialProgramSettings } from '@/types/program-khusus';

interface GallerySectionProps {
  settings: SpecialProgramSettings;
}

export function GallerySection({ settings }: GallerySectionProps) {
  if (!settings.gallery_images || settings.gallery_images.length === 0) {
    return null;
  }
  
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          Galeri Program
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {settings.gallery_images.map((item, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative aspect-video overflow-hidden rounded-lg mb-4">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="font-semibold text-lg mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### 📢 CTASection Component

```typescript
// components/program-khusus/CTASection.tsx
import Image from 'next/image';
import Link from 'next/link';
import { SpecialProgramSettings } from '@/types/program-khusus';

interface CTASectionProps {
  settings: SpecialProgramSettings;
}

export function CTASection({ settings }: CTASectionProps) {
  const hasContent = settings.cta_title || settings.cta_description;
  
  if (!hasContent) {
    return null;
  }
  
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background Image */}
      {settings.cta_background_image && (
        <>
          <Image
            src={settings.cta_background_image}
            alt="CTA Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </>
      )}
      
      <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
        {settings.cta_badge_text && (
          <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
            {settings.cta_badge_text}
          </span>
        )}
        
        {settings.cta_title && (
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {settings.cta_title}
          </h2>
        )}
        
        {settings.cta_description && (
          <p className="text-lg mb-8 opacity-90">
            {settings.cta_description}
          </p>
        )}
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {settings.cta_primary_button_text && settings.cta_primary_button_link && (
            <Link
              href={settings.cta_primary_button_link}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              {settings.cta_primary_button_text}
            </Link>
          )}
          
          {settings.cta_secondary_button_text && settings.cta_secondary_button_link && (
            <Link
              href={settings.cta_secondary_button_link}
              className="px-8 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-lg font-medium transition-colors border border-white/30"
            >
              {settings.cta_secondary_button_text}
            </Link>
          )}
        </div>
        
        {settings.cta_contact_info && (
          <p className="mt-8 text-sm opacity-75">
            {settings.cta_contact_info}
          </p>
        )}
      </div>
    </section>
  );
}
```

### 📋 ProgramsList Component

```typescript
// components/program-khusus/ProgramsList.tsx
import Image from 'next/image';
import { SpecialProgram } from '@/types/program-khusus';

interface ProgramsListProps {
  programs: SpecialProgram[];
  title?: string;
}

export function ProgramsList({ programs, title = "Daftar Program" }: ProgramsListProps) {
  if (programs.length === 0) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">{title}</h2>
          <p className="text-gray-600">Belum ada program yang tersedia.</p>
        </div>
      </section>
    );
  }
  
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          {title}
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program) => (
            <div key={program.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {program.image && (
                <div className="relative aspect-video">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover"
                  />
                  {program.is_featured && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-yellow-500 text-white text-sm font-medium rounded-full">
                        ⭐ Unggulan
                      </span>
                    </div>
                  )}
                </div>
              )}
              
              <div className="p-6">
                <h3 className="font-bold text-xl mb-3 text-gray-900">
                  {program.title}
                </h3>
                {program.description && (
                  <p className="text-gray-600 leading-relaxed">
                    {program.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## 📱 Implementasi Halaman

### 🎯 Halaman Tahfidz

```typescript
// app/program-khusus/tahfidz/page.tsx
'use client';

import { useProgramKhususByType } from '@/hooks/useProgramKhusus';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { HeroSection } from '@/components/program-khusus/HeroSection';
import { IntroSection } from '@/components/program-khusus/IntroSection';
import { KeyPointsSection } from '@/components/program-khusus/KeyPointsSection';
import { GallerySection } from '@/components/program-khusus/GallerySection';
import { ProgramsList } from '@/components/program-khusus/ProgramsList';
import { CTASection } from '@/components/program-khusus/CTASection';

export default function TahfidzPage() {
  const { settings, programs, loading, error, refetch } = useProgramKhususByType('tahfidz');
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (error) {
    return (
      <ErrorMessage 
        message={error} 
        onRetry={refetch}
      />
    );
  }
  
  if (!settings) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            📖 Program Tahfidz
          </h1>
          <p className="text-gray-600">
            Pengaturan program belum tersedia.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <main>
      <HeroSection settings={settings} />
      <IntroSection settings={settings} />
      <KeyPointsSection settings={settings} />
      <ProgramsList programs={programs} title="Program Tahfidz" />
      <GallerySection settings={settings} />
      <CTASection settings={settings} />
    </main>
  );
}
```

### 💻 Halaman ICT

```typescript
// app/program-khusus/ict/page.tsx
'use client';

import { useProgramKhususByType } from '@/hooks/useProgramKhusus';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { HeroSection } from '@/components/program-khusus/HeroSection';
import { IntroSection } from '@/components/program-khusus/IntroSection';
import { KeyPointsSection } from '@/components/program-khusus/KeyPointsSection';
import { GallerySection } from '@/components/program-khusus/GallerySection';
import { ProgramsList } from '@/components/program-khusus/ProgramsList';
import { CTASection } from '@/components/program-khusus/CTASection';

export default function ICTPage() {
  const { settings, programs, loading, error, refetch } = useProgramKhususByType('ict');
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (error) {
    return (
      <ErrorMessage 
        message={error} 
        onRetry={refetch}
      />
    );
  }
  
  if (!settings) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            💻 Program ICT
          </h1>
          <p className="text-gray-600">
            Pengaturan program belum tersedia.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <main>
      <HeroSection settings={settings} />
      <IntroSection settings={settings} />
      <KeyPointsSection settings={settings} />
      <ProgramsList programs={programs} title="Program ICT" />
      <GallerySection settings={settings} />
      <CTASection settings={settings} />
    </main>
  );
}
```

---

## 🔧 Utilities & Helpers

### 🌐 API Client

```typescript
// lib/api.ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://api.alkapro.id/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

### 🎨 Image Helper

```typescript
// lib/image-helper.ts
export function getImageUrl(imagePath: string | null): string | null {
  if (!imagePath) return null;
  
  // If already a full URL, return as is
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // Construct full URL
  const baseUrl = process.env.NEXT_PUBLIC_STORAGE_URL || 'http://api.alkapro.id/storage';
  return `${baseUrl}/${imagePath.replace(/^\//, '')}`;
}

export function getOptimizedImageUrl(imagePath: string | null, width?: number, height?: number): string | null {
  const url = getImageUrl(imagePath);
  if (!url) return null;
  
  // Add optimization parameters if needed
  if (width || height) {
    const params = new URLSearchParams();
    if (width) params.append('w', width.toString());
    if (height) params.append('h', height.toString());
    return `${url}?${params.toString()}`;
  }
  
  return url;
}
```

### 📱 Responsive Helper

```typescript
// lib/responsive-helper.ts
export function getResponsiveImage(desktopImage: string | null, mobileImage: string | null) {
  return {
    desktop: getImageUrl(desktopImage),
    mobile: getImageUrl(mobileImage) || getImageUrl(desktopImage),
  };
}

export function useResponsiveImage(desktopImage: string | null, mobileImage: string | null) {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const images = getResponsiveImage(desktopImage, mobileImage);
  return isMobile ? images.mobile : images.desktop;
}
```

---

## 🚀 Quick Start Guide

### 1️⃣ Setup Types

```typescript
// types/program-khusus.ts
export interface SpecialProgramSettings {
  // ... (copy dari struktur data di atas)
}

export interface SpecialProgram {
  // ... (copy dari struktur data di atas)
}

export interface CompleteSpecialProgram {
  settings: SpecialProgramSettings;
  programs: SpecialProgram[];
}
```

### 2️⃣ Setup API Client

```bash
npm install axios
```

```typescript
// lib/api.ts
// ... (copy dari utilities di atas)
```

### 3️⃣ Create Custom Hook

```typescript
// hooks/useProgramKhusus.ts
// ... (copy dari custom hooks di atas)
```

### 4️⃣ Create Components

```bash
mkdir -p components/program-khusus
mkdir -p components/ui
```

### 5️⃣ Create Pages

```bash
mkdir -p app/program-khusus/tahfidz
mkdir -p app/program-khusus/ict
```

### 6️⃣ Environment Variables

```env
# .env.local
NEXT_PUBLIC_API_URL=http://api.alkapro.id/api/v1
NEXT_PUBLIC_STORAGE_URL=http://api.alkapro.id/storage
```

---

## ❗ Error Handling

### 🚨 Error Component

```typescript
// components/ui/ErrorMessage.tsx
interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">😞</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Oops! Terjadi Kesalahan
        </h2>
        <p className="text-gray-600 mb-6">
          {message}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            🔄 Coba Lagi
          </button>
        )}
      </div>
    </div>
  );
}
```

### 🔄 Error Boundary

```typescript
// components/ui/ErrorBoundary.tsx
import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <ErrorMessage 
          message="Terjadi kesalahan yang tidak terduga"
          onRetry={() => window.location.reload()}
        />
      );
    }

    return this.props.children;
  }
}
```

---

## 🎭 Loading States

### ⏳ Loading Spinner

```typescript
// components/ui/LoadingSpinner.tsx
export function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Memuat data...</p>
      </div>
    </div>
  );
}
```

### 🎨 Skeleton Loading

```typescript
// components/ui/SkeletonLoader.tsx
export function SkeletonLoader() {
  return (
    <div className="animate-pulse">
      {/* Hero Skeleton */}
      <div className="h-screen bg-gray-300"></div>
      
      {/* Content Skeleton */}
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="h-8 bg-gray-300 rounded mb-6 w-1/2 mx-auto"></div>
          <div className="h-4 bg-gray-300 rounded mb-4"></div>
          <div className="h-4 bg-gray-300 rounded mb-4 w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
      
      {/* Cards Skeleton */}
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="aspect-video bg-gray-300"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-300 rounded mb-3"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## 🎯 Testing

### 🧪 Hook Testing

```typescript
// __tests__/hooks/useProgramKhusus.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { useProgramKhususByType } from '@/hooks/useProgramKhusus';
import { apiClient } from '@/lib/api';

jest.mock('@/lib/api');
const mockedApiClient = apiClient as jest.Mocked<typeof apiClient>;

describe('useProgramKhususByType', () => {
  it('should fetch tahfidz data successfully', async () => {
    const mockData = {
      data: {
        success: true,
        data: {
          settings: { id: 1, type: 'tahfidz', title: 'Program Tahfidz' },
          programs: [{ id: 1, title: 'Tahfidz Dasar' }]
        }
      }
    };
    
    mockedApiClient.get.mockResolvedValueOnce(mockData);
    
    const { result } = renderHook(() => useProgramKhususByType('tahfidz'));
    
    expect(result.current.loading).toBe(true);
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.settings?.title).toBe('Program Tahfidz');
      expect(result.current.programs).toHaveLength(1);
    });
  });
});
```

---

## 📚 Kesimpulan

Dokumentasi ini menyediakan semua yang dibutuhkan untuk mengintegrasikan Program Khusus di frontend:

✅ **API Endpoints** yang lengkap  
✅ **TypeScript Types** yang akurat  
✅ **Custom Hooks** yang siap pakai  
✅ **Komponen UI** yang responsive  
✅ **Error Handling** yang robust  
✅ **Loading States** yang smooth  
✅ **Testing Examples** untuk quality assurance  

**Frontend developer tinggal:**
1. Copy & paste kode yang disediakan
2. Sesuaikan styling dengan design system
3. Test dan deploy! 🚀

---

**📞 Need Help?**  
Jika ada pertanyaan atau butuh bantuan implementasi, silakan hubungi tim backend! 💪