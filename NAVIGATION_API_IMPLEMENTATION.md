# Implementasi Navigation API - Header & Footer

## Ringkasan
Dokumentasi ini menjelaskan implementasi Navigation API untuk Header dan Footer yang sudah diintegrasikan ke dalam website sekolah.

## File yang Telah Dibuat/Dimodifikasi

### 1. Service Layer
- **`src/services/navigationService.ts`** - Service untuk mengakses Navigation API
- **`src/hooks/useNavigation.ts`** - Custom hooks untuk Header dan Footer

### 2. Components yang Diupdate
- **`src/components/Header.tsx`** - Header component dengan integrasi API
- **`src/components/Footer.tsx`** - Footer component dengan integrasi API

## Fitur yang Diimplementasikan

### Header Component
✅ **Logo Dinamis**: Logo header dapat diatur melalui dashboard admin
✅ **Menu Dinamis**: Menu navigation dapat dikelola melalui dashboard admin
✅ **Dropdown Menu**: Support untuk sub-menu dengan struktur hierarkis
✅ **Fallback Data**: Tetap menggunakan data statis jika API tidak tersedia
✅ **Layout Preservation**: Layout dan styling tetap sama seperti sebelumnya

### Footer Component
✅ **Link Dinamis**: Link footer dapat dikelola per kategori
✅ **Brand Footer**: Support untuk text dan image brand footer
✅ **Kategori Link**: Menu Utama, Informasi Akademik, Sosial Media, Lainnya
✅ **Fallback Data**: Data statis tetap tersedia jika API gagal
✅ **Layout Preservation**: Desain dan styling tetap sama

## Struktur Data API

### Header API Response
```typescript
interface HeaderData {
  menu: NavigationMenuItem[];
  branding: HeaderBranding;
}

interface NavigationMenuItem {
  id: number;
  name: string;
  href: string;
  target: '_self' | '_blank';
  order_index: number;
  dropdown: NavigationMenuItem[];
}

interface HeaderBranding {
  header_logo: string | null;
}
```

### Footer API Response
```typescript
interface FooterData {
  links: FooterLinks;
  branding: FooterBranding;
}

interface FooterLinks {
  'menu-utama': FooterLink[];
  'informasi-akademik': FooterLink[];
  'sosial': FooterLink[];
  'lainnya': FooterLink[];
}

interface FooterBranding {
  footer_brand_type: 'text' | 'image';
  footer_brand_text: string | null;
  footer_brand_image: string | null;
}
```

## Cara Penggunaan

### 1. Setup Environment Variables
Buat file `.env.local` di root project:
```bash
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://api.alkapro.id/api

# Production
# NEXT_PUBLIC_API_BASE_URL=https://yourdomain.com/api
```

### 2. Import dan Gunakan Hooks
```typescript
import { useHeader, useFooter } from '@/hooks/useNavigation';

// Di dalam component
const { headerData, loading, error } = useHeader();
const { footerData, loading, error } = useFooter();
```

### 3. Akses Data
```typescript
// Header
const logo = headerData?.branding?.header_logo;
const menuItems = headerData?.menu || [];

// Footer
const menuUtama = footerData?.links?.['menu-utama'] || [];
const brandText = footerData?.branding?.footer_brand_text;
```

## Fallback Strategy

### Header Fallback
- Jika API gagal, component tetap menggunakan menu statis
- Logo default tetap ditampilkan jika tidak ada logo dari API
- Semua fitur tetap berfungsi normal

### Footer Fallback
- Link statis tetap tersedia jika API gagal
- Brand footer default tetap ditampilkan
- Layout dan styling tidak berubah

## Error Handling

### Service Layer
- Try-catch untuk setiap API call
- Logging error untuk debugging
- Return data default jika API gagal

### Component Layer
- Loading state untuk UX yang baik
- Error state untuk debugging
- Graceful degradation dengan fallback data

## Testing

### 1. Test API Endpoints
```bash
# Test Header API
curl http://api.alkapro.id/api/v1/navigation/header

# Test Footer API
curl http://api.alkapro.id/api/v1/navigation/footer
```

### 2. Test Frontend
- Buka website dan lihat Header/Footer
- Periksa Network tab di DevTools
- Test dengan API yang tidak tersedia

### 3. Test Fallback
- Matikan backend server
- Refresh halaman
- Pastikan Header/Footer tetap tampil dengan data statis

## Dashboard Admin Integration

### 1. Navbar/Header Management
- **Lokasi**: Admin Panel → Pengaturan → Navbar/Header
- **Fitur**: 
  - Tambah/edit/hapus menu
  - Set parent untuk dropdown
  - Upload logo header
  - Set urutan menu

### 2. Footer Management
- **Lokasi**: Admin Panel → Pengaturan → Footer
- **Fitur**:
  - Kelola link per kategori
  - Set target link (_self/_blank)
  - Set urutan link

### 3. Site Branding
- **Lokasi**: Admin Panel → Pengaturan → Site Branding
- **Fitur**:
  - Upload logo header
  - Set tipe brand footer (text/image)
  - Upload gambar brand footer

## Troubleshooting

### 1. Logo Header Tidak Muncul
```bash
# Periksa storage link
php artisan storage:link

# Periksa permission
chmod -R 775 storage
chmod -R 775 bootstrap/cache

# Periksa APP_URL di .env
APP_URL=http://api.alkapro.id
```

### 2. API Tidak Bisa Diakses
```bash
# Periksa route
php artisan route:list | grep navigation

# Periksa controller
php artisan make:controller NavigationController

# Periksa log
tail -f storage/logs/laravel.log
```

### 3. Menu Dropdown Tidak Berfungsi
- Periksa parent_id di database
- Pastikan CSS hover state berfungsi
- Periksa z-index untuk dropdown

## Performance Considerations

### 1. Caching
- Data navigation jarang berubah
- Implementasi caching di backend
- Frontend cache dengan `cache: 'no-store'`

### 2. Lazy Loading
- Logo dan gambar di-load saat dibutuhkan
- Fallback data tersedia segera

### 3. Error Boundaries
- Component tidak crash jika API gagal
- User experience tetap baik

## Security

### 1. Input Validation
- Validasi URL di backend
- Sanitasi HTML content
- CSRF protection

### 2. File Upload
- Validasi file type dan size
- Secure file storage
- Public access untuk assets

### 3. API Access
- Rate limiting
- Authentication untuk admin
- Public read access untuk navigation

## Deployment Checklist

### 1. Environment Variables
- [ ] `NEXT_PUBLIC_API_BASE_URL` sudah diset
- [ ] Production URL sudah benar
- [ ] HTTPS untuk production

### 2. Backend Setup
- [ ] Database migration sudah dijalankan
- [ ] Storage link sudah dibuat
- [ ] Permission folder sudah benar
- [ ] Route API sudah terdaftar

### 3. Frontend Build
- [ ] Environment variables sudah di-build
- [ ] API endpoints sudah benar
- [ ] Fallback data sudah tersedia

## Support dan Maintenance

### 1. Monitoring
- Monitor API response time
- Log error untuk debugging
- Track usage analytics

### 2. Updates
- Update menu secara berkala
- Refresh logo sesuai kebutuhan
- Maintain link yang valid

### 3. Backup
- Backup data navigation
- Backup file assets
- Document perubahan

## Kesimpulan

Implementasi Navigation API telah berhasil diintegrasikan ke dalam website sekolah dengan:

✅ **Fungsionalitas Lengkap**: Header dan Footer yang dinamis
✅ **Layout Preservation**: Desain dan styling tidak berubah
✅ **Fallback Strategy**: Website tetap berfungsi jika API gagal
✅ **Error Handling**: Graceful degradation untuk user experience
✅ **Admin Dashboard**: Kemudahan mengelola content
✅ **Performance**: Optimized loading dan caching
✅ **Security**: Validasi dan sanitasi input

Website sekarang memiliki Header dan Footer yang dapat dikelola secara dinamis melalui dashboard admin, sambil tetap mempertahankan semua fitur dan desain yang sudah ada. 