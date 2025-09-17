// Base URL untuk API
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.alkapro.id/api/v1';
// Origin tanpa suffix /api (/api/v1)
const API_ORIGIN = API_BASE.replace(/\/(api)(?:\/v\d+)?\/?$/i, '');

// Helper: buat URL absolut untuk asset dari storage
function toAbsoluteUrl(input: string | null | undefined): string | null {
  if (!input) return null;
  const url = String(input).trim();
  // Jika sudah absolut, kembalikan apa adanya
  if (/^https?:\/\//i.test(url)) return url;
  // Normalisasi awalan
  const cleaned = url.startsWith('/') ? url : `/${url}`;
  return `${API_ORIGIN}${cleaned}`;
}

// Generic fetch function untuk navigation dengan opsi fallback
async function fetchNavigationApi<T>(endpoints: string[]): Promise<T> {
  const errors: any[] = [];
  for (const endpoint of endpoints) {
    const url = `${API_BASE}${endpoint}`;
    try {
      const response = await fetch(url, {
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const result = await response.json();
      if (result && typeof result === 'object' && 'success' in result) {
        if (result.success === false) throw new Error('API success=false');
        return (result.data ?? result) as T;
      }
      return result as T;
    } catch (err) {
      errors.push({ endpoint: url, err });
      // lanjut ke endpoint berikutnya
    }
  }
  console.error('Navigation API fetch failed for all endpoints:', errors);
  throw new Error('All navigation endpoints failed');
}

// Types untuk Navigation API
export interface NavigationMenuItem {
  id: number;
  name: string;
  href: string;
  target: '_self' | '_blank';
  order_index: number;
  dropdown: NavigationMenuItem[];
}

export interface MarqueeItem {
  text: string;
  color: string;
  speed: 'slow' | 'normal' | 'fast';
}

export interface HeaderBranding {
  header_logo: string | null;
}

export interface HeaderData {
  menu: NavigationMenuItem[];
  branding: HeaderBranding;
  marquee: MarqueeItem[];
}

export interface FooterLink {
  id: number;
  name: string;
  href: string;
  target: '_self' | '_blank';
  order_index: number;
}

export interface FooterLinks {
  'menu-utama': FooterLink[];
  'informasi-akademik': FooterLink[];
  'sosial': FooterLink[];
  'lainnya': FooterLink[];
}

export interface FooterBranding {
  footer_brand_type: 'text' | 'image';
  footer_brand_text: string | null;
  footer_brand_image: string | null;
}

export interface FooterData {
  links: FooterLinks;
  branding: FooterBranding;
}

// Normalizer
function normalizeHeader(data: HeaderData): HeaderData {
  return {
    ...data,
    branding: {
      ...data.branding,
      header_logo: toAbsoluteUrl(data.branding?.header_logo),
    },
    menu: Array.isArray(data.menu) ? data.menu.map((m) => ({
      ...m,
      dropdown: Array.isArray(m.dropdown) ? m.dropdown : [],
    })) : [],
    marquee: Array.isArray(data.marquee) ? data.marquee.map((m) => ({
      ...m,
      color: m.color || '#ffffff',
      speed: m.speed || 'normal',
    })) : [],
  };
}

function normalizeFooter(data: any): FooterData {
  const linksRaw = data?.links ?? {};
  // Dukung underscore/dash keys
  const menuUtama = linksRaw['menu-utama'] ?? linksRaw['menu_utama'] ?? [];
  const infoAkademik = linksRaw['informasi-akademik'] ?? linksRaw['informasi_akademik'] ?? [];
  const sosial = linksRaw['sosial'] ?? [];
  const lainnya = linksRaw['lainnya'] ?? [];

  const branding = data?.branding ?? {};

  return {
    links: {
      'menu-utama': Array.isArray(menuUtama) ? menuUtama : [],
      'informasi-akademik': Array.isArray(infoAkademik) ? infoAkademik : [],
      'sosial': Array.isArray(sosial) ? sosial : [],
      'lainnya': Array.isArray(lainnya) ? lainnya : [],
    },
    branding: {
      footer_brand_type: branding.footer_brand_type ?? 'text',
      footer_brand_text: branding.footer_brand_text ?? null,
      footer_brand_image: toAbsoluteUrl(branding.footer_brand_image ?? null),
    },
  } as FooterData;
}

// Navigation API Service
export const navigationApi = {
  // Header API
  getHeader: async (): Promise<HeaderData> => {
    try {
      const data = await fetchNavigationApi<HeaderData>([
        '/navigation/header',
        '/v1/navigation/header',
      ]);
      return normalizeHeader(data);
    } catch (error) {
      console.error('Error fetching header data:', error);
      // Return default data jika API gagal
      return {
        menu: [],
        branding: { header_logo: null },
        marquee: [
          {
            text: "Selamat datang di SMP Al-Kautsar",
            color: "#ffffff",
            speed: "normal"
          },
          {
            text: "Mendidik dengan Hati, Membentuk Karakter Islami",
            color: "#ffffff",
            speed: "normal"
          },
          {
            text: "Portal Informasi Terdepan untuk Masa Depan Cemerlang",
            color: "#ffffff",
            speed: "normal"
          }
        ],
      };
    }
  },

  // Footer API
  getFooter: async (): Promise<FooterData> => {
    try {
      const data = await fetchNavigationApi<any>([
        '/navigation/footer',
        '/v1/navigation/footer',
      ]);
      return normalizeFooter(data);
    } catch (error) {
      console.error('Error fetching footer data:', error);
      // Return default data jika API gagal
      return {
        links: {
          'menu-utama': [],
          'informasi-akademik': [],
          'sosial': [],
          'lainnya': [],
        },
        branding: {
          footer_brand_type: 'text',
          footer_brand_text: 'SMP Muhammadiyah Al Kautsar PK Kartasura',
          footer_brand_image: null,
        },
      };
    }
  },
}; 