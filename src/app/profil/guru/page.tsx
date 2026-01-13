'use client'

import React, { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTeachers } from '@/hooks/useTeachers'
import { type TeacherDisplay } from '@/services/teacherService'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { ErrorMessage } from '@/components/ErrorMessage'
import { TeacherCard } from '@/components/TeacherCard'

interface GuruPageProps {
  searchParams: Promise<{ subject?: string }>
}

const GuruPage = ({ searchParams }: GuruPageProps) => {
  const [activeSubject, setActiveSubject] = useState('matematika')
  const { teachersData, teacherSettings, subjects, loading, error, refetch } = useTeachers()
  
  // Handle searchParams in Next.js 15
  useEffect(() => {
    const fetchParams = async () => {
      const params = await searchParams
      if (params?.subject) {
        setActiveSubject(params.subject)
      }
    }
    fetchParams()
  }, [searchParams])

  // Set first subject as active if no subject is selected
  useEffect(() => {
    if (subjects.length > 0 && !subjects.find(s => s.key === activeSubject)) {
      setActiveSubject(subjects[0].key)
    }
  }, [subjects, activeSubject])

  // Data untuk banner - menggunakan data dari API atau fallback
  const guruData = teacherSettings || {
    title: 'Tim Guru Profesional SMP Muhammadiyah Al Kautsar PK Kartasura',
    subtitle: 'Tenaga pengajar berkualitas dengan dedikasi tinggi untuk pendidikan terbaik dan pembentukan karakter Islami.',
    banner_desktop: '/guru/Adam-Muttaqien-M.Si_.jpg',
    banner_mobile: '/guru/Cindy-Trisnawati-S.Pd-M.Pd_.jpg',
    date: '17 Juli 2025',
    read_time: '5 Menit untuk membaca',
    author: 'Tim Humas SMP'
  }

  // Komponen ShareButton lokal
  const ShareButton = ({ icon, bg, size = 'normal' }: { icon: string; bg: string; size?: 'normal' | 'small' }) => (
    <button className={`${bg} text-white ${size === 'small' ? 'w-8 h-8 text-xs' : 'w-10 h-10 text-sm'} rounded-full flex items-center justify-center hover:opacity-80 transition-opacity`}>
      {icon}
    </button>
  )

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <LoadingSpinner 
            size="large" 
            text="Memuat data guru..." 
          />
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <ErrorMessage 
            message={error}
            onRetry={refetch}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="pt-0 flex-1">
        {/* IMG dengan Overlay untuk Desktop */}
        <div className="relative w-full md:h-screen h-64">
          {/* Desktop Image */}
          <Image 
            src={guruData.banner_desktop}
            alt="banner"
            fill
            className="object-cover hidden md:block"
            priority
            sizes="100vw"
            quality={75}
          />
          {/* Mobile Image - Height diperkecil untuk mobile */}
          <div className="relative w-full h-full md:hidden">
            <Image 
              src={guruData.banner_mobile}
              alt="banner"
              fill
              className="object-cover"
              priority
              sizes="100vw"
              quality={75}
            />
          </div>
          
          {/* Overlay Content untuk Desktop */}
          <div className="absolute inset-0 hidden md:flex md:items-end">
            <div className="w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent">
              <div className="container mx-auto px-8 pb-16">
                <div className="max-w-3xl">
                  {/* Title Panel */}
                  <div className="block">
                    <div className="bg-green-500 inline-flex p-5 title-panel-scoped" style={{boxSizing: 'border-box'}}>
                      <h1 className="text-2xl md:text-3xl lg:text-2xl font-bold text-white mb-0 line-clamp-2" style={{padding: '0px !important'}}>
                        {guruData.title}
                      </h1>
                    </div>
                  </div>
                  
                  {/* Subtitle Panel */}
                  <div className="bg-green-700 p-4 opacity-90 inline-flex rounded-b-lg" style={{boxSizing: 'border-box'}}>
                    <p className="text-white text-sm md:text-lg font-semibold mb-0">
                      {guruData.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DIV untuk Mobile - Tinggi disesuaikan dengan gambar */}
        <div className="w-full bg-gradient-to-r from-green-600 to-green-900 py-4 md:hidden">
          <div className="container mx-auto px-4">
            <div className="block">
              {/* Title Panel untuk Mobile */}
              <div className="bg-green-700 inline-flex p-3 title-panel-scoped">
                <h1 className="text-lg font-bold text-white mb-0" style={{padding: '0px !important'}}>
                  {guruData.title}
                </h1>
              </div>
              
              {/* Subtitle Panel untuk Mobile */}
              <div className="bg-green-800 mb-0 p-3 opacity-90 inline-flex subtitle-panel-scoped">
                <div>
                  <p className="text-white text-xs font-semibold mb-0">
                    {guruData.subtitle}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Meta Info untuk Mobile - Diperkecil */}
            <div className="flex flex-wrap items-center gap-2 text-white/80 mt-3 text-xs">
              <div className="flex items-center gap-2">
                <div className="relative w-6 h-6">
                  <Image
                    src="/pace.jpeg"
                    alt="Author"
                    fill
                    className="rounded-full object-cover"
                    sizes="24px"
                  />
                </div>
                <span>{guruData.author}</span>
              </div>
              <span>•</span>
              <span>{guruData.date}</span>
              <span>•</span>
              <span>{guruData.read_time}</span>
            </div>
            
            {/* Share buttons untuk Mobile - Diperkecil */}
            <div className="flex items-center gap-2 mt-3">
              <ShareButton icon="𝕏" bg="bg-black" size="small" />
              <ShareButton icon="f" bg="bg-[#1877F2]" size="small" />
              <ShareButton icon="in" bg="bg-[#0077B5]" size="small" />
              <ShareButton icon="🔗" bg="bg-gray-600" size="small" />
            </div>
          </div>
        </div>

        {/* Navigation Mata Pelajaran */}
        <section className="py-3 sm:py-4 md:py-6 lg:py-8 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="text-center mb-3 sm:mb-4 md:mb-6 lg:mb-8">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2 sm:mb-3 md:mb-3 lg:mb-4">Pilih Mata Pelajaran</h2>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 px-2 sm:px-0">Klik mata pelajaran untuk melihat guru yang mengajar</p>
            </div>
            
            {/* Subject Navigation */}
            <motion.div 
              className="subject-navigation-mobile sm:subject-navigation-tablet lg:subject-navigation-desktop mb-4 sm:mb-6 lg:mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {subjects.map((subject, index) => (
                <motion.button
                  key={subject.key}
                  onClick={() => setActiveSubject(subject.key)}
                  className={`subject-button-mobile sm:subject-button-tablet lg:subject-button-desktop transition-all duration-300 ${
                    activeSubject === subject.key
                      ? `${subject.color} text-white shadow-lg transform scale-105`
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.3 + index * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {subject.name}
                </motion.button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Guru Cards Section */}
        <section className="py-4 sm:py-6 md:py-8 bg-white">
          <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-4 sm:space-y-6 md:space-y-8"
            >
              {teachersData[activeSubject] && teachersData[activeSubject].length > 0 ? (
                teachersData[activeSubject].map((teacher: TeacherDisplay, index: number) => (
                  <TeacherCard key={index} teacher={teacher} index={index} />
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">👨‍🏫</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Belum Ada Data Guru
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Untuk mata pelajaran "{subjects.find(s => s.key === activeSubject)?.name || activeSubject}" belum ada data guru yang tersedia.
                  </p>
                  <motion.button 
                    onClick={refetch}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Refresh Data
                  </motion.button>
                </div>
              )}
            </motion.div>
          </div>
        </section>
        

      </main>
    </div>
  )
}

export default GuruPage