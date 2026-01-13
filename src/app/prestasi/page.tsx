// src/app/prestasi/page.tsx
// Halaman Prestasi dengan layout terinspirasi dari Jagoan Hosting

'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Header } from '@/components/Header';
import { ScrollReveal } from '@/components/ScrollReveal';
import { usePrestasi } from '@/hooks/usePrestasi'
import { prestasiService, PrestasiPost } from '@/services/prestasiService'

export default function PrestasiPage() {
  const { data, loading, error } = usePrestasi()

  // State untuk data berita (terpisah dari API prestasi)
  const [prestasiBeritaData, setPrestasiBeritaData] = useState<PrestasiPost[]>([])
  const [tahfidzBeritaData, setTahfidzBeritaData] = useState<PrestasiPost[]>([])
  const [beritaLoading, setBeritaLoading] = useState(true)
  
  // State untuk carousel gambar kanan (ganti-ganti setiap 5 detik)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [allImages, setAllImages] = useState<PrestasiPost[]>([])
  
  // State untuk carousel tahfidz
  const [tahfidzCarouselIndex, setTahfidzCarouselIndex] = useState(0)

  // Fallback data jika API kosong (menggunakan PrestasiPost interface)
  const fallbackPrestasi: PrestasiPost[] = [
    {
      id: 1,
      title: 'Juara 1 Olimpiade Matematika',
      excerpt: 'Meraih juara 1 dalam Olimpiade Matematika tingkat Kabupaten',
      featured_image: '/prestasi siswa/Selamat kepada Ananda Amir Zaki El S. yang telah mendapat JUARA 2 dalam Kejuaraan Karate Pelaja.webp',
      published_at: '2024-01-01T00:00:00.000000Z',
      tags: ['prestasi', 'akademik']
    },
    {
      id: 2,
      title: 'Juara 2 Kejuaraan Karate',
      excerpt: 'Amir Zaki El S. meraih juara 2 dalam Kejuaraan Karate Pelajar',
      featured_image: '/prestasi siswa/Prestasi gemilangmu tidak hanya mencerminkan bakatmu, tetapi juga dedikasi dan kerja keras yang.jpg',
      published_at: '2024-01-02T00:00:00.000000Z',
      tags: ['prestasi', 'olahraga']
    }
  ]

  const fallbackTahfidz: PrestasiPost[] = [
    {
      id: 1,
      title: 'Hafal 30 Juz Al-Qur\'an',
      excerpt: 'Ahmad Fadhil berhasil menghafal 30 Juz Al-Qur\'an dengan lancar',
      featured_image: '/ilustrasi/alquran.png',
      published_at: '2024-01-01T00:00:00.000000Z',
      tags: ['ujian tahfidz', 'tahfidz']
    },
    {
      id: 2,
      title: 'Hafal 25 Juz Al-Qur\'an',
      excerpt: 'Siti Aisyah menunjukkan kemampuan luar biasa dengan menghafal 25 Juz',
      featured_image: '/ilustrasi/mosque.png',
      published_at: '2024-01-02T00:00:00.000000Z',
      tags: ['ujian tahfidz', 'tahfidz']
    }
  ]

  // Fetch data berita untuk Prestasi List Section dan Tahfidz Section
  useEffect(() => {
    async function fetchBeritaData() {
      setBeritaLoading(true)
      
      try {
        // Fetch prestasi
        const prestasiResponse = await fetch('https://api.alkapro.id/api/v1/news?tags=prestasi')
        if (prestasiResponse.ok) {
          const prestasiData = await prestasiResponse.json()
          if (prestasiData?.data?.length > 0) {
            const converted = prestasiData.data.map((news: any) => ({
              id: news.id,
              title: news.title,
              featured_image: news.image,
              excerpt: news.subtitle?.replace(/<[^>]*>/g, '') || '',
              published_at: news.published_at,
              // Handle both string and array formats for tags
              tags: Array.isArray(news.tags) ? news.tags : (news.tags ? [news.tags] : [])
            }))
            setPrestasiBeritaData(converted)
          } else {
            setPrestasiBeritaData(fallbackPrestasi)
          }
        } else {
          setPrestasiBeritaData(fallbackPrestasi)
        }

        // Fetch tahfidz - coba beberapa URL alternatif
        let tahfidzData = null
        let tahfidzResponse = null
        
        // Coba URL 1: ujian tahfidz
        tahfidzResponse = await fetch('https://api.alkapro.id/api/v1/news?tags=ujian%20tahfidz')
        console.log('🔍 Tahfidz API URL 1:', 'https://api.alkapro.id/api/v1/news?tags=ujian%20tahfidz')
        console.log('🔍 Tahfidz Response 1 Status:', tahfidzResponse.status)
        
        if (tahfidzResponse.ok) {
          tahfidzData = await tahfidzResponse.json()
          console.log('🔍 Raw Tahfidz API Response 1:', tahfidzData)
          console.log('🔍 Tahfidz Data 1 Length:', tahfidzData?.data?.length || 0)
        }
        
        // Jika URL 1 tidak ada data, coba URL 2: tahfidz
        if (!tahfidzData?.data?.length) {
          tahfidzResponse = await fetch('https://api.alkapro.id/api/v1/news?tags=tahfidz')
          console.log('🔍 Tahfidz API URL 2:', 'https://api.alkapro.id/api/v1/news?tags=tahfidz')
          console.log('🔍 Tahfidz Response 2 Status:', tahfidzResponse.status)
          
          if (tahfidzResponse.ok) {
            tahfidzData = await tahfidzResponse.json()
            console.log('🔍 Raw Tahfidz API Response 2:', tahfidzData)
            console.log('🔍 Tahfidz Data 2 Length:', tahfidzData?.data?.length || 0)
          }
        }
        
        // Jika URL 2 tidak ada data, coba URL 3: ujian
        if (!tahfidzData?.data?.length) {
          tahfidzResponse = await fetch('https://api.alkapro.id/api/v1/news?tags=ujian')
          console.log('🔍 Tahfidz API URL 3:', 'https://api.alkapro.id/api/v1/news?tags=ujian')
          console.log('🔍 Tahfidz Response 3 Status:', tahfidzResponse.status)
          
          if (tahfidzResponse.ok) {
            tahfidzData = await tahfidzResponse.json()
            console.log('🔍 Raw Tahfidz API Response 3:', tahfidzData)
            console.log('🔍 Tahfidz Data 3 Length:', tahfidzData?.data?.length || 0)
          }
        }
        
        if (tahfidzData?.data?.length > 0) {
          const converted = tahfidzData.data.map((news: any) => ({
            id: news.id,
            title: news.title,
            featured_image: news.image,
            excerpt: news.subtitle?.replace(/<[^>]*>/g, '') || '',
            published_at: news.published_at,
            // Handle both string and array formats for tags
            tags: Array.isArray(news.tags) ? news.tags : (news.tags ? [news.tags] : [])
          }))
          console.log('🔍 Converted Tahfidz Data:', converted)
          console.log('🔍 Sample tags format:', converted[0]?.tags)
          setTahfidzBeritaData(converted)
        } else {
          console.log('🔍 No tahfidz data found from any URL, using fallback')
          setTahfidzBeritaData(fallbackTahfidz)
        }
      } catch (error) {
        console.error('Error fetching berita:', error)
        setPrestasiBeritaData(fallbackPrestasi)
        setTahfidzBeritaData(fallbackTahfidz)
      }
      
      setBeritaLoading(false)
    }

    fetchBeritaData()
  }, [])

  // Update gabungan gambar setiap kali data prestasi atau tahfidz berubah
  useEffect(() => {
    const combined = [...prestasiBeritaData, ...tahfidzBeritaData]
    setAllImages(combined)
    console.log('🔍 All Images untuk carousel:', combined.length, 'items')
  }, [prestasiBeritaData, tahfidzBeritaData])

  // Carousel gambar ganti setiap 5 detik
  useEffect(() => {
    if (allImages.length === 0) return

    console.log('🔄 Starting carousel with', allImages.length, 'images')

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % allImages.length
        console.log('🔄 Carousel: Gambar', nextIndex + 1, 'dari', allImages.length, 'Title:', allImages[nextIndex]?.title)
        return nextIndex
      })
    }, 5000) // 5 detik

    return () => {
      console.log('🔄 Clearing carousel interval')
      clearInterval(interval)
    }
  }, [allImages]) // Gunakan allImages sebagai dependency, bukan hanya length

  // Gunakan data berita untuk List Section
  const prestasiData = prestasiBeritaData
  const tahfidzData = tahfidzBeritaData

  // Helper function untuk exact tag matching
  const isExactTagMatch = (tags: string[], targetTag: string): boolean => {
    if (!tags || tags.length === 0) return false
    
    return tags.some(tag => {
      const normalizedTag = tag.toLowerCase().trim()
      const normalizedTarget = targetTag.toLowerCase().trim()
      return normalizedTag === normalizedTarget
    })
  }

  // Carousel tahfidz section - ganti setiap 3 detik
  useEffect(() => {
    const filteredTahfidzData = tahfidzData.filter(post => {
      // Pastikan tags ada
      if (!post.tags || post.tags.length === 0) {
        return false
      }
      
      // Hanya tampilkan yang memiliki tag exact "ujian tahfidz"
      const hasExactUjianTahfidzTag = isExactTagMatch(post.tags, 'ujian tahfidz')
      
      console.log('🔍 Filtering tahfidz post:', post.title, 'Tags:', post.tags, 'Has exact ujian tahfidz:', hasExactUjianTahfidzTag)
      
      return hasExactUjianTahfidzTag
    })
    
    if (filteredTahfidzData.length === 0) return

    console.log('🔄 Starting tahfidz carousel with', filteredTahfidzData.length, 'items (exact "ujian tahfidz" only)')

    const interval = setInterval(() => {
      setTahfidzCarouselIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % filteredTahfidzData.length
        console.log('🔄 Tahfidz Carousel: Item', nextIndex + 1, 'dari', filteredTahfidzData.length, 'Title:', filteredTahfidzData[nextIndex]?.title)
        return nextIndex
      })
    }, 3000) // 3 detik

    return () => {
      console.log('🔄 Clearing tahfidz carousel interval')
      clearInterval(interval)
    }
  }, [tahfidzData])

  // Debug: Log data yang diterima
  console.log('🔍 Prestasi Data:', data)
  console.log('🔍 Settings:', data?.settings)
  console.log('🔍 Right Image:', data?.right_image)
  console.log('🔍 Prestasi List:', data?.list_prestasi)
  console.log('🔍 Tahfidz List:', data?.list_tahfidz)
  console.log('🔍 Loading State:', loading)
  console.log('🔍 Error State:', error)

  // Tampilkan loading state
  if (loading) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600">Memuat data prestasi...</p>
          </div>
        </main>
      </div>
    )
  }

  // Tampilkan error state
  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Gagal Memuat Data</h1>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Coba Lagi
            </button>
          </div>
        </main>
      </div>
    )
  }

  // Gunakan settings dari API atau fallback
  const heroBgColor = data?.settings?.hero_background_color || '#1e40af'
  const heroTextColor = data?.settings?.hero_text_color || '#ffffff'
  const mainHeading = data?.settings?.main_heading || 'Prestasi Siswa untuk Berbagai Kebutuhan'
  const heroSubtitle = data?.settings?.hero_subtitle || 'Siswa berprestasi dengan pencapaian luar biasa dan aktivasi instan bikin prestasi akademik dan non-akademik siap jalan bebas hambatan'
  const featureLists = data?.settings?.feature_lists || ['Prestasi Akademik Tinggi', 'Juara Olimpiade Nasional', 'Prestasi up to 150+ Penghargaan', 'Pengembangan Bakat Terpadu']
  const badgeText = data?.settings?.badge_text || 'SMP Muhammadiyah Al Kautsar'

  // Right image dari carousel (ganti-ganti setiap 5 detik)
  const currentImage = allImages.length > 0 ? allImages[currentImageIndex] : null
  const rightImageUrl = currentImage ? 
    prestasiService.getImageUrl(currentImage.featured_image || null, "/prestasi siswa/Prestasi gemilangmu tidak hanya mencerminkan bakatmu, tetapi juga dedikasi dan kerja keras yang.jpg") :
    "/prestasi siswa/Prestasi gemilangmu tidak hanya mencerminkan bakatmu, tetapi juga dedikasi dan kerja keras yang.jpg"
  const rightImageTitle = currentImage?.title || 'Prestasi Siswa SMP Muhammadiyah Al Kautsar'

  // Debug: Log URL yang digunakan
  console.log('🔍 Current Carousel Image:', currentImageIndex + 1, 'dari', allImages.length)
  console.log('🔍 All Images for Carousel:', allImages.map((img, idx) => `${idx + 1}. ${img.title}`))
  console.log('🔍 Right Image URL:', rightImageUrl)
  console.log('🔍 Right Image Title:', rightImageTitle)

  console.log('🔍 Final Prestasi Data (dari berita):', prestasiData)
  console.log('🔍 Final Tahfidz Data (dari berita):', tahfidzData)

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      
      {/* Hero Section - Inspired by Jagoan Hosting Layout */}
      <main className="flex-1">
        <div className="bg-gradient-to-br from-green-100 via-blue-50 to-green-200 py-16 lg:py-24 relative overflow-hidden"
             style={{
               backgroundColor: heroBgColor,
               backgroundImage: `linear-gradient(to right, ${heroBgColor}, ${heroBgColor}, ${heroBgColor})`
             }}>
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full" style={{backgroundImage: 'radial-gradient(circle at 25% 25%, #10b981 2px, transparent 2px), radial-gradient(circle at 75% 75%, #3b82f6 1px, transparent 1px)', backgroundSize: '50px 50px'}}></div>
          </div>
          {/* Background Decorations */}
          <div className="absolute top-10 right-10 w-20 h-20 bg-green-200 rounded-full opacity-30"></div>
          <div className="absolute bottom-20 left-10 w-16 h-16 bg-blue-200 rounded-full opacity-30"></div>
          <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-green-400 rounded-full opacity-60"></div>
          <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-blue-400 rounded-full opacity-60"></div>
          <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-green-300 rounded-full opacity-40"></div>
          <div className="absolute bottom-1/3 right-1/2 w-2 h-2 bg-blue-300 rounded-full opacity-50"></div>
          
          <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between gap-8 lg:gap-12">
              
              {/* Left Content Section */}
              <div className="lg:w-1/2 space-y-6">
                {/* Badge */}
                <div className="inline-block">
                  <span className="bg-white border border-orange-200 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
                      {badgeText}
                  </span>
                </div>

                {/* Main Heading */}
                <div className="space-y-4">
                  <h1 className="text-4xl lg:text-6xl font-bold leading-tight font-serif" style={{fontFamily: 'Philosopher, serif', color: heroTextColor}}>
                    {mainHeading}
                  </h1>
                  
                  <p className="text-lg leading-relaxed" style={{ color: heroTextColor }}>
                    {heroSubtitle}
                  </p>
                </div>

                {/* Feature Lists - Two Columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {featureLists.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-5 h-5 bg-green-500 rounded-sm flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="font-medium" style={{ color: heroTextColor }}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Image Section */}
              <div className="lg:w-1/2 flex justify-center lg:justify-center">
                <div className="relative">
                  {/* Main Image Container */}
                  <div className="relative z-10 rounded-3xl p-6 md:p-8 max-w-[420px] w-full">
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                      <Image
                        src={rightImageUrl}
                        alt={rightImageTitle}
                        width={400}
                        height={500}
                        className="w-full h-auto max-h-[520px] object-cover rounded-xl transition-all duration-700 ease-in-out"
                        priority
                        unoptimized
                      />
                      
                      {/* Carousel Title Overlay */}
                      {currentImage && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 rounded-b-xl">
                          <h3 className="text-white font-semibold text-sm md:text-base line-clamp-2 transition-all duration-500">
                            {rightImageTitle}
                          </h3>
                        </div>
                      )}
                      
                      {/* Carousel Indicators */}
                      {allImages.length > 1 && (
                        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            <span className="text-white text-xs font-medium">
                              {currentImageIndex + 1}/{allImages.length}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Floating Elements */}
                    <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="text-sm">
                          <div className="font-semibold text-gray-900">24/7 Bimbingan Guru</div>
                          <div className="text-gray-500">Selalu Siap Membantu</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">150+</div>
                        <div className="text-sm text-gray-500">Total Prestasi</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Background decoration circles */}
                  <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-green-200 to-green-300 rounded-full opacity-30 -z-10"></div>
                  <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full opacity-30 -z-10"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Prestasi List Section */}
        <section id="prestasi-list" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-12">
                <div className="animated-headline-container">
                  <h2 className="animated-headline text-4xl lg:text-5xl font-bold text-gray-900 mb-4 font-serif" style={{fontFamily: 'Philosopher, serif'}}>
                    <span className="animated-word word-1">Daftar</span>{' '}
                    <span className="animated-word word-2 relative inline-block">
                      <span className="relative z-10 px-2 py-1">Prestasi Siswa</span>
                      <svg className="absolute inset-0 w-full h-full marker-circle" viewBox="0 0 200 50" preserveAspectRatio="none">
                        <ellipse
                          cx="100"
                          cy="25"
                          rx="90"
                          ry="18"
                          fill="none"
                          stroke="#fbbf24"
                          strokeWidth="3"
                          strokeLinecap="round"
                          className="marker-path"
                          transform="rotate(-2 100 25)"
                        />
                      </svg>
                    </span>
                  </h2>
                  <p className="animated-description text-xl text-gray-600 max-w-3xl mx-auto">
                    <span className="animated-text">Berikut adalah </span>
                    <span className="animated-text highlight-blue">prestasi-prestasi</span>
                    <span className="animated-text highlight-orange"> gemilang</span>
                    <span className="animated-text"> yang telah diraih oleh siswa-siswi SMP Muhammadiyah Al Kautsar PK Kartasura</span>
                  </p>
                </div>
                
                <style jsx>{`
                  .animated-headline-container {
                    position: relative;
                    overflow: hidden;
                  }
                  
                  .animated-headline {
                    opacity: 1;
                    animation: slideInFromTop 1s ease-out 0.1s forwards;
                  }
                  
                  .animated-word {
                    display: inline-block;
                    opacity: 1;
                    transform: translateY(0) rotateX(0deg);
                    animation: flipInX 0.6s ease-out forwards;
                    margin-right: 0.5rem;
                  }
                  
                  .word-1 {
                    animation-delay: 0.1s;
                  }
                  
                  .word-2 {
                    animation-delay: 0.2s;
                  }
                  
                  .animated-description {
                    opacity: 1;
                    animation: fadeInUp 1s ease-out 0.5s forwards;
                  }
                  
                  .animated-text {
                    display: inline;
                    opacity: 1;
                    animation: typewriter 0.1s ease-out forwards;
                  }
                  
                  .animated-text:nth-child(1) {
                    animation-delay: 0.6s;
                  }
                  
                  .animated-text:nth-child(2) {
                    animation-delay: 0.7s;
                  }
                  
                  .animated-text:nth-child(3) {
                    animation-delay: 0.8s;
                  }
                  
                  .animated-text:nth-child(4) {
                    animation-delay: 0.9s;
                  }
                  
                  .highlight-orange {
                    background: linear-gradient(135deg, #f97316, #fb923c, #fdba74);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    position: relative;
                    animation: shimmerGlow 2s ease-in-out infinite alternate;
                  }
                  
                  .highlight-orange::after {
                    content: '';
                    position: absolute;
                    bottom: -2px;
                    left: 0;
                    width: 0;
                    height: 3px;
                    background: linear-gradient(90deg, #f97316, #fb923c);
                    animation: underlineGrow 0.8s ease-out 1.2s forwards;
                    border-radius: 2px;
                  }
                  
                  .highlight-blue {
                    background: linear-gradient(135deg, #3b82f6, #60a5fa, #93c5fd);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    position: relative;
                    animation: shimmerGlow 2s ease-in-out infinite alternate;
                  }
                  
                  .highlight-blue::after {
                    content: '';
                    position: absolute;
                    bottom: -2px;
                    left: 0;
                    width: 0;
                    height: 3px;
                    background: linear-gradient(90deg, #3b82f6, #60a5fa);
                    animation: underlineGrow 0.8s ease-out 2.8s forwards;
                    border-radius: 2px;
                  }
                  
                  @keyframes slideInFromTop {
                    from {
                      opacity: 0;
                      transform: translateY(-50px);
                    }
                    to {
                      opacity: 1;
                      transform: translateY(0);
                    }
                  }
                  
                  @keyframes flipInX {
                    from {
                      opacity: 0;
                      transform: translateY(50px) rotateX(90deg);
                    }
                    to {
                      opacity: 1;
                      transform: translateY(0) rotateX(0deg);
                    }
                  }
                  
                  @keyframes fadeInUp {
                    from {
                      opacity: 0;
                      transform: translateY(30px);
                    }
                    to {
                      opacity: 1;
                      transform: translateY(0);
                    }
                  }
                  
                  @keyframes typewriter {
                    from {
                      opacity: 0;
                      transform: scale(0.8);
                    }
                    to {
                      opacity: 1;
                      transform: scale(1);
                    }
                  }
                  
                  @keyframes shimmerGlow {
                    0% {
                      filter: brightness(1) saturate(1);
                    }
                    100% {
                      filter: brightness(1.2) saturate(1.3);
                    }
                  }
                  
                  @keyframes underlineGrow {
                    from {
                      width: 0;
                      opacity: 0;
                    }
                    to {
                      width: 100%;
                      opacity: 1;
                    }
                  }
                  
                  /* Hover Effects */
                  .animated-word:hover {
                    transform: translateY(-5px) scale(1.05);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                  }
                  
                  .highlight-orange:hover,
                  .highlight-blue:hover {
                    animation-duration: 0.5s;
                    cursor: pointer;
                  }
                  
                  /* Responsive */
                  @media (max-width: 768px) {
                    .animated-word {
                      margin-right: 0.25rem;
                    }
                  }

                  /* Marker Circle Animation */
                  .marker-circle {
                    opacity: 0;
                    animation: markerFadeIn 0.5s ease-out 1.5s forwards;
                  }

                  .marker-path {
                    stroke-dasharray: 600;
                    stroke-dashoffset: 600;
                    animation: drawMarker 2.5s ease-in-out 1.5s forwards;
                  }

                  @keyframes markerFadeIn {
                    to {
                      opacity: 1;
                    }
                  }

                  @keyframes drawMarker {
                    to {
                      stroke-dashoffset: 0;
                    }
                  }
                `}</style>
              </div>

              {/* Prestasi Carousel */}
              <div className="prestasi-carousel-container">
                <style jsx>{`
                  .prestasi-carousel-container {
                    overflow: hidden;
                    position: relative;
                  }
                  
                  .prestasi-carousel {
                    display: flex;
                    animation: scroll 30s linear infinite;
                    gap: 2rem;
                  }
                  
                  .prestasi-carousel:hover {
                    animation-play-state: paused;
                  }
                  
                  @keyframes scroll {
                    0% {
                      transform: translateX(0);
                    }
                    100% {
                      transform: translateX(-50%);
                    }
                  }
                  
                  .prestasi-card {
                    flex: 0 0 350px;
                    background: white;
                    border-radius: 0.75rem;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                    overflow: hidden;
                    transition: all 0.3s ease;
                    border: 1px solid #f3f4f6;
                  }
                  
                  .prestasi-card:hover {
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                    transform: translateY(-2px);
                  }
                `}</style>

                <div className="prestasi-carousel">
                  {/* Filter hanya prestasi (bukan ujian tahfidz) */}
                  {prestasiData
                    .filter(post => {
                      // Pastikan tags ada
                      if (!post.tags || post.tags.length === 0) {
                        return false
                      }
                      
                      return post.tags.some(tag => 
                        tag.toLowerCase().includes('prestasi') && 
                        !tag.toLowerCase().includes('ujian tahfidz') &&
                        !tag.toLowerCase().includes('tahfidz')
                      )
                    })
                    .slice(0, 20)
                    .map((post) => {
                      console.log('🔍 Rendering prestasi post:', post.title, 'Tags:', post.tags)
                      
                      return (
                    <div key={post.id} className="prestasi-card">
                      <div className="relative h-48 w-full">
                            {post.featured_image ? (
                        <Image
                                src={post.featured_image}
                          alt={post.title}
                          fill
                          className="object-cover"
                                unoptimized
                        />
                            ) : (
                              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-500 text-sm">No Image</span>
                              </div>
                            )}
                      </div>
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <span className="text-xs text-gray-500">Prestasi</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{post.title}</h3>
                        {post.excerpt && (
                              <p className="text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>
                        )}
                      </div>
                    </div>
                      )
                    })}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Prestasi Ujian Tahfidz Sekali Duduk Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-12">
                <div className="animated-headline-container">
                  <h2 className="animated-headline text-4xl lg:text-5xl font-bold text-gray-900 mb-4 font-serif" style={{fontFamily: 'Philosopher, serif'}}>
                    <span className="animated-word word-1">Prestasi</span>{' '}
                    <span className="animated-word word-2 bg-green-300 px-2 py-1 rounded">Ujian Tahfidz</span>{' '}
                     <span className="animated-word word-3 relative inline-block">
                       <span className="relative z-10 px-2 py-1">Sekali Duduk</span>
                       <svg className="absolute inset-0 w-full h-full marker-circle" viewBox="0 0 200 50" preserveAspectRatio="none">
                         <ellipse
                           cx="100"
                           cy="25"
                           rx="90"
                           ry="18"
                           fill="none"
                           stroke="#86efac"
                           strokeWidth="3"
                           strokeLinecap="round"
                           className="marker-path"
                           transform="rotate(-2 100 25)"
                         />
                       </svg>
                     </span>
                  </h2>
                  <p className="animated-description text-xl text-gray-600 max-w-3xl mx-auto">
                    <span className="animated-text">Prestasi </span>
                    <span className="animated-text highlight-blue">menghafal Al-Qur'an</span>
                    <span className="animated-text highlight-orange"> luar biasa</span>
                    <span className="animated-text"> yang diraih siswa-siswi dalam ujian tahfidz sekali duduk</span>
                  </p>
                </div>
                
                <style jsx>{`
                  .animated-headline-container {
                    position: relative;
                    overflow: hidden;
                  }
                  
                  .animated-headline {
                    opacity: 1;
                    animation: slideInFromTop 1s ease-out 0.1s forwards;
                  }
                  
                  .animated-word {
                    display: inline-block;
                    opacity: 1;
                    transform: translateY(0) rotateX(0deg);
                    animation: flipInX 0.6s ease-out forwards;
                    margin-right: 0.5rem;
                  }
                  
                  .word-1 {
                    animation-delay: 0.1s;
                  }
                  
                  .word-2 {
                    animation-delay: 0.2s;
                  }
                  
                  .word-3 {
                    animation-delay: 0.3s;
                  }
                  
                  .animated-description {
                    opacity: 1;
                    animation: fadeInUp 1s ease-out 0.5s forwards;
                  }
                  
                  .animated-text {
                    display: inline;
                    opacity: 1;
                    animation: typewriter 0.1s ease-out forwards;
                  }
                  
                  .animated-text:nth-child(1) {
                    animation-delay: 0.6s;
                  }
                  
                  .animated-text:nth-child(2) {
                    animation-delay: 0.7s;
                  }
                  
                  .animated-text:nth-child(3) {
                    animation-delay: 0.8s;
                  }
                  
                  .animated-text:nth-child(4) {
                    animation-delay: 0.9s;
                  }
                  
                  .highlight-orange {
                    background: linear-gradient(135deg, #f97316, #fb923c, #fdba74);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    position: relative;
                    animation: shimmerGlow 2s ease-in-out infinite alternate;
                  }
                  
                  .highlight-orange::after {
                    content: '';
                    position: absolute;
                    bottom: -2px;
                    left: 0;
                    width: 0;
                    height: 3px;
                    background: linear-gradient(90deg, #f97316, #fb923c);
                    animation: underlineGrow 0.8s ease-out 1.2s forwards;
                    border-radius: 2px;
                  }
                  
                  .highlight-blue {
                    background: linear-gradient(135deg, #3b82f6, #60a5fa, #93c5fd);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    position: relative;
                    animation: shimmerGlow 2s ease-in-out infinite alternate;
                  }
                  
                  .highlight-blue::after {
                    content: '';
                    position: absolute;
                    bottom: -2px;
                    left: 0;
                    width: 0;
                    height: 3px;
                    background: linear-gradient(90deg, #3b82f6, #60a5fa);
                    animation: underlineGrow 0.8s ease-out 2.8s forwards;
                    border-radius: 2px;
                  }
                  
                  @keyframes slideInFromTop {
                    from {
                      opacity: 0;
                      transform: translateY(-50px);
                    }
                    to {
                      opacity: 1;
                      transform: translateY(0);
                    }
                  }
                  
                  @keyframes flipInX {
                    from {
                      opacity: 0;
                      transform: translateY(50px) rotateX(90deg);
                    }
                    to {
                      opacity: 1;
                      transform: translateY(0) rotateX(0deg);
                    }
                  }
                  
                  @keyframes fadeInUp {
                    from {
                      opacity: 0;
                      transform: translateY(30px);
                    }
                    to {
                      opacity: 1;
                      transform: translateY(0);
                    }
                  }
                  
                  @keyframes typewriter {
                    from {
                      opacity: 0;
                      transform: scale(0.8);
                    }
                    to {
                      opacity: 1;
                      transform: scale(1);
                    }
                  }
                  
                  @keyframes shimmerGlow {
                    0% {
                      filter: brightness(1) saturate(1);
                    }
                    100% {
                      filter: brightness(1.2) saturate(1.3);
                    }
                  }
                  
                  @keyframes underlineGrow {
                    from {
                      width: 0;
                      opacity: 0;
                    }
                    to {
                      width: 100%;
                      opacity: 1;
                    }
                  }
                  
                  /* Hover Effects */
                  .animated-word:hover {
                    transform: translateY(-5px) scale(1.05);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                  }
                  
                  .highlight-orange:hover,
                  .highlight-blue:hover {
                    animation-duration: 0.5s;
                    cursor: pointer;
                  }
                  
                  /* Responsive */
                  @media (max-width: 768px) {
                    .animated-word {
                      margin-right: 0.25rem;
                    }
                  }

                  /* Marker Circle Animation */
                  .marker-circle {
                    opacity: 0;
                    animation: markerFadeIn 0.5s ease-out 1.5s forwards;
                  }

                  .marker-path {
                    stroke-dasharray: 600;
                    stroke-dashoffset: 600;
                    animation: drawMarker 2.5s ease-in-out 1.5s forwards;
                  }

                  @keyframes markerFadeIn {
                    to {
                      opacity: 1;
                    }
                  }

                  @keyframes drawMarker {
                    to {
                      stroke-dashoffset: 0;
                    }
                  }
                `}</style>
              </div>

              {/* Tahfidz Prestasi Carousel */}
              <div className="tahfidz-carousel-container">
                <style jsx>{`
                  .tahfidz-carousel-container {
                    overflow: hidden;
                    position: relative;
                  }
                  
                  .tahfidz-carousel {
                    display: flex;
                    animation: scroll 30s linear infinite;
                    gap: 2rem;
                    width: max-content;
                  }
                  
                  .tahfidz-carousel:hover {
                    animation-play-state: paused;
                  }
                  
                  @keyframes scroll {
                    0% {
                      transform: translateX(0);
                    }
                    100% {
                      transform: translateX(-100%);
                    }
                  }
                  
                  .tahfidz-card {
                    flex: 0 0 350px;
                    background: white;
                    border-radius: 0.75rem;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                    overflow: hidden;
                    transition: all 0.3s ease;
                    border: 1px solid #f3f4f6;
                  }
                  
                  .tahfidz-card:hover {
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                    transform: translateY(-2px);
                  }
                `}</style>
                
                <div className="tahfidz-carousel">
                  {(() => {
                    // Filter hanya berita dengan tag exact "ujian tahfidz"
                    const filteredTahfidzData = tahfidzData.filter(post => {
                      // Pastikan tags ada
                      if (!post.tags || post.tags.length === 0) {
                        return false
                      }
                      
                      // Hanya tampilkan yang memiliki tag exact "ujian tahfidz"
                      const hasExactUjianTahfidzTag = isExactTagMatch(post.tags, 'ujian tahfidz')
                      
                      console.log('🔍 Rendering filter check - Post:', post.title, 'Tags:', post.tags, 'Has exact ujian tahfidz:', hasExactUjianTahfidzTag)
                      
                      return hasExactUjianTahfidzTag
                    })
                    
                    console.log('🔍 Filtered Tahfidz Data (exact "ujian tahfidz" only):', filteredTahfidzData.length, 'items')
                    
                    // Jika tidak ada data tahfidz, tampilkan fallback
                    if (filteredTahfidzData.length === 0) {
                      const fallbackCards = fallbackTahfidz.map((post) => (
                        <div key={post.id} className="tahfidz-card">
                          <div className="relative h-72">
                            {post.featured_image ? (
                              <Image
                                src={post.featured_image}
                                alt={post.title}
                                fill
                                className="object-cover object-center"
                                unoptimized
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-500 text-sm">No Image</span>
                              </div>
                            )}
                            <div className="absolute top-4 left-4">
                              <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                Tahfidz
                              </span>
                            </div>
                          </div>
                          <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                              {post.title}
                            </h3>
                            {post.excerpt && (
                              <p className="text-gray-600 mb-4">{post.excerpt}</p>
                            )}
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-500">{post.published_at ? new Date(post.published_at).getFullYear() : ''}</span>
                              <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                </svg>
                                <span className="text-sm font-semibold text-gray-700">Tahfidz</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                      
                      // Duplikasi fallback cards untuk carousel berulang
                      return [...fallbackCards, ...fallbackCards]
                    }
                    
                    // Tampilkan data tahfidz yang sudah difilter
                    const tahfidzCards = filteredTahfidzData.map((post) => {
                      console.log('✅ Rendering tahfidz post:', post.title, 'Tags:', post.tags)
                      
                      return (
                        <div key={post.id} className="tahfidz-card">
                          <div className="relative h-72">
                            {post.featured_image ? (
                              <Image
                                src={post.featured_image}
                                alt={post.title}
                                fill
                                className="object-cover object-center"
                                unoptimized
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-500 text-sm">No Image</span>
                              </div>
                            )}
                            <div className="absolute top-4 left-4">
                              <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                Tahfidz
                              </span>
                            </div>
                          </div>
                          <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                              {post.title}
                            </h3>
                            {post.excerpt && (
                              <p className="text-gray-600 mb-4">{post.excerpt}</p>
                            )}
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-500">{post.published_at ? new Date(post.published_at).getFullYear() : ''}</span>
                              <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                </svg>
                                <span className="text-sm font-semibold text-gray-700">Tahfidz</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })
                    
                    // Duplikasi cards untuk carousel berulang sempurna
                    return [...tahfidzCards, ...tahfidzCards]
                  })()}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
    </div>
  );
}
