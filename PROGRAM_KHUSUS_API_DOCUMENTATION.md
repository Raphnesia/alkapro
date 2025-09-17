# 📘 API Documentation - Program Khusus

## Base URL
```
http://api.alkapro.id/api/v1
```

## Endpoints

### 1) List semua program khusus
```http
GET /special-programs
```

**Query Parameters:**
- `type` (optional): Filter berdasarkan tipe program (`tahfidz` atau `ict`)
- `display_location` (optional): Filter berdasarkan lokasi tampilan (`home` atau `program_khusus`)

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
      "description": "<div>Program tahfidz dengan metode pembelajaran yang efektif...</div>",
      "content_type": "rich",
      "grid_items": [],
      "features": [
        "Metode pembelajaran yang efektif",
        "Bimbingan ustadz berpengalaman",
        "Target hafalan yang terstruktur"
      ],
      "image": "http://api.alkapro.id/storage/special-programs/thumb.jpg",
      "order_index": 1,
      "is_active": true
    }
  ]
}
```

### 2) Detail program per slug
```http
GET /special-programs/tahfidz-intensif
```
```json
{
  "success": true,
  "data": {
    "id": 1,
    "type": "tahfidz",
    "title": "Tahfidz Intensif",
    "slug": "tahfidz-intensif",
    "description": "<p>Program tahfidz ...</p>",
    "content_type": "rich",
    "grid_items": [],
    "image": "http://api.alkapro.id/storage/special-programs/thumb.jpg",
    "order_index": 1,
    "is_active": true
  }
}
```

### 3) Settings umum Program Khusus
```http
GET /special-programs/settings
```
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Program Khusus",
    "subtitle": "Tahfidz & ICT",
    "banner_desktop": "http://api.alkapro.id/storage/program-khusus/banners/desktop.jpg",
    "banner_mobile": "http://api.alkapro.id/storage/program-khusus/banners/mobile.jpg"
  }
}
```

### 4) Settings per tipe (tahfidz/ict)
```http
GET /special-programs/type/tahfidz/settings
```
```json
{
  "success": true,
  "data": {
    "id": 2,
    "type": "tahfidz",
    "title": "Program Tahfidz Al-Quran",
    "subtitle": "Hafalan Al-Quran dengan metode yang terstruktur",
    "banner_desktop": "http://api.alkapro.id/storage/program-khusus/banners/tahfidz-desktop.jpg",
    "banner_mobile": "http://api.alkapro.id/storage/program-khusus/banners/tahfidz-mobile.jpg",
    "hero_desktop_image": "http://api.alkapro.id/storage/program-khusus/hero/tahfidz-hero-desktop.jpg",
    "hero_mobile_image": "http://api.alkapro.id/storage/program-khusus/hero/tahfidz-hero-mobile.jpg",
    "intro_badge_text": "Program Unggulan",
    "intro_main_title": "Tahfidz Al-Quran Terpadu",
    "intro_description": "Program hafalan Al-Quran dengan metode pembelajaran yang terbukti efektif dan bimbingan ustadz berpengalaman.",
    "featured_image": "http://api.alkapro.id/storage/program-khusus/featured/tahfidz-featured.jpg",
    "featured_image_title": "Lingkungan Belajar Kondusif",
    "featured_image_description": "Fasilitas modern dan suasana Islami yang mendukung proses hafalan Al-Quran.",
    "key_points": [
      "Target hafalan 30 juz dalam 3 tahun",
      "Metode pembelajaran Qiroati dan Tilawati",
      "Evaluasi hafalan berkala",
      "Bimbingan tahsin dan tajwid"
    ],
    "features_title": "Keunggulan Program Tahfidz",
    "features_subtitle": "Program yang dirancang khusus untuk mengoptimalkan hafalan Al-Quran",
    "features_list": [
      {
        "title": "Metode Terbukti",
        "description": "Menggunakan metode Qiroati dan Tilawati yang telah terbukti efektif",
        "icon": "book-open"
      },
      {
        "title": "Ustadz Berpengalaman",
        "description": "Dibimbing langsung oleh ustadz yang berpengalaman dalam bidang tahfidz",
        "icon": "users"
      }
    ],
    "benefits_title": "Manfaat Program",
    "benefits_subtitle": "Manfaat yang akan diperoleh santri dari program tahfidz",
    "benefits_items": [
      {
        "title": "Hafalan Berkualitas",
        "badge_text": "Kemampuan 1",
        "description": "Hafalan Al-Quran yang kuat dan berkualitas dengan tajwid yang benar"
      },
      {
        "title": "Karakter Islami",
        "badge_text": "Kemampuan 2",
        "description": "Pembentukan karakter Islami yang kuat melalui internalisasi nilai-nilai Al-Quran"
      }
    ],
    "gallery_images": [
      "http://api.alkapro.id/storage/program-khusus/gallery/tahfidz-1.jpg",
      "http://api.alkapro.id/storage/program-khusus/gallery/tahfidz-2.jpg",
      "http://api.alkapro.id/storage/program-khusus/gallery/tahfidz-3.jpg"
    ],
    "cta_title": "Bergabung dengan Program Tahfidz",
    "cta_subtitle": "Wujudkan impian menjadi hafidz Al-Quran bersama kami",
    "cta_button_text": "Daftar Sekarang",
    "cta_button_link": "/pendaftaran",
    "is_active": true
  }
}
```

### 5) Complete (settings umum + semua item)
```http
GET /special-programs/complete
```
```json
{
  "success": true,
  "data": {
    "settings": {
      "id": 1,
      "title": "Program Khusus",
      "subtitle": "Tahfidz & ICT",
      "banner_desktop": "http://api.alkapro.id/storage/program-khusus/banners/desktop.jpg",
      "banner_mobile": "http://api.alkapro.id/storage/program-khusus/banners/mobile.jpg"
    },
    "items": [
      {
        "id": 1,
        "type": "tahfidz",
        "title": "Tahfidz Intensif",
        "slug": "tahfidz-intensif",
        "description": "<p>...</p>",
        "content_type": "rich",
        "grid_items": [],
        "image": null,
        "order_index": 1,
        "is_active": true
      }
    ]
  }
}
```

### 6) Complete per Tipe (settings + item per tipe)
```http
GET /special-programs/type/ict/complete
```
```json
{
  "success": true,
  "data": {
    "settings": {
      "id": 3,
      "type": "ict",
      "title": "Program ICT Terpadu",
      "subtitle": "Information and Communication Technology untuk masa depan digital",
      "banner_desktop": "http://api.alkapro.id/storage/program-khusus/banners/ict-desktop.jpg",
      "banner_mobile": "http://api.alkapro.id/storage/program-khusus/banners/ict-mobile.jpg",
      "hero_desktop_image": "http://api.alkapro.id/storage/program-khusus/hero/ict-hero-desktop.jpg",
      "hero_mobile_image": "http://api.alkapro.id/storage/program-khusus/hero/ict-hero-mobile.jpg",
      "intro_badge_text": "Program Unggulan",
      "intro_main_title": "ICT & Digital Skills",
      "intro_description": "Program pembelajaran teknologi informasi dan komunikasi yang mempersiapkan siswa untuk era digital.",
      "featured_image": "http://api.alkapro.id/storage/program-khusus/featured/ict-featured.jpg",
      "featured_image_title": "Lab Komputer Modern",
      "featured_image_description": "Fasilitas laboratorium komputer dengan perangkat terkini untuk mendukung pembelajaran ICT.",
      "key_points": [
        "Pembelajaran coding dari dasar hingga advanced",
        "Sertifikasi internasional Microsoft dan Adobe",
        "Project-based learning dengan industri",
        "Kompetisi robotika dan programming"
      ],
      "features_title": "Keunggulan Program ICT",
      "features_subtitle": "Program yang dirancang untuk mengembangkan kemampuan teknologi siswa",
      "features_list": [
        {
          "title": "Kurikulum Terkini",
          "description": "Kurikulum yang selalu update mengikuti perkembangan teknologi terbaru",
          "icon": "monitor"
        },
        {
          "title": "Instruktur Bersertifikat",
          "description": "Dibimbing oleh instruktur yang memiliki sertifikasi internasional",
          "icon": "code"
        }
      ],
      "benefits_title": "Manfaat Program ICT",
      "benefits_subtitle": "Manfaat yang akan diperoleh siswa dari program ICT",
      "benefits_items": [
        {
          "title": "Digital Literacy",
          "badge_text": "Kemampuan 1",
          "description": "Kemampuan menggunakan teknologi digital secara efektif dan bertanggung jawab"
        },
        {
          "title": "Programming Skills",
          "badge_text": "Kemampuan 2",
          "description": "Kemampuan pemrograman dengan berbagai bahasa dan framework modern"
        }
      ],
      "gallery_images": [
        "http://api.alkapro.id/storage/program-khusus/gallery/ict-1.jpg",
        "http://api.alkapro.id/storage/program-khusus/gallery/ict-2.jpg",
        "http://api.alkapro.id/storage/program-khusus/gallery/ict-3.jpg"
      ],
      "cta_title": "Bergabung dengan Program ICT",
      "cta_subtitle": "Siapkan diri untuk masa depan digital bersama kami",
      "cta_button_text": "Daftar Sekarang",
      "cta_button_link": "/pendaftaran",
      "is_active": true
    },
    "items": [
      {
        "id": 5,
        "type": "ict",
        "display_location": "program_khusus",
        "title": "Keunggulan Program ICT",
        "slug": "keunggulan-program-ict",
        "description": "<div>Detail lengkap keunggulan program ICT...</div>",
        "content_type": "rich",
        "grid_items": [],
        "features": [
          "Pembelajaran coding dari dasar hingga advanced",
          "Sertifikasi internasional Microsoft dan Adobe",
          "Project-based learning dengan industri",
          "Lab komputer dengan perangkat terkini",
          "Kompetisi robotika dan programming",
          "Magang di perusahaan teknologi"
        ],
        "image": "http://api.alkapro.id/storage/special-programs/ict-program.jpg",
        "order_index": 2,
        "is_active": true
      }
    ]
  }
}
```

## 🔧 Error Handling

### Error Response Format
```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error information (in development mode)"
}
```

### Common HTTP Status Codes
- `200 OK`: Request berhasil
- `404 Not Found`: Resource tidak ditemukan
- `422 Unprocessable Entity`: Validation error
- `500 Internal Server Error`: Server error

## 📝 Usage Examples

### Frontend Implementation

#### 1. Fetch Programs for Home Page
```javascript
// Mengambil program untuk halaman utama
const fetchHomePrograms = async () => {
  try {
    const response = await fetch('/api/v1/special-programs?display_location=home');
    const data = await response.json();
    
    if (data.success) {
      return data.data;
    }
  } catch (error) {
    console.error('Error fetching home programs:', error);
  }
};
```

#### 2. Fetch Complete Program Data by Type
```javascript
// Mengambil data lengkap program tahfidz
const fetchTahfidzProgram = async () => {
  try {
    const response = await fetch('/api/v1/special-programs/type/tahfidz/complete');
    const data = await response.json();
    
    if (data.success) {
      const { settings, items } = data.data;
      return { settings, items };
    }
  } catch (error) {
    console.error('Error fetching tahfidz program:', error);
  }
};
```

#### 3. Custom Hook Implementation
```javascript
// hooks/useProgramKhususByType.js
import { useState, useEffect } from 'react';

export const useProgramKhususByType = (type) => {
  const [programs, setPrograms] = useState([]);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/v1/special-programs/type/${type}/complete`);
        const data = await response.json();
        
        if (data.success) {
          setSettings(data.data.settings);
          setPrograms(data.data.items);
        } else {
          setError(data.message || 'Failed to fetch data');
        }
      } catch (err) {
        setError('Network error occurred');
        console.error('Error fetching program data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (type) {
      fetchData();
    }
  }, [type]);

  return { programs, settings, loading, error };
};
```

## 🎯 Best Practices

### API Usage
1. **Always check the `success` field** dalam response sebelum menggunakan data
2. **Implement proper error handling** untuk semua API calls
3. **Use specific filters** untuk mengurangi data transfer yang tidak perlu
4. **Cache responses** di frontend untuk meningkatkan performa

### Performance Tips
1. **Use `display_location` filter** untuk mendapatkan data yang spesifik
2. **Implement pagination** jika data bertambah banyak
3. **Use image optimization** untuk gambar yang di-serve melalui API
4. **Consider using CDN** untuk static assets

---

**📞 Support**: Jika ada pertanyaan tentang API, silakan hubungi tim development.

**🔄 Last Updated**: 15 Januari 2025
**📋 Version**: 2.1
**👨‍💻 Maintainer**: Development Team
```