// src/services/visiMisiServiceNew.ts
// Service untuk Visi Misi API integration dengan konfigurasi yang benar

import { getApiUrl } from '@/lib/config';

export interface VisiMisiSettings {
  id: number;
  title: string;
  subtitle: string;
  banner_desktop: string;
  banner_mobile: string;
  title_panel_bg_color: string;
  subtitle_panel_bg_color: string;
  mobile_panel_bg_color: string;
  is_active: boolean;
}

export interface VisiMisiContent {
  id: number;
  title: string;
  content: string;
  grid_type: 'grid-cols-1' | 'grid-cols-2' | 'grid-cols-3' | 'grid-cols-4';
  use_list_disc: boolean;
  list_items: { item: string }[] | null;
  background_color: string;
  border_color: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface VisiMisiCompleteData {
  settings: VisiMisiSettings;
  content: VisiMisiContent[];
}

export class VisiMisiService {
  private static instance: VisiMisiService;

  private constructor() {}

  public static getInstance(): VisiMisiService {
    if (!VisiMisiService.instance) {
      VisiMisiService.instance = new VisiMisiService();
    }
    return VisiMisiService.instance;
  }

  // Get complete Visi Misi data (settings + content)
  async getCompleteData(): Promise<VisiMisiCompleteData | null> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
      const response = await fetch(getApiUrl('/visi-misi/complete'), {
        signal: controller.signal,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors',
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        return result.data;
      }
      return null;
    } catch (error) {
      console.error('Error fetching Visi Misi complete data:', error);
      return null;
    }
  }

  // Get Visi Misi settings only
  async getSettings(): Promise<VisiMisiSettings | null> {
    try {
      const response = await fetch(getApiUrl('/visi-misi/settings'));
      const result = await response.json();
      
      if (result.success) {
        return result.data;
      }
      return null;
    } catch (error) {
      console.error('Error fetching Visi Misi settings:', error);
      return null;
    }
  }

  // Get all Visi Misi content
  async getAllContent(): Promise<VisiMisiContent[] | null> {
    try {
      const response = await fetch(getApiUrl('/visi-misi'));
      const result = await response.json();
      
      if (result.success) {
        return result.data;
      }
      return null;
    } catch (error) {
      console.error('Error fetching Visi Misi content:', error);
      return null;
    }
  }

  // Get single Visi Misi content by ID
  async getContentById(id: number): Promise<VisiMisiContent | null> {
    try {
      const response = await fetch(getApiUrl(`/visi-misi/${id}`));
      const result = await response.json();
      
      if (result.success) {
        return result.data;
      }
      return null;
    } catch (error) {
      console.error('Error fetching Visi Misi content by ID:', error);
      return null;
    }
  }

  // Get content by grid type
  async getContentByGridType(gridType: string): Promise<VisiMisiContent[] | null> {
    try {
      const response = await fetch(getApiUrl(`/visi-misi/grid-type/${encodeURIComponent(gridType)}`));
      const result = await response.json();
      
      if (result.success) {
        return result.data;
      }
      return null;
    } catch (error) {
      console.error('Error fetching Visi Misi content by grid type:', error);
      return null;
    }
  }

  // Get content with list items
  async getContentWithListItems(): Promise<VisiMisiContent[] | null> {
    try {
      const response = await fetch(getApiUrl('/visi-misi/with-list-items'));
      const result = await response.json();
      
      if (result.success) {
        return result.data;
      }
      return null;
    } catch (error) {
      console.error('Error fetching Visi Misi content with list items:', error);
      return null;
    }
  }

  // Get banner URL with fallback
  getBannerUrl(imageUrl: string): string {
    if (!imageUrl) {
      return '/guru/Adam-Muttaqien-M.Si_.jpg'; // Fallback image
    }
    return imageUrl;
  }
}

export const visiMisiService = VisiMisiService.getInstance(); 