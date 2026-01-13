import { config } from '@/lib/config'

export interface ProgramKhususItem {
  id: number
  type: 'tahfidz' | 'ict'
  title: string
  slug: string
  description: string
  content_type: 'rich' | 'grid'
  grid_items: Array<{
    label: string
    image: string | null
  }>
  image: string | null
  sort_order: number
  display_location: 'home' | 'program_khusus'
  features: string[]
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface ProgramKhususSettings {
  id: number
  type?: 'tahfidz' | 'ict'
  title: string
  description?: string
  hero_image?: string | null
  featured_image?: string | null
  gallery_images?: string[]
  introduction?: string
  key_points?: Array<{
    title: string
    description: string
    icon?: string | null
  }>
  features?: Array<{
    title: string
    description: string
    image?: string | null
    icon?: string
  }>
  benefits?: Array<{
    title: string
    description: string
    image?: string | null
    icon?: string
  }>
  cta_title?: string
  cta_description?: string
  cta_button_text?: string
  cta_button_link?: string
  is_active?: boolean
}

export interface CompleteApiResponse {
  success: boolean
  data: {
    settings: ProgramKhususSettings
    items: ProgramKhususItem[]
  }
}

export interface ApiResponse<T> {
  success: boolean
  data: T
}

class ProgramKhususService {
  private baseUrl = `${config.api.baseUrl}/program-khusus`

  // Get all programs with optional type filter
  async getPrograms(type?: 'tahfidz' | 'ict'): Promise<ProgramKhususItem[]> {
    try {
      const url = type ? `${this.baseUrl}?type=${type}` : this.baseUrl
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result = await response.json()
      
      if (!result.success) {
        throw new Error('API returned unsuccessful response')
      }
      
      // Handle the API response structure
      const programs = result.data.programs || []
      return Array.isArray(programs) ? programs.filter((program: ProgramKhususItem) => program.is_active) : []
    } catch (error) {
      console.error('Error fetching programs:', error)
      throw error
    }
  }

  // Get programs with display_location filter
  async getProgramsByLocation(display_location: 'home' | 'program_khusus', type?: 'tahfidz' | 'ict'): Promise<ProgramKhususItem[]> {
    try {
      let url = `${this.baseUrl}?display_location=${display_location}`
      if (type) {
        url += `&type=${type}`
      }
      
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result = await response.json()
      
      if (!result.success) {
        throw new Error('API returned unsuccessful response')
      }
      
      // Handle the API response structure
      const programs = result.data.programs || []
      return Array.isArray(programs) ? programs.filter((program: ProgramKhususItem) => program.is_active) : []
    } catch (error) {
      console.error('Error fetching programs by location:', error)
      throw error
    }
  }

  // Get programs for HOME page (display_location: 'home') - keunggulan/materi
  async getHomePrograms(type?: 'tahfidz' | 'ict'): Promise<ProgramKhususItem[]> {
    try {
      return await this.getProgramsByLocation('home', type)
    } catch (error) {
      console.error('Error fetching home programs:', error)
      // Fallback to manual filter if API doesn't support display_location parameter
      const programs = await this.getPrograms(type)
      return programs.filter(program => program.display_location === 'home')
    }
  }

  // Get programs for PROGRAM KHUSUS page (display_location: 'program_khusus') - detail program
  async getProgramKhususPagePrograms(type?: 'tahfidz' | 'ict'): Promise<ProgramKhususItem[]> {
    try {
      return await this.getProgramsByLocation('program_khusus', type)
    } catch (error) {
      console.error('Error fetching program khusus page programs:', error)
      // Fallback to manual filter if API doesn't support display_location parameter
      const programs = await this.getPrograms(type)
      return programs.filter(program => program.display_location === 'program_khusus')
    }
  }

  // Get complete data (settings + items) by type using new API endpoint
  async getCompleteByType(type: 'tahfidz' | 'ict'): Promise<{ settings: ProgramKhususSettings; items: ProgramKhususItem[] }> {
    try {
      const url = `${this.baseUrl}/${type}`
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result = await response.json()
      
      if (!result.success) {
        throw new Error('API returned unsuccessful response')
      }
      
      return {
        settings: result.data.type_settings,
        items: result.data.programs || []
      }
    } catch (error) {
      console.error(`Error fetching complete ${type} data:`, error)
      throw error
    }
  }

  // Note: Slug-based endpoints are not available in current API

  // Get fallback settings for display
  getDefaultSettings(type?: 'tahfidz' | 'ict'): ProgramKhususSettings {
    if (type === 'tahfidz') {
      return {
        id: 1,
        type: 'tahfidz',
        title: 'Program Tahfidz Al-Quran',
        description: 'Membentuk generasi Qurani melalui hafalan Al-Quran dengan metode pembelajaran yang menyenangkan dan efektif.',
        hero_image: '/Programkhusus/photo-1553063085-dbbf64d936ea.jpeg',
        featured_image: '/Programkhusus/photo-1553063085-dbbf64d936ea.jpeg'
      }
    } else if (type === 'ict') {
      return {
        id: 2,
        type: 'ict',
        title: 'Program ICT',
        description: 'Mempersiapkan siswa menghadapi era digital dengan pembelajaran teknologi informasi dan komunikasi yang komprehensif.',
        hero_image: '/Programkhusus/html-code-on-computer-monitor-software-web-developer-programming-code-photo.jpg',
        featured_image: '/Programkhusus/html-code-on-computer-monitor-software-web-developer-programming-code-photo.jpg'
      }
    } else {
      return {
        id: 0,
        title: 'Program Khusus',
        description: 'Program unggulan sekolah untuk mengembangkan potensi siswa.',
        hero_image: null,
        featured_image: null
      }
    }
  }
}

export const programKhususService = new ProgramKhususService()
export default programKhususService