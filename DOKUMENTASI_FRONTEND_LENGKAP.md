# 🚀 DOKUMENTASI FRONTEND PROGRAM KHUSUS - LENGKAP & SEDERHANA

> **SATU DOKUMENTASI UNTUK SEMUA KEBUTUHAN FRONTEND**

---

## 🎯 PENTING! BACA INI DULU

### ❌ JANGAN BINGUNG! Anda TIDAK Perlu:
- ❌ Buat `HeroSection.tsx`
- ❌ Buat `IntroSection.tsx`
- ❌ Buat `KeyPointsSection.tsx`
- ❌ Buat `GallerySection.tsx`
- ❌ Buat `CTASection.tsx`
- ❌ Buat `hooks/useProgramKhusus.ts`
- ❌ Buat folder `components/program-khusus/`

### ✅ Yang Perlu Anda Lakukan:
**CUKUP BUAT 2 FILE SAJA:**
1. `app/program-khusus/tahfidz/page.tsx` (atau `src/pages/ProgramTahfidz.jsx`)
2. `app/program-khusus/ict/page.tsx` (atau `src/pages/ProgramICT.jsx`)

**SEMUA SECTION (Hero, Intro, KeyPoints, Gallery, CTA) ADA DALAM 1 FILE!**

---

## 📋 Daftar Isi

1. [🚀 Quick Start](#-quick-start)
2. [📁 Template Files](#-template-files)
3. [🔗 API Endpoints](#-api-endpoints)
4. [📊 Struktur Data](#-struktur-data)
5. [🎨 Customization](#-customization)
6. [🚨 Troubleshooting](#-troubleshooting)
7. [📞 FAQ](#-faq)

---

## 🚀 Quick Start

### Pilih Framework Anda:

#### **Option 1: Next.js (Recommended)**
```bash
# 1. Copy template
cp SIMPLE_FRONTEND_EXAMPLE.tsx app/program-khusus/tahfidz/page.tsx
cp SIMPLE_FRONTEND_EXAMPLE.tsx app/program-khusus/ict/page.tsx

# 2. Edit file ICT (ubah 1 baris saja)
# Di app/program-khusus/ict/page.tsx, ganti:
# useProgramData('tahfidz') → useProgramData('ict')

# 3. Setup environment
echo "NEXT_PUBLIC_API_URL=http://api.alkapro.id/api/v1" > .env.local

# 4. Install dependencies
npm install next

# 5. Selesai! Akses:
# http://localhost:3000/program-khusus/tahfidz
# http://localhost:3000/program-khusus/ict
```

#### **Option 2: React Biasa**
```bash
# 1. Copy template
cp REACT_SIMPLE_EXAMPLE.jsx src/pages/ProgramTahfidz.jsx
cp REACT_SIMPLE_EXAMPLE.jsx src/pages/ProgramICT.jsx

# 2. Edit file ICT (ubah 1 baris saja)
# Di src/pages/ProgramICT.jsx, ganti:
# useProgramData('tahfidz') → useProgramData('ict')

# 3. Setup environment
echo "REACT_APP_API_URL=http://api.alkapro.id/api/v1" > .env

# 4. Install dependencies
npm install react react-dom react-router-dom

# 5. Setup routing di App.js
```

---

## 📁 Template Files

### 🎯 Next.js Template (SIMPLE_FRONTEND_EXAMPLE.tsx)

```typescript
// CONTOH IMPLEMENTASI SEDERHANA - SATU FILE UNTUK SEMUA
// File: app/program-khusus/tahfidz/page.tsx
// atau: app/program-khusus/ict/page.tsx

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

// ===== TYPES =====
interface SpecialProgramSettings {
  id: number;
  type: 'tahfidz' | 'ict';
  title: string;
  subtitle?: string;
  hero_desktop_image?: string;
  hero_mobile_image?: string;
  intro_badge_text?: string;
  intro_main_title?: string;
  intro_description?: string;
  key_points: Array<{
    title: string;
    description: string;
    color: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'emerald';
  }>;
  gallery_images: Array<{
    image: string;
    title: string;
    description: string;
  }>;
  cta_background_image?: string;
  cta_title?: string;
  cta_description?: string;
  cta_primary_button_text?: string;
  cta_primary_button_link?: string;
}

interface SpecialProgram {
  id: number;
  title: string;
  description?: string;
  image?: string;
  is_featured: boolean;
}

// ===== HOOK SEDERHANA =====
function useProgramData(type: 'tahfidz' | 'ict') {
  const [settings, setSettings] = useState<SpecialProgramSettings | null>(null);
  const [programs, setPrograms] = useState<SpecialProgram[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        
        // Fetch complete data
        const response = await fetch(`http://api.alkapro.id/api/v1/special-programs/type/${type}/complete`);
        const result = await response.json();
        
        if (result.success) {
          setSettings(result.data.settings);
          setPrograms(result.data.programs || []);
        } else {
          setError('Gagal mengambil data');
        }
      } catch (err) {
        setError('Terjadi kesalahan');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [type]);

  return { settings, programs, loading, error };
}

// ===== KOMPONEN UTAMA - SEMUA DALAM SATU FILE =====
export default function ProgramPage() {
  // 🔥 UBAH INI: Ganti 'tahfidz' dengan 'ict' untuk halaman ICT
  const { settings, programs, loading, error } = useProgramData('tahfidz');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !settings) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Oops! Terjadi Kesalahan</h1>
          <p className="text-gray-600">{error || 'Data tidak ditemukan'}</p>
        </div>
      </div>
    );
  }

  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 text-blue-800',
    green: 'bg-green-50 border-green-200 text-green-800',
    purple: 'bg-purple-50 border-purple-200 text-purple-800',
    orange: 'bg-orange-50 border-orange-200 text-orange-800',
    red: 'bg-red-50 border-red-200 text-red-800',
    emerald: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  };

  return (
    <main>
      {/* ===== HERO SECTION ===== */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {settings.hero_desktop_image && (
          <>
            <Image
              src={settings.hero_desktop_image}
              alt={settings.title}
              fill
              className="object-cover hidden md:block"
              priority
            />
            {settings.hero_mobile_image && (
              <Image
                src={settings.hero_mobile_image}
                alt={settings.title}
                fill
                className="object-cover md:hidden"
                priority
              />
            )}
          </>
        )}
        
        <div className="absolute inset-0 bg-black/50" />
        
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

      {/* ===== INTRO SECTION ===== */}
      {(settings.intro_main_title || settings.intro_description) && (
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
      )}

      {/* ===== KEY POINTS SECTION ===== */}
      {settings.key_points && settings.key_points.length > 0 && (
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
      )}

      {/* ===== PROGRAMS LIST ===== */}
      {programs.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Daftar Program
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
      )}

      {/* ===== GALLERY SECTION ===== */}
      {settings.gallery_images && settings.gallery_images.length > 0 && (
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
      )}

      {/* ===== CTA SECTION ===== */}
      {(settings.cta_title || settings.cta_description) && (
        <section className="relative py-20 px-4 overflow-hidden">
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
            
            {settings.cta_primary_button_text && settings.cta_primary_button_link && (
              <a
                href={settings.cta_primary_button_link}
                className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                {settings.cta_primary_button_text}
              </a>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
```

### 🎯 React Template (Tanpa Next.js)

```jsx
// File: src/pages/ProgramTahfidz.jsx atau src/pages/ProgramICT.jsx

import React, { useState, useEffect } from 'react';

// ===== HOOK SEDERHANA =====
function useProgramData(type) {
  const [settings, setSettings] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(`http://api.alkapro.id/api/v1/special-programs/type/${type}/complete`);
        const result = await response.json();
        
        if (result.success) {
          setSettings(result.data.settings);
          setPrograms(result.data.programs || []);
        } else {
          setError('Gagal mengambil data');
        }
      } catch (err) {
        setError('Terjadi kesalahan');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [type]);

  return { settings, programs, loading, error };
}

// ===== KOMPONEN UTAMA =====
function ProgramTahfidz() {
  // 🔥 UBAH INI: Ganti 'tahfidz' dengan 'ict' untuk halaman ICT
  const { settings, programs, loading, error } = useProgramData('tahfidz');

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div>Loading...</div>
      </div>
    );
  }

  if (error || !settings) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div>Error: {error || 'Data tidak ditemukan'}</div>
      </div>
    );
  }

  return (
    <main>
      {/* HERO SECTION */}
      <section style={{
        height: '100vh',
        backgroundImage: settings.hero_desktop_image ? `url(${settings.hero_desktop_image})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        backgroundSize: 'cover',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center'
      }}>
        <div>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>
            {settings.title}
          </h1>
          {settings.subtitle && (
            <p style={{ fontSize: '20px' }}>{settings.subtitle}</p>
          )}
        </div>
      </section>

      {/* INTRO SECTION */}
      {settings.intro_main_title && (
        <section style={{ padding: '64px 16px', textAlign: 'center' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {settings.intro_badge_text && (
              <span style={{
                display: 'inline-block',
                padding: '8px 16px',
                backgroundColor: '#dbeafe',
                color: '#1e40af',
                borderRadius: '20px',
                marginBottom: '24px'
              }}>
                {settings.intro_badge_text}
              </span>
            )}
            <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '16px' }}>
              {settings.intro_main_title}
            </h2>
            {settings.intro_description && (
              <p style={{ fontSize: '18px', color: '#666' }}>
                {settings.intro_description}
              </p>
            )}
          </div>
        </section>
      )}

      {/* KEY POINTS SECTION */}
      {settings.key_points && settings.key_points.length > 0 && (
        <section style={{ padding: '64px 16px', backgroundColor: '#f9fafb' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 'bold', textAlign: 'center', marginBottom: '48px' }}>
              Keunggulan Program
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px'
            }}>
              {settings.key_points.map((point, index) => (
                <div key={index} style={{
                  padding: '24px',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                  <h3 style={{ fontWeight: 'bold', marginBottom: '12px' }}>
                    {point.title}
                  </h3>
                  <p style={{ color: '#666' }}>
                    {point.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PROGRAMS LIST */}
      {programs.length > 0 && (
        <section style={{ padding: '64px 16px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 'bold', textAlign: 'center', marginBottom: '48px' }}>
              Daftar Program
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '32px'
            }}>
              {programs.map((program) => (
                <div key={program.id} style={{
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  overflow: 'hidden'
                }}>
                  {program.image && (
                    <img
                      src={program.image}
                      alt={program.title}
                      style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                    />
                  )}
                  <div style={{ padding: '24px' }}>
                    <h3 style={{ fontWeight: 'bold', fontSize: '20px', marginBottom: '12px' }}>
                      {program.title}
                    </h3>
                    {program.description && (
                      <p style={{ color: '#666' }}>{program.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* GALLERY SECTION */}
      {settings.gallery_images && settings.gallery_images.length > 0 && (
        <section style={{ padding: '64px 16px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 'bold', textAlign: 'center', marginBottom: '48px' }}>
              Galeri Program
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px'
            }}>
              {settings.gallery_images.map((item, index) => (
                <div key={index}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '16px' }}
                  />
                  <h3 style={{ fontWeight: 'bold', marginBottom: '8px' }}>{item.title}</h3>
                  <p style={{ color: '#666' }}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA SECTION */}
      {settings.cta_title && (
        <section style={{
          padding: '80px 16px',
          backgroundImage: settings.cta_background_image ? `url(${settings.cta_background_image})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          backgroundSize: 'cover',
          color: 'white',
          textAlign: 'center'
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '24px' }}>
              {settings.cta_title}
            </h2>
            {settings.cta_description && (
              <p style={{ fontSize: '18px', marginBottom: '32px' }}>
                {settings.cta_description}
              </p>
            )}
            {settings.cta_primary_button_text && settings.cta_primary_button_link && (
              <a
                href={settings.cta_primary_button_link}
                style={{
                  display: 'inline-block',
                  padding: '12px 32px',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  fontWeight: 'bold'
                }}
              >
                {settings.cta_primary_button_text}
              </a>
            )}
          </div>
        </section>
      )}
    </main>
  );
}

export default ProgramTahfidz;
```

---

## 🔗 API Endpoints

### Base URL
```
http://api.alkapro.id/api/v1
```

### Endpoints

#### 1. **Complete Data (Recommended)**
```http
GET /special-programs/type/{type}/complete
```
- `{type}`: `tahfidz` atau `ict`
- **Response**: Settings + Programs dalam 1 request

#### 2. **Settings Only**
```http
GET /special-programs/type/{type}/settings
```

#### 3. **All Programs**
```http
GET /special-programs
```

---

## 📊 Struktur Data

### Response Format
```json
{
  "success": true,
  "data": {
    "settings": {
      "id": 1,
      "type": "tahfidz",
      "title": "Program Tahfidz",
      "subtitle": "Hafalan Al-Quran Terbaik",
      "hero_desktop_image": "http://api.alkapro.id/storage/...",
      "hero_mobile_image": "http://api.alkapro.id/storage/...",
      "intro_badge_text": "Program Unggulan",
      "intro_main_title": "Tahfidz Al-Quran",
      "intro_description": "Program hafalan Al-Quran...",
      "key_points": [
        {
          "title": "Metode Terbukti",
          "description": "Menggunakan metode...",
          "color": "blue"
        }
      ],
      "gallery_images": [
        {
          "image": "http://api.alkapro.id/storage/...",
          "title": "Kegiatan Tahfidz",
          "description": "Suasana belajar..."
        }
      ],
      "cta_background_image": "http://api.alkapro.id/storage/...",
      "cta_title": "Bergabung Sekarang",
      "cta_description": "Daftar program tahfidz...",
      "cta_primary_button_text": "Daftar Sekarang",
      "cta_primary_button_link": "/daftar"
    },
    "programs": [
      {
        "id": 1,
        "title": "Tahfidz Dasar",
        "description": "Program untuk pemula...",
        "image": "http://api.alkapro.id/storage/...",
        "is_featured": true
      }
    ]
  }
}
```

### Key Points Colors
- `blue` - Biru
- `green` - Hijau
- `purple` - Ungu
- `orange` - Orange
- `red` - Merah
- `emerald` - Hijau Emerald

---

## 🎨 Customization

### Ubah Styling (Tailwind CSS)
```typescript
// Ubah warna tema
<div className="bg-blue-50"> // → bg-red-50

// Ubah ukuran font
<h1 className="text-4xl"> // → text-6xl

// Ubah spacing
<section className="py-16"> // → py-20

// Ubah grid columns
<div className="grid lg:grid-cols-3"> // → lg:grid-cols-4
```

### Ubah Styling (Inline CSS)
```jsx
// Ubah warna background
style={{ backgroundColor: '#f3f4f6' }} // → '#fef2f2'

// Ubah ukuran font
style={{ fontSize: '32px' }} // → '40px'

// Ubah spacing
style={{ padding: '64px 16px' }} // → '80px 16px'
```

### Tambah Section Baru
```typescript
// Tambah di dalam return statement
<main>
  {/* Existing sections */}
  
  {/* Section baru */}
  <section className="py-16 px-4">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-6">Section Baru</h2>
      <p>Konten section baru...</p>
    </div>
  </section>
</main>
```

---

## 🚨 Troubleshooting

### ❌ Error: CORS
**Solusi:**
```bash
# Pastikan backend berjalan
php artisan serve

# Cek di browser:
http://api.alkapro.id/api/v1/special-programs/type/tahfidz/complete
```

### ❌ Data Tidak Muncul
**Solusi:**
1. Cek admin panel: `http://api.alkapro.id/admin/special-program-type-settings`
2. Pastikan data Tahfidz/ICT sudah ada
3. Pastikan `is_active = true`
4. Pastikan ada gambar yang diupload

### ❌ Gambar Tidak Muncul
**Solusi:**
```bash
# Cek storage link
php artisan storage:link

# Cek permission folder storage
chmod -R 755 storage/
```

### ❌ Styling Berantakan
**Next.js:**
```bash
# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**React:**
- Gunakan template `REACT_SIMPLE_EXAMPLE.jsx` (styling inline)

### ❌ Hook Error
**Solusi:**
```typescript
// Pastikan useEffect dependency benar
useEffect(() => {
  fetchData();
}, [type]); // ← Jangan lupa dependency
```

---

## 📞 FAQ

### Q: Apakah perlu buat hook terpisah?
**A:** Tidak! Hook `useProgramData` sudah ada di dalam file template.

### Q: Apakah perlu buat komponen terpisah?
**A:** Tidak! Semua section sudah ada dalam satu komponen.

### Q: Bagaimana kalau mau custom styling?
**A:** Tinggal ubah class Tailwind CSS atau inline style di file tersebut.

### Q: Bagaimana kalau mau tambah section?
**A:** Tinggal tambah JSX di dalam return statement.

### Q: Apakah bisa pakai framework CSS lain?
**A:** Ya! Ubah class Tailwind dengan class framework CSS pilihan Anda.

### Q: Bagaimana setup routing untuk React?
**A:**
```jsx
// App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProgramTahfidz from './pages/ProgramTahfidz';
import ProgramICT from './pages/ProgramICT';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/program-khusus/tahfidz" element={<ProgramTahfidz />} />
        <Route path="/program-khusus/ict" element={<ProgramICT />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### Q: Bagaimana kalau API berubah?
**A:** Tinggal ubah URL di function `fetchData` dalam hook.

### Q: Apakah responsive?
**A:** Ya! Template sudah responsive untuk mobile, tablet, dan desktop.

### Q: Bagaimana kalau mau SEO?
**A:** Tambah meta tags di head atau gunakan Next.js Head component.

---

## 📋 Checklist Implementasi

### ✅ Persiapan
- [ ] Backend berjalan di `http://api.alkapro.id`
- [ ] Data Tahfidz/ICT sudah ada di admin panel
- [ ] Storage link sudah dibuat (`php artisan storage:link`)

### ✅ Next.js
- [ ] Copy `SIMPLE_FRONTEND_EXAMPLE.tsx` ke `app/program-khusus/tahfidz/page.tsx`
- [ ] Copy `SIMPLE_FRONTEND_EXAMPLE.tsx` ke `app/program-khusus/ict/page.tsx`
- [ ] Ubah `useProgramData('tahfidz')` → `useProgramData('ict')` di file ICT
- [ ] Setup `.env.local` dengan `NEXT_PUBLIC_API_URL`
- [ ] Install dependencies: `npm install next`
- [ ] Setup Tailwind CSS (optional)

### ✅ React
- [ ] Copy `REACT_SIMPLE_EXAMPLE.jsx` ke `src/pages/ProgramTahfidz.jsx`
- [ ] Copy `REACT_SIMPLE_EXAMPLE.jsx` ke `src/pages/ProgramICT.jsx`
- [ ] Ubah `useProgramData('tahfidz')` → `useProgramData('ict')` di file ICT
- [ ] Setup `.env` dengan `REACT_APP_API_URL`
- [ ] Install dependencies: `npm install react react-dom react-router-dom`
- [ ] Setup routing di `App.js`

### ✅ Testing
- [ ] Akses `/program-khusus/tahfidz`
- [ ] Akses `/program-khusus/ict`
- [ ] Cek responsive di mobile
- [ ] Cek semua section muncul
- [ ] Cek gambar loading
- [ ] Cek error handling

### ✅ Customization (Optional)
- [ ] Ubah styling sesuai design system
- [ ] Tambah animasi
- [ ] Tambah meta tags untuk SEO
- [ ] Tambah Google Analytics
- [ ] Optimasi performance

---

## 🎯 Kesimpulan

**Frontend developer tinggal:**
1. ✅ Copy 1 file template
2. ✅ Paste ke 2 halaman
3. ✅ Ubah 1 baris untuk tipe program
4. ✅ Setup environment
5. ✅ Jalankan!

**Tidak perlu ribet buat file banyak-banyak!** 🚀

---

**📞 Butuh bantuan?** Semua kode sudah production-ready dan well-documented! 💪