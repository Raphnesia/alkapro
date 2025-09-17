'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { BookOpen, Users, Target, Award, Star, CheckCircle, Heart, Brain, Monitor, Code, UsersRound, Lightbulb } from 'lucide-react'
import { programKhususApi, ProgramKhususType } from '@/lib/api'
import { useRouter } from 'next/navigation'

const ICTDetail = () => {
  const router = useRouter()
  const [typeData, setTypeData] = useState<ProgramKhususType>({
    slug: 'ict',
    title: 'Program ICT',
    subtitle: 'Program unggulan yang memadukan pendidikan akademik dengan teknologi informasi dan komunikasi',
    banner_desktop: '/Programkhusus/html-code-on-computer-monitor-software-web-developer-programming-code-photo.jpg',
    banner_mobile: '/Programkhusus/google-logo-redesign-uhd-4k-wallpaper.jpg',
    intro_badge: 'Pendidikan Digital',
    intro_title: 'Menggabungkan Akademik & Digital',
    intro_subtitle: 'Program ICT di SMP Muhammadiyah Al Kautsar PK Kartasura dirancang khusus untuk siswa yang ingin menguasai teknologi informasi dan komunikasi sambil tetap mengikuti kurikulum akademik nasional dengan metode pembelajaran yang telah terbukti efektif.',
    featured_image: '/Programkhusus/html-code-on-computer-monitor-software-web-developer-programming-code-photo.jpg',
    featured_overlay_title: 'Suasana Pembelajaran',
    featured_overlay_desc: 'Lingkungan yang kondusif untuk belajar teknologi dengan fasilitas modern',
    featured_badge: 'Program Unggulan',
    key_points: [
      {
        icon: '🖥️',
        title: 'Teknologi Terkini',
        description: 'Menggunakan perangkat dan software terbaru untuk pembelajaran ICT yang optimal, termasuk hardware kelas enterprise dan software development tools modern.'
      },
      {
        icon: '👥',
        title: 'Instruktur Ahli',
        description: 'Dibimbing oleh instruktur berpengalaman di bidang teknologi informasi dan programming dengan sertifikasi profesional dan pengalaman industri yang luas.'
      }
    ],
    features_title: 'Mengapa Memilih Program Kami',
    features_subtitle: 'Alasan kuat untuk memilih program ICT kami yang telah terbukti menghasilkan lulusan berkualitas',
    features_image: '/Programkhusus/google-logo-redesign-uhd-4k-wallpaper.jpg',
    features_items: [
      {
        icon: '📚',
        title: 'Metode Pembelajaran',
        description: 'Menggunakan metode project-based learning dan hands-on training yang terbukti efektif dalam menguasai ICT'
      },
      {
        icon: '👥',
        title: 'Bimbingan Personal',
        description: 'Setiap siswa dibimbing secara individual oleh instruktur berpengalaman di bidang teknologi'
      },
      {
        icon: '🎯',
        title: 'Target Skill',
        description: 'Target disesuaikan kemampuan: programming, design grafis, dan digital marketing sesuai minat siswa'
      },
      {
        icon: '🏆',
        title: 'Evaluasi Berkala',
        description: 'Sistem monitoring dan evaluasi terstruktur untuk memastikan progress optimal dalam penguasaan skill digital'
      }
    ],
    benefits_badge: 'Tiga Kompetensi Utama',
    benefits_title: 'Dampak Positif Program ICT',
    benefits_subtitle: 'Program ICT memberikan dampak positif komprehensif melalui tiga kompetensi utama',
    benefits_items: [
      {
        badge_label: 'Kompetensi 1',
        title: 'Programming & Development',
        description: 'Pembelajaran programming yang komprehensif meliputi Web Development (HTML, CSS, JavaScript), Mobile Development, dan Database Management untuk membentuk developer handal yang siap bersaing di era digital.',
        image: '/Programkhusus/html-code-on-computer-monitor-software-web-developer-programming-code-photo.jpg',
        layout: 'imageLeft'
      },
      {
        badge_label: 'Kompetensi 2',
        title: 'Digital Design',
        description: 'Kurikulum design grafis yang terukur dan sistematis untuk membentuk kreativitas digital, mencakup UI/UX design, graphic design, dan multimedia production.',
        image: '/Programkhusus/google-logo-redesign-uhd-4k-wallpaper.jpg',
        layout: 'imageRight'
      },
      {
        badge_label: 'Kompetensi 3',
        title: 'Digital Marketing',
        description: 'Pengenalan digital marketing secara intensif yang mencakup social media marketing, SEO optimization, dan content creation untuk membekali siswa dengan skill marketing digital.',
        image: '/Programkhusus/156354-building-a-custom-wordpress-theme.png',
        layout: 'imageLeft'
      }
    ],
    gallery_title: 'Galeri Pembelajaran',
    gallery_subtitle: 'Suasana pembelajaran yang kondusif dan inspiratif dengan fasilitas modern',
    gallery_items: [
      {
        src: '/Programkhusus/html-code-on-computer-monitor-software-web-developer-programming-code-photo.jpg',
        title: 'Lab Programming',
        desc: 'Laboratorium komputer dengan perangkat modern',
        color_gradient: 'from-blue-500 to-cyan-500'
      },
      {
        src: '/Programkhusus/google-logo-redesign-uhd-4k-wallpaper.jpg',
        title: 'Design Studio',
        desc: 'Studio design dengan software terkini',
        color_gradient: 'from-purple-500 to-indigo-500'
      },
      {
        src: '/Programkhusus/156354-building-a-custom-wordpress-theme.png',
        title: 'Digital Workshop',
        desc: 'Workshop digital dengan proyek nyata',
        color_gradient: 'from-cyan-500 to-teal-500'
      }
    ],
    cta_background: '/Programkhusus/156354-building-a-custom-wordpress-theme.png',
    cta_badge: 'Bergabung Sekarang',
    cta_title: 'Siap Menjadi Bagian dari Generasi Digital?',
    cta_description: 'Bergabunglah dengan Program ICT SMP Muhammadiyah Al Kautsar PK Kartasura dan jadilah bagian dari generasi digital yang unggul dalam skill teknologi dan berprestasi akademik. Program ini tidak hanya membentuk developer handal, tetapi juga pribadi yang kreatif dan inovatif.',
    cta_primary_label: 'Lihat Program Lainnya',
    cta_primary_url: '/program-khusus',
    cta_secondary_label: 'Tentang Sekolah',
    cta_secondary_url: '/profil',
    is_active: true
  })

  useEffect(() => {
    let mounted = true
    programKhususApi.getType('ict')
      .then((data) => {
        if (!mounted) return
        if (!data) {
          router.replace('/program-khusus')
          return
        }
        setTypeData((prev) => ({ ...prev, ...data }))
      })
      .catch(() => {
        // Gunakan fallback data
      })
    return () => { mounted = false }
  }, [router])
  // Format judul introduction agar mempertahankan highlight jika pola "Menggabungkan X & Y"
  const renderIntroTitle = () => {
    const title = typeData.intro_title || 'Menggabungkan Akademik & Digital'
    const m = title.match(/^\s*Menggabungkan\s+(.*?)\s*&\s*(.*?)\s*$/i)
    if (m) {
      const left = m[1]
      const right = m[2]
      return (
        <>
          Menggabungkan{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">{left}</span>{' '}
          &{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">{right}</span>
        </>
      )
    }
    return <>{title}</>
  }

  // Helper URL gambar backend
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
  const buildImageUrl = (path?: string, fallback?: string): string => {
    if (!path) return fallback || ''
    if (/^https?:\/\//i.test(path)) return path
    if (path.startsWith('/storage')) return `${backendOrigin}${path}`
    if (path.startsWith('/')) return path
    const normalized = path.replace(/^\/+/, '')
    return `${backendOrigin}/storage/${normalized}`
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="">
        {/* IMG dengan Overlay untuk Desktop */}
        <div className="relative w-full md:h-screen h-64">
          {/* Desktop Image */}
          <Image 
            src={buildImageUrl(typeData.banner_desktop, '/Programkhusus/html-code-on-computer-monitor-software-web-developer-programming-code-photo.jpg')}
            alt="Program ICT"
            fill
            className="object-cover hidden md:block"
            priority
            sizes="100vw"
            quality={75}
          />
          {/* Mobile Image - Height diperkecil untuk mobile */}
          <div className="relative w-full h-full md:hidden">
            <Image 
              src={buildImageUrl(typeData.banner_mobile, '/Programkhusus/google-logo-redesign-uhd-4k-wallpaper.jpg')}
              alt="Program ICT"
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
                    <div className="bg-gradient-to-r from-blue-600 to-blue-800 inline-flex p-5">
                      <h1 className="text-2xl md:text-3xl lg:text-2xl font-bold text-white mb-0 line-clamp-2" style={{ fontFamily: 'Philosopher, serif' }}>
                        {typeData.title || 'Program ICT'}
                      </h1>
                    </div>
                  </div>
                  
                  {/* Subtitle Panel */}
                  <div className="bg-gradient-to-r from-blue-700 to-blue-900 p-4 opacity-90 inline-flex rounded-b-lg">
                    <p className="text-white text-sm md:text-lg font-semibold mb-0">
                      {typeData.subtitle || 'Program unggulan yang memadukan pendidikan akademik dengan teknologi informasi dan komunikasi'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DIV untuk Mobile - Tinggi disesuaikan dengan gambar */}
        <div className="w-full bg-gradient-to-r from-blue-700 to-blue-800 py-4 md:hidden">
          <div className="container mx-auto px-4">
            <div className="block">
              {/* Title Panel untuk Mobile */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 inline-flex p-3">
                <h1 className="text-lg font-bold text-white mb-0" style={{ fontFamily: 'Philosopher, serif' }}>
                  {typeData.title || 'Program ICT'}
                </h1>
              </div>
              
              {/* Subtitle Panel untuk Mobile */}
              <div className="bg-gradient-to-r from-blue-700 to-blue-900 mb-0 p-3 opacity-90 inline-flex">
                <div>
                  <p className="text-white text-xs font-semibold mb-0">
                    {typeData.subtitle || 'Program unggulan yang memadukan pendidikan akademik dengan teknologi informasi dan komunikasi'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div id="program-details" className="container mx-auto px-4 md:px-8 py-8 md:py-20">
          <div className="max-w-6xl mx-auto">
            
            {/* Introduction Section */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full px-6 py-2 mb-6">
                <Lightbulb className="w-5 h-5 mr-2 text-blue-500" />
                <span className="text-sm font-semibold text-gray-700">{typeData.intro_badge || 'Pendidikan Digital'}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight" style={{ fontFamily: 'Philosopher, serif' }}>
                {renderIntroTitle()}
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
                {typeData.intro_subtitle || 'Program ICT di SMP Muhammadiyah Al Kautsar PK Kartasura dirancang khusus untuk siswa yang ingin menguasai teknologi informasi dan komunikasi sambil tetap mengikuti kurikulum akademik nasional dengan metode pembelajaran yang telah terbukti efektif.'}
              </p>
            </div>

            {/* Featured Image with Modern Design */}
            <div className="relative mb-16">
              <div className="relative group">
                {/* Floating background elements */}
                <div className="absolute -top-4 -left-4 w-32 h-32 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                <div className="absolute -bottom-4 -right-4 w-40 h-40 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div>
                
                {/* Main image container */}
                <div className="relative bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-sm p-4 rounded-3xl shadow-2xl border border-white/20">
                  <div className="relative overflow-hidden rounded-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-purple-500/20"></div>
                    <Image
                      src={buildImageUrl(typeData.featured_image, '/Programkhusus/html-code-on-computer-monitor-software-web-developer-programming-code-photo.jpg')}
                      alt="Program ICT"
                      width={800}
                      height={500}
                      className="w-full h-96 object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    
                    {/* Glassmorphism overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-8 left-8 right-8">
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                          <h3 className="text-3xl font-bold text-white mb-3">{typeData.featured_overlay_title || 'Suasana Pembelajaran'}</h3>
                          <p className="text-blue-100 text-lg">{typeData.featured_overlay_desc || 'Lingkungan yang kondusif untuk belajar teknologi dengan fasilitas modern'}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Corner badge */}
                    <div className="absolute top-6 right-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg transform translate-x-20 group-hover:translate-x-0 transition-transform duration-500">
                      {typeData.featured_badge || 'Program Unggulan'}
                    </div>
                  </div>
                </div>
                
                {/* Floating icons */}
                <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl shadow-xl flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
                  <Monitor className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -bottom-6 -left-6 w-14 h-14 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full shadow-xl flex items-center justify-center transform -rotate-12 group-hover:rotate-0 transition-transform duration-500">
                  <Star className="w-7 h-7 text-white" />
                </div>
              </div>
            </div>
            
            {/* Key Points */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl border border-blue-100 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <Monitor className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800" style={{ fontFamily: 'Philosopher, serif' }}>{typeData.key_points?.[0]?.title || 'Teknologi Terkini'}</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {typeData.key_points?.[0]?.description || 'Menggunakan perangkat dan software terbaru untuk pembelajaran ICT yang optimal, termasuk hardware kelas enterprise dan software development tools modern.'}
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-8 rounded-2xl border border-purple-100 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <UsersRound className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800" style={{ fontFamily: 'Philosopher, serif' }}>{typeData.key_points?.[1]?.title || 'Instruktur Ahli'}</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {typeData.key_points?.[1]?.description || 'Dibimbing oleh instruktur berpengalaman di bidang teknologi informasi dan programming dengan sertifikasi profesional dan pengalaman industri yang luas.'}
                </p>
              </div>
            </div>
            
            {/* Mengapa Memilih Kami Section */}
            <div className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Philosopher, serif' }}>
                  Mengapa Memilih <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Program Kami</span>
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  {typeData.features_subtitle || 'Alasan kuat untuk memilih program ICT kami yang telah terbukti menghasilkan lulusan berkualitas'}
                </p>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Image Section */}
                <div className="relative">
                  <div className="relative group">
                    {/* Background glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-cyan-500 to-purple-500 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                    
                    {/* 3D card container */}
                    <div className="relative bg-white/90 backdrop-blur-sm p-4 rounded-3xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
                      <div className="relative overflow-hidden rounded-2xl">
                        <Image
                          src={buildImageUrl(typeData.features_image, '/Programkhusus/google-logo-redesign-uhd-4k-wallpaper.jpg')}
                          alt="Metode Pembelajaran ICT"
                          width={400}
                          height={300}
                          className="w-full h-80 object-cover rounded-2xl transform group-hover:scale-110 transition-transform duration-700"
                        />
                        
                        {/* Modern overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-6 left-6 right-6">
                            <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30">
                              <div className="flex items-center space-x-3">
                                <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                                <span className="text-sm font-medium text-white">Pembelajaran Aktif</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Floating badge */}
                        <div className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
                          NEW
                        </div>
                      </div>
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl opacity-60 blur-xl"></div>
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full opacity-60 blur-xl"></div>
                  </div>
                </div>
                
                {/* Features Grid */}
                <div className="grid gap-6">
                  
                  {/* Metode Pembelajaran */}
                  <div className="group bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-100 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors" style={{ fontFamily: 'Philosopher, serif' }}>{typeData.features_items?.[0]?.title || 'Metode Pembelajaran'}</h3>
                        <p className="text-gray-600 leading-relaxed">{typeData.features_items?.[0]?.description || 'Menggunakan metode project-based learning dan hands-on training yang terbukti efektif dalam menguasai ICT'}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Bimbingan Personal */}
                  <div className="group bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-2xl border border-purple-100 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors" style={{ fontFamily: 'Philosopher, serif' }}>{typeData.features_items?.[1]?.title || 'Bimbingan Personal'}</h3>
                        <p className="text-gray-600 leading-relaxed">{typeData.features_items?.[1]?.description || 'Setiap siswa dibimbing secara individual oleh instruktur berpengalaman di bidang teknologi'}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Target Skill */}
                  <div className="group bg-gradient-to-r from-cyan-50 to-teal-50 p-6 rounded-2xl border border-cyan-100 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-teal-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-cyan-600 transition-colors" style={{ fontFamily: 'Philosopher, serif' }}>{typeData.features_items?.[2]?.title || 'Target Skill'}</h3>
                        <p className="text-gray-600 leading-relaxed">{typeData.features_items?.[2]?.description || 'Target disesuaikan kemampuan: programming, design grafis, dan digital marketing sesuai minat siswa'}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Evaluasi Berkala */}
                  <div className="group bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-2xl border border-indigo-100 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors" style={{ fontFamily: 'Philosopher, serif' }}>{typeData.features_items?.[3]?.title || 'Evaluasi Berkala'}</h3>
                        <p className="text-gray-600 leading-relaxed">{typeData.features_items?.[3]?.description || 'Sistem monitoring dan evaluasi terstruktur untuk memastikan progress optimal dalam penguasaan skill digital'}</p>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
            
            {/* Benefits Section */}
            <div className="mb-20">
              <div className="text-center mb-12">
                <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-6 py-2 mb-6">
                  <Star className="w-5 h-5 mr-2 text-yellow-500" />
                  <span className="text-sm font-semibold text-gray-700">{typeData.benefits_badge || 'Tiga Kompetensi Utama'}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Philosopher, serif' }}>
                  Dampak <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Positif</span> Program ICT
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  {typeData.benefits_subtitle || 'Program ICT memberikan dampak positif komprehensif melalui tiga kompetensi utama'}
                </p>
              </div>
              
              <div className="max-w-6xl mx-auto space-y-16">
                
                {/* Row 1: Programming - Image Left, Text Right */}
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div className="order-2 lg:order-1">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl transform -rotate-2 group-hover:rotate-0 transition-transform duration-300 opacity-20"></div>
                      <div className="relative bg-white p-3 rounded-2xl shadow-xl">
                        <Image
                          src={buildImageUrl(typeData.benefits_items?.[0]?.image, '/Programkhusus/html-code-on-computer-monitor-software-web-developer-programming-code-photo.jpg')}
                          alt="Programming"
                          width={400}
                          height={300}
                          className="w-full h-64 object-cover rounded-xl"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="order-1 lg:order-2 space-y-4">
                    <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full px-4 py-2">
                      <Code className="w-5 h-5 mr-2 text-blue-600" />
                      <span className="text-sm font-semibold text-blue-700">{typeData.benefits_items?.[0]?.badge_label || 'Kompetensi 1'}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800" style={{ fontFamily: 'Philosopher, serif' }}>{typeData.benefits_items?.[0]?.title || 'Programming & Development'}</h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {typeData.benefits_items?.[0]?.description || 'Pembelajaran programming yang komprehensif meliputi Web Development (HTML, CSS, JavaScript), Mobile Development, dan Database Management untuk membentuk developer handal yang siap bersaing di era digital.'}
                    </p>
                  </div>
                </div>

                {/* Row 2: Digital Design - Text Left, Image Right */}
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <div className="inline-flex items-center bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full px-4 py-2">
                      <Monitor className="w-5 h-5 mr-2 text-purple-600" />
                      <span className="text-sm font-semibold text-purple-700">{typeData.benefits_items?.[1]?.badge_label || 'Kompetensi 2'}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800" style={{ fontFamily: 'Philosopher, serif' }}>{typeData.benefits_items?.[1]?.title || 'Digital Design'}</h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {typeData.benefits_items?.[1]?.description || 'Kurikulum design grafis yang terukur dan sistematis untuk membentuk kreativitas digital, mencakup UI/UX design, graphic design, dan multimedia production.'}
                    </p>
                  </div>
                  <div>
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-2xl transform rotate-2 group-hover:rotate-0 transition-transform duration-300 opacity-20"></div>
                      <div className="relative bg-white p-3 rounded-2xl shadow-xl">
                        <Image
                          src={buildImageUrl(typeData.benefits_items?.[1]?.image, '/Programkhusus/google-logo-redesign-uhd-4k-wallpaper.jpg')}
                          alt="Digital Design"
                          width={400}
                          height={300}
                          className="w-full h-64 object-cover rounded-xl"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Row 3: Digital Marketing - Image Left, Text Right */}
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div className="order-2 lg:order-1">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-2xl transform -rotate-2 group-hover:rotate-0 transition-transform duration-300 opacity-20"></div>
                      <div className="relative bg-white p-3 rounded-2xl shadow-xl">
                        <Image
                          src={buildImageUrl(typeData.benefits_items?.[2]?.image, '/Programkhusus/156354-building-a-custom-wordpress-theme.png')}
                          alt="Digital Marketing"
                          width={400}
                          height={300}
                          className="w-full h-64 object-cover rounded-xl"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="order-1 lg:order-2 space-y-4">
                    <div className="inline-flex items-center bg-gradient-to-r from-cyan-100 to-teal-100 rounded-full px-4 py-2">
                      <Lightbulb className="w-5 h-5 mr-2 text-cyan-600" />
                      <span className="text-sm font-semibold text-cyan-700">{typeData.benefits_items?.[2]?.badge_label || 'Kompetensi 3'}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800" style={{ fontFamily: 'Philosopher, serif' }}>{typeData.benefits_items?.[2]?.title || 'Digital Marketing'}</h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {typeData.benefits_items?.[2]?.description || 'Pengenalan digital marketing secara intensif yang mencakup social media marketing, SEO optimization, dan content creation untuk membekali siswa dengan skill marketing digital.'}
                    </p>
                  </div>
                </div>

              </div>
            </div>
            
            {/* Gallery Section */}
            <div className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Philosopher, serif' }}>
                  Galeri <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Pembelajaran</span>
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  {typeData.gallery_subtitle || 'Suasana pembelajaran yang kondusif dan inspiratif dengan fasilitas modern'}
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {(typeData.gallery_items || []).map((item, index) => (
                  <div key={index} className="group relative">
                    {/* Background glow */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.color_gradient || 'from-blue-500 to-cyan-500'} rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`}></div>
                    
                    {/* Main card */}
                    <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-white/20 transform group-hover:scale-105 transition-transform duration-500">
                      <div className="relative overflow-hidden">
                        <Image
                          src={buildImageUrl(item.src, '/Programkhusus/html-code-on-computer-monitor-software-web-developer-programming-code-photo.jpg')}
                          alt={item.title}
                          width={400}
                          height={300}
                          className="w-full h-72 object-cover transform group-hover:scale-110 transition-transform duration-700"
                        />
                        
                        {/* Modern glass overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-0 left-0 right-0 p-6">
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                              <p className="text-blue-100 text-sm">{item.desc}</p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Floating action button */}
                        <div className="absolute top-6 right-6">
                          <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-500">
                            <div className={`w-8 h-8 bg-gradient-to-r ${item.color_gradient || 'from-blue-500 to-cyan-500'} rounded-full flex items-center justify-center`}>
                              <Star className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Corner decoration */}
                    <div className={`absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-r ${item.color_gradient || 'from-blue-500 to-cyan-500'} rounded-full opacity-60 blur-md`}></div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Call to Action Section */}
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl transform rotate-1">
                <Image
                  src={buildImageUrl(typeData.cta_background, '/Programkhusus/156354-building-a-custom-wordpress-theme.png')}
                  alt="Background"
                  fill
                  className="object-cover rounded-3xl"
                />
                <div className="absolute inset-0 bg-black/40 rounded-3xl"></div>
              </div>
              <div className="relative bg-transparent rounded-3xl p-8 md:p-12 text-white text-center">
                <div className="max-w-4xl mx-auto">
                  <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
                    <Monitor className="w-5 h-5 mr-2" />
                    <span className="text-sm font-medium">{typeData.cta_badge || 'Bergabung Sekarang'}</span>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight" style={{ fontFamily: 'Philosopher, serif', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                    {typeData.cta_title || 'Siap Menjadi Bagian dari Generasi Digital?'}
                  </h2>
                  
                  <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-3xl mx-auto" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                    {typeData.cta_description || 'Bergabunglah dengan Program ICT SMP Muhammadiyah Al Kautsar PK Kartasura dan jadilah bagian dari generasi digital yang unggul dalam skill teknologi dan berprestasi akademik. Program ini tidak hanya membentuk developer handal, tetapi juga pribadi yang kreatif dan inovatif.'}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link 
                      href={typeData.cta_primary_url || '/program-khusus'}
                      className="group bg-white text-blue-600 hover:bg-blue-50 font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      <span className="flex items-center justify-center">
                        {typeData.cta_primary_label || 'Lihat Program Lainnya'}
                        <Award className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
                      </span>
                    </Link>
                    <Link 
                      href={typeData.cta_secondary_url || '/profil'}
                      className="group border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
                    >
                      <span className="flex items-center justify-center">
                        {typeData.cta_secondary_label || 'Tentang Sekolah'}
                        <Star className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
                      </span>
                    </Link>
                  </div>
                  
                  {/* Contact Info */}
                  <div className="mt-8 pt-8 border-t border-white/20">
                    <p className="text-blue-100 text-sm" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                      Hubungi kami untuk informasi lebih lanjut tentang pendaftaran
                    </p>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute top-8 left-8 w-16 h-16 bg-white/10 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute bottom-8 right-8 w-20 h-20 bg-blue-300/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
              </div>
            </div>
            
          </div>
        </div>
      </main>
    </div>
  )
}

export default ICTDetail
