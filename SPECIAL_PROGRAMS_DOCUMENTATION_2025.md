# 📚 Dokumentasi Program Khusus - Update 2025

## 🎯 Overview

Sistem Program Khusus adalah modul yang mengelola konten program unggulan sekolah (Tahfidz dan ICT) dengan pemisahan yang jelas antara konten untuk halaman utama dan halaman detail program khusus.

## 🗂️ Struktur Database

### Tabel `special_programs`

| Field | Type | Description |
|-------|------|-------------|
| `id` | bigint | Primary key |
| `type` | enum('tahfidz', 'ict') | Jenis program |
| `display_location` | enum('home', 'program_khusus') | Lokasi tampilan |
| `title` | varchar(255) | Judul program |
| `slug` | varchar(255) | URL slug (auto-generated) |
| `description` | longtext | Konten HTML |
| `content_type` | enum('rich', 'grid') | Tipe konten |
| `grid_items` | json | Data grid (jika content_type='grid') |
| `features` | json | Array keunggulan program |
| `image` | varchar(255) | Path gambar utama |
| `order_index` | int | Urutan tampilan |
| `is_active` | boolean | Status aktif |
| `created_at` | timestamp | Waktu dibuat |
| `updated_at` | timestamp | Waktu diupdate |

### Tabel `special_program_type_settings`

Menyimpan pengaturan khusus untuk setiap tipe program (tahfidz/ict) termasuk hero section, features list, benefits, gallery, dan CTA.

### Tabel `program_special_settings`

Menyimpan pengaturan umum untuk halaman Program Khusus seperti title, subtitle, dan banner.

## 🔧 Fitur Utama

### 1. Pemisahan Konten Berdasarkan Lokasi

- **Home (`display_location='home'`)**: Konten keunggulan/highlight program untuk halaman utama
- **Program Khusus (`display_location='program_khusus'`)**: Detail lengkap program untuk halaman khusus

### 2. Field Features (Keunggulan Program)

- **Input Type**: TagsInput di admin panel
- **Storage**: JSON array di database
- **Usage**: Menampilkan poin-poin keunggulan program
- **Display**: Maksimal 2 item di tabel admin, sisanya dengan elipsis

### 3. Content Types

- **Rich Text**: Konten HTML bebas dengan editor WYSIWYG
- **Grid**: Struktur data terorganisir dengan label dan gambar

## 🌐 API Endpoints

### Base URL
```
http://api.alkapro.id/api/v1
```

### 1. List Programs
```http
GET /special-programs
GET /special-programs?type=tahfidz
GET /special-programs?type=ict
GET /special-programs?display_location=home
GET /special-programs?display_location=program_khusus
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "type": "tahfidz",
      "display_location": "home",
      "title": "MUROJAAH & ZIYADAH",
      "slug": "murojaah-ziyadah",
      "description": "<div>...</div>",
      "content_type": "rich",
      "grid_items": [],
      "features": [
        "Metode pembelajaran yang efektif",
        "Bimbingan ustadz berpengalaman",
        "Target hafalan yang terstruktur"
      ],
      "image": "http://api.alkapro.id/storage/special-programs/image.jpg",
      "order_index": 1,
      "is_active": true
    }
  ]
}
```

### 2. Single Program
```http
GET /special-programs/{slug}
```

### 3. Settings Endpoints
```http
GET /special-programs/settings
GET /special-programs/type/{type}/settings
GET /special-programs/complete
GET /special-programs/type/{type}/complete
```

## 🎨 Admin Panel

### Form Fields

1. **Tipe Program**: Dropdown (Tahfidz/ICT)
2. **Tampil di Halaman**: Dropdown (Home/Program Khusus)
3. **Judul**: Text input
4. **Tipe Konten**: Dropdown (Rich Text/Grid)
5. **Deskripsi**: Rich text editor (jika Rich Text)
6. **Grid Items**: Key-value input (jika Grid)
7. **Keunggulan Program**: Tags input
8. **Gambar Utama**: File upload
9. **Urutan**: Number input
10. **Status Aktif**: Toggle

### Table Columns

- **Tipe**: Badge dengan warna
- **Tampil di**: Badge (Home/Program Khusus)
- **Judul**: Text dengan wrap
- **Tipe Konten**: Badge
- **Keunggulan**: Maksimal 2 item + elipsis
- **Gambar**: Circular image
- **Urutan**: Number
- **Aktif**: Toggle column

### Filters

- **Tipe Program**: Tahfidz/ICT
- **Tampil di Halaman**: Home/Program Khusus
- **Tipe Konten**: Rich Text/Grid
- **Status Aktif**: Ya/Tidak/Semua

## 💻 Frontend Implementation

### 1. Home Page Component

```javascript
// Fetch programs for home
const homePrograms = await fetch('/api/v1/special-programs?display_location=home')
  .then(r => r.json());

// Render features
homePrograms.data.forEach(program => {
  program.features.forEach((feature, index) => {
    console.log(`${index + 1}. ${feature}`);
  });
});
```

### 2. Program Khusus Page

```javascript
// Fetch programs for detail page
const programs = await fetch('/api/v1/special-programs?display_location=program_khusus')
  .then(r => r.json());

// Render with features
programs.data.forEach(program => {
  const featuresHTML = program.features.map((feature, index) => `
    <li key="${index}" className="flex items-start">
      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-3 flex-shrink-0"></div>
      <span className="text-gray-700 text-sm">${feature}</span>
    </li>
  `).join('');
});
```

## 📊 Data Structure Examples

### Home Content (Keunggulan)

```json
{
  "id": 2,
  "type": "tahfidz",
  "display_location": "home",
  "title": "MUROJAAH & ZIYADAH",
  "description": "<div class='space-y-4'>...</div>",
  "content_type": "rich",
  "features": [
    "Metode pembelajaran yang terbukti efektif",
    "Bimbingan langsung dari ustadz berpengalaman",
    "Target hafalan yang terstruktur dan terukur",
    "Evaluasi berkala untuk memantau progress",
    "Lingkungan belajar yang kondusif"
  ],
  "order_index": 1,
  "is_active": true
}
```

### Program Detail Content

```json
{
  "id": 4,
  "type": "tahfidz",
  "display_location": "program_khusus",
  "title": "Program Tahfidz Al-Quran",
  "description": "<div>Detail lengkap program...</div>",
  "content_type": "rich",
  "features": [
    "Target hafalan 30 juz dalam 3 tahun",
    "Metode pembelajaran Qiroati dan Tilawati",
    "Bimbingan tahsin dan tajwid intensif",
    "Evaluasi hafalan setiap minggu",
    "Kompetisi tahfidz tingkat regional",
    "Sertifikat resmi setelah khatam 30 juz"
  ],
  "order_index": 10,
  "is_active": true
}
```

## 🔄 Migration History

### 2025-01-15: Add display_location field
- Menambahkan field `display_location` untuk memisahkan konten home dan program khusus
- Menggantikan sistem `order_index` untuk lokasi tampilan

### 2025-01-15: Add features field
- Menambahkan field `features` sebagai JSON array
- Memungkinkan admin menambahkan keunggulan program dengan mudah

## 🎯 Best Practices

### Untuk Admin

1. **Konten Home**:
   - Pilih "Home" di dropdown "Tampil di Halaman"
   - Fokus pada keunggulan dan highlight
   - Gunakan 3-5 features yang menarik
   - Konten lebih ringkas dan eye-catching

2. **Konten Program Khusus**:
   - Pilih "Program Khusus" di dropdown "Tampil di Halaman"
   - Berikan detail lengkap program
   - Gunakan 5-8 features yang komprehensif
   - Sertakan kurikulum dan target pembelajaran

### Untuk Developer

1. **API Usage**:
   - Selalu gunakan filter `display_location` untuk konten yang tepat
   - Implementasikan error handling untuk API calls
   - Cache data jika diperlukan untuk performa

2. **Frontend Rendering**:
   - Render features sebagai list dengan styling yang konsisten
   - Implementasikan loading states
   - Handle empty states dengan graceful

## 🚀 Performance Considerations

1. **Database Indexing**:
   - Index pada `display_location` untuk query yang cepat
   - Index pada `type` dan `is_active`

2. **API Optimization**:
   - Gunakan filter yang spesifik untuk mengurangi data transfer
   - Implementasikan pagination jika data bertambah banyak

3. **Frontend Caching**:
   - Cache API responses di browser
   - Implementasikan stale-while-revalidate strategy

## 🔧 Troubleshooting

### Program tidak muncul di home
1. Periksa `display_location` = 'home'
2. Pastikan `is_active` = true
3. Clear cache: `php artisan cache:clear`
4. Periksa API endpoint: `/api/v1/special-programs?display_location=home`

### Features tidak tampil
1. Pastikan field `features` tidak null
2. Periksa format JSON array yang valid
3. Verifikasi frontend mengakses `program.features`

### Error di admin panel
1. Periksa permissions Filament
2. Clear cache dan config: `php artisan optimize:clear`
3. Periksa log error di `storage/logs/laravel.log`

## 📝 Changelog

### Version 2.0 (2025-01-15)
- ✅ Added `display_location` field for content separation
- ✅ Added `features` field with TagsInput interface
- ✅ Improved admin panel with better filters and columns
- ✅ Enhanced API with display_location filter support
- ✅ Updated documentation with comprehensive examples

### Version 1.0 (Previous)
- ✅ Basic special programs CRUD
- ✅ Type-based filtering (tahfidz/ict)
- ✅ Rich text and grid content types
- ✅ Image upload functionality

---

**📞 Support**: Jika ada pertanyaan atau masalah, silakan hubungi tim development atau buat issue di repository.

**🔄 Last Updated**: 15 Januari 2025
**📋 Version**: 2.0
**👨‍💻 Maintainer**: Development Team