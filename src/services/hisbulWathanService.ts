// src/services/hisbulWathanService.ts
import { getApiUrl } from '@/lib/config'

export interface HisbulWathanSettings {
  id: number
  title: string
  subtitle: string
  banner_desktop: string
  banner_mobile: string
  title_panel_bg_color: string
  subtitle_panel_bg_color: string
  mobile_panel_bg_color: string
  is_active: boolean
}

export interface HisbulWathanPengurus {
  id: number
  position: string
  name: string
  photo: string
  kelas: string
  description: string
  order_index: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface HisbulWathanContent {
  id: number
  title: string
  content: string
  grid_type: string
  use_list_disc: boolean
  list_items: { item: string }[] | null
  bidang_structure: {
    bidang_name: string
    members: { name: string; position: string }[]
  }[] | null
  background_color: string
  border_color: string
  order_index: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface HisbulWathanCompleteData {
  settings: HisbulWathanSettings | null
  pengurus: HisbulWathanPengurus[]
  content: HisbulWathanContent[]
}

class HisbulWathanService {
  private static instance: HisbulWathanService
  private constructor() {}

  public static getInstance(): HisbulWathanService {
    if (!HisbulWathanService.instance) HisbulWathanService.instance = new HisbulWathanService()
    return HisbulWathanService.instance
  }

  async getCompleteData(): Promise<HisbulWathanCompleteData | null> {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 8000)
      const res = await fetch(getApiUrl('/hisbul-wathan/complete'), {
        signal: controller.signal,
        headers: { Accept: 'application/json' },
        cache: 'no-store',
      })
      clearTimeout(timeoutId)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      
      // Debug: Log response API
      console.log('🔍 Hisbul Wathan API Response:', json)
      console.log('🔍 Hisbul Wathan API Data:', json?.data)
      console.log('🔍 Hisbul Wathan Settings from API:', json?.data?.settings)
      console.log('🔍 Hisbul Wathan Content from API:', json?.data?.content)
      
      return json?.data ?? null
    } catch (e) {
      console.error('Error fetching Hisbul Wathan complete:', e)
      return null
    }
  }

  async getSettings(): Promise<HisbulWathanSettings | null> {
    try {
      const res = await fetch(getApiUrl('/hisbul-wathan/settings'), {
        headers: { Accept: 'application/json' },
        cache: 'no-store',
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      return json?.data ?? null
    } catch (e) {
      console.error('Error fetching Hisbul Wathan settings:', e)
      return null
    }
  }

  async getContent(): Promise<HisbulWathanContent[]> {
    try {
      const res = await fetch(getApiUrl('/hisbul-wathan'), {
        headers: { Accept: 'application/json' },
        cache: 'no-store',
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      return json?.data ?? []
    } catch (e) {
      console.error('Error fetching Hisbul Wathan content:', e)
      return []
    }
  }

  getImageUrl(url: string | null, fallback: string): string {
    if (!url || typeof url !== 'string' || url.trim() === '') return fallback
    return url
  }

  getPhotoUrl(url: string | null, fallback: string = '/ilustrasi/default-avatar.png'): string {
    if (!url || typeof url !== 'string' || url.trim() === '') return fallback
    return url
  }

  getBannerUrl(url: string | null, fallback: string = '/guru/Adam-Muttaqien-M.Si_.jpg'): string {
    if (!url || typeof url !== 'string' || url.trim() === '') return fallback
    return url
  }
}

export const hisbulWathanService = HisbulWathanService.getInstance()