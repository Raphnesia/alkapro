// Resolve API base robustly: avoid relative values like "/api" that point to Next origin
const RAW_API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_API_URL;
const API_BASE = (() => {
  // Default dev backend
  const defaultBase = 'https://api.alkapro.id/api';

  // Helper: strip any trailing /api or /api/v{n}
  const stripApiSuffix = (base: string) => base.replace(/\/(api)(?:\/v\d+)?\/?$/i, '');

  // Helper: ensure trailing '/api' exists exactly once
  const ensureApiSuffix = (base: string) => {
    const trimmed = base.replace(/\/$/, '');
    if (/\/api$/i.test(trimmed)) return trimmed; // already has /api
    return `${trimmed}/api`;
  };

  // Absolute URL provided
  if (RAW_API_BASE && /^https?:\/\//i.test(RAW_API_BASE)) {
    const noSuffix = stripApiSuffix(RAW_API_BASE);
    return ensureApiSuffix(noSuffix);
  }

  // Not provided or relative → fallback to default
  return defaultBase;
})();

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

// Generic fetch function
async function fetchApi<T>(endpoint: string, options?: RequestInit & { lang?: string }): Promise<T> {
  const url = `${API_BASE}${endpoint}`;
  
  try {
    // Build headers safely: avoid setting Content-Type for GET to prevent CORS preflight
    const shouldSetJsonContentType = (
      (options?.method && options.method.toUpperCase() !== 'GET') ||
      (options as any)?.body !== undefined
    );
    const headers: HeadersInit = {
      ...(options?.headers || {}),
      ...(shouldSetJsonContentType ? { 'Content-Type': 'application/json' } : {}),
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} for ${url}`);
    }

    const result = await response.json();
    
    // Handle both direct response and wrapped response formats
    if ((result as ApiResponse<T>)?.success !== undefined) {
      // Wrapped response format: { success: boolean, data: T }
      const wrapped = result as ApiResponse<T>;
      if (!wrapped.success) {
        throw new Error('API request failed');
      }
      return wrapped.data;
    } else {
      // Direct response format
      return result as T;
    }
  } catch (error) {
    console.error('API fetch error:', error);
    throw error;
  }
}

// Home Sections API v1 per docs
export interface SocialSettings {
  instagram_user_id?: string;
  instagram_access_token_masked?: string;
  tiktok_user_id?: string | null;
  tiktok_access_token_masked?: string | null;
  instagram_follow_url?: string | null;
  tiktok_follow_url?: string | null;
  is_configured?: boolean;
}

export interface InstagramApiPost {
  id: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  thumbnail_url?: string;
  caption?: string;
  permalink: string;
  timestamp: string;
}

export interface HeroVideoItem {
  id: number;
  source_type: 'upload' | 'url';
  video_desktop?: string;
  video_mobile?: string;
  poster_image?: string;
  is_active?: boolean;
  order_index?: number;
}

export const homeApi = {
  // Tahan error agar tidak memutus Promise.all di halaman beranda
  byType: async (type: string) => {
    try {
      // Jika berjalan di browser, gunakan proxy internal untuk menghindari CORS
      if (typeof window !== 'undefined') {
        try {
          const res = await fetch(`/api/proxy/v1/home-sections/type/${type}`, { cache: 'no-store' })
          if (res.ok) {
            const json = await res.json()
            const data = Array.isArray(json?.data) ? json.data : (Array.isArray(json) ? json : [])
            return data as HomeSection[]
          }
        } catch (e) {
          console.warn('[homeApi.byType] proxy fetch failed, falling back to direct:', e instanceof Error ? e.message : String(e))
        }
      }

      // Server-side atau fallback direct fetch
      return await fetchApi<HomeSection[]>(`/v1/home-sections/type/${type}`, { cache: 'no-store' })
    } catch (error: any) {
      const message: string = error?.message || ''
      // Fallback untuk backend tanpa prefix /v1
      try {
        return await fetchApi<HomeSection[]>(`/home-sections/type/${type}`, { cache: 'no-store' })
      } catch (_) {
        console.warn(`[homeApi.byType] fallback failed for type="${type}":`, message)
        return [] as HomeSection[]
      }
    }
  },
  // Ambil tipe pertama yang cepat merespons (parallel + abort sisanya)
  byTypesFirst: async (types: string[], opts?: { timeoutMs?: number }) => {
    const timeoutMs = opts?.timeoutMs ?? 2000
    const controllers = types.map(() => new AbortController())
    const timers: any[] = []
    const makeUrl = (type: string, useV1: boolean) => `${API_BASE}/v1/home-sections/type/${type}`
    const startFetch = (type: string, idx: number) => (
      (async () => {
        const controller = controllers[idx]
        // Timer untuk timeout
        timers[idx] = setTimeout(() => controller.abort('timeout'), timeoutMs)
        try {
          // Coba v1 dulu
          let res = await fetch(makeUrl(type, true), { cache: 'no-store', headers: { 'Accept': 'application/json' }, signal: controller.signal as any })
          if (!res.ok) {
            // Fallback tanpa v1
            res = await fetch(`${API_BASE}/home-sections/type/${type}`, { cache: 'no-store', headers: { 'Accept': 'application/json' }, signal: controller.signal as any })
          }
          if (!res.ok) throw new Error(String(res.status))
          const json = await res.json()
          const data = Array.isArray(json?.data) ? json.data : (Array.isArray(json) ? json : [])
          if (!data.length) throw new Error('empty')
          return data as HomeSection[]
        } finally {
          clearTimeout(timers[idx])
        }
      })()
    )
    try {
      const result = await Promise.any(types.map((t, i) => startFetch(t, i)))
      // Abort semua yang lain
      controllers.forEach(c => { try { c.abort('won') } catch {} })
      return result
    } catch {
      // Jika semua gagal, kembalikan []
      controllers.forEach(c => { try { c.abort('done') } catch {} })
      return [] as HomeSection[]
    } finally {
      timers.forEach(t => clearTimeout(t))
    }
  },
  getSections: async () => {
    try {
      return await fetchApi<HomeSection[]>(`/v1/home-sections/active`, { cache: 'no-store' })
    } catch (error: any) {
      try {
        return await fetchApi<HomeSection[]>(`/home-sections/active`, { cache: 'no-store' })
      } catch (_) {
        return [] as HomeSection[]
      }
    }
  },
  getAllSections: async () => {
    try {
      return await fetchApi<HomeSection[]>(`/v1/home-sections`, { cache: 'no-store' })
    } catch (error: any) {
      try {
        return await fetchApi<HomeSection[]>(`/home-sections`, { cache: 'no-store' })
      } catch (_) {
        return [] as HomeSection[]
      }
    }
  },
  heroVideosActive: async () => {
    try {
      return await fetchApi<HeroVideoItem[]>(`/v1/home-hero-videos/active`, { cache: 'no-store' })
    } catch (error: any) {
      try {
        return await fetchApi<HeroVideoItem[]>(`/home-hero-videos/active`, { cache: 'no-store' })
      } catch (_) {
        return [] as HeroVideoItem[]
      }
    }
  },
  social: {
    settings: async () => {
      try {
        return await fetchApi<SocialSettings>(`/v1/social-media/settings`, { cache: 'no-store' })
      } catch (error: any) {
        try {
          return await fetchApi<SocialSettings>(`/social-media/settings`, { cache: 'no-store' })
        } catch (_) {
          return {} as SocialSettings
        }
      }
    },
    instagram: async () => {
      try {
        return await fetchApi<InstagramApiPost[]>(`/v1/social-media/instagram`, { cache: 'no-store' })
      } catch (error: any) {
        try {
          return await fetchApi<InstagramApiPost[]>(`/social-media/instagram`, { cache: 'no-store' })
        } catch (_) {
          return [] as InstagramApiPost[]
        }
      }
    },
  },
};

// Teachers API
export const teacherApi = {
  getAll: () => fetchApi<Teacher[]>('/teachers'),
  getTeachers: () => fetchApi<Teacher[]>('/teachers/teachers'),
  getStaff: () => fetchApi<Teacher[]>('/teachers/staff'),
  getById: (id: string) => fetchApi<Teacher>(`/teachers/${id}`),
};

// Posts API (News & Articles)
export const postApi = {
  getAll: (page: number = 1) => fetchApi<PaginatedResponse<Post>>(`/posts?page=${page}`),
  getNews: async (page: number = 1) => {
    try {
      // Backend baru: /api/v1/news
      return await fetchApi<PaginatedResponse<Post>>(`/v1/news?page=${page}`, { cache: 'no-store' })
    } catch (e1) {
      try {
        // Fallback: /news
        return await fetchApi<PaginatedResponse<Post>>(`/news?page=${page}`, { cache: 'no-store' })
      } catch (e2) {
        // Fallback lama: /posts/news
        return await fetchApi<PaginatedResponse<Post>>(`/posts/news?page=${page}`, { cache: 'no-store' })
      }
    }
  },
  getArticles: async (page: number = 1) => {
    try {
      return await fetchApi<PaginatedResponse<Post>>(`/v1/articles?page=${page}`, { cache: 'no-store' })
    } catch (e1) {
      return await fetchApi<PaginatedResponse<Post>>(`/articles?page=${page}`, { cache: 'no-store' })
    }
  },
  getBySlug: (slug: string) => fetchApi<Post>(`/posts/${slug}`),
  getByCategory: (category: string, page: number = 1) => 
    fetchApi<PaginatedResponse<Post>>(`/posts/category/${category}?page=${page}`, { cache: 'no-store' }),
};

// Profile Sections API
export const profileApi = {
  getAll: () => fetchApi<ProfileSection[]>('/profile-sections'),
  getByType: (type: string) => fetchApi<ProfileSection[]>(`/profile-sections/${type}`),
  getBySlug: (slug: string) => fetchApi<ProfileSection>(`/profile-sections/${slug}`),
};

// Popup Settings Interface
export interface PopupSettings {
  id?: number;
  is_active: boolean;
  image_url: string;
  image_alt?: string;
  link_url?: string;
  open_in_new_tab?: boolean;
  show_on_first_visit_only?: boolean;
  delay_before_show?: number; // in milliseconds
  expires_at?: string; // ISO date string
  created_at?: string;
  updated_at?: string;
}

// Popup Settings API
export const popupApi = {
  getSettings: () => fetchApi<PopupSettings>('/popup-settings', { cache: 'no-store' }),
};

// Facilities API
export const facilityApi = {
  getAll: () => fetchApi<Facility[]>('/facilities'),
  getActive: () => fetchApi<Facility[]>('/facilities/active'),
  getByCategory: (category: string) => fetchApi<Facility[]>(`/facilities/category/${category}`),
  getById: (id: string) => fetchApi<Facility>(`/facilities/${id}`),
};

// School Activities API
export const activityApi = {
  getAll: (page: number = 1) => fetchApi<PaginatedResponse<SchoolActivity>>(`/school-activities?page=${page}`),
  getUpcoming: (page: number = 1) => fetchApi<PaginatedResponse<SchoolActivity>>(`/school-activities/upcoming?page=${page}`),
  getPast: (page: number = 1) => fetchApi<PaginatedResponse<SchoolActivity>>(`/school-activities/past?page=${page}`),
  getByCategory: (category: string, page: number = 1) => 
    fetchApi<PaginatedResponse<SchoolActivity>>(`/school-activities/category/${category}?page=${page}`),
  getBySlug: (slug: string) => fetchApi<SchoolActivity>(`/school-activities/${slug}`),
};

// Links API
export const linkApi = {
  getAll: () => fetchApi<Link[]>('/links'),
  getSocialMedia: () => fetchApi<Link[]>('/links/social-media'),
  getQuickLinks: () => fetchApi<Link[]>('/links/quick-links'),
  getByCategory: (category: string) => fetchApi<Link[]>(`/links/category/${category}`),
  getById: (id: string) => fetchApi<Link>(`/links/${id}`),
};

// Profil API
export type ProfilSettings = {
  title?: string;
  subtitle?: string;
  banner_desktop?: string;
  banner_mobile?: string;
  description?: string;
  meta_description?: string;
  meta_keywords?: string;
  is_active?: boolean;
}

export const profilApi = {
  async getSettings(): Promise<ProfilSettings | null> {
    try {
      return await fetchApi<ProfilSettings>('/v1/profil/settings', { cache: 'no-store' })
    } catch (e1) {
      try {
        return await fetchApi<ProfilSettings>('/profil/settings', { cache: 'no-store' })
      } catch (e2) {
        return null
      }
    }
  }
}

// Info PPDB API
export type InfoPPDBSettings = {
  hero?: {
    title?: string;
    subtitle?: string;
    banner_desktop?: string;
    banner_mobile?: string;
    description?: string;
    cta?: { text?: string; link?: string };
  };
  introduction?: { badge?: string; title?: string; subtitle?: string };
  featured?: {
    image?: string;
    overlay_title?: string;
    overlay_desc?: string;
    badge?: string;
  };
  key_points?: Array<{ icon?: string; title?: string; description?: string }>;
  alur?: {
    title?: string;
    subtitle?: string;
    image?: string;
    steps?: Array<{ icon?: string; title?: string; description?: string }>;
  };
  program_options?: {
    badge?: string;
    title?: string;
    subtitle?: string;
    rows?: Array<{
      reverse?: boolean;
      badge?: string;
      title?: string;
      description?: string;
      image?: string;
    }>;
  };
  cta_footer?: {
    background?: string;
    badge?: string;
    title?: string;
    description?: string;
    primary?: { label?: string; url?: string };
    secondary?: { label?: string; url?: string };
    contact_info?: string;
  };
  meta?: {
    registration_deadline?: string;
    academic_year?: string;
    is_registration_open?: boolean;
    meta_description?: string;
    meta_keywords?: string;
  };
};

export const infoPPDBApi = {
  async getSettings(): Promise<InfoPPDBSettings> {
    try {
      return await fetchApi<InfoPPDBSettings>('/v1/info-ppdb/settings', { cache: 'no-store' })
    } catch (e1) {
      try {
        return await fetchApi<InfoPPDBSettings>('/info-ppdb/settings', { cache: 'no-store' })
      } catch (e2) {
        return {} as InfoPPDBSettings
      }
    }
  }
};

// Type definitions
export interface HomeSection {
  id: number;
  title: string;
  content: string;
  image: string;
  section_type: string;
  order_index: number;
  is_active: boolean;
  config_data: any;
}

export interface Teacher {
  id: number;
  name: string;
  subject: string;
  photo: string;
  bio: string;
  position: string;
  education: string;
  experience: string;
  order_index: number;
  is_active: boolean;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  subtitle?: string;
  image: string;
  category: string;
  type: 'news' | 'article';
  author: string;
  tags: string[];
  meta_description: string;
  published_at: string;
  read_time: number;
}

export interface ProfileSection {
  id: number;
  title: string;
  slug: string;
  content: string;
  image: string;
  icon: string;
  type: string;
  order_index: number;
  is_active: boolean;
  additional_data: any;
}

export interface Facility {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
  capacity: number;
  order_index: number;
  is_active: boolean;
}

export interface SchoolActivity {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  image: string;
  gallery: string[];
  date: string;
  location: string;
  category: string;
  participants: string[];
  is_active: boolean;
}

export interface Link {
  id: number;
  title: string;
  url: string;
  icon: string;
  category: string;
  target: string;
  rel: string;
  order_index: number;
  is_active: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
}

// Program Khusus API v1
export type ProgramCard = {
  id: 'ict' | 'tahfidz';
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  color?: string;
  href?: string;
  features?: Array<{ feature: string }> | string[];
};

export type Reason = {
  icon?: string;
  title: string;
  description: string;
};

export type KeyPoint = {
  icon?: string;
  title: string;
  description: string;
};

export type FeatureItem = {
  icon?: string;
  title: string;
  description: string;
};

export type BenefitItem = {
  badge_label?: string;
  title: string;
  description: string;
  image?: string;
  layout?: 'imageLeft' | 'imageRight';
};

export type GalleryItem = {
  src?: string;
  title: string;
  desc: string;
  color_gradient?: string;
};

export type ProgramKhususPage = {
  hero_title?: string;
  hero_subtitle?: string;
  hero_image_desktop?: string;
  hero_image_mobile?: string;
  overview_title?: string;
  overview_subtitle?: string;
  // Program Khusus Section (untuk section khusus)
  section_title?: string;
  section_subtitle?: string;
  section_programs?: ProgramCard[];
  programs?: ProgramCard[];
  reasons_title?: string;
  reasons_subtitle?: string;
  reasons?: Reason[];
  cta_title?: string;
  cta_subtitle?: string;
  cta_primary_label?: string;
  cta_primary_url?: string;
  cta_secondary_label?: string;
  cta_secondary_url?: string;
  is_active?: boolean;
};

export type ProgramKhususType = {
  slug: 'ict' | 'tahfidz';
  title?: string;
  subtitle?: string;
  banner_desktop?: string;
  banner_mobile?: string;
  intro_badge?: string;
  intro_title?: string;
  intro_subtitle?: string;
  featured_image?: string;
  featured_overlay_title?: string;
  featured_overlay_desc?: string;
  featured_badge?: string;
  key_points?: KeyPoint[];
  features_title?: string;
  features_subtitle?: string;
  features_image?: string;
  features_items?: FeatureItem[];
  benefits_badge?: string;
  benefits_title?: string;
  benefits_subtitle?: string;
  benefits_items?: BenefitItem[];
  gallery_title?: string;
  gallery_subtitle?: string;
  gallery_items?: GalleryItem[];
  cta_background?: string;
  cta_badge?: string;
  cta_title?: string;
  cta_subtitle?: string;
  cta_description?: string;
  cta_primary_label?: string;
  cta_primary_url?: string;
  cta_secondary_label?: string;
  cta_secondary_url?: string;
  is_active?: boolean;
};

export type ProgramKhususIndexData = {
  page: ProgramKhususPage;
  types: {
    ict?: ProgramKhususType;
    tahfidz?: ProgramKhususType;
  };
};

export const programKhususApi = {
  getIndex: () => fetchApi<ProgramKhususIndexData>('/v1/program-khusus', { cache: 'no-store' }),
  // Return null on 404 per docs
  getType: async (slug: 'ict' | 'tahfidz'): Promise<ProgramKhususType | null> => {
    const url = `${API_BASE}/v1/program-khusus/${slug}`
    
    try {
      const response = await fetch(url, { cache: 'no-store', headers: { 'Content-Type': 'application/json' } })
      
      if (response.status === 404) {
        return null
      }
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result = await response.json()
      
      if (result?.success === false) {
        return null
      }
      
      return (result?.data || result) as ProgramKhususType
    } catch (error) {
      throw error
    }
  },
  getTypes: () => fetchApi<{ slug: string; title: string; is_active: boolean }[]>('/v1/program-khusus-types', { cache: 'no-store' }),
  // CRUD endpoints
  createPage: (data: Partial<ProgramKhususPage>) => fetchApi<ProgramKhususPage>('/v1/program-khusus/page', { 
    method: 'POST', 
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  }),
  updatePage: (id: number, data: Partial<ProgramKhususPage>) => fetchApi<ProgramKhususPage>(`/v1/program-khusus/page/${id}`, { 
    method: 'PUT', 
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  }),
  deletePage: (id: number) => fetchApi<{ success: boolean }>(`/v1/program-khusus/page/${id}`, { method: 'DELETE' }),
  createType: (data: Partial<ProgramKhususType> & { slug: string }) => fetchApi<ProgramKhususType>('/v1/program-khusus/type', { 
    method: 'POST', 
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  }),
  updateType: (slug: string, data: Partial<ProgramKhususType>) => fetchApi<ProgramKhususType>(`/v1/program-khusus/type/${slug}`, { 
    method: 'PUT', 
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  }),
  deleteType: (slug: string) => fetchApi<{ success: boolean }>(`/v1/program-khusus/type/${slug}`, { method: 'DELETE' }),
};