# Quick Setup - Integrasi Pimpinan SMP

## Langkah Cepat Setup

### 1. Environment Setup
```bash
# Buat file .env.local di root project
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_API_BASE_URL=http://api.alkapro.id/api/v1
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Pastikan Backend API Berjalan
```bash
# Di folder backend Laravel
php artisan serve --port=8000
```

## Testing

### 1. Test API Endpoints
```bash
# Test complete data
curl http://api.alkapro.id/api/v1/pimpinan-smp/complete

# Test settings
curl http://api.alkapro.id/api/v1/pimpinan-smp/settings

# Test pimpinan data
curl http://api.alkapro.id/api/v1/pimpinan-smp
```

### 2. Test Frontend
- Buka http://localhost:3000/profil/pimpinansmp
- Cek apakah data loading dengan benar
- Test responsive design di mobile dan desktop

## Troubleshooting Cepat

### API Tidak Terhubung
```bash
# Cek apakah backend berjalan
curl http://api.alkapro.id/api/v1/pimpinan-smp/complete

# Jika error, restart backend
php artisan serve --port=8000
```

### Data Tidak Muncul
- Cek browser console untuk error
- Pastikan ada data di database
- Clear cache: `php artisan cache:clear`

### Image Tidak Loading
```bash
# Buat storage link
php artisan storage:link

# Cek permission
chmod -R 775 storage/
```

## File Structure yang Dibuat

```
src/
├── services/
│   └── pimpinanSMPService.ts
├── hooks/
│   └── usePimpinanSMP.ts
├── components/
│   ├── PimpinanSMPCard.tsx
│   ├── PimpinanSMPBoxes.tsx
│   ├── PimpinanSMPLoading.tsx
│   └── ErrorMessage.tsx
├── lib/
│   └── config.ts
└── app/profil/pimpinansmp/
    └── page.tsx
```

## Admin Panel Setup

### 1. Akses Admin Panel
- URL: http://api.alkapro.id/admin
- Login dengan credentials yang sudah dibuat

### 2. Kelola Data
- **Pimpinan SMP**: `/admin/pimpinan-s-m-p-s`
- **Box Keunggulan**: `/admin/pimpinan-s-m-p-boxes`
- **Pengaturan**: `/admin/pimpinan-s-m-p-settings`

### 3. Upload Images
- Pastikan folder `storage/app/public/` writable
- Upload images melalui admin panel
- Images akan otomatis tersimpan di `storage/app/public/`

## Contoh Data Test

### 1. Settings
```json
{
  "title": "Pimpinan SMP Muhammadiyah Al Kautsar PK Kartasura",
  "subtitle": "Kepemimpinan yang visioner dan berpengalaman dalam mengembangkan pendidikan berkualitas dengan nilai-nilai Islami.",
  "keunggulan_title": "Keunggulan Kepemimpinan SMP Muhammadiyah Al Kautsar PK Kartasura",
  "keunggulan_subtitle": "Tim pimpinan yang handal dan berpengalaman dalam mengelola sekolah"
}
```

### 2. Pimpinan SMP
```json
{
  "name": "Muhammad Rifqi Nugroho, M.Pd.",
  "position": "Kepala Sekolah SMP Muhammadiyah Al Kautsar PK Kartasura",
  "type": "Kepala Sekolah",
  "bio": "Kepala Sekolah yang visioner dan berpengalaman dalam mengembangkan pendidikan berkualitas.",
  "education": "S2 Pendidikan",
  "experience": "Lebih dari 10 tahun pengalaman dalam manajemen pendidikan",
  "order_index": 1
}
```

### 3. Box Keunggulan
```json
{
  "title": "Kepemimpinan Visioner",
  "description": "Memiliki visi jangka panjang untuk mengembangkan sekolah menjadi institusi pendidikan terdepan.",
  "icon": "👨‍💼",
  "background_color": "green-600",
  "order_index": 1
}
```

## Deployment Checklist

### 1. Production Environment
```env
NEXT_PUBLIC_API_BASE_URL=https://your-domain.com/api/v1
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### 2. Build & Deploy
```bash
npm run build
npm start
```

### 3. Backend Deployment
```bash
# Set production environment
APP_ENV=production
APP_DEBUG=false

# Clear cache
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

## Support

Jika mengalami masalah:
1. Cek dokumentasi lengkap di `PIMPINAN_SMP_API_INTEGRATION.md`
2. Cek browser console untuk error details
3. Verifikasi API endpoints dengan Postman/curl
4. Cek database connection dan data 