// src/services/pimpinanSMPService.ts
// Service untuk mengelola data pimpinan SMP dari API backend

import { getApiUrl, getImageUrl } from '@/lib/config';

export interface PimpinanSMP {
  id: number;
  name: string;
  position: string;
  photo: string;
  bio: string;
  education: string;
  experience: string;
  type: string;
  order_index: number;
  banner_desktop: string;
  banner_mobile: string;
}

export interface PimpinanSMPBox {
  id: number;
  title: string;
  description: string;
  icon: string;
  image: string;
  background_color: string;
  order_index: number;
}

export interface PimpinanSMPSettings {
  id: number;
  title: string;
  subtitle: string;
  banner_desktop: string;
  banner_mobile: string;
  keunggulan_title: string;
  keunggulan_subtitle: string;
}

export interface CompletePimpinanSMPData {
  settings: PimpinanSMPSettings;
  pimpinan: PimpinanSMP[];
  boxes: PimpinanSMPBox[];
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

class PimpinanSMPService {
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
      
      const raw = await response.json();
      console.log('Response data:', raw);
      
      // Terima dua format: dibungkus { success, data } atau langsung data
      if (raw && typeof raw === 'object' && 'success' in raw) {
        const wrapped = raw as ApiResponse<T>;
        if (!wrapped.success) {
          throw new Error(wrapped.message || 'API request failed');
        }
        return (wrapped.data as T);
      }
      
      return raw as T;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  // Mengambil semua data lengkap (settings, pimpinan, dan boxes)
  async getCompleteData(): Promise<CompletePimpinanSMPData> {
    return this.fetchApi<CompletePimpinanSMPData>('/pimpinan-smp/complete');
  }

  // Mengambil semua data pimpinan SMP
  async getAllPimpinan(): Promise<PimpinanSMP[]> {
    return this.fetchApi<PimpinanSMP[]>('/pimpinan-smp');
  }

  // Mengambil data pimpinan SMP berdasarkan ID
  async getPimpinanById(id: number): Promise<PimpinanSMP> {
    return this.fetchApi<PimpinanSMP>(`/pimpinan-smp/${id}`);
  }

  // Mengambil data pimpinan SMP berdasarkan tipe jabatan
  async getPimpinanByType(type: string): Promise<PimpinanSMP[]> {
    return this.fetchApi<PimpinanSMP[]>(`/pimpinan-smp/type/${encodeURIComponent(type)}`);
  }

  // Mengambil data kepala sekolah
  async getKepalaSekolah(): Promise<PimpinanSMP[]> {
    return this.fetchApi<PimpinanSMP[]>('/pimpinan-smp/kepala-sekolah');
  }

  // Mengambil data wakil kepala sekolah
  async getWakilKepalaSekolah(): Promise<PimpinanSMP[]> {
    return this.fetchApi<PimpinanSMP[]>('/pimpinan-smp/wakil-kepala-sekolah');
  }

  // Mengambil semua data box keunggulan
  async getBoxes(): Promise<PimpinanSMPBox[]> {
    return this.fetchApi<PimpinanSMPBox[]>('/pimpinan-smp/boxes');
  }

  // Mengambil pengaturan halaman
  async getSettings(): Promise<PimpinanSMPSettings> {
    return this.fetchApi<PimpinanSMPSettings>('/pimpinan-smp/settings');
  }

  // Helper method untuk mengelompokkan pimpinan berdasarkan tipe
  groupPimpinanByType(pimpinan: PimpinanSMP[]): Record<string, PimpinanSMP[]> {
    return pimpinan.reduce((groups, pimpinan) => {
      const type = pimpinan.type;
      if (!groups[type]) {
        groups[type] = [];
      }
      groups[type].push(pimpinan);
      return groups;
    }, {} as Record<string, PimpinanSMP[]>);
  }

  // Helper method untuk mengurutkan pimpinan berdasarkan order_index
  sortPimpinanByOrder(pimpinan: PimpinanSMP[]): PimpinanSMP[] {
    return pimpinan.sort((a, b) => a.order_index - b.order_index);
  }

  // Helper method untuk mengurutkan boxes berdasarkan order_index
  sortBoxesByOrder(boxes: PimpinanSMPBox[]): PimpinanSMPBox[] {
    return boxes.sort((a, b) => a.order_index - b.order_index);
  }
}

export const pimpinanSMPService = new PimpinanSMPService(); 