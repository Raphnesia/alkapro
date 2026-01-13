/**
 * Site Configuration & Layout Consolidator
 * File ini mengumpulkan semua layout dan konfigurasi untuk website sekolah
 */

// Import semua API functions
import { 
  homeApi, 
  teacherApi, 
  postApi, 
  profileApi, 
  facilityApi, 
  activityApi, 
  linkApi 
} from './api';

// Layout Configuration
export const siteConfig = {
  // Site Information
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Sekolah Islam Terpadu",
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || "Website resmi Sekolah Islam Terpadu",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001",
  
  // Contact Information
  contact: {
    phone: process.env.NEXT_PUBLIC_SCHOOL_PHONE || "+62 xxx-xxxx-xxxx",
    email: process.env.NEXT_PUBLIC_SCHOOL_EMAIL || "info@yourschool.sch.id",
    address: process.env.NEXT_PUBLIC_SCHOOL_ADDRESS || "Jl. Contoh No. 123, Kota",
  },

  // Social Media
  social: {
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "#",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "#",
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL || "#",
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_URL || "#",
  },

  // API Configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://api.alkapro.id/api",
    imageBaseUrl: process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "http://api.alkapro.id/storage",
  },

  // Layout Sections
  sections: {
    home: {
      hero: {
        title: "Selamat Datang di Sekolah Islam Terpadu",
        subtitle: "Pendidikan Unggul Berbasis Islam",
        ctaText: "Kenali Kami",
        ctaLink: "/profil",
      },
      about: {
        title: "Tentang Kami",
        description: "Sekolah Islam Terpadu dengan kurikulum terintegrasi",
        features: [
          "Kurikulum Terintegrasi Islam",
          "Fasilitas Modern",
          "Tenaga Pengajar Profesional",
          "Ekstrakurikuler Beragam"
        ]
      }
    },
    
    profil: {
      subSections: [
        { slug: "pimpinan-sekolah", title: "Pimpinan Sekolah", icon: "user-tie" },
        { slug: "guru-dan-tendik", title: "Guru & Tendik", icon: "users" },
        { slug: "sejarah-singkat", title: "Sejarah Singkat", icon: "history" },
        { slug: "visi-misi", title: "Visi & Misi", icon: "target" },
        { slug: "struktur-organisasi", title: "Struktur Organisasi", icon: "sitemap" },
        { slug: "ipm", title: "IPM", icon: "chart-line" },
        { slug: "ekstrakurikuler", title: "Ekstrakurikuler", icon: "puzzle-piece" }
      ]
    },

    berita: {
      categories: [
        "Berita Sekolah",
        "Prestasi Siswa", 
        "Kegiatan Sekolah",
        "Pengumuman"
      ]
    },

    fasilitas: {
      categories: [
        "Ruang Kelas",
        "Laboratorium",
        "Perpustakaan",
        "Lapangan Olahraga",
        "Ruang Multimedia",
        "Kantin"
      ]
    }
  },

  // Navigation Configuration
  navigation: {
    header: [
      { label: "Beranda", href: "/" },
      { label: "Profil", href: "/profil" },
      { label: "Berita", href: "/berita/list" },
      { label: "Artikel", href: "/berita-dan-artikel/artikel-sekolah" },
      { label: "Fasilitas", href: "/fasilitas" },
      { label: "Kegiatan", href: "/kegiatansekolah" },
      { label: "Kontak", href: "#kontak" }
    ],
    
    footer: [
      { label: "Tentang Kami", href: "/profil" },
      { label: "Berita", href: "/berita/list" },
      { label: "Artikel", href: "/berita-dan-artikel/artikel-sekolah" },
      { label: "Fasilitas", href: "/fasilitas" },
      { label: "Kegiatan", href: "/kegiatansekolah" }
    ]
  }
};

// API Data Fetchers
export const dataFetchers = {
  // Fetch all data for homepage
  async getHomePageData() {
    try {
      const [sections, teachers, news, activities] = await Promise.all([
        homeApi.getSections(),
        teacherApi.getTeachers(),
        postApi.getNews(1),
        activityApi.getAll(1)
      ]);

      return {
        sections,
        teachers: teachers.slice(0, 6), // Limit to 6 teachers
        news: news.data.slice(0, 3), // Latest 3 news
        activities: activities.data.slice(0, 3) // Latest 3 activities
      };
    } catch (error) {
      console.error('Error fetching home page data:', error);
      return {
        sections: [],
        teachers: [],
        news: { data: [] },
        activities: { data: [] }
      };
    }
  },

  // Fetch data for profile page
  async getProfilePageData() {
    try {
      const [sections, teachers, staff] = await Promise.all([
        profileApi.getAll(),
        teacherApi.getTeachers(),
        teacherApi.getStaff()
      ]);

      return {
        sections,
        teachers,
        staff
      };
    } catch (error) {
      console.error('Error fetching profile page data:', error);
      return {
        sections: [],
        teachers: [],
        staff: []
      };
    }
  },

  // Fetch data for news page
  async getNewsPageData(page: number = 1) {
    try {
      const news = await postApi.getNews(page);
      return news;
    } catch (error) {
      console.error('Error fetching news page data:', error);
      return { data: [], current_page: 1, last_page: 1, total: 0 };
    }
  },

  // Fetch data for articles page
  async getArticlesPageData(page: number = 1) {
    try {
      const articles = await postApi.getArticles(page);
      return articles;
    } catch (error) {
      console.error('Error fetching articles page data:', error);
      return { data: [], current_page: 1, last_page: 1, total: 0 };
    }
  },

  // Fetch data for facilities page
  async getFacilitiesPageData() {
    try {
      const facilities = await facilityApi.getActive();
      return facilities;
    } catch (error) {
      console.error('Error fetching facilities page data:', error);
      return [];
    }
  },

  // Fetch data for activities page
  async getActivitiesPageData(page: number = 1) {
    try {
      const activities = await activityApi.getAll(page);
      return activities;
    } catch (error) {
      console.error('Error fetching activities page data:', error);
      return { data: [], current_page: 1, last_page: 1, total: 0 };
    }
  }
};

// Helper Functions
export const helpers = {
  // Get image URL with fallback
  getImageUrl(path: string | null | undefined): string {
    if (!path) return '/placeholder.jpg';
    if (path.startsWith('http')) return path;
    return `${siteConfig.api.imageBaseUrl}/${path}`;
  },

  // Format date
  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  },

  // Truncate text
  truncateText(text: string, maxLength: number = 100): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  },

  // Generate slug
  generateSlug(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  }
};

// Export all APIs for easy import
export {
  homeApi,
  teacherApi,
  postApi,
  profileApi,
  facilityApi,
  activityApi,
  linkApi
};

// Default export
export default {
  config: siteConfig,
  fetchers: dataFetchers,
  helpers,
  apis: {
    homeApi,
    teacherApi,
    postApi,
    profileApi,
    facilityApi,
    activityApi,
    linkApi
  }
};