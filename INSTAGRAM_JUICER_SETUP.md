# Setup Instagram Feed dengan Juicer.io

## Keuntungan Juicer.io
✅ Gratis untuk 1 social media source  
✅ Tidak perlu API key Instagram  
✅ Tidak akan di-block Instagram  
✅ Auto-update setiap beberapa jam  
✅ Responsive dan customizable  
✅ Support multiple social media (Instagram, TikTok, Twitter, dll)

## Langkah Setup

### 1. Buat Akun Juicer.io
1. Kunjungi: https://www.juicer.io/
2. Klik "Sign Up" atau "Get Started"
3. Pilih plan "Free" (cukup untuk 1 social media)
4. Daftar dengan email

### 2. Buat Feed Baru
1. Setelah login, klik "Create a New Feed"
2. Beri nama feed: `smpmuh-alkautsarpk` (atau nama lain)
3. Klik "Create Feed"

### 3. Tambahkan Instagram Source
1. Di dashboard feed, klik "Add Social Media Source"
2. Pilih "Instagram"
3. Ada 2 cara:
   - **Cara 1 (Mudah):** Masukkan username: `smpmuh.alkautsarpk`
   - **Cara 2 (Lebih Baik):** Connect Instagram account (perlu login Instagram)
4. Klik "Add Source"

### 4. Customize Feed (Opsional)
1. Klik tab "Customize"
2. Atur:
   - Columns: 4 (desktop), 2 (tablet), 1 (mobile)
   - Style: Modern atau Grid
   - Colors: Sesuaikan dengan tema website
3. Klik "Save"

### 5. Copy Feed Name
1. Di dashboard, lihat bagian atas
2. Copy "Feed Name" (contoh: `smpmuh-alkautsarpk`)
3. Ini yang akan dipakai di komponen

### 6. Update Komponen
Buka file `src/components/InstagramJuicerFeed.tsx` dan ganti:

```tsx
const juicerFeedId = 'smpmuh-alkautsarpk' // Ganti dengan Feed Name Anda
```

### 7. Gunakan Komponen
Import dan gunakan di halaman yang diinginkan:

```tsx
import InstagramJuicerFeed from '@/components/InstagramJuicerFeed'

export default function HomePage() {
  return (
    <div>
      {/* ... konten lain ... */}
      <InstagramJuicerFeed />
    </div>
  )
}
```

## Troubleshooting

### Feed tidak muncul?
- Pastikan Feed Name sudah benar
- Tunggu beberapa menit setelah setup (Juicer perlu fetch data)
- Cek console browser untuk error
- Pastikan script Juicer sudah load

### Feed kosong?
- Pastikan Instagram source sudah ditambahkan
- Cek apakah akun Instagram public (bukan private)
- Tunggu 5-10 menit untuk sync pertama kali

### Styling tidak sesuai?
- Customize di dashboard Juicer.io
- Atau tambahkan custom CSS di komponen

## Custom CSS (Opsional)

Tambahkan di `globals.css` untuk styling custom:

```css
/* Juicer Feed Custom Styling */
.juicer-feed {
  /* Override default styles */
}

.juicer-feed .feed-item {
  border-radius: 1rem;
  overflow: hidden;
}

.juicer-feed .j-image {
  transition: transform 0.3s ease;
}

.juicer-feed .feed-item:hover .j-image {
  transform: scale(1.05);
}
```

## Alternatif Lain

Jika Juicer.io tidak cocok, alternatif lain:

1. **SnapWidget** - https://snapwidget.com/
2. **Behold.so** - https://behold.so/
3. **Curator.io** - https://curator.io/
4. **Instagram Basic Display API** (Resmi tapi ribet)

## Biaya

- **Free Plan:** 1 social media source, unlimited posts
- **Paid Plan:** Mulai $19/bulan untuk multiple sources dan fitur advanced

Untuk kebutuhan sekolah, Free Plan sudah cukup!
