// Alkapro Library API Service
export interface AlkaproLibraryData {
  id: number
  basic_info: {
    title: string
    subtitle: string
    banner_desktop: string | null
    banner_mobile: string | null
  }
  hero_section: {
    title: string
    subtitle: string
    image: string | null
  }
  introduction: {
    badge_text: string
    title: string
    description: string
    featured_image: string | null
  }
  features: {
    title: string
    collection_features: string[]
    facility_features: string[]
  }
  facilities_flow?: FacilitiesFlow | null
  gallery?: {
    images: string[]
    auto_slide: boolean
    slide_interval: number
  } | null
  pamphlets?: {
    images: string[]
    auto_slide: boolean
    slide_interval: number
  } | null
  programs?: {
    title: string
    description: string
    reading_club: {
      title: string
      description: string
      image: string | null
    }
    digital_library: {
      title: string
      description: string
      image: string | null
    }
  } | null
  additional_services?: {
    title: string
    description: string
    services: AdditionalService[]
  } | null
  service_hours?: {
    title: string
    weekday_hours: string
    weekend_hours: string
    note: string
  } | null
  social_media?: {
    instagram_username: string | null
    instagram_url: string | null
    facebook_url: string | null
    twitter_url: string | null
    youtube_url: string | null
  } | null
  call_to_action?: {
    title: string
    description: string
    background_image: string | null
    primary_button: {
      text: string
      url: string
    }
    secondary_button: {
      text: string
      url: string
    }
  } | null
  seo: {
    meta_title: string
    meta_description: string
    meta_keywords: string
  }
  is_active: boolean
  updated_at: string
}

export interface AdditionalService {
  title: string
  description: string
  icon: string // 'search' | 'monitor' | 'users' | 'file-text'
}

export interface FacilitiesFlowStep {
  step_number: string
  title: string
  description: string
  icon: string // 'user-plus' | 'map-pin' | 'shield-check' | 'key' | 'book-open'
}

export interface FacilitiesFlow {
  title: string
  description: string
  steps: FacilitiesFlowStep[]
}

class AlkaproLibraryAPI {
  private baseURL: string

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.alkapro.id/api/v1'
  }

  private buildImageUrl(path?: string, fallback?: string): string {
    if (!path) return fallback || ''
    if (/^https?:\/\//i.test(path)) return path
    if (path.startsWith('/storage')) return `${this.baseURL.replace('/api', '')}${path}`
    if (path.startsWith('/')) return path
    const normalized = path.replace(/^\/+/, '')
    return `${this.baseURL.replace('/api', '')}/storage/${normalized}`
  }

  async getComplete(): Promise<AlkaproLibraryData | null> {
    try {
      const response = await fetch(`${this.baseURL}/alkapro-library/complete`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        cache: 'no-store'
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      
      if (result.success && result.data) {
        // Process image URLs
        const data = result.data
        
        if (data.basic_info?.banner_desktop) {
          data.basic_info.banner_desktop = this.buildImageUrl(data.basic_info.banner_desktop)
        }
        if (data.basic_info?.banner_mobile) {
          data.basic_info.banner_mobile = this.buildImageUrl(data.basic_info.banner_mobile)
        }
        if (data.hero_section?.image) {
          data.hero_section.image = this.buildImageUrl(data.hero_section.image)
        }
        if (data.introduction?.featured_image) {
          data.introduction.featured_image = this.buildImageUrl(data.introduction.featured_image)
        }
        if (data.gallery?.images) {
          data.gallery.images = data.gallery.images.map((img: string) => this.buildImageUrl(img))
        }
        if (data.pamphlets?.images) {
          data.pamphlets.images = data.pamphlets.images.map((img: string) => this.buildImageUrl(img))
        }
        if (data.programs?.reading_club?.image) {
          data.programs.reading_club.image = this.buildImageUrl(data.programs.reading_club.image)
        }
        if (data.programs?.digital_library?.image) {
          data.programs.digital_library.image = this.buildImageUrl(data.programs.digital_library.image)
        }
        if (data.call_to_action?.background_image) {
          data.call_to_action.background_image = this.buildImageUrl(data.call_to_action.background_image)
        }

        return data
      }
      
      return null
    } catch (error) {
      console.error('Error fetching Alkapro Library data:', error)
      return null
    }
  }

  async getSettings(): Promise<any> {
    try {
      const response = await fetch(`${this.baseURL}/alkapro-library/settings`)
      const result = await response.json()
      return result.success ? result.data : null
    } catch (error) {
      console.error('Error fetching Alkapro Library settings:', error)
      return null
    }
  }

  async getGallery(): Promise<any> {
    try {
      const response = await fetch(`${this.baseURL}/alkapro-library/gallery`)
      const result = await response.json()
      if (result.success && result.data?.images) {
        result.data.images = result.data.images.map((img: string) => this.buildImageUrl(img))
      }
      return result.success ? result.data : null
    } catch (error) {
      console.error('Error fetching Alkapro Library gallery:', error)
      return null
    }
  }

  async getPamphlets(): Promise<any> {
    try {
      const response = await fetch(`${this.baseURL}/alkapro-library/pamphlets`)
      const result = await response.json()
      if (result.success && result.data?.images) {
        result.data.images = result.data.images.map((img: string) => this.buildImageUrl(img))
      }
      return result.success ? result.data : null
    } catch (error) {
      console.error('Error fetching Alkapro Library pamphlets:', error)
      return null
    }
  }
}

export const alkaproLibraryApi = new AlkaproLibraryAPI()
