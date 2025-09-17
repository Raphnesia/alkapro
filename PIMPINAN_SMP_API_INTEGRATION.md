# Integrasi API Pimpinan SMP

## Overview
Dokumen ini menjelaskan integrasi halaman pimpinan SMP dengan API backend yang baru dikembangkan.

## Struktur File

### Service Layer
- `src/services/pimpinanSMPService.ts` - Service untuk mengelola data pimpinan SMP
- `src/hooks/usePimpinanSMP.ts` - Custom hooks untuk state management
- `src/lib/config.ts` - Konfigurasi environment variables

### Components
- `src/components/PimpinanSMPCard.tsx` - Komponen kartu profil pimpinan
- `src/components/PimpinanSMPBoxes.tsx` - Komponen box keunggulan
- `src/components/PimpinanSMPLoading.tsx` - Komponen loading state
- `src/components/ErrorMessage.tsx` - Komponen error handling

### Pages
- `src/app/profil/pimpinansmp/page.tsx` - Halaman utama pimpinan SMP

## Setup Environment

### 1. Environment Variables
Buat file `.env.local` di root project dengan konfigurasi berikut:

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://api.alkapro.id/api/v1

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 2. API Endpoints
Pastikan backend API berjalan di `http://api.alkapro.id` dengan endpoint berikut:

- `GET /api/v1/pimpinan-smp/complete` - Semua data lengkap
- `GET /api/v1/pimpinan-smp` - Semua pimpinan
- `GET /api/v1/pimpinan-smp/kepala-sekolah` - Kepala sekolah
- `GET /api/v1/pimpinan-smp/wakil-kepala-sekolah` - Wakil kepala sekolah
- `GET /api/v1/pimpinan-smp/type/{type}` - Pimpinan berdasarkan tipe
- `GET /api/v1/pimpinan-smp/boxes` - Box keunggulan
- `GET /api/v1/pimpinan-smp/settings` - Pengaturan halaman

## Fitur Utama

### 1. Dynamic Data Loading
- Data diambil dari API backend secara real-time
- Fallback data jika API tidak tersedia
- Loading state dan error handling

### 2. Responsive Design
- Layout yang berbeda untuk desktop dan mobile
- Optimized images dengan Next.js Image component
- Responsive typography dan spacing

### 3. Flexible Content Management
- Tipe jabatan yang fleksibel (bisa ditulis sesuai keinginan)
- Pengaturan banner desktop dan mobile
- Box keunggulan yang dapat dikustomisasi

### 4. Error Handling
- Graceful error handling dengan retry mechanism
- User-friendly error messages
- Fallback content jika data tidak tersedia

## Data Structure

### PimpinanSMP Interface
```typescript
interface PimpinanSMP {
  id: number;
  name: string;
  position: string;
  photo: string;
  bio: string;
  education: string;
  experience: string;
  type: string;
  order_index: number;
  banner_desktop: string;
  banner_mobile: string;
}
```

### PimpinanSMPBox Interface
```typescript
interface PimpinanSMPBox {
  id: number;
  title: string;
  description: string;
  icon: string;
  image: string;
  background_color: string;
  order_index: number;
}
```

### PimpinanSMPSettings Interface
```typescript
interface PimpinanSMPSettings {
  id: number;
  title: string;
  subtitle: string;
  banner_desktop: string;
  banner_mobile: string;
  keunggulan_title: string;
  keunggulan_subtitle: string;
}
```

## Usage Examples

### 1. Menggunakan Hook
```typescript
import { usePimpinanSMP } from '@/hooks/usePimpinanSMP';

function MyComponent() {
  const { 
    settings, 
    pimpinan, 
    boxes, 
    isLoading, 
    error 
  } = usePimpinanSMP();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>{settings?.title}</h1>
      {pimpinan.map(p => (
        <div key={p.id}>{p.name}</div>
      ))}
    </div>
  );
}
```

### 2. Menggunakan Service Langsung
```typescript
import { pimpinanSMPService } from '@/services/pimpinanSMPService';

async function fetchData() {
  try {
    const data = await pimpinanSMPService.getCompleteData();
    console.log('Complete data:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}
```

### 3. Filter Pimpinan berdasarkan Tipe
```typescript
import { usePimpinanSMPByType } from '@/hooks/usePimpinanSMP';

function KepalaSekolahComponent() {
  const { pimpinan, isLoading } = usePimpinanSMPByType('Kepala Sekolah');
  
  return (
    <div>
      {pimpinan.map(p => (
        <div key={p.id}>{p.name}</div>
      ))}
    </div>
  );
}
```

## Admin Panel Integration

### 1. Filament Admin Panel
- Resource: `/admin/pimpinan-s-m-p-s`
- Resource: `/admin/pimpinan-s-m-p-boxes`
- Resource: `/admin/pimpinan-s-m-p-settings`

### 2. Field Configuration
- **Jabatan**: TextInput (fleksibel, bisa ditulis sesuai keinginan)
- **Foto**: FileUpload dengan storage link
- **Banner**: FileUpload untuk desktop dan mobile
- **Order Index**: NumberInput untuk pengurutan

### 3. Contoh Jabatan yang Bisa Ditulis
- `Kepala Sekolah`
- `Wakil Kepala Sekolah Kurikulum`
- `Wakil Kepala Sekolah Kesiswaan`
- `Wakil Kepala Sekolah SDM & Humas`
- `Wakil Kepala Sekolah AIK`
- `Wakil Kepala Sekolah Sarana Prasarana`
- `Kepala Bagian Akademik`
- `Kepala Bagian Administrasi`

## Troubleshooting

### 1. API Connection Error
- Pastikan backend Laravel berjalan di port 8000
- Cek koneksi database
- Verifikasi CORS configuration

### 2. Image Not Loading
- Pastikan storage link sudah dibuat: `php artisan storage:link`
- Cek permission folder storage
- Verifikasi URL gambar di database

### 3. Data Not Updating
- Clear cache: `php artisan cache:clear`
- Restart development server
- Cek browser cache

### 4. TypeScript Errors
- Install dependencies: `npm install`
- Restart TypeScript server
- Cek import paths

## Performance Optimization

### 1. Image Optimization
- Gunakan Next.js Image component
- Implement lazy loading
- Optimize image sizes

### 2. Data Fetching
- Implement caching dengan React Query (opsional)
- Use Suspense boundaries
- Optimize bundle size

### 3. SEO
- Add meta tags
- Implement structured data
- Optimize for Core Web Vitals

## Future Enhancements

### 1. Advanced Features
- Search functionality
- Filter by department
- Pagination untuk banyak data
- Export to PDF

### 2. UI/UX Improvements
- Animation transitions
- Interactive elements
- Dark mode support
- Accessibility improvements

### 3. Performance
- Server-side rendering
- Static generation
- CDN integration
- Progressive Web App features 