// src/services/strukturOrganisasiService.ts
// Service untuk Struktur Organisasi API integration dengan struktur kompleks

import { getApiUrl } from '@/lib/config';

export interface StrukturOrganisasiSettings {
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

export interface StrukturOrganisasiData {
  id: number;
  position: string;
  name: string;
  photo: string;
  description: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface StrukturOrganisasiBidangMember {
  name: string;
  position?: string;
}

export interface StrukturOrganisasiBidangStructure {
  bidang_name: string;
  members: StrukturOrganisasiBidangMember[];
}

export interface StrukturOrganisasiContent {
  id: number;
  title: string;
  content: string;
  grid_type: string;
  use_list_disc: boolean;
  list_items: { item: string }[] | null;
  bidang_structure: StrukturOrganisasiBidangStructure[] | null;
  display_type: 'list' | 'bagan';
  background_color: string;
  border_color: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface StrukturOrganisasiCompleteData {
  settings: StrukturOrganisasiSettings | null;
  struktur_organisasi: StrukturOrganisasiData[];
  content: StrukturOrganisasiContent[];
}

export class StrukturOrganisasiService {
  private static instance: StrukturOrganisasiService;

  private constructor() {}

  public static getInstance(): StrukturOrganisasiService {
    if (!StrukturOrganisasiService.instance) {
      StrukturOrganisasiService.instance = new StrukturOrganisasiService();
    }
    return StrukturOrganisasiService.instance;
  }

  // Get complete Struktur Organisasi data (settings + struktur_organisasi + content)
  async getCompleteData(): Promise<StrukturOrganisasiCompleteData | null> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
      const response = await fetch(getApiUrl('/struktur-organisasi/complete'), {
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
      console.error('Error fetching Struktur Organisasi complete data:', error);
      return null;
    }
  }

  // Get Struktur Organisasi settings only
  async getSettings(): Promise<StrukturOrganisasiSettings | null> {
    try {
      const response = await fetch(getApiUrl('/struktur-organisasi/settings'));
      const result = await response.json();
      
      if (result.success) {
        return result.data;
      }
      return null;
    } catch (error) {
      console.error('Error fetching Struktur Organisasi settings:', error);
      return null;
    }
  }

  // Get all Struktur Organisasi data
  async getAllData(): Promise<StrukturOrganisasiData[] | null> {
    try {
      const response = await fetch(getApiUrl('/struktur-organisasi'));
      const result = await response.json();
      
      if (result.success) {
        return result.data;
      }
      return null;
    } catch (error) {
      console.error('Error fetching Struktur Organisasi data:', error);
      return null;
    }
  }

  // Get Struktur Organisasi content
  async getContent(): Promise<StrukturOrganisasiContent[] | null> {
    try {
      const response = await fetch(getApiUrl('/struktur-organisasi-content'));
      const result = await response.json();
      
      if (result.success) {
        return result.data;
      }
      return null;
    } catch (error) {
      console.error('Error fetching Struktur Organisasi content:', error);
      return null;
    }
  }

  // Get content with bidang structure only
  async getContentWithBidangStructure(): Promise<StrukturOrganisasiContent[] | null> {
    try {
      const response = await fetch(getApiUrl('/struktur-organisasi-content/with-bidang-structure'));
      const result = await response.json();
      
      if (result.success) {
        return result.data;
      }
      return null;
    } catch (error) {
      console.error('Error fetching Struktur Organisasi content with bidang structure:', error);
      return null;
    }
  }

  // Get content by display type
  async getContentByDisplayType(displayType: 'list' | 'bagan'): Promise<StrukturOrganisasiContent[] | null> {
    try {
      const response = await fetch(getApiUrl(`/struktur-organisasi-content/display/${displayType}`));
      const result = await response.json();
      
      if (result.success) {
        return result.data;
      }
      return null;
    } catch (error) {
      console.error('Error fetching Struktur Organisasi content by display type:', error);
      return null;
    }
  }

  // Get single Struktur Organisasi data by ID
  async getDataById(id: number): Promise<StrukturOrganisasiData | null> {
    try {
      const response = await fetch(getApiUrl(`/struktur-organisasi/${id}`));
      const result = await response.json();
      
      if (result.success) {
        return result.data;
      }
      return null;
    } catch (error) {
      console.error('Error fetching Struktur Organisasi data by ID:', error);
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

export const strukturOrganisasiService = StrukturOrganisasiService.getInstance(); 