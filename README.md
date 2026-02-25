# School Website - Next.js + Laravel Integration

Website sekolah modern dengan Next.js frontend (Vercel) dan Laravel backend (shared hosting) menggunakan Filament untuk CRUD operations.

## 📁 Struktur Project

```
school-website/
├── src/                          # Next.js Frontend
│   ├── app/                     # App Router
│   ├── components/              # Reusable components
│   └── lib/                     # API & utilities
├── laravel-backend/             # Laravel Backend
│   ├── app/                     # Laravel app structure
│   ├── database/                # Migrations & seeders
│   └── routes/                  # API routes
├── NEXTJS_SETUP.md              # Setup guide untuk Next.js
├── laravel-backend/SETUP.md     # Setup guide untuk Laravel
└── README.md                    # File ini
```

## 🚀 Quick Start

### 1. Setup Laravel Backend

```bash
# Masuk ke folder backend
cd laravel-backend

# Install dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Setup database di .env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password

# Jalankan migrations
php artisan migrate

# Jalankan storage link
php artisan storage:link

# Jalankan server development
php artisan serve
```

### 2. Setup Next.js Frontend

```bash
# Di root project
npm install

# Copy environment file
cp env.example .env.local

# Edit .env.local dengan URL backend Anda
NEXT_PUBLIC_API_BASE_URL=https://api.alkapro.id/api
NEXT_PUBLIC_USE_PROXY=true

# Jalankan development server
npm run dev
```

### 3. Test Koneksi

Buka `http://localhost:3000/test-connection` untuk memverifikasi koneksi antara frontend dan backend.

## 📋 Fitur yang Tersedia

### ✅ CRUD Operations
- **Home Sections**: Reorder dan edit konten homepage
- **Teachers/Staff**: Manage guru dan tenaga kependidikan
- **News & Articles**: Create, edit, delete berita dan artikel
- **Profile Sections**: Manage sub-section di halaman profil
- **Facilities**: Manage fasilitas sekolah
- **School Activities**: Manage kegiatan sekolah
- **Links**: Manage link sosial media dan quick links

### 🎨 Layout Configuration
- **site-config.ts**: File konfigurasi terpusus untuk semua layout
- **Responsive design** untuk mobile dan desktop
- **SEO optimization** dengan meta tags
- **Image optimization** dengan Next.js Image component

## 🔗 API Endpoints

### Laravel Backend Routes

| Endpoint | Description |
|----------|-------------|
| `GET /api/v1/navigation/header` | Navigation header dengan menu dan branding |
| `GET /api/v1/home-sections` | Semua home sections |
| `GET /api/v1/teachers` | Semua guru aktif |
| `GET /api/v1/staff` | Semua staff aktif |
| `GET /api/v1/posts` | Semua posts published |
| `GET /api/v1/news` | Berita sekolah |
| `GET /api/v1/articles` | Artikel sekolah |
| `GET /api/v1/profile-sections` | Profile sections |
| `GET /api/v1/facilities` | Fasilitas sekolah |
| `GET /api/v1/activities` | Kegiatan sekolah |
| `GET /api/v1/links` | Semua links |

## 🛠️ Development Tools

### Laravel Backend
- **Filament Admin**: `/admin` (default login: admin@admin.com / password)
- **API Documentation**: Auto-generated di `/api/docs`
- **Database**: MySQL dengan migrations

### Next.js Frontend
- **Hot Reload**: Auto refresh saat development
- **TypeScript**: Full type safety
- **Tailwind CSS**: Utility-first styling
- **Image Optimization**: Automatic optimization
- **CORS Proxy**: Built-in proxy untuk menghindari CORS issues

## 📊 Testing Checklist

### ✅ Backend Testing
- [ ] Laravel server berjalan di `api.alkapro.id`
- [ ] Database migrations berhasil
- [ ] Filament admin accessible di `/admin`
- [ ] API endpoints responsive
- [ ] File upload berfungsi

### ✅ Frontend Testing
- [ ] Next.js server berjalan di `localhost:3000`
- [ ] Test connection page menunjukkan "All Connected"
- [ ] Images loading dari backend
- [ ] Navigation berfungsi
- [ ] Responsive design berfungsi

### ✅ Integration Testing
- [ ] API calls dari frontend ke backend berhasil
- [ ] CORS proxy berfungsi
- [ ] Image URLs berfungsi
- [ ] Data fetching berhasil

## 🚀 Deployment

### Laravel Backend (Shared Hosting)
1. Upload folder `laravel-backend` ke hosting
2. Setup database di hosting
3. Update `.env` dengan production values
4. Jalankan `composer install --optimize-autoloader --no-dev`
5. Jalankan `php artisan migrate`
6. Setup cron jobs untuk Laravel scheduler

### Next.js Frontend (Vercel) - Domain: alkapro.id

#### 1. Setup Domain di Vercel
```bash
# Deploy ke Vercel
vercel --prod

# Atau push ke GitHub dan import di Vercel dashboard
git push origin main
```

#### 2. Environment Variables di Vercel
```bash
NEXT_PUBLIC_API_BASE_URL=https://api.alkapro.id/api
NEXT_PUBLIC_USE_PROXY=true
NEXT_PUBLIC_SITE_URL=https://alkapro.id
```

#### 3. Domain Configuration
- **Frontend**: `alkapro.id` (Vercel)
- **API**: `api.alkapro.id` (Hosting)
- **CORS Proxy**: `/api/proxy` (Next.js)

#### 4. DNS Records
```
A Record: alkapro.id → Vercel IP
CNAME: www.alkapro.id → alkapro.id
A Record: api.alkapro.id → Hosting IP
```

#### 5. CORS Proxy Setup
Semua API calls akan melalui `/api/proxy` untuk menghindari CORS issues:
```typescript
// ❌ Sebelum (bisa error CORS)
fetch('https://api.alkapro.id/api/v1/navigation/header')

// ✅ Sesudah (aman dari CORS)
fetch('/api/proxy/v1/navigation/header')
```

## 🐛 Troubleshooting

### Common Issues

**CORS Error:**
- Gunakan CORS proxy dengan `NEXT_PUBLIC_USE_PROXY=true`
- Check `src/app/api/proxy/[...path]/route.ts`

**Image Not Loading:**
- Jalankan `php artisan storage:link`
- Check `APP_URL` di `.env`

**Database Connection:**
- Check database credentials
- Pastikan MySQL service running

**API 404 Error:**
- Check `NEXT_PUBLIC_API_BASE_URL` di environment
- Pastikan Laravel server running

**Vercel Deploy Error:**
- Check `vercel.json` configuration
- Pastikan environment variables terisi di Vercel dashboard

## 📞 Support

Untuk pertanyaan atau masalah:
1. Check file `SETUP.md` untuk detail setup
2. Gunakan halaman test connection
3. Check browser console untuk error messages
4. Pastikan semua environment variables terisi

## 📝 Catatan Penting

- **Backend URL**: Sesuaikan dengan environment (local/production)
- **Image Storage**: Gunakan `storage/app/public` untuk file uploads
- **Security**: Jangan commit file `.env` atau `.env.local`
- **Performance**: Aktifkan caching di production
- **CORS**: Gunakan built-in proxy untuk production

---

**Created with ❤️ for Islamic School Website**
# websitealkautsar
