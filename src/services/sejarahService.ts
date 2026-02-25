// src/services/sejarahService.ts
// Service untuk mengelola data sejarah singkat dari API

import { getApiUrl } from '@/lib/config';

// Interface untuk response API
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

// Interface untuk konten sejarah singkat
export interface SejarahSingkat {
  id: number;
  title: string;
  content: string;
  grid_type: 'grid-cols-1' | 'grid-cols-2' | 'grid-cols-3' | 'grid-cols-4';
  use_list_disc: boolean;
  list_items: Array<{ item: string }> | null;
  background_color: string;
  border_color: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Interface untuk pengaturan sejarah singkat
export interface SejarahSingkatSettings {
  id: number;
  title: string;
  subtitle: string;
  banner_desktop: string | null;
  banner_mobile: string | null;
  title_panel_bg_color: string;
  subtitle_panel_bg_color: string;
  mobile_panel_bg_color: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Interface untuk complete data
export interface SejarahSingkatComplete {
  settings: SejarahSingkatSettings;
  content: SejarahSingkat[];
}

class SejarahService {
  private async fetchApi<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(getApiUrl(endpoint));
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result: ApiResponse<T> = await response.json();
      if (!result.success) {
        throw new Error(result.message || 'API request failed');
      }
      return result.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  // Mendapatkan semua konten sejarah singkat
  async getAllSejarahSingkat(): Promise<SejarahSingkat[]> {
    return this.fetchApi<SejarahSingkat[]>('/sejarah-singkat');
  }

  // Mendapatkan konten sejarah singkat berdasarkan ID
  async getSejarahSingkatById(id: number): Promise<SejarahSingkat> {
    return this.fetchApi<SejarahSingkat>(`/sejarah-singkat/${id}`);
  }

  // Mendapatkan pengaturan halaman sejarah singkat
  async getSejarahSingkatSettings(): Promise<SejarahSingkatSettings> {
    return this.fetchApi<SejarahSingkatSettings>('/sejarah-singkat/settings');
  }

  // Mendapatkan semua data sejarah singkat (settings + content)
  async getCompleteSejarahSingkat(): Promise<SejarahSingkatComplete> {
    return this.fetchApi<SejarahSingkatComplete>('/sejarah-singkat/complete');
  }

  // Mendapatkan konten berdasarkan tipe grid
  async getSejarahSingkatByGridType(gridType: string): Promise<SejarahSingkat[]> {
    return this.fetchApi<SejarahSingkat[]>(`/sejarah-singkat/grid/${gridType}`);
  }

  // Mendapatkan konten yang menggunakan list items
  async getSejarahSingkatWithListItems(): Promise<SejarahSingkat[]> {
    return this.fetchApi<SejarahSingkat[]>('/sejarah-singkat/with-list-items');
  }

  // Helper function untuk mengurutkan konten berdasarkan order_index
  sortSejarahSingkatByOrder(sejarahSingkat: SejarahSingkat[]): SejarahSingkat[] {
    return [...sejarahSingkat].sort((a, b) => a.order_index - b.order_index);
  }

  // Helper function untuk mendapatkan banner URL
  getBannerUrl(bannerPath: string | null): string {
    if (!bannerPath) {
      return '/Frame 490.png'; // Fallback image
    }
    return bannerPath.startsWith('http') ? bannerPath : `${getApiUrl('')}${bannerPath}`;
  }
}

export const sejarahService = new SejarahService(); 