'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { BookOpen, Users, Target, Award, Star, CheckCircle, Heart, Brain } from 'lucide-react'
import { programKhususApi, ProgramKhususType } from '@/lib/api'
import { useRouter } from 'next/navigation'

const TahfidzDetail = () => {
  const router = useRouter()
  const [typeData, setTypeData] = useState<ProgramKhususType>({
    slug: 'tahfidz',
    title: 'Program Tahfidz Al-Quran',
    subtitle: 'Program unggulan yang memadukan pendidikan akademik dengan penghafalan Al-Quran',
    banner_desktop: '/Programkhusus/photo-1553063085-dbbf64d936ea.jpeg',
    banner_mobile: '/Programkhusus/6-1.png',
    intro_badge: 'Pendidikan Berkualitas',
    intro_title: 'Menggabungkan Akademik & Spiritual',
    intro_subtitle: 'Program Tahfidz Al-Quran di SMP Muhammadiyah Al Kautsar PK Kartasura dirancang khusus untuk siswa yang ingin mendalami Al-Quran sambil tetap mengikuti kurikulum akademik nasional dengan metode pembelajaran yang telah terbukti efektif.',
    featured_image: '/Programkhusus/photo-1553063085-dbbf64d936ea.jpeg',
    featured_overlay_title: 'Suasana Pembelajaran',
    featured_overlay_desc: 'Lingkungan yang kondusif untuk menghafal Al-Quran dengan suasana spiritual yang mendalam',
    featured_badge: 'Program Unggulan',
    key_points: [
      {
        icon: '📖',
        title: 'Metode Terpadu',
        description: 'Setiap siswa mendapatkan target hafalan yang disesuaikan dengan kemampuan individual, mulai dari Juz 30 (Juz Amma) hingga target yang lebih tinggi dengan bimbingan personal.'
      },
      {
        icon: '🎯',
        title: 'Evaluasi Berkala',
        description: 'Sistem evaluasi berkala memastikan progress hafalan siswa dan memberikan feedback yang konstruktif untuk perbaikan dan pengembangan yang optimal.'
      }
    ],
    features_title: 'Keunggulan Program Kami',
    features_subtitle: 'Metode pembelajaran yang komprehensif dan terintegrasi untuk hasil optimal',
    features_image: '/Programkhusus/6-1.png',
    features_items: [
      {
        icon: '📚',
        title: 'Metode Pembelajaran',
        description: 'Menggunakan metode talaqqi dan muraja\'ah yang terbukti efektif dalam menghafal Al-Quran'
      },
      {
        icon: '👥',
        title: 'Bimbingan Personal',
        description: 'Setiap siswa dibimbing secara individual oleh ustadz/ustadzah berpengalaman'
      },
      {
        icon: '🎯',
        title: 'Target Hafalan',
        description: 'Target disesuaikan kemampuan: Juz 30, Juz 1-5, dan juz-juz pilihan lainnya'
      },
      {
        icon: '🏆',
        title: 'Evaluasi Berkala',
        description: 'Sistem monitoring dan evaluasi terstruktur untuk memastikan progress optimal'
      }
    ],
    benefits_badge: 'Empat Kemampuan Utama',
    benefits_title: 'Dampak Positif Program Tahfidz',
    benefits_subtitle: 'Program Tahfidz memberikan dampak positif komprehensif melalui empat kemampuan utama',
    benefits_items: [
      {
        badge_label: 'Kemampuan 1',
        title: 'Al-Qur\'an Learning',
        description: 'Pembelajaran Al-Qur\'an yang komprehensif meliputi Tahsin (bacaan yang benar), Tahfidz (penghafalan), dan Tafsir (pemahaman makna) untuk membentuk generasi Qurani yang unggul dalam ilmu dan amal.',
        image: '/Programkhusus/6-1.png',
        layout: 'imageLeft'
      },
      {
        badge_label: 'Kemampuan 2',
        title: 'Courtesy',
        description: 'Kurikulum adab yang terukur dan sistematis untuk membentuk karakter mulia, sopan santun, dan akhlak Qurani dalam kehidupan sehari-hari.',
        image: '/Programkhusus/photo-1553063085-dbbf64d936ea.jpeg',
        layout: 'imageRight'
      },
      {
        badge_label: 'Kemampuan 3',
        title: 'Ulama\' Program',
        description: 'Kajian kitab secara intensif yang dikupas oleh para masayikh untuk memperdalam pemahaman agama dan membentuk generasi yang berilmu dan beramal.',
        image: '/Programkhusus/canva-background-qz8kedi3hsiz0ok3.png',
        layout: 'imageLeft'
      },
      {
        badge_label: 'Kemampuan 4',
        title: 'Professional Program',
        description: 'Pengenalan berbagai macam profesi secara terjadwal dan terintegrasi dalam kurikulum untuk membekali siswa dengan wawasan karier dan kesiapan menghadapi masa depan.',
        image: '/Programkhusus/html-code-on-computer-monitor-software-web-developer-programming-code-photo.jpg',
        layout: 'imageRight'
      }
    ],
    gallery_title: 'Galeri Pembelajaran',
    gallery_subtitle: 'Suasana pembelajaran yang kondusif dan inspiratif',
    gallery_items: [
      {
        src: '/Programkhusus/canva-background-qz8kedi3hsiz0ok3.png',
        title: 'Ruang Tahfidz',
        desc: 'Lingkungan belajar yang nyaman',
        color_gradient: 'from-emerald-500 to-blue-500'
      },
      {
        src: '/Programkhusus/6-1.png',
        title: 'Pembelajaran Aktif',
        desc: 'Metode pembelajaran interaktif',
        color_gradient: 'from-purple-500 to-pink-500'
      },
      {
        src: '/Programkhusus/photo-1553063085-dbbf64d936ea.jpeg',
        title: 'Bimbingan Personal',
        desc: 'Pendampingan individual',
        color_gradient: 'from-orange-500 to-red-500'
      }
    ],
    cta_background: '/Programkhusus/canva-background-qz8kedi3hsiz0ok3.png',
    cta_badge: 'Bergabung Sekarang',
    cta_title: 'Siap Menjadi Bagian dari Generasi Qurani?',
    cta_description: 'Bergabunglah dengan Program Tahfidz Al-Quran SMP Muhammadiyah Al Kautsar PK Kartasura dan jadilah bagian dari generasi Qurani yang unggul dalam ilmu dan amal. Program ini tidak hanya membentuk hafidz Al-Quran, tetapi juga pribadi yang berakhlak mulia dan berprestasi akademik.',
    cta_primary_label: 'Lihat Program Lainnya',
    cta_primary_url: '/program-khusus',
    cta_secondary_label: 'Tentang Sekolah',
    cta_secondary_url: '/profil',
    is_active: true
  })

  useEffect(() => {
    let mounted = true
    programKhususApi.getType('tahfidz')
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

  // Format judul introduction agar tetap mempertahankan highlight jika pola "Menggabungkan X & Y"
  const renderIntroTitle = () => {
    const title = typeData.intro_title || 'Menggabungkan Akademik & Spiritual'
    const m = title.match(/^\s*Menggabungkan\s+(.*?)\s*&\s*(.*?)\s*$/i)
    if (m) {
      const left = m[1]
      const right = m[2]
      return (
        <>
          Menggabungkan{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">{left}</span>{' '}
          &{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">{right}</span>
        </>
      )
    }
    return <>{title}</>
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="">
        {/* IMG dengan Overlay untuk Desktop */}
        <div className="relative w-full md:h-screen h-64">
          {/* Desktop Image */}
          <Image 
            src={buildImageUrl(typeData.banner_desktop, '/Programkhusus/photo-1553063085-dbbf64d936ea.jpeg')}
            alt="Program Tahfidz Al-Quran"
            fill
            className="object-cover hidden md:block"
            priority
            sizes="100vw"
            quality={75}
          />
          {/* Mobile Image - Height diperkecil untuk mobile */}
          <div className="relative w-full h-full md:hidden">
            <Image 
              src={buildImageUrl(typeData.banner_mobile, '/Programkhusus/6-1.png')}
              alt="Program Tahfidz Al-Quran"
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
                    <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 inline-flex p-5">
                      <h1 className="text-2xl md:text-3xl lg:text-2xl font-bold text-white mb-0 line-clamp-2" style={{ fontFamily: 'Philosopher, serif' }}>
                        {typeData.title || 'Program Tahfidz Al-Quran'}
                      </h1>
                    </div>
                  </div>
                  
                  {/* Subtitle Panel */}
                  <div className="bg-gradient-to-r from-emerald-700 to-emerald-900 p-4 opacity-90 inline-flex rounded-b-lg">
                    <p className="text-white text-sm md:text-lg font-semibold mb-0">
                      {typeData.subtitle || 'Program unggulan yang memadukan pendidikan akademik dengan penghafalan Al-Quran'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DIV untuk Mobile - Tinggi disesuaikan dengan gambar */}
        <div className="w-full bg-gradient-to-r from-emerald-700 to-emerald-800 py-4 md:hidden">
          <div className="container mx-auto px-4">
            <div className="block">
              {/* Title Panel untuk Mobile */}
              <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 inline-flex p-3">
                <h1 className="text-lg font-bold text-white mb-0" style={{ fontFamily: 'Philosopher, serif' }}>
                  {typeData.title || 'Program Tahfidz Al-Quran'}
                </h1>
              </div>
              
              {/* Subtitle Panel untuk Mobile */}
              <div className="bg-gradient-to-r from-emerald-700 to-emerald-900 mb-0 p-3 opacity-90 inline-flex">
                <div>
                  <p className="text-white text-xs font-semibold mb-0">
                    {typeData.subtitle || 'Program unggulan yang memadukan pendidikan akademik dengan penghafalan Al-Quran'}
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
              <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-6 py-2 mb-6">
                <Heart className="w-5 h-5 mr-2 text-red-500" />
                <span className="text-sm font-semibold text-gray-700">{typeData.intro_badge || 'Pendidikan Berkualitas'}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight" style={{ fontFamily: 'Philosopher, serif' }}>
                {renderIntroTitle()}
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
                {typeData.intro_subtitle || 'Program Tahfidz Al-Quran di SMP Muhammadiyah Al Kautsar PK Kartasura dirancang khusus untuk siswa yang ingin mendalami Al-Quran sambil tetap mengikuti kurikulum akademik nasional dengan metode pembelajaran yang telah terbukti efektif.'}
              </p>
            </div>

            {/* Featured Image with Modern Design */}
            <div className="relative mb-16">
              <div className="relative group">
                {/* Floating background elements */}
                <div className="absolute -top-4 -left-4 w-32 h-32 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                <div className="absolute -bottom-4 -right-4 w-40 h-40 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div>
                
                {/* Main image container */}
                <div className="relative bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-sm p-4 rounded-3xl shadow-2xl border border-white/20">
                  <div className="relative overflow-hidden rounded-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-transparent to-purple-500/20"></div>
                    <Image
                      src={buildImageUrl(typeData.featured_image, '/Programkhusus/photo-1553063085-dbbf64d936ea.jpeg')}
                      alt="Program Tahfidz Al-Quran"
                      width={800}
                      height={500}
                      className="w-full h-96 object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    
                    {/* Glassmorphism overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-8 left-8 right-8">
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                          <h3 className="text-3xl font-bold text-white mb-3">{typeData.featured_overlay_title || 'Suasana Pembelajaran'}</h3>
                          <p className="text-blue-100 text-lg">{typeData.featured_overlay_desc || 'Lingkungan yang kondusif untuk menghafal Al-Quran dengan suasana spiritual yang mendalam'}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Corner badge */}
                    <div className="absolute top-6 right-6 bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg transform translate-x-20 group-hover:translate-x-0 transition-transform duration-500">
                      {typeData.featured_badge || 'Program Unggulan'}
                    </div>
                  </div>
                </div>
                
                {/* Floating icons */}
                <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-2xl shadow-xl flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -bottom-6 -left-6 w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full shadow-xl flex items-center justify-center transform -rotate-12 group-hover:rotate-0 transition-transform duration-500">
                  <Star className="w-7 h-7 text-white" />
                </div>
              </div>
            </div>
            
            {/* Key Points */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-gradient-to-br from-emerald-50 to-blue-50 p-8 rounded-2xl border border-emerald-100 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800" style={{ fontFamily: 'Philosopher, serif' }}>{typeData.key_points?.[0]?.title || 'Metode Terpadu'}</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {typeData.key_points?.[0]?.description || 'Setiap siswa mendapatkan target hafalan yang disesuaikan dengan kemampuan individual, mulai dari Juz 30 (Juz Amma) hingga target yang lebih tinggi dengan bimbingan personal.'}
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-100 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800" style={{ fontFamily: 'Philosopher, serif' }}>{typeData.key_points?.[1]?.title || 'Evaluasi Berkala'}</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {typeData.key_points?.[1]?.description || 'Sistem evaluasi berkala memastikan progress hafalan siswa dan memberikan feedback yang konstruktif untuk perbaikan dan pengembangan yang optimal.'}
                </p>
              </div>
            </div>
            
            {/* Program Features Section */}
            <div className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Philosopher, serif' }}>
                  Keunggulan <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Program Kami</span>
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  {typeData.features_subtitle || 'Metode pembelajaran yang komprehensif dan terintegrasi untuk hasil optimal'}
                </p>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Image Section */}
                <div className="relative">
                  <div className="relative group">
                    {/* Background glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-500 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                    
                    {/* 3D card container */}
                    <div className="relative bg-white/90 backdrop-blur-sm p-4 rounded-3xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
                      <div className="relative overflow-hidden rounded-2xl">
                        <Image
                          src={buildImageUrl(typeData.features_image, '/Programkhusus/6-1.png')}
                          alt="Metode Pembelajaran Tahfidz"
                          width={400}
                          height={300}
                          className="w-full h-80 object-cover rounded-2xl transform group-hover:scale-110 transition-transform duration-700"
                        />
                        
                        {/* Modern overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-600/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-6 left-6 right-6">
                            <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30">
                              <div className="flex items-center space-x-3">
                                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                                <span className="text-sm font-medium text-white">Pembelajaran Aktif</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Floating badge */}
                      <div className="absolute -top-3 -right-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
                        NEW
                      </div>
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-2xl opacity-60 blur-xl"></div>
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-60 blur-xl"></div>
                  </div>
                </div>
                
                {/* Features Grid */}
                <div className="grid gap-6">
                  
                  {/* Metode Pembelajaran */}
                  <div className="group bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors" style={{ fontFamily: 'Philosopher, serif' }}>{typeData.features_items?.[0]?.title || 'Metode Pembelajaran'}</h3>
                        <p className="text-gray-600 leading-relaxed">{typeData.features_items?.[0]?.description || 'Menggunakan metode talaqqi dan muraja\'ah yang terbukti efektif dalam menghafal Al-Quran'}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Bimbingan Personal */}
                  <div className="group bg-gradient-to-r from-emerald-50 to-green-50 p-6 rounded-2xl border border-emerald-100 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors" style={{ fontFamily: 'Philosopher, serif' }}>{typeData.features_items?.[1]?.title || 'Bimbingan Personal'}</h3>
                        <p className="text-gray-600 leading-relaxed">{typeData.features_items?.[1]?.description || 'Setiap siswa dibimbing secara individual oleh ustadz/ustadzah berpengalaman'}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Target Hafalan */}
                  <div className="group bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors" style={{ fontFamily: 'Philosopher, serif' }}>{typeData.features_items?.[2]?.title || 'Target Hafalan'}</h3>
                        <p className="text-gray-600 leading-relaxed">{typeData.features_items?.[2]?.description || 'Target disesuaikan kemampuan: Juz 30, Juz 1-5, dan juz-juz pilihan lainnya'}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Evaluasi Berkala */}
                  <div className="group bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-2xl border border-orange-100 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors" style={{ fontFamily: 'Philosopher, serif' }}>{typeData.features_items?.[3]?.title || 'Evaluasi Berkala'}</h3>
                        <p className="text-gray-600 leading-relaxed">{typeData.features_items?.[3]?.description || 'Sistem monitoring dan evaluasi terstruktur untuk memastikan progress optimal'}</p>
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
                  <span className="text-sm font-semibold text-gray-700">{typeData.benefits_badge || 'Empat Kemampuan Utama'}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Philosopher, serif' }}>
                  Dampak <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">Positif</span> Program Tahfidz
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  {typeData.benefits_subtitle || 'Program Tahfidz memberikan dampak positif komprehensif melalui empat kemampuan utama'}
                </p>
              </div>
              
              <div className="max-w-6xl mx-auto space-y-16">
                
                {/* Row 1: Al-Quran Learning - Image Left, Text Right */}
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div className="order-2 lg:order-1">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-500 rounded-2xl transform -rotate-2 group-hover:rotate-0 transition-transform duration-300 opacity-20"></div>
                      <div className="relative bg-white p-3 rounded-2xl shadow-xl">
                        <Image
                          src={buildImageUrl(typeData.benefits_items?.[0]?.image, '/Programkhusus/6-1.png')}
                          alt="Al-Quran Learning"
                          width={400}
                          height={300}
                          className="w-full h-64 object-cover rounded-xl"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="order-1 lg:order-2 space-y-4">
                    <div className="inline-flex items-center bg-gradient-to-r from-emerald-100 to-green-100 rounded-full px-4 py-2">
                      <BookOpen className="w-5 h-5 mr-2 text-emerald-600" />
                      <span className="text-sm font-semibold text-emerald-700">{typeData.benefits_items?.[0]?.badge_label || 'Kemampuan 1'}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800" style={{ fontFamily: 'Philosopher, serif' }}>{typeData.benefits_items?.[0]?.title || 'Al-Qur\'an Learning'}</h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {typeData.benefits_items?.[0]?.description || 'Pembelajaran Al-Qur\'an yang komprehensif meliputi Tahsin (bacaan yang benar), Tahfidz (penghafalan), dan Tafsir (pemahaman makna) untuk membentuk generasi Qurani yang unggul dalam ilmu dan amal.'}
                    </p>
                  </div>
                </div>

                {/* Row 2: Courtesy - Text Left, Image Right */}
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full px-4 py-2">
                      <Heart className="w-5 h-5 mr-2 text-blue-600" />
                      <span className="text-sm font-semibold text-blue-700">{typeData.benefits_items?.[1]?.badge_label || 'Kemampuan 2'}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800" style={{ fontFamily: 'Philosopher, serif' }}>{typeData.benefits_items?.[1]?.title || 'Courtesy'}</h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {typeData.benefits_items?.[1]?.description || 'Kurikulum adab yang terukur dan sistematis untuk membentuk karakter mulia, sopan santun, dan akhlak Qurani dalam kehidupan sehari-hari.'}
                    </p>
                  </div>
                  <div>
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl transform rotate-2 group-hover:rotate-0 transition-transform duration-300 opacity-20"></div>
                      <div className="relative bg-white p-3 rounded-2xl shadow-xl">
                        <Image
                          src={buildImageUrl(typeData.benefits_items?.[1]?.image, '/Programkhusus/photo-1553063085-dbbf64d936ea.jpeg')}
                          alt="Courtesy Program"
                          width={400}
                          height={300}
                          className="w-full h-64 object-cover rounded-xl"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Row 3: Ulama' Program - Image Left, Text Right */}
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div className="order-2 lg:order-1">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl transform -rotate-2 group-hover:rotate-0 transition-transform duration-300 opacity-20"></div>
                      <div className="relative bg-white p-3 rounded-2xl shadow-xl">
                        <Image
                          src={buildImageUrl(typeData.benefits_items?.[2]?.image, '/Programkhusus/canva-background-qz8kedi3hsiz0ok3.png')}
                          alt="Ulama Program"
                          width={400}
                          height={300}
                          className="w-full h-64 object-cover rounded-xl"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="order-1 lg:order-2 space-y-4">
                    <div className="inline-flex items-center bg-gradient-to-r from-purple-100 to-pink-100 rounded-full px-4 py-2">
                      <Users className="w-5 h-5 mr-2 text-purple-600" />
                      <span className="text-sm font-semibold text-purple-700">{typeData.benefits_items?.[2]?.badge_label || 'Kemampuan 3'}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800" style={{ fontFamily: 'Philosopher, serif' }}>{typeData.benefits_items?.[2]?.title || 'Ulama\' Program'}</h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {typeData.benefits_items?.[2]?.description || 'Kajian kitab secara intensif yang dikupas oleh para masayikh untuk memperdalam pemahaman agama dan membentuk generasi yang berilmu dan beramal.'}
                    </p>
                  </div>
                </div>

                {/* Row 4: Professional Program - Text Left, Image Right */}
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <div className="inline-flex items-center bg-gradient-to-r from-orange-100 to-red-100 rounded-full px-4 py-2">
                      <Award className="w-5 h-5 mr-2 text-orange-600" />
                      <span className="text-sm font-semibold text-orange-700">{typeData.benefits_items?.[3]?.badge_label || 'Kemampuan 4'}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800" style={{ fontFamily: 'Philosopher, serif' }}>{typeData.benefits_items?.[3]?.title || 'Professional Program'}</h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {typeData.benefits_items?.[3]?.description || 'Pengenalan berbagai macam profesi secara terjadwal dan terintegrasi dalam kurikulum untuk membekali siswa dengan wawasan karier dan kesiapan menghadapi masa depan.'}
                    </p>
                  </div>
                  <div>
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl transform rotate-2 group-hover:rotate-0 transition-transform duration-300 opacity-20"></div>
                      <div className="relative bg-white p-3 rounded-2xl shadow-xl">
                        <Image
                          src={buildImageUrl(typeData.benefits_items?.[3]?.image, '/Programkhusus/html-code-on-computer-monitor-software-web-developer-programming-code-photo.jpg')}
                          alt="Professional Program"
                          width={400}
                          height={300}
                          className="w-full h-64 object-cover rounded-xl"
                        />
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            
            {/* Gallery Section */}
            <div className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Philosopher, serif' }}>
                  Galeri <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">Pembelajaran</span>
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  {typeData.gallery_subtitle || 'Suasana pembelajaran yang kondusif dan inspiratif'}
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {(typeData.gallery_items || []).map((item, index) => (
                  <div key={index} className="group relative">
                    {/* Background glow */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.color_gradient || 'from-emerald-500 to-blue-500'} rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`}></div>
                    
                    {/* Main card */}
                    <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-white/20 transform group-hover:scale-105 transition-transform duration-500">
                      <div className="relative overflow-hidden">
                        <Image
                          src={buildImageUrl(item.src, '/Programkhusus/canva-background-qz8kedi3hsiz0ok3.png')}
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
                            <div className={`w-8 h-8 bg-gradient-to-r ${item.color_gradient || 'from-emerald-500 to-blue-500'} rounded-full flex items-center justify-center`}>
                              <Star className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Corner decoration */}
                    <div className={`absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-r ${item.color_gradient || 'from-emerald-500 to-blue-500'} rounded-full opacity-60 blur-md`}></div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Call to Action Section */}
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl transform rotate-1">
                <Image
                  src={buildImageUrl(typeData.cta_background, '/Programkhusus/canva-background-qz8kedi3hsiz0ok3.png')}
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
                    <span className="text-sm font-medium">{typeData.cta_badge || 'Bergabung Sekarang'}</span>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight" style={{ fontFamily: 'Philosopher, serif', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                    {typeData.cta_title || 'Siap Menjadi Bagian dari Generasi Qurani?'}
                  </h2>
                  
                  <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-3xl mx-auto" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                    {typeData.cta_description || 'Bergabunglah dengan Program Tahfidz Al-Quran SMP Muhammadiyah Al Kautsar PK Kartasura dan jadilah bagian dari generasi Qurani yang unggul dalam ilmu dan amal. Program ini tidak hanya membentuk hafidz Al-Quran, tetapi juga pribadi yang berakhlak mulia dan berprestasi akademik.'}
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
                <div className="absolute bottom-8 right-8 w-20 h-20 bg-yellow-300/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
              </div>
            </div>
            
          </div>
        </div>
      </main>
    </div>
  )
}

export default TahfidzDetail
