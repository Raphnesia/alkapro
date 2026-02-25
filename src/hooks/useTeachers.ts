import { useState, useEffect } from 'react'
import { 
  getTeachersBySubject, 
  getTeacherSettings,
  generateSubjectsArray,
  type TeacherDisplay,
  type TeachersBySubject,
  type TeacherSettings
} from '@/services/teacherService'

interface UseTeachersReturn {
  teachersData: TeachersBySubject
  teacherSettings: TeacherSettings | null
  subjects: Array<{ key: string; name: string; color: string }>
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

// Fallback data untuk testing
const fallbackTeachersData: TeachersBySubject = {
  informatika: [
    {
      name: 'Syaifullah, S.Pd.',
      image: '/guru/syaifullah.jpg',
      position: 'Guru Mapel IPA & Informatika',
      description: 'Guru Mapel Informatika SMP Muhammadiyah Al Kautsar PK Kartasura',
      subject: 'Informatika'
    },
    {
      name: 'Adira Bintang Permana, S.Pd.',
      image: '/guru/adira.jpg',
      position: 'Guru Mapel Informatika',
      description: 'Spesialis dalam pemrograman dan teknologi informasi',
      subject: 'Informatika'
    }
  ],
  matematika: [
    {
      name: 'Dr. Ahmad Susanto, M.Pd.',
      image: '/guru/ahmad.jpg',
      position: 'Guru Matematika Senior',
      description: 'Berpengalaman 15 tahun dalam mengajar matematika dengan metode pembelajaran inovatif',
      subject: 'Matematika'
    }
  ],
  bahasa_indonesia: [
    {
      name: 'Prof. Bambang Sutrisno, M.Pd.',
      image: '/guru/bambang.jpg',
      position: 'Guru Bahasa Indonesia Senior',
      description: 'Ahli dalam sastra Indonesia dan penulisan kreatif dengan pengalaman mengajar lebih dari 20 tahun',
      subject: 'Bahasa Indonesia'
    }
  ]
}

const fallbackTeacherSettings: TeacherSettings = {
  title: 'Tim Guru Profesional SMP Muhammadiyah Al Kautsar PK Kartasura',
  subtitle: 'Tenaga pengajar berkualitas dengan dedikasi tinggi untuk pendidikan terbaik dan pembentukan karakter Islami.',
  banner_desktop: '/guru/Adam-Muttaqien-M.Si_.jpg',
  banner_mobile: '/guru/Cindy-Trisnawati-S.Pd-M.Pd_.jpg',
  date: '17 Juli 2025',
  read_time: '5 Menit untuk membaca',
  author: 'Tim Humas SMP'
}

export const useTeachers = (): UseTeachersReturn => {
  const [teachersData, setTeachersData] = useState<TeachersBySubject>({})
  const [teacherSettings, setTeacherSettings] = useState<TeacherSettings | null>(null)
  const [subjects, setSubjects] = useState<Array<{ key: string; name: string; color: string }>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTeachersData = async () => {
    setLoading(true)
    setError(null)

    try {
      // Fetch teachers data
      const teachersData = await getTeachersBySubject()
      setTeachersData(teachersData)
      
      // Fetch teacher settings
      const settings = await getTeacherSettings()
      setTeacherSettings(settings)
      
      // Generate subjects array from API data
      const subjectsArray = generateSubjectsArray(teachersData)
      setSubjects(subjectsArray)
      
    } catch (err) {
      console.error('API Error:', err)
      
      // Coba ambil data langsung dari API tanpa processing
      try {
        console.log('Trying direct API call...')
        const apiUrl = process.env.NEXT_PUBLIC_USE_PROXY === 'true' 
          ? '/api/proxy/teachers' 
          : 'http://api.alkapro.id/api/v1/teachers'
        const response = await fetch(apiUrl)
        if (response.ok) {
          const data = await response.json()
          console.log('Direct API call successful:', data)
          
          if (data.success && data.data && data.data.length > 0) {
            // Process data manually
            const teachers = data.data
            const groupedTeachers: TeachersBySubject = {}
            
            teachers.forEach((teacher: any) => {
              if (teacher.type === 'teacher') {
                const subjectKey = teacher.subject.toLowerCase().replace(/\s+/g, '_')
                
                if (!groupedTeachers[subjectKey]) {
                  groupedTeachers[subjectKey] = []
                }
                
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
            
            console.log('Processed teachers data:', groupedTeachers)
            setTeachersData(groupedTeachers)
            
            // Generate subjects array
            const subjectsArray = generateSubjectsArray(groupedTeachers)
            setSubjects(subjectsArray)
            
            // Use fallback settings
            setTeacherSettings(fallbackTeacherSettings)
            
            console.log('Successfully loaded real data from API')
            return
          }
        }
      } catch (directError) {
        console.error('Direct API call also failed:', directError)
      }
      
      // Fallback ke data sample jika API tidak tersedia
      console.log('Using fallback data for testing...')
      setTeachersData(fallbackTeachersData)
      setTeacherSettings(fallbackTeacherSettings)
      
      // Generate subjects array from fallback data
      const subjectsArray = generateSubjectsArray(fallbackTeachersData)
      setSubjects(subjectsArray)
      
      setError(`Gagal mengambil data dari API: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTeachersData()
  }, [])

  return {
    teachersData,
    teacherSettings,
    subjects,
    loading,
    error,
    refetch: fetchTeachersData
  }
} 