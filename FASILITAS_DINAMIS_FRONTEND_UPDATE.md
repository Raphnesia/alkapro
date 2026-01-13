# 🏫 FASILITAS DINAMIS - FRONTEND UPDATE

## 📋 Overview
Update frontend untuk mendukung API terbaru dengan penambahan field `content` dan `photos` untuk photo collage yang lebih powerful.

---

## 🆕 Fitur Baru yang Ditambahkan

### **1. Facility Content Sections**
- **Rich Text Content**: Mendukung konten HTML dari WYSIWYG editor
- **Multiple Display Types**: wysiwyg, simple_text, grid
- **Conditional Photo Collage**: Dapat mengaktifkan photo collage per section
- **Order Management**: Content sections dapat diurutkan

### **2. Enhanced Photo Collage**
- **Structured Data**: Menggunakan data photo dari API dengan title, description, alt_text
- **Better Layout**: Grid layout dengan overlay informasi
- **Dynamic Display**: Dapat diaktifkan/nonaktifkan per content section
- **SEO Friendly**: Alt text dan title untuk better SEO

### **3. Improved Data Structure**
- **TypeScript Types**: Type safety untuk semua field baru
- **Fallback Data**: Data fallback untuk development dan testing
- **API Integration**: Seamless integration dengan backend API

---

## 🔧 Perubahan Technical

### **1. Updated Types (`src/services/facilityService.ts`)**
```typescript
// New interfaces added
export interface FacilityContent {
  id: number;
  section_title: string;
  content: string;
  display_type: 'wysiwyg' | 'simple_text' | 'grid';
  show_photo_collage: boolean;
  order_index: number;
  is_active: boolean;
}

export interface FacilityPhoto {
  id: number;
  title: string;
  description: string | null;
  image: string;
  alt_text: string | null;
  order_index: number;
  is_active: boolean;
}

export interface SubFacilityPhoto {
  id: number;
  parent_slug: string;
  title: string;
  description: string | null;
  image: string;
  alt_text: string | null;
  order_index: number;
  is_active: boolean;
}

// Updated complete data interfaces
export interface FacilityCompleteData {
  settings: FacilitySettings;
  content: FacilityContent[];    // ✅ NEW
  photos: FacilityPhoto[];       // ✅ NEW
  boxes: FacilityBox[];
  facilities: Facility[];
}

export interface SubFacilityCompleteData {
  settings: SubFacilitySettings;
  boxes: SubFacilityBox[];
  photos: SubFacilityPhoto[];    // ✅ NEW
  facilities: SubFacility[];
}
```

### **2. Updated Hooks (`src/hooks/useFacility.ts`)**
```typescript
// Updated return interfaces
export interface UseFacilityReturn {
  data: FacilityCompleteData | null;
  settings: FacilityCompleteData['settings'] | null;
  content: FacilityCompleteData['content'];     // ✅ NEW
  photos: FacilityCompleteData['photos'];       // ✅ NEW
  boxes: FacilityCompleteData['boxes'];
  facilities: FacilityCompleteData['facilities'];
  isLoading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

export interface UseSubFacilityReturn {
  data: SubFacilityCompleteData | null;
  settings: SubFacilityCompleteData['settings'] | null;
  boxes: SubFacilityCompleteData['boxes'];
  photos: SubFacilityCompleteData['photos'];    // ✅ NEW
  facilities: SubFacilityCompleteData['facilities'];
  isLoading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

// Updated fallback data
const fallbackContent = [
  {
    id: 1,
    section_title: "Fasilitas Unggulan Sekolah Kami",
    content: "<p>Sekolah kami berkomitmen untuk menyediakan fasilitas terbaik...</p>",
    display_type: 'wysiwyg',
    show_photo_collage: true,
    order_index: 1,
    is_active: true
  }
];

const fallbackPhotos = [
  {
    id: 1,
    title: "Ruang Kelas Modern",
    description: "Ruang kelas dengan fasilitas teknologi terdepan",
    image: "/path/to/image.jpg",
    alt_text: "Ruang kelas modern dengan proyektor dan AC",
    order_index: 1,
    is_active: true
  }
];
```

### **3. New Components**

#### **A. FacilityContentSections (`src/components/FacilityContentSections.tsx`)**
```typescript
interface FacilityContentSectionsProps {
  content: FacilityContent[];
  photos: (FacilityPhoto | SubFacilityPhoto)[];
}

// Features:
- Render multiple content sections
- Support wysiwyg, simple_text, grid display types
- Conditional photo collage per section
- Rich text rendering with dangerouslySetInnerHTML
- Responsive design
```

#### **B. Enhanced FacilityPhotoCollage (`src/components/FacilityPhotoCollage.tsx`)**
```typescript
interface FacilityPhotoCollageProps {
  photos?: (FacilityPhoto | SubFacilityPhoto)[];
  title?: string;
}

// Features:
- Structured photo data with title, description, alt_text
- Better grid layout (1/2/3 columns)
- Overlay with photo information
- Hover effects and transitions
- SEO-friendly alt text and titles
- Fallback data for development
```

### **4. Updated Pages**

#### **A. Main Facility Page (`src/app/fasilitas/page.tsx`)**
```typescript
// Added new imports
import { FacilityContentSections } from '@/components/FacilityContentSections'

// Updated hook usage
const { 
  data, 
  settings, 
  content,    // ✅ NEW
  photos,     // ✅ NEW
  boxes, 
  facilities, 
  isLoading, 
  error, 
  refreshData 
} = useFacility()

// Added content sections rendering
<FacilityContentSections content={content} photos={photos} />
```

#### **B. Sub-Facility Page (`src/app/fasilitas/[parentSlug]/page.tsx`)**
```typescript
// Updated hook usage  
const { 
  data, 
  settings, 
  boxes, 
  photos,     // ✅ NEW
  facilities, 
  isLoading, 
  error, 
  refreshData 
} = useSubFacility(parentSlug)

// Enhanced photo collage
<FacilityPhotoCollage 
  photos={photos}
  title="Galeri Foto Fasilitas"
/>
```

---

## 🎨 UI/UX Improvements

### **1. Content Sections**
- **Rich Text Support**: Full HTML rendering dengan prose styling
- **Multiple Layouts**: Mendukung grid, simple text, dan WYSIWYG
- **Responsive Design**: Optimal di semua device
- **Typography**: Better typography dengan prose classes

### **2. Photo Collage**
- **Enhanced Grid**: 1-2-3 column responsive grid
- **Image Overlays**: Title dan description dengan gradient overlay
- **Hover Effects**: Smooth scale transitions
- **Better Aspect Ratio**: Consistent 18rem (72) height
- **SEO Optimization**: Proper alt text dan title attributes

### **3. Loading States**
- **Backward Compatible**: Existing loading states tetap berfungsi
- **Fallback Data**: Graceful fallback untuk development
- **Error Handling**: Improved error handling untuk field baru

---

## 🔄 Migration Guide

### **From Old Structure to New Structure**

#### **Before (Old API)**
```json
{
  "success": true,
  "data": {
    "settings": {...},
    "boxes": [...],
    "facilities": [...]
  }
}
```

#### **After (New API)**
```json
{
  "success": true,
  "data": {
    "settings": {...},
    "content": [              // ✅ NEW
      {
        "id": 1,
        "section_title": "...",
        "content": "<p>...</p>",
        "display_type": "wysiwyg",
        "show_photo_collage": true,
        "order_index": 1,
        "is_active": true
      }
    ],
    "photos": [               // ✅ NEW
      {
        "id": 1,
        "title": "...",
        "description": "...",
        "image": "...",
        "alt_text": "...",
        "order_index": 1,
        "is_active": true
      }
    ],
    "boxes": [...],
    "facilities": [...]
  }
}
```

### **Required Backend Data**

#### **1. Facility Content**
Pastikan data content sudah dibuat di admin panel:
- Menu: **"Fasilitas Content"**
- Minimal 1 content section dengan `show_photo_collage: true`

#### **2. Facility Photos**
Pastikan data photos sudah dibuat di admin panel:
- Menu: **"Photo Collage Fasilitas"**
- Minimal 4-6 photos untuk tampilan optimal

#### **3. Sub-Facility Photos**
Untuk setiap sub-facility:
- Menu: **"Photo Collage Sub Fasilitas"**
- Photos dengan `parent_slug` yang sesuai

---

## 🧪 Testing

### **1. API Structure Test**
```javascript
// Test API response structure
fetch('http://api.alkapro.id/api/v1/facilities')
  .then(r => r.json())
  .then(d => {
    console.log('Settings:', !!d.data.settings);
    console.log('Content:', Array.isArray(d.data.content), d.data.content?.length);
    console.log('Photos:', Array.isArray(d.data.photos), d.data.photos?.length);
    console.log('Boxes:', Array.isArray(d.data.boxes), d.data.boxes?.length);
    console.log('Facilities:', Array.isArray(d.data.facilities), d.data.facilities?.length);
  });
```

### **2. Frontend Testing**
- **Main Page**: `http://localhost:3000/fasilitas`
  - Cek content sections muncul setelah banner
  - Cek photo collage muncul jika `show_photo_collage: true`
  - Cek facilities grid di bawah
  
- **Sub-Facility**: `http://localhost:3000/fasilitas/kantin`
  - Cek photo collage dengan data dari API
  - Cek title dan description di overlay

### **3. Fallback Testing**
- Ketika API return empty arrays, fallback data harus muncul
- Fallback content dan photos sudah disediakan
- No error di console

---

## 📊 Performance Notes

### **1. Image Loading**
- Photos dimuat sesuai kebutuhan
- Hover effects menggunakan CSS transforms (GPU-accelerated)
- Lazy loading bisa ditambahkan di future update

### **2. Content Rendering**
- `dangerouslySetInnerHTML` digunakan untuk rich text
- Content di-filter berdasarkan `is_active`
- Sorted berdasarkan `order_index`

### **3. Bundle Size**
- Tidak ada dependencies baru
- Component size minimal
- TypeScript types tidak menambah runtime overhead

---

## 🚀 Next Steps

### **1. Content Management**
- Rich text editor integration di admin panel ✅ (sudah ada di backend)
- Image upload untuk content ✅ (sudah ada di backend)
- Preview functionality

### **2. SEO Enhancements**
- Meta tags dari content
- Structured data untuk photos
- Alt text optimization

### **3. Advanced Features**
- Image lazy loading
- Lightbox untuk photo gallery
- Image optimization (WebP, responsive images)
- Content search functionality

---

## ✅ Status Update

### **Completed Features**
- [x] TypeScript types untuk content dan photos
- [x] FacilityContentSections component
- [x] Enhanced FacilityPhotoCollage component
- [x] Updated main facility page
- [x] Updated sub-facility page
- [x] Fallback data implementation
- [x] API integration testing
- [x] Responsive design

### **Ready for Production**
- [x] Backward compatibility maintained
- [x] Error handling implemented
- [x] Loading states working
- [x] Responsive design verified
- [x] TypeScript types complete

---

**🎉 Frontend update selesai dan siap digunakan!** 🏫

Sistem sekarang mendukung:
- ✅ Rich text content sections dengan berbagai display types
- ✅ Enhanced photo collage dengan structured data
- ✅ Better SEO dengan proper alt text dan titles
- ✅ Responsive design yang lebih baik
- ✅ Fallback data untuk development
- ✅ Backward compatibility dengan API lama

Silakan akses `http://localhost:3000/fasilitas` untuk melihat hasilnya! 