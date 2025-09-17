# API Setup Documentation

## Environment Configuration

Buat file `.env.local` di root project dengan konfigurasi berikut:

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

## Backend Requirements

Pastikan backend Laravel Anda sudah berjalan di `http://api.alkapro.id` dengan endpoint:

- `GET /api/v1/teachers/by-subject` - Mengambil data guru dikelompokkan berdasarkan mata pelajaran
- `GET /api/v1/teachers` - Mengambil semua data guru & staff
- `GET /api/v1/teachers/list` - Mengambil data guru saja
- `GET /api/v1/staff/list` - Mengambil data staff saja

## CORS Configuration

Pastikan backend Laravel sudah dikonfigurasi untuk menerima request dari frontend Next.js. Tambahkan di `config/cors.php`:

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

## Data Structure

Backend harus mengembalikan data dalam format:

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

## Testing

1. Jalankan backend Laravel: `php artisan serve`
2. Jalankan frontend Next.js: `npm run dev`
3. Buka halaman guru: `http://localhost:3000/profil/guru`
4. Pastikan data guru muncul dengan benar

## Troubleshooting

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