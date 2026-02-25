// src/services/prestasiService.ts
import { getApiUrl } from '@/lib/config'

export interface PrestasiSettings {
  main_heading: string
  hero_subtitle: string
  badge_text: string
  hero_background_color: string
  hero_text_color: string
  floating_elements_bg_color: string
  floating_elements_text_color: string
  feature_lists: string[]
}

export interface PrestasiPost {
  id: number
  title: string
  featured_image: string
  excerpt: string
  published_at: string
  tags: string[]
}

export interface PrestasiComplete {
  settings: PrestasiSettings
  right_image: PrestasiPost | null
  list_prestasi: PrestasiPost[]
  list_tahfidz: PrestasiPost[]
}

class PrestasiService {
  private static instance: PrestasiService
  private constructor() {}

  public static getInstance(): PrestasiService {
    if (!PrestasiService.instance) PrestasiService.instance = new PrestasiService()
    return PrestasiService.instance
  }

  async getCompleteData(): Promise<PrestasiComplete | null> {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 8000)
      
      let res
      try {
        // Try direct API first untuk settings
        res = await fetch(getApiUrl('/prestasi/settings'), {
          signal: controller.signal,
          headers: { Accept: 'application/json' },
          cache: 'no-store',
        })
      } catch (directError) {
        console.log('🔄 Direct API failed, trying proxy...')
        // Fallback to proxy
        res = await fetch('/api/proxy?endpoint=/prestasi/settings', {
          signal: controller.signal,
          headers: { Accept: 'application/json' },
          cache: 'no-store',
        })
      }
      
      clearTimeout(timeoutId)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const settings = await res.json()
      
      // Debug: Log response API
      console.log('🔍 Prestasi Settings Response:', settings)
      
      // Return dengan structure yang benar - settings langsung dari API
      return {
        settings: settings,
        right_image: null, // Akan diisi dari carousel gambar
        list_prestasi: [], // Diisi dari berita API terpisah
        list_tahfidz: []   // Diisi dari berita API terpisah
      }
    } catch (e) {
      console.error('Error fetching Prestasi settings:', e)
      return null
    }
  }

  async getSettings(): Promise<PrestasiSettings | null> {
    try {
      const res = await fetch(getApiUrl('/prestasi/settings'), {
        headers: { Accept: 'application/json' },
        cache: 'no-store',
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      return json ?? null
    } catch (e) {
      console.error('Error fetching Prestasi settings:', e)
      return null
    }
  }

  async getRightImage(): Promise<PrestasiPost | null> {
    try {
      const res = await fetch(getApiUrl('/prestasi/right-image'), {
        headers: { Accept: 'application/json' },
        cache: 'no-store',
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      return json ?? null
    } catch (e) {
      console.error('Error fetching Prestasi right image:', e)
      return null
    }
  }

  async getPrestasiList(page = 1): Promise<{ data: PrestasiPost[]; pagination: any } | null> {
    try {
      const res = await fetch(getApiUrl(`/prestasi/list-prestasi?page=${page}`), {
        headers: { Accept: 'application/json' },
        cache: 'no-store',
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      return json ?? null
    } catch (e) {
      console.error('Error fetching Prestasi list:', e)
      return null
    }
  }

  async getTahfidzList(page = 1): Promise<{ data: PrestasiPost[]; pagination: any } | null> {
    try {
      const res = await fetch(getApiUrl(`/prestasi/list-tahfidz?page=${page}`), {
        headers: { Accept: 'application/json' },
        cache: 'no-store',
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      return json ?? null
    } catch (e) {
      console.error('Error fetching Tahfidz list:', e)
      return null
    }
  }

  getImageUrl(url: string | null, fallback: string): string {
    if (!url || typeof url !== 'string' || url.trim() === '') return fallback
    return url
  }
}

export const prestasiService = PrestasiService.getInstance() 