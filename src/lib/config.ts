// src/lib/config.ts
// Konfigurasi environment variables dan settings aplikasi

export const config = {
  // API Configuration
  api: {
    // Gunakan proxy Next.js untuk menghindari CORS
    baseUrl: process.env.NEXT_PUBLIC_USE_PROXY === 'true' 
      ? '/api/proxy' 
      : 'https://api.alkapro.id/api/v1',
    timeout: 10000, // 10 seconds
    // Laravel API URL asli (untuk proxy)
    laravelUrl: 'https://api.alkapro.id/api/v1',
  },
  
  // Site Configuration
  site: {
    name: 'SMP Muhammadiyah Al Kautsar PK Kartasura',
    description: 'Sekolah Menengah Pertama Muhammadiyah Al Kautsar PK Kartasura',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000', //http://localhost:3000
  },
  
  // Image Configuration
  images: {
    domains: ['localhost', '127.0.0.1'],
    formats: ['image/webp', 'image/jpeg', 'image/png'],
    sizes: {
      thumbnail: 150,
      small: 300,
      medium: 600,
      large: 1200,
    },
  },
  
  // Feature Flags
  features: {
    enablePimpinanSMP: true,
    enableTeacherManagement: true,
    enableNewsAndArticles: true,
    enableDisqusComments: false,
  },
  
  // Error Messages
  messages: {
    networkError: 'Terjadi kesalahan jaringan. Silakan cek koneksi internet Anda.',
    serverError: 'Terjadi kesalahan pada server. Silakan coba lagi nanti.',
    notFound: 'Data yang Anda cari tidak ditemukan.',
    unauthorized: 'Anda tidak memiliki akses ke halaman ini.',
    defaultError: 'Terjadi kesalahan yang tidak diketahui.',
  },
} as const;

// Type untuk config
export type Config = typeof config;

// Helper function untuk mendapatkan API URL
export function getApiUrl(endpoint: string): string {
  // Jika menggunakan proxy, endpoint langsung ke proxy
  if (config.api.baseUrl === '/api/proxy') {
    return `/api/proxy${endpoint}`;
  }
  
  // Jika tidak menggunakan proxy, gunakan Laravel API langsung
  return `${config.api.baseUrl}${endpoint}`;
}

// Helper function untuk mendapatkan image URL
export function getImageUrl(path: string): string {
  console.log('🖼️ getImageUrl called with path:', path)
  
  if (!path || typeof path !== 'string') {
    console.log('⚠️ Invalid path, using default image')
    return '/pace.jpeg'
  }
  
  if (path.startsWith('http')) {
    console.log('✅ Full URL detected, returning as is')
    return path
  }
  
  // Base URL untuk gambar (tanpa /api/v1)
  const baseUrl = 'https://api.alkapro.id'
  console.log('🖼️ Base URL for images:', baseUrl)
  
  // Normalize path
  let normalizedPath = path.trim()
  
  // Jika path tidak dimulai dengan '/', tambahkan '/storage/'
  if (!normalizedPath.startsWith('/')) {
    if (!normalizedPath.startsWith('storage/')) {
      normalizedPath = 'storage/' + normalizedPath
    }
    normalizedPath = '/' + normalizedPath
  }
  
  const finalUrl = `${baseUrl}${normalizedPath}`
  console.log('🖼️ Final image URL:', finalUrl)
  
  return finalUrl
}

// Helper function untuk mengecek apakah menggunakan proxy
export function isUsingProxy(): boolean {
  return config.api.baseUrl === '/api/proxy';
} 