'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { BookOpen, Users, Target, Award, Star, CheckCircle, Heart, Brain, Monitor, Code, UsersRound, Lightbulb, FileText, UserCheck, Calendar, CreditCard, GraduationCap, Building, Clock, Instagram, Camera, FileImage, Book, Search, Wifi, Coffee, ChevronLeft, ChevronRight, UserPlus, MapPin, ShieldCheck, Key } from 'lucide-react'
import { useAlkaproLibrary } from '@/hooks/useAlkaproLibrary'
import { AlkaproLibraryLoading } from '@/components/AlkaproLibraryLoading'
import { AlkaproLibraryError } from '@/components/AlkaproLibraryError'

const AlkaproLibrary = () => {
  const { data, loading, error, refetch } = useAlkaproLibrary()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentPamphletIndex, setCurrentPamphletIndex] = useState(0)

  // Fallback data - same as before
  const fallbackGallery = [
    '/perpustakaan-sekolah.webp',
    '/Programkhusus/html-code-on-computer-monitor-software-web-developer-programming-code-photo.jpg',
    '/Programkhusus/photo-1553063085-dbbf64d936ea.jpeg',
    '/Programkhusus/google-logo-redesign-uhd-4k-wallpaper.jpg',
    '/Programkhusus/156354-building-a-custom-wordpress-theme.png'
  ]

  const fallbackPamphlets = [
    '/Programkhusus/6-1.png',
    '/Programkhusus/canva-background-qz8kedi3hsiz0ok3.png',
    '/Frame 490.png',
    '/image (10).png',
    '/image (11).png'
  ]

  // Use API data or fallback
  const libraryGallery = data?.gallery?.images || fallbackGallery
  const libraryPamphlets = data?.pamphlets?.images || fallbackPamphlets
  const galleryAutoSlide = data?.gallery?.auto_slide ?? true
  const galleryInterval = data?.gallery?.slide_interval || 4000
  const pamphletAutoSlide = data?.pamphlets?.auto_slide ?? true
  const pamphletInterval = data?.pamphlets?.slide_interval || 5000

  // Auto-slide for gallery
  useEffect(() => {
    if (!galleryAutoSlide) return
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % libraryGallery.length)
    }, galleryInterval)
    return () => clearInterval(interval)
  }, [libraryGallery.length, galleryAutoSlide, galleryInterval])

  // Auto-slide for pamphlets
  useEffect(() => {
    if (!pamphletAutoSlide) return
    const interval = setInterval(() => {
      setCurrentPamphletIndex((prev) => (prev + 1) % libraryPamphlets.length)
    }, pamphletInterval)
    return () => clearInterval(interval)
  }, [libraryPamphlets.length, pamphletAutoSlide, pamphletInterval])

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % libraryGallery.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + libraryGallery.length) % libraryGallery.length)
  }

  const nextPamphlet = () => {
    setCurrentPamphletIndex((prev) => (prev + 1) % libraryPamphlets.length)
  }

  const prevPamphlet = () => {
    setCurrentPamphletIndex((prev) => (prev - 1 + libraryPamphlets.length) % libraryPamphlets.length)
  }

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <AlkaproLibraryLoading />
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <AlkaproLibraryError error={error} onRetry={refetch} />
      </div>
    )
  }

  // Get data from API or use fallbacks
  const heroTitle = data?.basic_info?.title || data?.hero_section?.title || 'Alkapro Library'
  const heroSubtitle = data?.basic_info?.subtitle || data?.hero_section?.subtitle || 'Perpustakaan Modern SMP Muhammadiyah Al Kautsar PK Kartasura'
  const heroBannerDesktop = data?.basic_info?.banner_desktop || data?.hero_section?.image || '/perpustakaan-sekolah.webp'
  const heroBannerMobile = data?.basic_info?.banner_mobile || data?.hero_section?.image || '/perpustakaan-sekolah.webp'
  
  const introBadge = data?.introduction?.badge_text || 'Perpustakaan Sekolah'
  const introTitle = data?.introduction?.title || 'Selamat Datang di Alkapro Library'
  const introDescription = data?.introduction?.description || 'Perpustakaan modern dengan koleksi lengkap dan fasilitas terdepan untuk mendukung kegiatan belajar mengajar dan penelitian siswa SMP Muhammadiyah Al Kautsar PK Kartasura.'
  const introFeaturedImage = data?.introduction?.featured_image || '/perpustakaan-sekolah.webp'
  
  const featuresTitle = data?.features?.title || 'Visi dan Misi Alkapro Library'
  const collectionFeatures = data?.features?.collection_features || [
    'Menjadi Pusat Layanan Sumber Pembelajaran berbasis Teknologi Informasi yang menyenangkan dan bermanfaat guna mendukung SMP Muhammadiyah Al Kautsar PK menjadi Sekolah Islami yang berprestasi, modern dan berkemajuan'
  ]
  const facilityFeatures = data?.features?.facility_features || [
    'Menumbuhkan, Menanamkan serta membina minat baca siswa SMP Muhammadiyah Al Kausar PK',
    'Memperluas pengetahuan dengan menyediakan berbagai macam sumber informasi berupa, bahan pustaka dan multimedia',
    'Memberikan layanan prima dengan menggunakan teknologi informasi.'
  ]

  // Programs section - conditional rendering
  const showPrograms = data?.programs !== null
  const programsTitle = data?.programs?.title || 'Program Unggulan Perpustakaan'
  const programsDescription = data?.programs?.description || 'Berbagai program menarik yang tersedia di Alkapro Library untuk mendukung minat baca dan pembelajaran siswa'
  const readingClubTitle = data?.programs?.reading_club?.title || 'Reading Club Alkapro'
  const readingClubDescription = data?.programs?.reading_club?.description || 'Program klub membaca yang mengajak siswa untuk aktif membaca buku, berdiskusi, dan berbagi pengalaman literasi dalam suasana yang menyenangkan dan edukatif.'
  const readingClubImage = data?.programs?.reading_club?.image || '/perpustakaan-sekolah.webp'
  const digitalLibraryTitle = data?.programs?.digital_library?.title || 'Perpustakaan Digital'
  const digitalLibraryDescription = data?.programs?.digital_library?.description || 'Akses ke koleksi digital yang luas termasuk e-book, jurnal online, dan database akademik untuk mendukung penelitian dan pembelajaran modern siswa.'
  const digitalLibraryImage = data?.programs?.digital_library?.image || '/Programkhusus/html-code-on-computer-monitor-software-web-developer-programming-code-photo.jpg'

  // Additional services - conditional rendering
  const showAdditionalServices = data?.additional_services !== null
  const additionalServicesTitle = data?.additional_services?.title || 'Layanan Tambahan'
  const additionalServicesDescription = data?.additional_services?.description || 'Layanan khusus yang tersedia untuk mendukung kegiatan akademik dan penelitian siswa'
  const additionalServices = data?.additional_services?.services || [
    { title: '1. Layanan Referensi', description: 'Bantuan pustakawan dalam mencari informasi dan referensi untuk tugas dan penelitian siswa', icon: 'search' },
    { title: '2. Pelatihan Literasi Digital', description: 'Workshop dan pelatihan penggunaan database digital, e-journal, dan sumber informasi online', icon: 'monitor' },
    { title: '3. Ruang Belajar Kelompok', description: 'Fasilitas ruang diskusi untuk kegiatan belajar kelompok dan presentasi siswa', icon: 'users' },
    { title: '4. Layanan Fotokopi & Print', description: 'Fasilitas fotokopi dan print untuk kebutuhan akademik siswa dengan harga terjangkau', icon: 'file-text' },
  ]

  // Service hours - conditional rendering
  const showServiceHours = data?.service_hours !== null
  const serviceHoursTitle = data?.service_hours?.title || 'Jam Layanan Perpustakaan Sekolah'
  const weekdayHours = data?.service_hours?.weekday_hours || '07.30 - 14.30 WIB'
  const weekendHours = data?.service_hours?.weekend_hours || '07.30 - 11.00 WIB'
  const serviceNote = data?.service_hours?.note || 'Perpustakaan tutup pada hari libur nasional dan cuti bersama'

  // Social media - conditional rendering
  const showSocialMedia = data?.social_media !== null
  const instagramUsername = data?.social_media?.instagram_username || '@alkapro.library'
  const instagramUrl = data?.social_media?.instagram_url || 'https://instagram.com/alkapro.library'

  // CTA section - conditional rendering
  const showCTA = data?.call_to_action !== null
  const ctaTitle = data?.call_to_action?.title || 'Siap Menjelajahi Dunia Pengetahuan di Alkapro Library?'
  const ctaDescription = data?.call_to_action?.description || 'Bergabunglah dengan ribuan siswa yang telah merasakan manfaat fasilitas perpustakaan modern kami. Temukan koleksi lengkap, fasilitas terdepan, dan suasana belajar yang nyaman.'
  const ctaBackground = data?.call_to_action?.background_image || '/Programkhusus/156354-building-a-custom-wordpress-theme.png'
  const ctaPrimaryText = data?.call_to_action?.primary_button?.text || 'Tentang Sekolah'
  const ctaPrimaryUrl = data?.call_to_action?.primary_button?.url || '/profil'
  const ctaSecondaryText = data?.call_to_action?.secondary_button?.text || 'Lihat Fasilitas Lain'
  const ctaSecondaryUrl = data?.call_to_action?.secondary_button?.url || '/fasilitas'

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="">
        {/* Hero Section */}
        <div className="relative w-full md:h-screen h-64">
          {/* Desktop Image */}
          <Image 
            src={data?.basic_info?.banner_desktop || "/perpustakaan-sekolah.webp"}
            alt={data?.basic_info?.title || "Alkapro Library"}
            fill
            className="object-cover hidden md:block"
            priority
            sizes="100vw"
            quality={75}
          />
          {/* Mobile Image */}
          <div className="relative w-full h-full md:hidden">
            <Image 
              src={data?.basic_info?.banner_mobile || "/perpustakaan-sekolah.webp"}
              alt={data?.basic_info?.title || "Alkapro Library"}
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
                  {/* Left Side - Title and Subtitle */}
                  <div className="max-w-3xl">
                    {/* Title Panel */}
                    <div className="block">
                      <div className="bg-gradient-to-r from-blue-600 to-blue-800 inline-flex p-5">
                        <h1 className="text-2xl md:text-3xl lg:text-2xl font-bold text-white mb-0 line-clamp-2" style={{ fontFamily: 'Philosopher, serif' }}>
                          Alkapro Library
                        </h1>
                      </div>
                    </div>
                    
                    {/* Subtitle Panel */}
                    <div className="bg-gradient-to-r from-blue-700 to-blue-900 p-4 opacity-90 inline-flex rounded-b-lg">
                      <p className="text-white text-sm md:text-lg font-semibold mb-0">
                        Perpustakaan Modern SMP Muhammadiyah Al Kautsar PK Kartasura
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Title Section */}
        <div className="w-full bg-gradient-to-r from-blue-700 to-blue-800 py-4 md:hidden">
          <div className="container mx-auto px-4">
            <div className="block">
              {/* Title Panel untuk Mobile */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 inline-flex p-3">
                <h1 className="text-lg font-bold text-white mb-0" style={{ fontFamily: 'Philosopher, serif' }}>
                  Alkapro Library
                </h1>
              </div>
              
              {/* Subtitle Panel untuk Mobile */}
              <div className="bg-gradient-to-r from-blue-700 to-blue-900 mb-0 p-3 opacity-90 inline-flex">
                <div>
                  <p className="text-white text-xs font-semibold mb-0">
                    Perpustakaan Modern SMP Muhammadiyah Al Kautsar PK Kartasura
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div id="library-details" className="container mx-auto px-4 md:px-8 py-8 md:py-20">
          <div className="max-w-6xl mx-auto">
            
            {/* Introduction Section */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full px-6 py-2 mb-6">
                <BookOpen className="w-5 h-5 mr-2 text-blue-500" />
                <span className="text-sm font-semibold text-gray-700">{introBadge}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight" style={{ fontFamily: 'Philosopher, serif' }}>
                {introTitle.includes('Alkapro Library') ? (
                  <>
                    {introTitle.split('Alkapro Library')[0]}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Alkapro Library</span>
                    {introTitle.split('Alkapro Library')[1]}
                  </>
                ) : (
                  introTitle
                )}
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
                {introDescription}
              </p>
            </div>

            {/* Featured Image with Modern Design */}
            <div className="relative mb-16">
              <div className="relative group">
                {/* Floating background elements */}
                <div className="absolute -top-4 -left-4 w-32 h-32 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                <div className="absolute -bottom-4 -right-4 w-40 h-40 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div>
                
                {/* Main image container */}
                <div className="relative bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-sm p-4 rounded-3xl shadow-2xl border border-white/20">
                  <div className="relative overflow-hidden rounded-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-purple-500/20"></div>
                    <Image
                      src={introFeaturedImage}
                      alt="Alkapro Library Interior"
                      width={800}
                      height={500}
                      className="w-full h-96 object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    
                    {/* Glassmorphism overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-8 left-8 right-8">
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                          <h3 className="text-3xl font-bold text-white mb-3">Perpustakaan Modern</h3>
                          <p className="text-blue-100 text-lg">Fasilitas lengkap dan koleksi terdepan</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Corner badge */}
                    <div className="absolute top-6 right-6 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg transform translate-x-20 group-hover:translate-x-0 transition-transform duration-500">
                      Alkapro Library
                    </div>
                  </div>
                </div>
                
                {/* Floating icons */}
                <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl shadow-xl flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -bottom-6 -left-6 w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full shadow-xl flex items-center justify-center transform -rotate-12 group-hover:rotate-0 transition-transform duration-500">
                  <Star className="w-7 h-7 text-white" />
                </div>
              </div>
            </div>
            
            {/* Key Points - Library Features */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Philosopher, serif' }}>
                {featuresTitle}
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 p-8 rounded-2xl hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800" style={{ fontFamily: 'Philosopher, serif' }}>Visi</h3>
                </div>
                <div className="text-gray-700 leading-relaxed">
                  <ul className="space-y-3">
                    {collectionFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-blue-500 mr-2 mt-1 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 p-8 rounded-2xl hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800" style={{ fontFamily: 'Philosopher, serif' }}>Misi</h3>
                </div>
                <div className="text-gray-700 leading-relaxed">
                  <ul className="space-y-3">
                    {facilityFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-purple-500 mr-2 mt-1 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Library Facilities Flow Section */}
            <div className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Philosopher, serif' }}>
                  {data?.facilities_flow?.title ? (
                    <>
                      {data.facilities_flow.title.split(' ').map((word, index) => 
                        index === 1 ? (
                          <span key={index} className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{word} </span>
                        ) : (
                          <span key={index}>{word} </span>
                        )
                      )}
                    </>
                  ) : (
                    <>
                      Alur <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Peminjaman Buku</span>
                    </>
                  )}
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  {data?.facilities_flow?.description || 'Langkah-langkah mudah untuk peminjaman buku di perpustakaan Alkapro Library'}
                </p>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Image Section */}
                <div className="relative">
                  <div className="relative group">
                    {/* Background glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                    
                    {/* 3D card container */}
                    <div className="relative bg-white/90 backdrop-blur-sm p-4 rounded-3xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
                      <div className="relative overflow-hidden rounded-2xl">
                        <Image
                          src="/perpustakaan-sekolah.webp"
                          alt="Fasilitas Perpustakaan"
                          width={400}
                          height={600}
                          className="w-full h-[600px] object-cover rounded-2xl transform group-hover:scale-110 transition-transform duration-700"
                        />
                        
                        {/* Modern overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-6 left-6 right-6">
                            <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30">
                              <div className="flex items-center space-x-3">
                                <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                                <span className="text-sm font-medium text-white">Proses Peminjaman Mudah</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Floating badge */}
                        <div className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
                          MUDAH
                        </div>
                      </div>
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl opacity-60 blur-xl"></div>
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-60 blur-xl"></div>
                  </div>
                </div>
                
                {/* Steps Grid - Now using facilities_flow API data */}
                <div className="grid gap-6">
                  {(data?.facilities_flow?.steps || [
                    { step_number: '01', title: 'Siswa atau peminjam datang langsung ke perpustakaan', description: 'Siswa atau peminjam datang langsung ke perpustakaan dan mencari buku yang ingin dipinjam langsung ke rak buku atau dengan menggunakan OPAC', icon: 'user-plus' },
                    { step_number: '02', title: 'Menyerahkan buku dan KTA Perpus kepada pustakawan', description: 'Siswa atau peminjam menyerahkan buku yang ingin dipinjam beserta KTA Perpus kepada pustakawan di bagian sirkulasi', icon: 'map-pin' },
                    { step_number: '03', title: 'Pustakawan memproses peminjaman melalui SLiMS', description: 'Pustakawan memproses peminjaman buku yang ingin dipinjam siswa melalui aplikasi automasi SLiMS', icon: 'shield-check' },
                    { step_number: '04', title: 'Pustakawan menyerahkan buku kepada siswa', description: 'Pustakawan menyerahkan buku yang ingin dipinjam siswa dan telah diproses serta KTA kepada siswa atau peminjam', icon: 'key' },
                    { step_number: '05', title: 'Proses Peminjaman Selesai', description: 'Proses Peminjaman Selesai, Siswa dapat membaca buku dengan nyaman dan aman', icon: 'book-open' }
                  ]).map((step, i) => {
                    const bgGrad = [
                      'from-blue-50 to-indigo-50 border-blue-100',
                      'from-indigo-50 to-purple-50 border-indigo-100',
                      'from-purple-50 to-pink-50 border-purple-100',
                      'from-pink-50 to-red-50 border-pink-100',
                      'from-red-50 to-orange-50 border-red-100',
                    ][i % 5]
                    const TitleHover = [
                      'group-hover:text-blue-600',
                      'group-hover:text-indigo-600',
                      'group-hover:text-purple-600',
                      'group-hover:text-pink-600',
                      'group-hover:text-red-600',
                    ][i % 5]
                    const colors = [
                      'from-blue-500 to-indigo-600',
                      'from-indigo-500 to-purple-600',
                      'from-purple-500 to-pink-600',
                      'from-pink-500 to-red-600',
                      'from-red-500 to-orange-600',
                    ][i % 5]
                    
                    // Map icon names to components for facilities flow
                    const getIconComponent = (iconName: string) => {
                      switch (iconName) {
                        case 'user-plus': return UserPlus
                        case 'map-pin': return MapPin
                        case 'shield-check': return ShieldCheck
                        case 'key': return Key
                        case 'book-open': return BookOpen
                        case 'user-check': return UserCheck
                        case 'search': return Search
                        case 'monitor': return Monitor
                        case 'users': return Users
                        case 'file-text': return FileText
                        default: return BookOpen
                      }
                    }
                    
                    const IconComponent = getIconComponent(step.icon)
                    
                    return (
                      <div key={i} className={`group bg-gradient-to-r ${bgGrad} p-6 rounded-2xl border hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer`}>
                        <div className="flex items-start space-x-4">
                          <div className={`w-12 h-12 bg-gradient-to-r ${colors} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform relative`}>
                            <IconComponent className="w-6 h-6 text-white" />
                            <div className="absolute -top-2 -right-2 bg-white text-gray-800 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                              {step.step_number}
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3 className={`text-xl font-bold text-gray-800 mb-2 transition-colors ${TitleHover}`} style={{ fontFamily: 'Philosopher, serif' }}>{step.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{step.description}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Library Program Options Section - Conditional */}
            {(showPrograms || !data) && (
              <div className="mb-20">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full px-6 py-2 mb-6">
                    <Star className="w-5 h-5 mr-2 text-purple-500" />
                    <span className="text-sm font-semibold text-gray-700">Program Perpustakaan</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Philosopher, serif' }}>
                    {programsTitle.split(' ').map((word, index) => 
                      index === 1 ? (
                        <span key={index} className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">{word}</span>
                      ) : (
                        <span key={index}>{word} </span>
                      )
                    )}
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    {programsDescription}
                  </p>
                </div>
                
                <div className="max-w-6xl mx-auto space-y-16">
                  {/* Reading Club Program */}
                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                      <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full px-4 py-2">
                        <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                        <span className="text-sm font-semibold text-blue-700">Program Literasi</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-800" style={{ fontFamily: 'Philosopher, serif' }}>{readingClubTitle}</h3>
                      <p className="text-lg text-gray-600 leading-relaxed">{readingClubDescription}</p>
                    </div>
                    <div>
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl transform rotate-2 group-hover:rotate-0 transition-transform duration-300 opacity-20"></div>
                        <div className="relative bg-white p-3 rounded-2xl shadow-xl">
                          <Image
                            src={readingClubImage}
                            alt="Reading Club"
                            width={400}
                            height={300}
                            className="w-full h-64 object-cover rounded-xl"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Digital Library Program */}
                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div className="order-2 lg:order-1">
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl transform -rotate-2 group-hover:rotate-0 transition-transform duration-300 opacity-20"></div>
                        <div className="relative bg-white p-3 rounded-2xl shadow-xl">
                          <Image
                            src={digitalLibraryImage}
                            alt="Digital Library"
                            width={400}
                            height={300}
                            className="w-full h-64 object-cover rounded-xl"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4 order-1 lg:order-2">
                      <div className="inline-flex items-center bg-gradient-to-r from-purple-100 to-pink-100 rounded-full px-4 py-2">
                        <Monitor className="w-5 h-5 mr-2 text-purple-600" />
                        <span className="text-sm font-semibold text-purple-700">Teknologi Digital</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-800" style={{ fontFamily: 'Philosopher, serif' }}>{digitalLibraryTitle}</h3>
                      <p className="text-lg text-gray-600 leading-relaxed">{digitalLibraryDescription}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Library Pamphlet Section */}
            <div className="mb-20">
              <div className="text-center mb-12">
                <div className="inline-flex items-center bg-gradient-to-r from-green-100 to-emerald-100 rounded-full px-6 py-2 mb-6">
                  <FileImage className="w-5 h-5 mr-2 text-green-500" />
                  <span className="text-sm font-semibold text-gray-700">Informasi Visual</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Philosopher, serif' }}>
                  Pamflet <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Perpustakaan</span>
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Informasi lengkap tentang layanan, program, dan kegiatan perpustakaan dalam bentuk visual yang menarik
                </p>
              </div>

              <div className="relative max-w-6xl mx-auto">
                <div className="relative group">
                  {/* Background glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                  
                  {/* Main container - responsive to image size */}
                  <div className="relative bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-2xl">
                    <div className="relative overflow-hidden rounded-2xl">
                      <Image
                        src={libraryPamphlets[currentPamphletIndex]}
                        alt={`Library Pamphlet ${currentPamphletIndex + 1}`}
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-full h-auto rounded-2xl transition-all duration-500"
                        style={{ width: '100%', height: 'auto' }}
                      />
                      
                      {/* Navigation buttons */}
                      <button
                        onClick={prevPamphlet}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 group-hover:scale-110"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button
                        onClick={nextPamphlet}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 group-hover:scale-110"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                      
                      {/* Indicators */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {libraryPamphlets.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentPamphletIndex(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                              index === currentPamphletIndex 
                                ? 'bg-white scale-125' 
                                : 'bg-white/50 hover:bg-white/75'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Library Services Section - Conditional */}
            {(showAdditionalServices || !data) && (
              <div className="mb-20">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Philosopher, serif' }}>
                    {additionalServicesTitle.split(' ').map((word, index) => 
                      index === 1 ? (
                        <span key={index} className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">{word}</span>
                      ) : (
                        <span key={index}>{word} </span>
                      )
                    )}
                  </h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    {additionalServicesDescription}
                  </p>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {/* Steps Grid - Left Side */}
                  <div className="grid gap-6">
                    {additionalServices.map((service, i) => {
                      const bgGrad = [
                        'from-orange-50 to-red-50 border-orange-100',
                        'from-red-50 to-pink-50 border-red-100',
                        'from-pink-50 to-purple-50 border-pink-100',
                        'from-purple-50 to-indigo-50 border-purple-100',
                      ][i % 4]
                      const TitleHover = [
                        'group-hover:text-orange-600',
                        'group-hover:text-red-600',
                        'group-hover:text-pink-600',
                        'group-hover:text-purple-600',
                      ][i % 4]
                      const colors = [
                        'from-orange-500 to-red-600',
                        'from-red-500 to-pink-600',
                        'from-pink-500 to-purple-600',
                        'from-purple-500 to-indigo-600',
                      ][i % 4]
                      const IconComponent = service.icon === 'search' ? Search : 
                                          service.icon === 'monitor' ? Monitor :
                                          service.icon === 'users' ? Users : FileText
                      return (
                        <div key={i} className={`group bg-gradient-to-r ${bgGrad} p-6 rounded-2xl border hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer`}>
                          <div className="flex items-start space-x-4">
                            <div className={`w-12 h-12 bg-gradient-to-r ${colors} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                              <IconComponent className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <h3 className={`text-xl font-bold text-gray-800 mb-2 transition-colors ${TitleHover}`} style={{ fontFamily: 'Philosopher, serif' }}>{service.title}</h3>
                              <p className="text-gray-600 leading-relaxed">{service.description}</p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  
                  {/* Image Section - Right Side */}
                  <div className="relative">
                    <div className="relative group">
                      {/* Background glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                      
                      {/* 3D card container */}
                      <div className="relative bg-white/90 backdrop-blur-sm p-4 rounded-3xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
                        <div className="relative overflow-hidden rounded-2xl">
                          <Image
                            src={data?.programs?.reading_club?.image || "/perpustakaan-sekolah.webp"}
                            alt="Layanan Tambahan Perpustakaan"
                            width={400}
                            height={600}
                            className="w-full h-[600px] object-cover rounded-2xl transform group-hover:scale-110 transition-transform duration-700"
                          />
                          
                          {/* Modern overlay gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-orange-600/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-6 left-6 right-6">
                              <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30">
                                <div className="flex items-center space-x-3">
                                  <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
                                  <span className="text-sm font-medium text-white">Layanan Lengkap & Berkualitas</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Floating badge */}
                          <div className="absolute -top-3 -right-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
                            LAYANAN
                          </div>
                        </div>
                      </div>
                      
                      {/* Decorative elements */}
                      <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl opacity-60 blur-xl"></div>
                      <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full opacity-60 blur-xl"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Call to Action Section - Conditional */}
            {(showCTA || !data) && (
              <div className="relative mb-20">
                <div className="absolute inset-0 rounded-3xl transform rotate-1">
                  <Image
                    src={ctaBackground}
                    alt="Background"
                    fill
                    className="object-cover rounded-3xl"
                  />
                  <div className="absolute inset-0 bg-black/40 rounded-3xl"></div>
                </div>
                <div className="relative bg-transparent rounded-3xl p-8 md:p-12 text-white text-center">
                  <div className="max-w-4xl mx-auto">
                    <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
                      <BookOpen className="w-5 h-5 mr-2" />
                      <span className="text-sm font-medium">Kunjungi Sekarang</span>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight" style={{ fontFamily: 'Philosopher, serif', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                      {ctaTitle.includes('Alkapro Library') ? (
                        <>
                          {ctaTitle.split('Alkapro Library')[0]}
                          <br />
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                            Alkapro Library
                          </span>
                          {ctaTitle.split('Alkapro Library')[1]}
                        </>
                      ) : (
                        ctaTitle
                      )}
                    </h2>
                    
                    <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-3xl mx-auto" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                      {ctaDescription}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link 
                        href={ctaPrimaryUrl}
                        className="group bg-white text-blue-600 hover:bg-blue-50 font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                      >
                        <span className="flex items-center justify-center">
                          {ctaPrimaryText}
                          <BookOpen className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
                        </span>
                      </Link>
                      <Link 
                        href={ctaSecondaryUrl}
                        className="group border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
                      >
                        <span className="flex items-center justify-center">
                          {ctaSecondaryText}
                          <Star className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
                        </span>
                      </Link>
                    </div>
                    
                    {/* Contact Info */}
                    <div className="mt-8 pt-8 border-t border-white/20">
                      <p className="text-blue-100 text-sm" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                        Kunjungi perpustakaan kami dan rasakan pengalaman belajar yang berbeda
                      </p>
                    </div>
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute top-8 left-8 w-16 h-16 bg-white/10 rounded-full blur-xl animate-pulse"></div>
                  <div className="absolute bottom-8 right-8 w-20 h-20 bg-blue-300/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
                </div>
              </div>
            )}
            
            {/* Library Gallery Section */}
            <div className="mb-20">
              <div className="text-center mb-12">
                <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full px-6 py-2 mb-6">
                  <Camera className="w-5 h-5 mr-2 text-blue-500" />
                  <span className="text-sm font-semibold text-gray-700">Galeri Perpustakaan</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Philosopher, serif' }}>
                  Galeri <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">Alkapro Library</span>
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Lihat suasana dan fasilitas perpustakaan kami yang modern dan nyaman untuk belajar
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="relative group">
                  <div className="bg-white p-6 rounded-3xl shadow-2xl border border-blue-100">
                    <div className="relative overflow-hidden rounded-2xl">
                      <Image
                        src={libraryGallery[currentImageIndex]}
                        alt={`Library Gallery ${currentImageIndex + 1}`}
                        width={800}
                        height={500}
                        className="w-full h-96 object-cover rounded-2xl transition-all duration-500"
                      />
                      
                      {/* Navigation buttons */}
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-800 p-3 rounded-full transition-all duration-300 shadow-lg"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-800 p-3 rounded-full transition-all duration-300 shadow-lg"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                      
                      {/* Image counter */}
                      <div className="absolute top-4 right-4 bg-black/50 text-white px-4 py-2 rounded-full text-sm font-semibold">
                        {currentImageIndex + 1} / {libraryGallery.length}
                      </div>
                    </div>
                    
                    {/* Thumbnail indicators */}
                    <div className="flex justify-center mt-6 space-x-3">
                      {libraryGallery.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-4 h-4 rounded-full transition-all duration-300 ${
                            index === currentImageIndex 
                              ? 'bg-blue-500 scale-125' 
                              : 'bg-gray-300 hover:bg-blue-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Hours and Social Media Section */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border border-green-100 mb-20">
              <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8">
                  
                  {/* Library Service Hours */}
                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-100">
                    <div className="mb-6">
                      <div className="inline-flex items-center bg-gradient-to-r from-green-100 to-emerald-100 rounded-full px-4 py-2 mb-4">
                        <Clock className="w-5 h-5 mr-2 text-green-600" />
                        <span className="text-sm font-semibold text-green-700">Jam Operasional</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Philosopher, serif' }}>
                        Jam Layanan Perpustakaan Sekolah
                      </h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="font-semibold text-gray-700">Senin - Kamis</span>
                        <span className="text-green-600 font-bold">07.30 - 14.30 WIB</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="font-semibold text-gray-700">Jum'at & Sabtu</span>
                        <span className="text-green-600 font-bold">07.30 - 11.00 WIB</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-2 text-green-500" />
                        <span>Perpustakaan tutup pada hari libur nasional dan cuti bersama</span>
                      </div>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-100">
                    <div className="mb-6">
                      <div className="inline-flex items-center bg-gradient-to-r from-pink-100 to-purple-100 rounded-full px-4 py-2 mb-4">
                        <Instagram className="w-5 h-5 mr-2 text-pink-600" />
                        <span className="text-sm font-semibold text-pink-700">Media Sosial</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Philosopher, serif' }}>
                        Akun Media Sosial
                      </h3>
                    </div>
                    
                    <div className="space-y-4">
                      <Link 
                        href="https://instagram.com/alkapro.library"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl border border-pink-100 hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                            <Instagram className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">Instagram</p>
                            <p className="text-sm text-gray-600">@alkapro.library</p>
                          </div>
                        </div>
                        <div className="text-pink-500 group-hover:translate-x-1 transition-transform">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </div>
                      </Link>
                    </div>
                    
                    <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                      <div className="flex items-start text-sm text-gray-600">
                        <Instagram className="w-4 h-4 mr-2 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>Ikuti akun Instagram kami untuk mendapatkan update terbaru tentang koleksi buku, kegiatan perpustakaan, dan tips membaca</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            
            
          </div>
        </div>
      </main>
    </div>
  )
}

export default AlkaproLibrary
