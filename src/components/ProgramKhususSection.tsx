'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useI18n } from '@/hooks/useI18n'
import ProgramKhususLoading from './ProgramKhususLoading'
import { programKhususApi, ProgramCard } from '@/lib/api'

type ProgramType = 'tahfidz' | 'ict'

const ProgramKhususSection = () => {
  const { t } = useI18n();
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sectionTitle, setSectionTitle] = useState<string>('')
  const [sectionSubtitle, setSectionSubtitle] = useState<string>('')
  const [sectionPrograms, setSectionPrograms] = useState<ProgramCard[]>([])
  const [activeProgram, setActiveProgram] = useState<ProgramType>('tahfidz')
  const [isAutoplay, setIsAutoplay] = useState(true)

  useEffect(() => {
    let isMounted = true
    programKhususApi.getIndex()
      .then((data) => {
        if (!isMounted) return
        const page = data?.page || {}
        setSectionTitle(page.section_title || '')
        setSectionSubtitle(page.section_subtitle || '')
        setSectionPrograms((page.section_programs || []) as ProgramCard[])
      })
      .catch((e) => {
        setError(e instanceof Error ? e.message : 'Gagal memuat data')
      })
      .finally(() => setLoading(false))
    return () => { isMounted = false }
  }, [])

  useEffect(() => {
    if (!isAutoplay) return

    const interval = setInterval(() => {
      setActiveProgram(prev => prev === 'tahfidz' ? 'ict' : 'tahfidz')
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoplay])

  const handleTabClick = (tab: ProgramType) => {
    setActiveProgram(tab)
    setIsAutoplay(false) // Stop autoplay when user manually clicks
    
    // Resume autoplay after 10 seconds of inactivity
    setTimeout(() => {
      setIsAutoplay(true)
    }, 10000)
  }

  // Loading state
  if (loading) {
    return <ProgramKhususLoading />
  }

  // Error state
  if (error) {
    return (
      <div className="py-16 bg-gradient-to-br from-red-600 via-red-600 to-red-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t('programs.error.title') || 'Error Loading Programs'}
          </h2>
          <p className="text-white/80">
            {error}
          </p>
        </div>
      </div>
    )
  }

  // Helper image URL builder
  const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://api.alkapro.id/api'
  const backendOrigin = (() => {
    try {
      const url = new URL(apiBase)
      const portPart = url.port ? `:${url.port}` : ''
      return `${url.protocol}//${url.hostname}${portPart}`
    } catch {
      return apiBase.replace(/\/?api(?:\/v1)?$/i, '').replace(/\/?v1$/i, '')
    }
  })()
  const buildImageUrl = (path?: string, fallback?: string) => {
    if (!path) return fallback || ''
    if (/^https?:\/\//i.test(path)) return path
    if (path.startsWith('/storage')) return `${backendOrigin}${path}`
    if (path.startsWith('/')) return path
    const normalized = path.replace(/^\/+/, '')
    return `${backendOrigin}/storage/${normalized}`
  }

  // Filter program berdasarkan tipe yang aktif
  const filteredPrograms = sectionPrograms.filter(p => p.id === activeProgram)

  // Helper function to get icon based on program title or use default
  const getIcon = (titleSource?: string, type?: ProgramType) => {
    const title = (titleSource || '').toLowerCase()
    if (title.includes('tilawati') || title.includes('tahsin')) return '📚'
    if (title.includes('tahsin') || title.includes('qiroah')) return '🎵'
    if (title.includes('murojaah') || title.includes('hafalan')) return '🔄'
    if (title.includes('bimbingan') || title.includes('mentor')) return '👨‍🏫'
    if (title.includes('office') || title.includes('microsoft')) return '📊'
    if (title.includes('web') || title.includes('programming')) return '💻'
    if (title.includes('design') || title.includes('graphic')) return '🎨'
    if (title.includes('robot') || title.includes('arduino')) return '🤖'
    if (title.includes('figma')) return '🎨'
    return type === 'tahfidz' ? '📚' : '💻'
  }

  const programsData = {
    tahfidz: {
      title: sectionTitle || t('programs.tahfidz.title'),
      subtitle: sectionSubtitle || t('programs.tahfidz.subtitle'),
      background: 'from-green-600 via-emerald-600 to-teal-700',
      buttonColor: 'bg-green-600 hover:bg-green-700'
    },
    ict: {
      title: sectionTitle || t('programs.ict.title'),
      subtitle: sectionSubtitle || t('programs.ict.subtitle'),
      background: 'from-blue-600 via-indigo-600 to-purple-700',
      buttonColor: 'bg-blue-600 hover:bg-blue-700'
    }
  }

  const currentProgram = programsData[activeProgram]

  return (
    <div className={`py-16 bg-gradient-to-br ${currentProgram.background} relative overflow-hidden transition-all duration-1000`}>
      {/* Decorative Illustration */}
      <div className="shape-illustration top-right">
        <img src="/ilustrasi/alquran.png" alt="Al-Quran Illustration" />
      </div>
      
      {/* Header Section */}
      <div className="container mx-auto px-4 mb-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
            {sectionTitle || t('programs.header.title')}
          </h2>
          <p className="text-base text-white/80 mb-8">
            {sectionSubtitle || t('programs.header.subtitle')}
          </p>
        </div>
      </div>
      
      <div className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 flex gap-2">
            <button
              onClick={() => handleTabClick('tahfidz')}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 text-sm ${
                activeProgram === 'tahfidz'
                  ? 'bg-white text-green-600 shadow-lg'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {t('programs.tabs.tahfidz')}
            </button>
            <button
              onClick={() => handleTabClick('ict')}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 text-sm ${
                activeProgram === 'ict'
                  ? 'bg-white text-blue-600 shadow-lg'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {t('programs.tabs.ict')}
            </button>
          </div>
        </div>

        {/* Materials Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProgram}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
          >
            {filteredPrograms.map((program, index) => (
              <motion.div
                key={`${program.id}-${program.title}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="border border-gray-200 rounded-lg overflow-hidden h-full bg-white hover:shadow-lg transition-all duration-300 group cursor-pointer"
              >
                {/* Image with gradient overlay */}
                <div className="relative">
                  <div className="absolute h-[60px] bottom-[-1px] w-full z-[2]" style={{background: 'linear-gradient(rgba(255, 255, 255, 0) 50%, rgb(255, 255, 255) 100%)'}}></div>
                  <div 
                    className="h-[100px] min-h-[100px] w-full relative bg-cover bg-center" 
                    style={{backgroundImage: `url(${buildImageUrl(program.image, '/Programkhusus/photo-1553063085-dbbf64d936ea.jpeg')})`}}
                  >
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <span className="text-2xl z-[1]">{getIcon(program.title, program.id)}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-3 py-3 px-3 items-start">
                  {/* Category badge */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="py-1 px-2 border border-gray-400 rounded-full bg-white text-xs text-black font-medium">
                      <div className="flex gap-1 items-center">
                        <div className="text-sm text-[#0BB1CB]">
                          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                          </svg>
                        </div>
                        <p className="capitalize text-xs">{t('programs.badge.program')}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Title and description */}
                   <div className="flex flex-col gap-2">
                     <p className="text-sm font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 text-center w-full">
                       {program.title}
                     </p>
                     <p className="text-xs text-gray-600 text-center leading-relaxed">
                       {program.subtitle}
                     </p>
                   </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        
        <div className="text-center">
          <AnimatePresence mode="wait">
            <motion.button
              key={activeProgram + '-button'}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className={`${currentProgram.buttonColor} text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300 text-sm`}
            >
              {t('programs.learn_button')} {activeProgram === 'tahfidz' ? t('programs.tabs.tahfidz') : t('programs.tabs.ict')}
            </motion.button>
          </AnimatePresence>
        </div>
      </div>
      </div>
    </div>
  )
}

export default ProgramKhususSection