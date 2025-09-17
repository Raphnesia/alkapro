# Navigation API - Quick Setup Guide

## 🚀 Setup Cepat dalam 5 Menit

### 1. Setup Environment Variables
```bash
# Copy file environment
cp env.example .env.local

# Edit .env.local dan set API URL
NEXT_PUBLIC_API_BASE_URL=http://api.alkapro.id/api
```

### 2. Pastikan Backend Berjalan
```bash
# Backend harus berjalan di port 8000
# Endpoint yang diperlukan:
# - GET /api/v1/navigation/header
# - GET /api/v1/navigation/footer
```

### 3. Test Implementasi
```bash
# Jalankan development server
npm run dev

# Buka halaman test
http://localhost:3000/test-navigation
```

## ✅ Fitur yang Sudah Siap

### Header Component
- ✅ Logo dinamis dari API
- ✅ Menu navigation dinamis
- ✅ Dropdown menu support
- ✅ Fallback ke data statis
- ✅ Layout tidak berubah

### Footer Component
- ✅ Link dinamis per kategori
- ✅ Brand footer (text/image)
- ✅ 4 kategori link
- ✅ Fallback ke data statis
- ✅ Layout tidak berubah

## 🔧 Struktur File

```
src/
├── services/
│   └── navigationService.ts    # API service
├── hooks/
│   └── useNavigation.ts        # Custom hooks
├── components/
│   ├── Header.tsx              # Header dengan API
│   └── Footer.tsx              # Footer dengan API
└── app/
    └── test-navigation/        # Halaman test
        └── page.tsx
```

## 📱 Dashboard Admin

### Navbar/Header Management
- Tambah/edit/hapus menu
- Set parent untuk dropdown
- Upload logo header
- Set urutan menu

### Footer Management
- Kelola link per kategori
- Set target link (_self/_blank)
- Set urutan link

### Site Branding
- Upload logo header
- Set tipe brand footer
- Upload gambar brand footer

## 🧪 Testing

### Test API Endpoints
```bash
# Test Header
curl http://api.alkapro.id/api/v1/navigation/header

# Test Footer
curl http://api.alkapro.id/api/v1/navigation/footer
```

### Test Frontend
- Buka `/test-navigation` untuk debugging
- Periksa Network tab di DevTools
- Test dengan API yang tidak tersedia

## 🚨 Troubleshooting

### Logo Tidak Muncul
```bash
# Backend
php artisan storage:link
chmod -R 775 storage
```

### API Tidak Bisa Diakses
```bash
# Periksa route
php artisan route:list | grep navigation

# Periksa log
tail -f storage/logs/laravel.log
```

### Component Error
- Periksa console browser
- Pastikan environment variables sudah diset
- Test dengan halaman `/test-navigation`

## 📋 Checklist Deployment

- [ ] Environment variables sudah diset
- [ ] Backend server berjalan
- [ ] API endpoints tersedia
- [ ] Storage link sudah dibuat
- [ ] Permission folder sudah benar
- [ ] Test di development berhasil
- [ ] Test fallback berhasil

## 🎯 Next Steps

1. **Setup Backend**: Implementasi Laravel backend dengan Filament admin
2. **Database**: Buat migration untuk navigation tables
3. **Admin Panel**: Setup Filament admin panel
4. **Content**: Tambah menu dan link melalui dashboard
5. **Testing**: Test semua fitur di production

## 📞 Support

Jika ada masalah atau pertanyaan:
1. Periksa halaman `/test-navigation`
2. Periksa console browser
3. Periksa network tab DevTools
4. Periksa backend logs
5. Buat issue di repository

---

**Status**: ✅ Implementasi Frontend Selesai
**Backend**: ⏳ Perlu setup Laravel + Filament
**Testing**: ✅ Halaman test tersedia
**Documentation**: ✅ Lengkap 