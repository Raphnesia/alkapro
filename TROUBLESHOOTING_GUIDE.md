# Troubleshooting Guide - Data Guru Tidak Muncul

## 🚨 Masalah: Data Guru Tidak Muncul

Jika data guru tidak muncul di halaman, berikut adalah langkah-langkah troubleshooting:

## 🔍 **Diagnosis Masalah**

### 1. **Cek Console Browser**
Buka Developer Tools (F12) dan lihat di tab Console:
```javascript
// Error yang mungkin muncul:
// - "Failed to fetch teachers data"
// - "API Error: ..."
// - "Using fallback data for testing..."
```

### 2. **Cek Network Tab**
Di Developer Tools → Network tab:
- Lihat apakah ada request ke `/api/v1/teachers/by-subject`
- Cek status response (200, 404, 500, dll)

### 3. **Cek Environment Variables**
Pastikan file `.env.local` sudah dibuat:
```env
NEXT_PUBLIC_API_URL=http://api.alkapro.id/api/v1
```

## ✅ **Solusi Step by Step**

### **Step 1: Pastikan Backend Berjalan**
```bash
# Di folder backend Laravel
php artisan serve
# Pastikan berjalan di http://api.alkapro.id
```

### **Step 2: Test API Endpoint**
```bash
# Test dengan curl atau browser
curl http://api.alkapro.id/api/v1/teachers/by-subject
```

### **Step 3: Cek CORS Configuration**
Di `config/cors.php` backend Laravel:
```php
return [
    'paths' => ['api/*'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:3000'],
    'allowed_headers' => ['*'],
];
```

### **Step 4: Cek Database Data**
Pastikan ada data guru di database:
```sql
SELECT * FROM teachers WHERE is_active = 1;
```

## 🛠️ **Fallback Solution**

Jika backend belum siap, sistem akan menggunakan **fallback data**:

### **Data Sample yang Tersedia**
- **Syaifullah, S.Pd.** - Guru Mapel IPA & Informatika
- **Adira Bintang Permana, S.Pd.** - Guru Mapel Informatika
- **Dr. Ahmad Susanto, M.Pd.** - Guru Matematika Senior
- **Prof. Bambang Sutrisno, M.Pd.** - Guru Bahasa Indonesia Senior

### **Cara Mengaktifkan Fallback**
Fallback otomatis aktif jika:
1. Backend tidak berjalan
2. API endpoint tidak tersedia
3. CORS error
4. Network error

## 🔧 **Manual Testing**

### **Test dengan Data Sample**
1. Buka halaman guru
2. Lihat console untuk pesan "Using fallback data"
3. Data sample akan muncul dengan mata pelajaran:
   - Informatika
   - Matematika
   - Bahasa Indonesia

### **Test API Connection**
```javascript
// Di browser console
fetch('http://api.alkapro.id/api/v1/teachers/by-subject')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error('API Error:', err))
```

## 📋 **Checklist Troubleshooting**

### **Backend Issues**
- [ ] Laravel server berjalan di port 8000
- [ ] Database terhubung dan ada data
- [ ] API routes terdaftar
- [ ] CORS dikonfigurasi dengan benar

### **Frontend Issues**
- [ ] Environment variables ter-set
- [ ] Network request tidak diblokir
- [ ] Console tidak ada error JavaScript
- [ ] Component mounting dengan benar

### **Data Issues**
- [ ] Ada data guru di database
- [ ] Field yang diperlukan terisi
- [ ] `is_active = true`
- [ ] `type = 'teacher'`

## 🎯 **Quick Fixes**

### **Fix 1: Restart Development Server**
```bash
# Stop server (Ctrl+C)
# Restart
npm run dev
```

### **Fix 2: Clear Browser Cache**
- Hard refresh (Ctrl+Shift+R)
- Clear browser cache
- Disable browser extensions

### **Fix 3: Check API URL**
```javascript
// Di browser console
console.log(process.env.NEXT_PUBLIC_API_URL)
// Should show: http://api.alkapro.id/api/v1
```

### **Fix 4: Test API Manually**
```bash
# Test dengan curl
curl -X GET http://api.alkapro.id/api/v1/teachers/by-subject \
  -H "Accept: application/json" \
  -H "Content-Type: application/json"
```

## 📊 **Expected Behavior**

### **Ketika Backend Tersedia**
- Loading spinner muncul
- Data guru dari API ditampilkan
- Subject navigation otomatis generate
- Tidak ada error di console

### **Ketika Backend Tidak Tersedia**
- Loading spinner muncul
- Error message: "Menggunakan data sample - Backend belum tersedia"
- Fallback data ditampilkan
- Console log: "Using fallback data for testing..."

## 🚀 **Production Deployment**

### **Environment Setup**
```env
# Production
NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api/v1

# Development
NEXT_PUBLIC_API_URL=http://api.alkapro.id/api/v1
```

### **CORS Configuration**
```php
// Production CORS
'allowed_origins' => [
    'https://your-frontend-domain.com',
    'http://localhost:3000'
],
```

## 📞 **Support**

Jika masalah masih berlanjut:

1. **Cek Logs**: Laravel logs dan browser console
2. **Test API**: Manual testing dengan Postman/curl
3. **Verify Data**: Pastikan data ada di database
4. **Check Network**: Firewall, proxy, DNS issues

## 🎉 **Success Indicators**

Halaman guru berfungsi dengan baik jika:
- ✅ Data guru muncul (API atau fallback)
- ✅ Subject navigation berfungsi
- ✅ Animasi smooth
- ✅ Responsive design
- ✅ Tidak ada error di console

Dengan fallback data, halaman guru akan tetap berfungsi meskipun backend belum siap! 🚀 