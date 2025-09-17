'use client'

import React, { useEffect, useState } from 'react'
import { Header } from '@/components/Header'
import Image from 'next/image'
import Link from 'next/link'
import { programKhususApi, ProgramKhususPage as ProgramKhususPageData, ProgramCard } from '@/lib/api'

const ProgramKhususPage = () => {
  const [pageData, setPageData] = useState<ProgramKhususPageData>({
    hero_title: 'Program Khusus',
    hero_subtitle: 'Program unggulan SMP Muhammadiyah Al Kautsar PK Kartasura yang dirancang untuk mengembangkan potensi siswa secara optimal',
    hero_image_desktop: '/Programkhusus/photo-1553063085-dbbf64d936ea.jpeg',
    hero_image_mobile: '/Programkhusus/6-1.png',
    overview_title: 'Program Unggulan Kami',
    overview_subtitle: 'Kami menawarkan dua program khusus yang dirancang untuk mengembangkan potensi akademik dan spiritual siswa',
    programs: [],
    reasons: [
      { icon: '��', title: 'Fokus Spesifik', description: 'Setiap program dirancang dengan kurikulum yang fokus dan mendalam sesuai dengan bidang yang dipilih, memastikan penguasaan kompetensi secara komprehensif' },
      { icon: '👨‍��', title: 'Pengajar Ahli', description: 'Dibimbing oleh pengajar yang berpengalaman dan ahli di bidangnya masing-masing, dengan sertifikasi profesional dan pengalaman praktik yang luas' },
      { icon: '��', title: 'Prestasi Terbukti', description: 'Program kami telah menghasilkan siswa-siswa berprestasi di berbagai kompetisi nasional dan internasional, dengan track record yang konsisten' },
    ],
    cta_title: 'Siap Bergabung dengan Program Khusus Kami?',
    cta_subtitle: 'Pilih program yang sesuai dengan minat dan bakat Anda untuk mengembangkan potensi secara optimal',
    cta_primary_label: 'Program Tahfidz',
    cta_primary_url: '/program-khusus/tahfidz',
    cta_secondary_label: 'Program ICT',
    cta_secondary_url: '/program-khusus/ict',
  })

  const programs: ProgramCard[] = pageData.programs && pageData.programs.length > 0 ? pageData.programs : [
    {
      id: 'tahfidz',
      title: 'Program Tahfidz Al-Quran',
      subtitle: 'Membentuk generasi Qurani melalui hafalan Al-Quran dengan metode pembelajaran yang menyenangkan dan efektif.',
      description: 'Program Tahfidz Al-Quran di sekolah kami menggunakan metode pembelajaran yang telah terbukti efektif dalam membantu siswa menghafal Al-Quran dengan mudah dan menyenangkan.',
      image: '/Programkhusus/photo-1553063085-dbbf64d936ea.jpeg',
      color: 'green',
      href: '/program-khusus/tahfidz',
      features: [
        'Metode pembelajaran terbukti efektif',
        'Ustadz dan ustadzah berpengalaman',
        'Fasilitas ruang tahfidz yang nyaman',
        'Lingkungan Islami yang mendukung'
      ]
    },
    {
      id: 'ict',
      title: 'Program ICT (Information and Communication Technology)',
      subtitle: 'Mempersiapkan siswa menghadapi era digital dengan pembelajaran teknologi informasi dan komunikasi yang komprehensif.',
      description: 'Program ICT dirancang untuk memberikan pemahaman mendalam tentang teknologi informasi dan komunikasi yang relevan dengan perkembangan zaman.',
      image: '/Programkhusus/html-code-on-computer-monitor-software-web-developer-programming-code-photo.jpg',
      color: 'blue',
      href: '/program-khusus/ict',
      features: [
        'Kurikulum ICT terkini',
        'Laboratorium komputer modern',
        'Pembelajaran praktis dan project-based',
        'Sertifikasi internasional'
      ]
    }
  ]

  useEffect(() => {
    let isMounted = true
    programKhususApi.getIndex()
      .then((data) => {
        if (!isMounted) return
        console.log('API Response:', data) // Debug log
        
        // Perbaikan: ambil data.page (karena fetchApi sudah unwrap result.data)
        if (data?.page) {
          const apiData = data.page

          type ApiProgramCard = ProgramCard & { features?: Array<{ feature: string }> | string[] }
          const transformFeatures = (list?: Array<{ feature: string }> | string[]): string[] =>
            ((list || []) as (string | { feature: string })[]) 
              .map((f) => (typeof f === 'string' ? f : (f?.feature || '')))

          const transformedPrograms: ProgramCard[] =
            ((apiData.programs as ApiProgramCard[] | undefined) || []).map((program: ApiProgramCard) => ({
              ...program,
              features: transformFeatures(program.features),
            }))

          const transformedSectionPrograms: ProgramCard[] =
            ((apiData.section_programs as ApiProgramCard[] | undefined) || []).map((program: ApiProgramCard) => ({
              ...program,
              features: transformFeatures(program.features),
            }))

          setPageData((prev) => ({
            ...prev,
            ...apiData,
            programs: transformedPrograms,
            section_programs: transformedSectionPrograms,
          }))
        }
      })
      .catch((error) => {
        console.error('program-khusus: gagal mengambil data API', error)
      })
    return () => { isMounted = false }
  }, [])

  // Helper untuk membangun URL gambar dari backend tanpa mengubah layout
  const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://api.alkapro.id/api'
  // Dapatkan origin murni (protocol + host + optional port) dari API base apapun bentuknya
  const backendOrigin = (() => {
    try {
      const url = new URL(apiBase)
      const portPart = url.port ? `:${url.port}` : ''
      return `${url.protocol}//${url.hostname}${portPart}`
    } catch {
      // Fallback: hilangkan suffix /api dan /v1 jika ada
      return apiBase
        .replace(/\/?api(?:\/v1)?$/i, '')
        .replace(/\/?v1$/i, '')
    }
  })()
  
  const buildImageUrl = (path?: string, fallback?: string): string => {
    if (!path) return fallback || ''
    
    // Jika sudah absolute URL, langsung pakai
    if (/^https?:\/\//i.test(path)) return path
    
    // Jika path local public (diawali '/'), kembalikan apa adanya
    if (path.startsWith('/') && !path.startsWith('/storage')) return path
    
    // Jika path dari backend (tanpa /storage), tambahkan backend origin
    if (path.startsWith('program-khusus/')) {
      return `${backendOrigin}/storage/${path}`
    }
    
    // Jika sudah mengandung /storage di depan (remote backend storage)
    if (path.startsWith('/storage')) {
      return `${backendOrigin}${path}`
    }
    
    // Default: anggap path relatif dari storage backend
    const normalized = path.replace(/^\/+/, '')
    return `${backendOrigin}/storage/${normalized}`
  }

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'green':
        return {
          bg: 'bg-green-600',
          hover: 'hover:bg-green-700',
          text: 'text-green-600',
          border: 'border-green-600'
        }
      case 'blue':
        return {
          bg: 'bg-blue-600',
          hover: 'hover:bg-blue-700',
          text: 'text-blue-600',
          border: 'border-blue-600'
        }
      default:
        return {
          bg: 'bg-gray-600',
          hover: 'hover:bg-gray-700',
          text: 'text-gray-600',
          border: 'border-gray-600'
        }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="pt-0 flex-1">
        {/* Hero Section dengan Overlay Content */}
        <div className="relative w-full h-screen">
          {/* Desktop Image */}
          <Image 
            src={buildImageUrl(pageData.hero_image_desktop, '/Programkhusus/photo-1553063085-dbbf64d936ea.jpeg')}
            alt="Program Khusus"
            fill
            className="object-cover hidden md:block"
            priority
            sizes="100vw"
            quality={75}
          />
          {/* Mobile Image */}
          <Image 
            src={buildImageUrl(pageData.hero_image_mobile, '/Programkhusus/6-1.png')}
            alt="Program Khusus"
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
                    <div className="bg-emerald-500 d-inline-flex p-5 title-panel-scoped" style={{boxSizing: 'border-box'}}>
                      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-0 line-clamp-2" style={{padding: '0px !important'}}>
                        {pageData.hero_title || 'Program Khusus'}
                      </h1>
                    </div>
                  </div>
                  
                  {/* Subtitle Panel */}
                  <div className="bg-emerald-700 p-4 opacity-90 d-inline-flex rounded-b-lg" style={{boxSizing: 'border-box'}}>
                    <p className="text-white text-sm md:text-lg font-semibold mb-0">
                      {pageData.hero_subtitle || 'Program unggulan SMP Muhammadiyah Al Kautsar PK Kartasura yang dirancang untuk mengembangkan potensi siswa secara optimal'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DIV untuk Mobile */}
        <div className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 py-6 md:hidden">
          <div className="container mx-auto px-4">
            <div className="d-block">
              {/* Title Panel untuk Mobile */}
              <div className="bg-emerald-700 d-inline-flex p-4 title-panel-scoped">
                <h1 className="text-xl font-bold text-white mb-0" style={{padding: '0px !important'}}>
                  {pageData.hero_title || 'Program Khusus'}
                </h1>
              </div>
              
              {/* Subtitle Panel untuk Mobile */}
              <div className="bg-emerald-800 mb-0 p-4 opacity-90 d-inline-flex subtitle-panel-scoped">
                <div>
                  <p className="text-white text-sm font-semibold mb-0">
                    {pageData.hero_subtitle || 'Program unggulan SMP Muhammadiyah Al Kautsar PK Kartasura yang dirancang untuk mengembangkan potensi siswa secara optimal'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Programs Overview */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {pageData.overview_title || 'Program Unggulan Kami'}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {pageData.overview_subtitle || 'Kami menawarkan dua program khusus yang dirancang untuk mengembangkan potensi akademik dan spiritual siswa'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {programs.map((program) => {
                const colors = getColorClasses(program.color || 'gray')
                return (
                  <div 
                    key={program.id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    {/* Program Image */}
                    <div className="relative h-64">
                      <Image
                        src={buildImageUrl(program.image, '/Programkhusus/photo-1553063085-dbbf64d936ea.jpeg')}
                        alt={program.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {program.title}
                        </h3>
                        <p className="text-white/90 text-sm">
                          {program.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Program Content */}
                    <div className="p-6">
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {program.description}
                      </p>

                      {/* Features */}
                      <div className="mb-6">
                        <h4 className={`font-semibold ${colors.text} mb-3`}>
                          Keunggulan Program:
                        </h4>
                        <ul className="space-y-2">
                          {(program.features || []).map((featureItem: any, index: number) => (
                            <li key={index} className="flex items-start">
                              <div className={`w-2 h-2 rounded-full ${colors.bg} mt-2 mr-3 flex-shrink-0`}></div>
                              <span className="text-gray-700 text-sm">
                                {typeof featureItem === 'string' ? featureItem : (featureItem?.feature || '')}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CTA Button */}
                      <Link 
                        href={program.href || `/program-khusus/${program.id}`}
                        className={`inline-block w-full text-center py-3 px-6 ${colors.bg} ${colors.hover} text-white font-semibold rounded-lg transition-colors duration-200`}
                      >
                        Pelajari Lebih Lanjut
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Keunggulan Program Kami */}
        <section className="py-20 bg-gradient-to-br from-emerald-50 via-white to-blue-50">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 font-['Philosopher',_sans-serif]">
                {pageData.reasons_title || 'Mengapa Memilih Program Khusus Kami?'}
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {pageData.reasons_subtitle || 'Program khusus kami dirancang dengan pendekatan holistik untuk mengembangkan potensi siswa secara optimal, menggabungkan keahlian akademik dengan pembentukan karakter'}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Card 1: Fokus Spesifik */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 ring-1 ring-gray-200/50 hover:ring-emerald-500/20 transition-all duration-300 h-full">
                  <div className="absolute top-4 right-4 opacity-10">
                    <div className="w-12 h-12 bg-emerald-600 rounded-full"></div>
                  </div>
                  
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl">
                        {(pageData.reasons && pageData.reasons[0]?.icon) || '🎯'}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-4 font-['Philosopher',_sans-serif]">
                      {(pageData.reasons && pageData.reasons[0]?.title) || 'Fokus Spesifik'}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {(pageData.reasons && pageData.reasons[0]?.description) || 'Setiap program dirancang dengan kurikulum yang fokus dan mendalam sesuai dengan bidang yang dipilih, memastikan penguasaan kompetensi secara komprehensif'}
                    </p>
                  </div>
                  
                  <div className="absolute bottom-4 left-8 right-8 h-0.5 bg-gradient-to-r from-emerald-500/20 to-transparent"></div>
                </div>
              </div>

              {/* Card 2: Pengajar Ahli */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 ring-1 ring-gray-200/50 hover:ring-blue-500/20 transition-all duration-300 h-full">
                  <div className="absolute top-4 right-4 opacity-10">
                    <div className="w-12 h-12 bg-blue-600 rounded-full"></div>
                  </div>
                  
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl">
                        {(pageData.reasons && pageData.reasons[1]?.icon) || '👨‍🏫'}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-4 font-['Philosopher',_sans-serif]">
                      {(pageData.reasons && pageData.reasons[1]?.title) || 'Pengajar Ahli'}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {(pageData.reasons && pageData.reasons[1]?.description) || 'Dibimbing oleh pengajar yang berpengalaman dan ahli di bidangnya masing-masing, dengan sertifikasi profesional dan pengalaman praktik yang luas'}
                    </p>
                  </div>
                  
                  <div className="absolute bottom-4 left-8 right-8 h-0.5 bg-gradient-to-r from-blue-500/20 to-transparent"></div>
                </div>
              </div>

              {/* Card 3: Prestasi Terbukti */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-emerald-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 ring-1 ring-gray-200/50 hover:ring-purple-500/20 transition-all duration-300 h-full">
                  <div className="absolute top-4 right-4 opacity-10">
                    <div className="w-12 h-12 bg-purple-600 rounded-full"></div>
                  </div>
                  
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl">
                        {(pageData.reasons && pageData.reasons[2]?.icon) || '🏆'}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-4 font-['Philosopher',_sans-serif]">
                      {(pageData.reasons && pageData.reasons[2]?.title) || 'Prestasi Terbukti'}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {(pageData.reasons && pageData.reasons[2]?.description) || 'Program kami telah menghasilkan siswa-siswa berprestasi di berbagai kompetisi nasional dan internasional, dengan track record yang konsisten'}
                    </p>
                  </div>
                  
                  <div className="absolute bottom-4 left-8 right-8 h-0.5 bg-gradient-to-r from-purple-500/20 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600">
          <div className="container mx-auto px-4 md:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {pageData.cta_title || 'Siap Bergabung dengan Program Khusus Kami?'}
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              {pageData.cta_subtitle || 'Pilih program yang sesuai dengan minat dan bakat Anda untuk mengembangkan potensi secara optimal'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href={pageData.cta_primary_url || '/program-khusus/tahfidz'}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
              >
                {pageData.cta_primary_label || 'Program Tahfidz'}
              </Link>
              <Link 
                href={pageData.cta_secondary_url || '/program-khusus/ict'}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
              >
                {pageData.cta_secondary_label || 'Program ICT'}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default ProgramKhususPage
