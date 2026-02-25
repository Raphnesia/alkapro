# Setup Disqus untuk Website SMP Muhammadiyah Al Kautsar

## Langkah-langkah Setup Disqus

### 1. Buat Akun Disqus
1. Kunjungi [https://disqus.com](https://disqus.com)
2. Klik "Get Started" atau "Sign Up"
3. Pilih "I want to install Disqus on my site"

### 2. Konfigurasi Website
1. **Website Name**: `SMP Muhammadiyah Al Kautsar`
2. **Category**: Education
3. **Language**: Indonesian
4. **Shortname**: `smp-muhammadiyah-al-kautsar` (ini yang digunakan dalam kode)

### 3. Pengaturan Website URL
- **Website URL**: `https://smp-muhammadiyah-al-kautsar.com` (atau domain aktual Anda)
- **Description**: Website resmi SMP Muhammadiyah Al Kautsar PK Kartasura

### 4. Pengaturan Moderasi (Disarankan)
- **Pre-moderate comments**: Aktifkan untuk review komentar sebelum dipublikasi
- **Spam protection**: Aktifkan semua fitur anti-spam
- **Blacklist words**: Tambahkan kata-kata yang tidak pantas

### 5. Pengaturian Keamanan
- **Trusted domains**: Tambahkan domain website Anda
- **Restrict commenting**: Atur agar hanya pengguna terdaftar yang bisa komentar (opsional)

## Fitur yang Tersedia

### ✅ Fitur yang Sudah Diimplementasi
- ✅ Sistem komentar terintegrasi di setiap artikel berita
- ✅ Loading state yang responsif
- ✅ Design yang konsisten dengan theme website
- ✅ URL unik untuk setiap artikel
- ✅ Auto-cleanup script untuk performa optimal

### 🎯 Fitur Moderasi
- **Comment moderation**: Admin bisa approve/reject komentar
- **Spam detection**: Otomatis mendeteksi dan memblokir spam
- **User management**: Blokir user yang melanggar aturan
- **Analytics**: Lihat statistik komentar dan engagement

### 📋 Aturan Komentar yang Disarankan
1. Gunakan bahasa yang sopan dan santun
2. Hindari konten yang mengandung SARA
3. Tidak diperbolehkan spam atau promosi
4. Topik komentar harus relevan dengan artikel
5. Hormati pendapat orang lain

## Kustomisasi Lanjutan

### Mengubah Tampilan
```css
/* Custom CSS untuk Disqus (bisa ditambahkan di globals.css) */
#disqus_thread {
  font-family: 'Plus Jakarta Sans', sans-serif;
}

#disqus_thread iframe {
  border-radius: 12px;
}
```

### Menambah Language Pack
Disqus otomatis menggunakan bahasa Indonesia berdasarkan setting browser pengguna.

## Monitoring & Analytics

### Dashboard Admin
- Login ke dashboard Disqus: [https://disqus.com/admin/](https://disqus.com/admin/)
- Monitor komentar masuk, spam, dan statistik engagement
- Export data komentar untuk backup

### Notifikasi Email
- Setup notifikasi email untuk komentar baru
- Atur moderator tambahan jika diperlukan

## Troubleshooting

### Komentar Tidak Muncul
1. Pastikan shortname Disqus sudah benar di `DisqusComments.tsx`
2. Cek apakah domain website sudah ditambahkan di trusted domains
3. Periksa console browser untuk error JavaScript

### Komentar Lambat Loading
1. Pastikan koneksi internet stabil
2. Cek apakah ada script blocker/ad blocker yang aktif
3. Restart aplikasi Next.js

## Support
Jika ada masalah teknis, hubungi:
- **Disqus Support**: [https://help.disqus.com](https://help.disqus.com)
- **Developer**: Tim IT SMP Muhammadiyah Al Kautsar

---

**Catatan**: File ini adalah panduan setup untuk sistem komentar Disqus. Simpan kredensial login Disqus dengan aman dan jangan bagikan ke pihak yang tidak berkepentingan. 