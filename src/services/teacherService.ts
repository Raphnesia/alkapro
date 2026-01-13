// Teacher Service for API calls
const API_BASE_URL = process.env.NEXT_PUBLIC_USE_PROXY === 'true' 
  ? '/api/proxy' 
  : (process.env.NEXT_PUBLIC_API_URL || 'http://api.alkapro.id/api/v1')

export interface Teacher {
  id: number
  name: string
  position: string
  subject: string
  type: 'teacher' | 'staff' | 'principal' | 'vice_principal'
  photo: string
  bio: string | null
  education: string | null
  experience: string | null
  is_active?: boolean
  order_index: number
}

// Interface untuk Teacher yang digunakan di frontend display
export interface TeacherDisplay {
  name: string
  image: string
  position: string
  description: string
  subject: string
}

export interface TeacherSettings {
  title: string
  subtitle: string
  banner_desktop: string
  banner_mobile: string
  date: string
  read_time: string
  author: string
}

export interface TeachersBySubject {
  [key: string]: TeacherDisplay[]
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

// Get all teachers and staff
export const getAllTeachers = async (): Promise<Teacher[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/teachers`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const result: ApiResponse<Teacher[]> = await response.json()
    return result.data || []
  } catch (error) {
    console.error('Error fetching all teachers:', error)
    throw new Error('Failed to fetch teachers data')
  }
}

// Get teachers grouped by subject (for frontend display)
export const getTeachersBySubject = async (): Promise<TeachersBySubject> => {
  try {
    // Mengambil data dari endpoint /teachers yang tersedia
    console.log('Fetching from:', `${API_BASE_URL}/teachers`)
    const response = await fetch(`${API_BASE_URL}/teachers`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const result: ApiResponse<Teacher[]> = await response.json()
    console.log('API Response:', result)
    const teachers = result.data || []
    console.log('Teachers data:', teachers)
    
    // Mengelompokkan data per subject
    const groupedTeachers: TeachersBySubject = {}
    
    teachers.forEach((teacher: Teacher) => {
      // Hanya ambil guru yang bertipe teacher (is_active mungkin tidak ada di API)
      if (teacher.type === 'teacher') {
        const subjectKey = teacher.subject.toLowerCase().replace(/\s+/g, '_')
        
        if (!groupedTeachers[subjectKey]) {
          groupedTeachers[subjectKey] = []
        }
        
        // Konversi Teacher ke TeacherDisplay
        const teacherDisplay: TeacherDisplay = {
          name: teacher.name,
          image: teacher.photo,
          position: teacher.position,
          description: teacher.bio || `${teacher.position} - ${teacher.subject}`,
          subject: teacher.subject
        }
        
        groupedTeachers[subjectKey].push(teacherDisplay)
      }
    })
    
    // Sort teachers berdasarkan order_index
    Object.keys(groupedTeachers).forEach(subjectKey => {
      groupedTeachers[subjectKey].sort((a, b) => {
        const teacherA = teachers.find(t => t.name === a.name)
        const teacherB = teachers.find(t => t.name === b.name)
        return (teacherA?.order_index || 0) - (teacherB?.order_index || 0)
      })
    })
    
    console.log('Grouped teachers data:', groupedTeachers)
    return groupedTeachers
    
  } catch (error) {
    console.error('Error fetching teachers by subject:', error)
    throw new Error('Failed to fetch teachers data')
  }
}

// Get teacher settings (banner, title, etc.)
export const getTeacherSettings = async (): Promise<TeacherSettings> => {
  try {
    const response = await fetch(`${API_BASE_URL}/teacher-settings`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const result: ApiResponse<TeacherSettings> = await response.json()
    return result.data
  } catch (error) {
    console.error('Error fetching teacher settings:', error)
    // Return fallback settings if API fails
    return {
      title: 'Tim Guru Profesional SMP Muhammadiyah Al Kautsar PK Kartasura',
      subtitle: 'Tenaga pengajar berkualitas dengan dedikasi tinggi untuk pendidikan terbaik dan pembentukan karakter Islami.',
      banner_desktop: '/guru/Adam-Muttaqien-M.Si_.jpg',
      banner_mobile: '/guru/Cindy-Trisnawati-S.Pd-M.Pd_.jpg',
      date: '17 Juli 2025',
      read_time: '5 Menit untuk membaca',
      author: 'Tim Humas SMP'
    }
  }
}

// Get teachers only (filtered by type)
export const getTeachersOnly = async (): Promise<Teacher[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/teachers/list`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const result: ApiResponse<Teacher[]> = await response.json()
    return result.data || []
  } catch (error) {
    console.error('Error fetching teachers only:', error)
    throw new Error('Failed to fetch teachers data')
  }
}

// Get staff only (filtered by type)
export const getStaffOnly = async (): Promise<Teacher[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/staff/list`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const result: ApiResponse<Teacher[]> = await response.json()
    return result.data || []
  } catch (error) {
    console.error('Error fetching staff only:', error)
    throw new Error('Failed to fetch staff data')
  }
}

// Helper function to generate subjects array from teachers data
export const generateSubjectsArray = (teachersData: TeachersBySubject) => {
  const colors = [
    'bg-blue-600', 
    'bg-green-600', 
    'bg-purple-600', 
    'bg-orange-600', 
    'bg-red-600', 
    'bg-indigo-600', 
    'bg-pink-600', 
    'bg-yellow-600'
  ]
  
  return Object.keys(teachersData).map((subjectKey, index) => {
    const subjectName = teachersData[subjectKey]?.[0]?.subject || subjectKey
    return {
      key: subjectKey,
      name: subjectName,
      color: colors[index % colors.length]
    }
  }).sort((a, b) => a.name.localeCompare(b.name)) // Sort subjects alphabetically
} 