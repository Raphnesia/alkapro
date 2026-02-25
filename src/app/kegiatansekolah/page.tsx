'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { getApiUrl, getImageUrl } from '@/lib/config'
import { activityApi, PaginatedResponse, SchoolActivity } from '@/lib/api'
import { config } from '@/lib/config'

interface KegiatanItem {
  id: number
  title: string
  slug: string
  excerpt: string
  image: string
  category: string
  date: string
  author: string
  type: 'prestasi' | 'ekstrakurikuler' | 'akademik' | 'sosial'
}

interface Category {
  name: string
  count: number
}

interface KegiatanSettings {
  id: number
  title: string
  subtitle: string
  banner_desktop: string
  banner_mobile: string
}

const KegiatanSekolahPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('Semua Kegiatan')
  const [activities, setActivities] = useState<KegiatanItem[]>([])
  const [settings, setSettings] = useState<KegiatanSettings | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [visibleCount, setVisibleCount] = useState<number>(9)

  // Data default untuk banner (fallback)
  const defaultBanner = {
    title: 'Kegiatan Sekolah',
    subtitle: 'Dokumentasi berbagai kegiatan, prestasi, dan aktivitas siswa SMP Muhammadiyah Al Kautsar PK Kartasura',
    bannerDesktop: '/Programkhusus/156354-building-a-custom-wordpress-theme.png',
    bannerMobile: '/Programkhusus/html-code-on-computer-monitor-software-web-developer-programming-code-photo.jpg'
  }

  const bannerData = useMemo(() => {
    const result = {
      title: settings?.title || defaultBanner.title,
      subtitle: settings?.subtitle || defaultBanner.subtitle,
      bannerDesktop: settings?.banner_desktop && settings.banner_desktop !== 'null' 
        ? getImageUrl(settings.banner_desktop) 
        : defaultBanner.bannerDesktop,
      bannerMobile: settings?.banner_mobile && settings.banner_mobile !== 'null'
        ? getImageUrl(settings.banner_mobile) 
        : defaultBanner.bannerMobile,
    }
    
    console.log('🎨 Banner data computed:', {
      settings,
      defaultBanner,
      result
    })
    
    return result
  }, [settings])

  // Fetch activities + settings from backend (complete endpoint)
  useEffect(() => {
    const fetchComplete = async () => {
      try {
        setLoading(true)
        setError(null)

        // Try complete endpoint first
        let success = false
        try {
          const res = await fetch(getApiUrl('/activities/complete'), { cache: 'no-store' })
          if (res.ok) {
            const json = await res.json()
            console.log('📡 Complete endpoint response:', json)
            const payload = json?.data || json
            const list: any[] = payload?.activities || []
            const cfg: any = payload?.settings || null
            
            console.log('📊 Processed data:', { activities: list.length, settings: cfg })

            const mapped: KegiatanItem[] = list.map((it: any) => {
              const normalizedImage = getImageUrl(it.image)
              console.log('🖼️ Processing activity image:', {
                id: it.id,
                title: it.title,
                originalImage: it.image,
                normalizedImage: normalizedImage
              })
              
              return {
                id: it.id,
                title: it.title,
                slug: it.slug,
                excerpt: it.excerpt || '',
                image: normalizedImage || '/pace.jpeg', // Fallback ke default image
                category: it.category || 'Lainnya',
                date: it.date || it.activity_date || '',
                author: it.author || 'Admin',
                type: ((): KegiatanItem['type'] => {
                  const v = String(it.type || it.category || '').toLowerCase()
                  if (v.includes('prestasi')) return 'prestasi'
                  if (v.includes('ekstrakurikuler')) return 'ekstrakurikuler'
                  if (v.includes('sosial')) return 'sosial'
                  return 'akademik'
                })(),
              }
            })

            setActivities(mapped)
            if (cfg) {
              console.log('📊 Settings data received:', cfg)
              setSettings({
                id: cfg.id,
                title: cfg.title || defaultBanner.title,
                subtitle: cfg.subtitle || defaultBanner.subtitle,
                banner_desktop: cfg.banner_desktop && cfg.banner_desktop !== 'null' ? cfg.banner_desktop : null,
                banner_mobile: cfg.banner_mobile && cfg.banner_mobile !== 'null' ? cfg.banner_mobile : null,
              })
            } else {
              console.log('⚠️ No settings data received, using defaults')
              setSettings(null)
            }
            success = true
          }
        } catch {}

        // Fallback ke /v1/activities (tanpa settings)
        if (!success) {
          try {
            const res2 = await fetch(getApiUrl('/activities'), { cache: 'no-store' })
            if (res2.ok) {
              const json2 = await res2.json()
              const list2: any[] = Array.isArray(json2?.data) ? json2.data : (Array.isArray(json2) ? json2 : [])
              const mapped2: KegiatanItem[] = list2.map((it: any) => ({
                id: it.id,
                title: it.title,
                slug: it.slug,
                excerpt: it.excerpt || it.description || '',
                image: getImageUrl(it.image),
                category: it.category || 'Lainnya',
                date: it.date || it.activity_date || '',
                author: it.author || 'Admin',
                type: ((): KegiatanItem['type'] => {
                  const v = String(it.type || it.category || '').toLowerCase()
                  if (v.includes('prestasi')) return 'prestasi'
                  if (v.includes('ekstrakurikuler')) return 'ekstrakurikuler'
                  if (v.includes('sosial')) return 'sosial'
                  return 'akademik'
                })(),
              }))
              setActivities(mapped2)
              setSettings(null)
              success = true
            }
          } catch {}
        }

        // Fallback terakhir: /school-activities (paginated lama)
        if (!success) {
          const page1 = await activityApi.getAll(1)
          const list = Array.isArray((page1 as PaginatedResponse<SchoolActivity>)?.data)
            ? (page1 as PaginatedResponse<SchoolActivity>).data
            : ([] as SchoolActivity[])
          const mapped: KegiatanItem[] = list.map((it: any) => ({
            id: it.id,
            title: it.title,
            slug: it.slug,
            excerpt: it.description || it.content || '',
            image: getImageUrl(it.image),
            category: it.category || 'Lainnya',
            date: it.date || '',
            author: 'Admin',
            type: ((): KegiatanItem['type'] => {
              const v = String(it.type || it.category || '').toLowerCase()
              if (v.includes('prestasi')) return 'prestasi'
              if (v.includes('ekstrakurikuler')) return 'ekstrakurikuler'
              if (v.includes('sosial')) return 'sosial'
              return 'akademik'
            })(),
          }))
          setActivities(mapped)
          setSettings(null)
        }
      } catch (e: any) {
        setError('Gagal memuat data kegiatan.')
        setActivities([])
        setSettings(null)
      } finally {
        setLoading(false)
      }
    }

    fetchComplete()
  }, [])

  // Build categories dynamically from activities
  const categories: Category[] = useMemo(() => {
    if (!activities.length) {
      return [
        { name: 'Semua Kegiatan', count: 0 },
      ]
    }

    const counts = activities.reduce<Record<string, number>>((acc, a) => {
      const key = a.category || 'Lainnya'
      acc[key] = (acc[key] || 0) + 1
      return acc
    }, {})

    const entries = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }))

    return [
      { name: 'Semua Kegiatan', count: activities.length },
      ...entries,
    ]
  }, [activities])

  const filteredKegiatan = useMemo(() => {
    const base = selectedCategory === 'Semua Kegiatan'
      ? activities
      : activities.filter(kegiatan => kegiatan.category === selectedCategory)

    return base.slice(0, visibleCount)
  }, [activities, selectedCategory, visibleCount])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header />
      
      {/* IMG dengan Overlay untuk Desktop */}
      <div className="relative w-full h-screen">
        {/* Desktop Image */}
        <Image 
          src={bannerData.bannerDesktop}
          alt="banner"
          fill
          className="object-cover hidden md:block"
          priority
          sizes="100vw"
          quality={75}
        />
        {/* Mobile Image */}
        <Image 
          src={bannerData.bannerMobile}
          alt="banner"
          fill
          className="object-cover block md:hidden"
          priority
          sizes="100vw"
          quality={75}
        />
        
        {/* Overlay Content untuk Desktop */}
        <div className="absolute inset-0 hidden md:flex md:items-end">
          <div className="w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent">
            <div className="container mx-auto px-8 pb-16">
              <div className="max-w-3xl">
                {/* Title Panel */}
                <div className="d-block">
                  <div className="bg-blue-600 d-inline-flex p-5 title-panel-scoped" style={{boxSizing: 'border-box'}}>
                    <h1 className="text-2xl md:text-3xl lg:text-2xl font-bold text-white mb-0 line-clamp-2" style={{padding: '0px !important'}}>
                      {bannerData.title}
                    </h1>
                  </div>
                </div>
                
                {/* Subtitle Panel */}
                <div className="bg-blue-700 p-4 opacity-90 d-inline-flex rounded-b-lg" style={{boxSizing: 'border-box'}}>
                  <p className="text-white text-sm md:text-lg font-semibold mb-0">
                    {bannerData.subtitle}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* DIV untuk Mobile */}
      <div className="w-full bg-gradient-to-r from-blue-600 to-blue-900 py-6 md:hidden">
        <div className="container mx-auto px-4">
          <div className="d-block">
            {/* Title Panel untuk Mobile */}
            <div className="bg-blue-700 d-inline-flex p-4 title-panel-scoped">
              <h1 className="text-xl font-bold text-white mb-0" style={{padding: '0px !important'}}>
                {bannerData.title}
              </h1>
            </div>
            
            {/* Subtitle Panel untuk Mobile */}
            <div className="bg-blue-800 mb-0 p-4 opacity-90 d-inline-flex subtitle-panel-scoped">
              <div>
                <p className="text-white text-sm font-semibold mb-0">
                  {bannerData.subtitle}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Kategori Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 sticky top-24">
                <h3 className="text-xl font-bold text-gray-800 mb-6">
                  Kategori Kegiatan
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex justify-between items-center group ${
                        selectedCategory === category.name
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                      }`}
                    >
                      <span className="font-medium">{category.name}</span>
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        selectedCategory === category.name
                          ? 'bg-white/20 text-white'
                          : 'bg-gray-100 text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-600'
                      }`}>
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Kegiatan List */}
            <div className="lg:w-3/4">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Kegiatan Terbaru
                </h3>
                <p className="text-gray-600">
                  {loading ? 'Memuat kegiatan…' : error ? 'Gagal memuat kegiatan' : (
                    <>Menampilkan {filteredKegiatan.length} kegiatan dari kategori "{selectedCategory}"</>
                  )}
                </p>
              </div>

              {error ? (
                <div className="text-center py-12">
                  <div className="bg-white border border-red-100 text-red-600 rounded-2xl p-6">
                    {error}
                  </div>
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedCategory + (loading ? '-loading' : '-loaded')}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {loading ? (
                      Array.from({ length: 6 }).map((_, idx) => (
                        <div key={idx} className="bg-white rounded-xl h-64 animate-pulse border border-gray-100" />
                      ))
                    ) : (
                      filteredKegiatan.map((kegiatan, index) => (
                        <motion.article
                          key={kegiatan.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer border border-gray-100"
                        >
                          <Link href={`/kegiatansekolah/${kegiatan.slug}`} className="block h-full">
                            {/* Image */}
                            <div className="relative h-48 overflow-hidden">
                              <Image
                                src={kegiatan.image}
                                alt={kegiatan.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                              
                              {/* Category Badge */}
                              <div className="absolute top-4 left-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
                                  kegiatan.type === 'prestasi' ? 'bg-yellow-500' :
                                  kegiatan.type === 'ekstrakurikuler' ? 'bg-purple-500' :
                                  kegiatan.type === 'akademik' ? 'bg-blue-500' :
                                  'bg-green-500'
                                }`}>
                                  {kegiatan.category}
                                </span>
                              </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                              <h4 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                                {kegiatan.title}
                              </h4>
                              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                {kegiatan.excerpt}
                              </p>
                              
                              {/* Meta Info */}
                              <div className="flex items-center justify-between text-xs text-gray-500">
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                                    <svg className="w-3 h-3 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                  </div>
                                  <span>{kegiatan.author}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                  </svg>
                                  <span>{kegiatan.date}</span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </motion.article>
                      ))
                    )}
                  </motion.div>
                </AnimatePresence>
              )}

              {/* Load More Button */}
              {!loading && !error && filteredKegiatan.length < (selectedCategory === 'Semua Kegiatan' ? activities.length : activities.filter(k => k.category === selectedCategory).length) && (
                <div className="text-center mt-12">
                  <button onClick={() => setVisibleCount(v => v + 9)} className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-medium px-8 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    Muat Lebih Banyak Kegiatan
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default KegiatanSekolahPage