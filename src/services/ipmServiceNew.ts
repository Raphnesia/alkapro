// src/services/ipmServiceNew.ts
// Service untuk IPM API integration dengan struktur bidang kompleks

import { getApiUrl } from '@/lib/config';

export interface IPMSettings {
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

export interface IPMPengurus {
  id: number;
  position: string;
  name: string;
  photo: string;
  kelas: string;
  description: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface IPMBidangMember {
  name: string;
  position?: string;
}

export interface IPMBidangStructure {
  bidang_name: string;
  members: IPMBidangMember[];
}

export interface IPMContent {
  id: number;
  title: string;
  content: string;
  grid_type: string;
  use_list_disc: boolean;
  list_items: { item: string }[] | null;
  bidang_structure: IPMBidangStructure[] | null;
  background_color: string;
  border_color: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface IPMCompleteData {
  settings: IPMSettings | null;
  pengurus: IPMPengurus[];
  content: IPMContent[];
}

export class IPMService {
  private static instance: IPMService;

  private constructor() {}

  public static getInstance(): IPMService {
    if (!IPMService.instance) {
      IPMService.instance = new IPMService();
    }
    return IPMService.instance;
  }

  // Get complete IPM data (settings + content + pengurus)
  async getCompleteData(): Promise<IPMCompleteData | null> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
      const response = await fetch(getApiUrl('/ipm/complete'), {
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
      console.error('Error fetching IPM complete data:', error);
      return null;
    }
  }

  // Get IPM settings only
  async getSettings(): Promise<IPMSettings | null> {
    try {
      const response = await fetch(getApiUrl('/ipm/settings'));
      const result = await response.json();
      
      if (result.success) {
        return result.data;
      }
      return null;
    } catch (error) {
      console.error('Error fetching IPM settings:', error);
      return null;
    }
  }

  // Get all IPM pengurus
  async getPengurus(): Promise<IPMPengurus[] | null> {
    try {
      const response = await fetch(getApiUrl('/ipm'));
      const result = await response.json();
      
      if (result.success) {
        return result.data;
      }
      return null;
    } catch (error) {
      console.error('Error fetching IPM pengurus:', error);
      return null;
    }
  }

  // Get IPM content
  async getContent(): Promise<IPMContent[] | null> {
    try {
      const response = await fetch(getApiUrl('/ipm-content'));
      const result = await response.json();
      
      if (result.success) {
        return result.data;
      }
      return null;
    } catch (error) {
      console.error('Error fetching IPM content:', error);
      return null;
    }
  }

  // Get single IPM pengurus by ID
  async getPengurusById(id: number): Promise<IPMPengurus | null> {
    try {
      const response = await fetch(getApiUrl(`/ipm/${id}`));
      const result = await response.json();
      
      if (result.success) {
        return result.data;
      }
      return null;
    } catch (error) {
      console.error('Error fetching IPM pengurus by ID:', error);
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

  // Get photo URL with fallback
  getPhotoUrl(photoUrl: string): string {
    if (!photoUrl) {
      return '/guru/Cindy-Trisnawati-S.Pd-M.Pd_.jpg'; // Fallback image
    }
    return photoUrl;
  }
}

export const ipmService = IPMService.getInstance(); 