// src/services/ekstrakurikulerService.ts
// Service untuk Ekstrakurikuler API integration

import { getApiUrl } from '@/lib/config';

export interface EkstrakurikulerSettings {
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

export interface EkstrakurikulerData {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  jadwal: string;
  location: string;
  pembina: string;
  description: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface EkstrakurikulerCompleteData {
  settings: EkstrakurikulerSettings | null;
  content: EkstrakurikulerData[];
}

export class EkstrakurikulerService {
  private static instance: EkstrakurikulerService;

  private constructor() {}

  public static getInstance(): EkstrakurikulerService {
    if (!EkstrakurikulerService.instance) {
      EkstrakurikulerService.instance = new EkstrakurikulerService();
    }
    return EkstrakurikulerService.instance;
  }

  // Get complete ekstrakurikuler data (settings + content)
  async getCompleteData(): Promise<EkstrakurikulerCompleteData | null> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
      const response = await fetch(getApiUrl('/ekstrakurikuler/complete'), {
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
      } else {
        console.error('API returned error:', result.message);
        return null;
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          console.error('Request timeout');
        } else {
          console.error('Fetch error:', error.message);
        }
      } else {
        console.error('Unknown error:', error);
      }
      return null;
    }
  }

  // Get ekstrakurikuler settings only
  async getSettings(): Promise<EkstrakurikulerSettings | null> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch(getApiUrl('/ekstrakurikuler/settings'), {
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
      } else {
        console.error('API returned error:', result.message);
        return null;
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          console.error('Request timeout');
        } else {
          console.error('Fetch error:', error.message);
        }
      } else {
        console.error('Unknown error:', error);
      }
      return null;
    }
  }

  // Get all ekstrakurikuler content
  async getContent(): Promise<EkstrakurikulerData[] | null> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch(getApiUrl('/ekstrakurikuler'), {
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
      } else {
        console.error('API returned error:', result.message);
        return null;
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          console.error('Request timeout');
        } else {
          console.error('Fetch error:', error.message);
        }
      } else {
        console.error('Unknown error:', error);
      }
      return null;
    }
  }

  // Get ekstrakurikuler by category
  async getContentByCategory(category: string): Promise<EkstrakurikulerData[] | null> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch(getApiUrl(`/ekstrakurikuler/category/${category}`), {
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
      } else {
        console.error('API returned error:', result.message);
        return null;
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          console.error('Request timeout');
        } else {
          console.error('Fetch error:', error.message);
        }
      } else {
        console.error('Unknown error:', error);
      }
      return null;
    }
  }

  // Get single ekstrakurikuler by ID
  async getContentById(id: number): Promise<EkstrakurikulerData | null> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch(getApiUrl(`/ekstrakurikuler/${id}`), {
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
      } else {
        console.error('API returned error:', result.message);
        return null;
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          console.error('Request timeout');
        } else {
          console.error('Fetch error:', error.message);
        }
      } else {
        console.error('Unknown error:', error);
      }
      return null;
    }
  }

  // Get banner URL with fallback
  getBannerUrl(imageUrl: string): string {
    if (!imageUrl) {
      return '/guru/Adam-Muttaqien-M.Si_.jpg'; // Fallback image
    }
    
    // If it's already a full URL, return as is
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    
    // If it's a relative path, prepend the base URL
    return `${getApiUrl('').replace('/api/v1', '')}${imageUrl}`;
  }

  // Get image URL with fallback
  getImageUrl(imageUrl: string): string {
    if (!imageUrl) {
      return '/guru/611115.jpeg'; // Fallback image
    }
    
    // If it's already a full URL, return as is
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    
    // If it's a relative path, prepend the base URL
    return `${getApiUrl('').replace('/api/v1', '')}${imageUrl}`;
  }
}

// Export singleton instance
export const ekstrakurikulerService = EkstrakurikulerService.getInstance(); 