// src/services/facilityService.ts
// Service untuk mengelola data fasilitas dinamis

import { getApiUrl } from '@/lib/config';

// Types untuk API response
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Types untuk Facility Settings
export interface FacilitySettings {
  id: number;
  title: string;
  subtitle: string;
  banner_desktop: string | null;
  banner_mobile: string | null;
  title_panel_bg_color: string;
  subtitle_panel_bg_color: string;
  is_active: boolean;
}

// Types untuk Facility Box
export interface FacilityBox {
  id: number;
  title: string;
  description: string;
  icon: string | null;
  background_image: string | null;
  link_slug: string;
  bg_color: string;
  hover_bg_color: string;
  order_index: number;
  is_active: boolean;
  creates_sub_facility: boolean;
}

// Types untuk Facility
export interface Facility {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string | null;
  category: string;
  capacity: number;
  location: string;
  specifications: Record<string, string>;
  order_index: number;
}

// Types untuk Sub Facility Settings
export interface SubFacilitySettings {
  id: number;
  parent_slug: string;
  title: string;
  subtitle: string;
  banner_desktop: string | null;
  banner_mobile: string | null;
  title_panel_bg_color: string;
  subtitle_panel_bg_color: string;
  content_section_title: string;
  content_section_text: string;
  display_type: 'grid' | 'list' | 'gallery';
  show_photo_collage: boolean;
  is_active: boolean;
}

// Types untuk Sub Facility Box
export interface SubFacilityBox {
  id: number;
  parent_slug: string;
  title: string;
  description: string;
  icon: string | null;
  background_image: string | null;
  bg_color: string;
  hover_bg_color: string;
  order_index: number;
  is_active: boolean;
}

// Types untuk Sub Facility
export interface SubFacility {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string | null;
  category: string;
  capacity: number;
  location: string;
  specifications: Record<string, string>;
  order_index: number;
  parent_slug: string;
}

// Types untuk Facility Content
export interface FacilityContent {
  id: number;
  section_title: string;
  content: string;
  display_type: 'wysiwyg' | 'simple_text' | 'grid';
  show_photo_collage: boolean;
  order_index: number;
  is_active: boolean;
}

// Types untuk Facility Photo
export interface FacilityPhoto {
  id: number;
  title: string;
  description: string | null;
  image: string;
  alt_text: string | null;
  order_index: number;
  is_active: boolean;
}

// Types untuk Sub Facility Photo
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

// Types untuk complete data
export interface FacilityCompleteData {
  settings: FacilitySettings;
  content: FacilityContent[];
  photos: FacilityPhoto[];
  boxes: FacilityBox[];
  facilities: Facility[];
}

export interface SubFacilityCompleteData {
  settings: SubFacilitySettings;
  boxes: SubFacilityBox[];
  photos: SubFacilityPhoto[];
  facilities: SubFacility[];
}

class FacilityService {
  private async fetchApi<T>(endpoint: string): Promise<T> {
    try {
      const url = getApiUrl(endpoint);
      console.log('Fetching URL:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      });
      
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result: ApiResponse<T> = await response.json();
      console.log('Response data:', result);
      
      if (!result.success) {
        throw new Error(result.message || 'API request failed');
      }
      
      return result.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  // Main Facility Methods
  async getCompleteData(): Promise<FacilityCompleteData> {
    return this.fetchApi<FacilityCompleteData>('/facilities');
  }

  async getSettings(): Promise<FacilitySettings> {
    return this.fetchApi<FacilitySettings>('/facilities/settings');
  }

  async getBoxes(): Promise<FacilityBox[]> {
    return this.fetchApi<FacilityBox[]>('/facilities/boxes');
  }

  async getFacility(slug: string): Promise<Facility> {
    return this.fetchApi<Facility>(`/facilities/${slug}`);
  }

  // Sub Facility Methods
  async getSubFacilityCompleteData(parentSlug: string): Promise<SubFacilityCompleteData> {
    return this.fetchApi<SubFacilityCompleteData>(`/facilities/sub/${parentSlug}`);
  }

  async getSubFacilityByCategory(parentSlug: string, category: string): Promise<SubFacility[]> {
    return this.fetchApi<SubFacility[]>(`/facilities/sub/${parentSlug}/category/${category}`);
  }

  async getSubFacility(parentSlug: string, slug: string): Promise<SubFacility> {
    return this.fetchApi<SubFacility>(`/facilities/sub/${parentSlug}/${slug}`);
  }

  // Helper methods
  getActiveBoxes(boxes: FacilityBox[]): FacilityBox[] {
    return boxes
      .filter(box => box.is_active)
      .sort((a, b) => a.order_index - b.order_index);
  }

  getActiveFacilities(facilities: Facility[]): Facility[] {
    return facilities.sort((a, b) => a.order_index - b.order_index);
  }

  getActiveSubFacilityBoxes(boxes: SubFacilityBox[]): SubFacilityBox[] {
    return boxes
      .filter(box => box.is_active)
      .sort((a, b) => a.order_index - b.order_index);
  }

  getActiveSubFacilities(facilities: SubFacility[]): SubFacility[] {
    return facilities.sort((a, b) => a.order_index - b.order_index);
  }

  // Group facilities by category
  groupFacilitiesByCategory(facilities: Facility[]): Record<string, Facility[]> {
    return facilities.reduce((groups, facility) => {
      const category = facility.category;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(facility);
      return groups;
    }, {} as Record<string, Facility[]>);
  }

  groupSubFacilitiesByCategory(facilities: SubFacility[]): Record<string, SubFacility[]> {
    return facilities.reduce((groups, facility) => {
      const category = facility.category;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(facility);
      return groups;
    }, {} as Record<string, SubFacility[]>);
  }
}

export const facilityService = new FacilityService(); 