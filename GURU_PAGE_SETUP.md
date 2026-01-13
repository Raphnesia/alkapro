# Halaman Guru - Setup dengan Backend Laravel

## 📋 Overview

Halaman guru telah diupdate untuk menggunakan backend Laravel dengan API endpoints. Fitur-fitur yang tersedia:

- ✅ Integrasi dengan backend Laravel
- ✅ Data guru dinamis dari database
- ✅ Pengelompokan berdasarkan mata pelajaran
- ✅ Loading states dan error handling
- ✅ Responsive design
- ✅ Modular components

## 🏗️ Struktur File

```
src/
├── app/profil/guru/
│   └── page.tsx                 # Halaman utama guru
├── components/
│   ├── TeacherCard.tsx          # Komponen card guru
│   ├── LoadingSpinner.tsx       # Komponen loading
│   └── ErrorMessage.tsx         # Komponen error message
├── hooks/
│   └── useTeachers.ts           # Custom hook untuk data guru
└── services/
    └── teacherService.ts        # Service untuk API calls
```

## 🔧 Setup Backend

### 1. Environment Variables

Buat file `.env.local` di root project:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://api.alkapro.id/api/v1

# Instagram API Configuration (if needed)
NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN=your_instagram_access_token_here
NEXT_PUBLIC_INSTAGRAM_USER_ID=your_instagram_user_id_here

# TikTok API Configuration (if needed)
NEXT_PUBLIC_TIKTOK_ACCESS_TOKEN=your_tiktok_access_token_here
NEXT_PUBLIC_TIKTOK_USER_ID=your_tiktok_user_id_here
```

### 2. Backend Requirements

Pastikan backend Laravel Anda memiliki:

- **Model Teacher** dengan fields: `name`, `position`, `subject`, `photo`, `bio`, `education`, `experience`, `type`, `order_index`, `is_active`
- **API Endpoints**:
  - `GET /api/v1/teachers/by-subject` - Data guru dikelompokkan per mata pelajaran
  - `GET /api/v1/teachers` - Semua data guru & staff
  - `GET /api/v1/teachers/list` - Hanya data guru
  - `GET /api/v1/staff/list` - Hanya data staff

### 3. CORS Configuration

Di `config/cors.php` backend Laravel:

```php
return [
    'paths' => ['api/*'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:3000', 'http://127.0.0.1:3000'],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,
];
```

## 📊 Data Structure

### API Response Format

```json
{
  "data": {
    "matematika": [
      {
        "name": "Dr. Ahmad Susanto, M.Pd.",
        "image": "http://api.alkapro.id/storage/teachers/ahmad.jpg",
        "position": "Guru Matematika Senior",
        "description": "Berpengalaman 15 tahun dalam pengajaran matematika",
        "subject": "Matematika"
      }
    ],
    "bahasa_indonesia": [
      {
        "name": "Prof. Bambang Sutrisno, M.Pd.",
        "image": "http://api.alkapro.id/storage/teachers/bambang.jpg",
        "position": "Guru Bahasa Indonesia Senior",
        "description": "Ahli dalam sastra Indonesia",
        "subject": "Bahasa Indonesia"
      }
    ]
  }
}
```

### Teacher Interface

```typescript
interface Teacher {
  name: string
  image: string
  position: string
  description: string
  subject: string
}
```

## 🎯 Komponen yang Dibuat

### 1. TeacherCard Component

Komponen untuk menampilkan informasi guru dengan layout responsive:

```typescript
<TeacherCard teacher={teacher} index={index} />
```

**Features:**
- Layout alternating (kiri-kanan) untuk desktop
- Layout mobile yang responsif
- Background pattern yang konsisten
- Footer dengan branding

### 2. LoadingSpinner Component

Komponen loading yang reusable:

```typescript
<LoadingSpinner 
  size="large" 
  text="Memuat data guru..." 
/>
```

**Props:**
- `size`: 'small' | 'medium' | 'large'
- `text`: string untuk teks loading
- `className`: additional CSS classes

### 3. ErrorMessage Component

Komponen untuk menampilkan error dengan retry button:

```typescript
<ErrorMessage 
  message="Error message here"
  onRetry={refetch}
/>
```

**Props:**
- `title`: judul error (optional)
- `message`: pesan error
- `onRetry`: function untuk retry
- `className`: additional CSS classes

### 4. useTeachers Hook

Custom hook untuk mengelola state dan API calls:

```typescript
const { teachersData, subjects, loading, error, refetch } = useTeachers()
```

**Returns:**
- `teachersData`: data guru dikelompokkan per mata pelajaran
- `subjects`: array mata pelajaran dengan warna
- `loading`: status loading
- `error`: pesan error jika ada
- `refetch`: function untuk refresh data

### 5. TeacherService

Service untuk mengelola API calls:

```typescript
// Get teachers grouped by subject
const data = await getTeachersBySubject()

// Get all teachers
const teachers = await getAllTeachers()

// Get teachers only
const teachersOnly = await getTeachersOnly()

// Get staff only
const staffOnly = await getStaffOnly()
```

## 🚀 Cara Penggunaan

### 1. Menjalankan Project

```bash
# Install dependencies
npm install

# Jalankan development server
npm run dev

# Pastikan backend Laravel berjalan di port 8000
php artisan serve
```

### 2. Akses Halaman

Buka browser dan akses: `http://localhost:3000/profil/guru`

### 3. Testing

1. **Test Loading State**: Halaman akan menampilkan loading spinner saat pertama kali dibuka
2. **Test Error State**: Jika API tidak tersedia, akan menampilkan error message dengan retry button
3. **Test Navigation**: Klik mata pelajaran untuk melihat guru yang berbeda
4. **Test Responsive**: Coba di mobile dan desktop untuk memastikan layout responsive

## 🔍 Troubleshooting

### Error: "Failed to fetch teachers data"
- Pastikan backend Laravel berjalan di port 8000
- Periksa endpoint `/api/v1/teachers/by-subject` berfungsi
- Periksa CORS configuration

### Error: "CORS error"
- Pastikan CORS sudah dikonfigurasi di backend
- Periksa `allowed_origins` di `config/cors.php`

### Data tidak muncul
- Periksa response dari API menggunakan browser developer tools
- Pastikan format data sesuai dengan yang diharapkan
- Periksa console untuk error JavaScript

### Image tidak muncul
- Pastikan URL gambar lengkap dengan base URL
- Periksa file storage di backend Laravel
- Pastikan permission file storage sudah benar

## 📱 Responsive Design

Halaman guru sudah dioptimalkan untuk:

- **Desktop**: Layout alternating dengan foto dan teks
- **Tablet**: Layout yang menyesuaikan dengan ukuran layar
- **Mobile**: Layout vertikal dengan foto di atas dan teks di bawah

## 🎨 Styling

Menggunakan Tailwind CSS dengan:
- Color scheme: Green theme untuk branding sekolah
- Typography: Ubuntu dan Quicksand fonts
- Animations: Smooth transitions dan hover effects
- Glassmorphism: Modern UI dengan backdrop blur

## 🔄 State Management

State dikelola menggunakan React hooks:
- `useState` untuk active subject
- `useEffect` untuk data fetching dan URL params
- Custom hook `useTeachers` untuk API state management

## 📈 Performance

Optimasi yang diterapkan:
- Lazy loading untuk images
- Memoization untuk expensive calculations
- Error boundaries untuk error handling
- Loading states untuk better UX 