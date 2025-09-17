'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { BookOpen, Users, Target, Award, Star, CheckCircle, Heart, Brain, Monitor, Code, UsersRound, Lightbulb, FileText, UserCheck, Calendar, CreditCard, GraduationCap, Building } from 'lucide-react'
import { infoPPDBApi, InfoPPDBSettings } from '@/lib/api'

const InfoPPDB = () => {
  const [settings, setSettings] = useState<InfoPPDBSettings | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const apiBase = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_BASE_URL || 'http://api.alkapro.id/api'
  const backendOrigin = useMemo(() => {
    try {
      const url = new URL(apiBase as string)
      const portPart = url.port ? `:${url.port}` : ''
      return `${url.protocol}//${url.hostname}${portPart}`.replace(/\/$/, '')
    } catch {
      return String(apiBase).replace(/\/?api(?:\/v1)?$/i, '').replace(/\/?v1$/i, '')
    }
  }, [apiBase])
  const buildImageUrl = (path?: string, fallback?: string) => {
    if (!path) return fallback || ''
    if (/^https?:\/\//i.test(path)) return path
    if (path.startsWith('/storage')) return `${backendOrigin}${path}`
    if (path.startsWith('/')) return path
    const normalized = path.replace(/^\/+/, '')
    return `${backendOrigin}/storage/${normalized}`
  }

  // Map string icon name from backend to lucide-react icon component
  const getLucideIcon = (name?: string) => {
    const raw = (name || '').trim().toLowerCase()
    // Normalize common heroicon names to plain keys (e.g., heroicon-o-star -> star)
    const key = raw
      .replace(/^heroicon-(?:o|solid|mini)-?/, '')
      .replace(/[^a-z]/g, '')
    const map: Record<string, any> = {
      'filetext': FileText,
      'file-text': FileText,
      'usercheck': UserCheck,
      'user-check': UserCheck,
      'creditcard': CreditCard,
      'credit-card': CreditCard,
      'calendar': Calendar,
      'checkcircle': CheckCircle,
      'check-circle': CheckCircle,
      'bookopen': BookOpen,
      'book-open': BookOpen,
      'users': Users,
      'heart': Heart,
      'monitor': Monitor,
      'building': Building,
      'star': Star,
    }
    return map[key] || null
  }

  // Selectors with fallback to flat structure
  const heroTitle = settings?.hero?.title || (settings as any)?.title || 'Info PPDB'
  const heroSubtitle = settings?.hero?.subtitle || (settings as any)?.subtitle || 'Alur Pendaftaran SMP Muhammadiyah Al Kautsar PK Kartasura'
  const bannerDesktop = buildImageUrl(settings?.hero?.banner_desktop || (settings as any)?.banner_desktop, '/Programkhusus/html-code-on-computer-monitor-software-web-developer-programming-code-photo.jpg')
  const bannerMobile = buildImageUrl(settings?.hero?.banner_mobile || (settings as any)?.banner_mobile, '/Programkhusus/google-logo-redesign-uhd-4k-wallpaper.jpg')

  const introBadge = settings?.introduction?.badge || (settings as any)?.intro_badge || 'Penerimaan Peserta Didik Baru'
  const introTitle = settings?.introduction?.title || (settings as any)?.intro_title || 'Bergabung dengan SMP Muhammadiyah Al Kautsar'
  const introSubtitle = settings?.introduction?.subtitle || (settings as any)?.intro_subtitle || 'Informasi lengkap mengenai alur pendaftaran dan persyaratan untuk menjadi bagian dari keluarga besar SMP Muhammadiyah Al Kautsar PK Kartasura dengan berbagai program unggulan yang tersedia.'

  const featuredImage = buildImageUrl(settings?.featured?.image || (settings as any)?.featured_image, '/Programkhusus/html-code-on-computer-monitor-software-web-developer-programming-code-photo.jpg')
  const featuredOverlayTitle = settings?.featured?.overlay_title || (settings as any)?.featured_overlay_title || 'Sekolah Unggulan'
  const featuredOverlayDesc = settings?.featured?.overlay_desc || (settings as any)?.featured_overlay_desc || 'Fasilitas modern dan program pendidikan berkualitas'
  const featuredBadge = (settings as any)?.featured_badge || (settings as any)?.academic_year || 'PPDB 2024/2025'

  const keyPoints = (settings as any)?.key_points || []
  const kp0 = keyPoints[0] || {}
  const kp1 = keyPoints[1] || {}

  const alurTitleStr = settings?.alur?.title || (settings as any)?.alur_title || ''
  const alurSubtitle = settings?.alur?.subtitle || (settings as any)?.alur_subtitle || 'Langkah-langkah mudah untuk mendaftar di SMP Muhammadiyah Al Kautsar PK Kartasura'
  const alurImage = buildImageUrl(settings?.alur?.image || (settings as any)?.alur_image, '/Programkhusus/google-logo-redesign-uhd-4k-wallpaper.jpg')
  const steps = (settings?.alur?.steps || (settings as any)?.steps || []) as Array<{ title?: string; description?: string }>

  const programBadge = settings?.program_options?.badge || (settings as any)?.program_section_badge || 'Program Unggulan'
  const programTitle = settings?.program_options?.title || (settings as any)?.program_section_title || ''
  const programSubtitle = settings?.program_options?.subtitle || (settings as any)?.program_section_subtitle || 'Berbagai program unggulan yang dapat dipilih sesuai dengan minat dan bakat calon siswa'
  const programRows = (settings?.program_options?.rows || (settings as any)?.program_rows || []) as Array<{ reverse?: boolean; badge?: string; title?: string; description?: string; image?: string }>

  const ctaBackground = buildImageUrl(settings?.cta_footer?.background || (settings as any)?.cta_background, '/Programkhusus/156354-building-a-custom-wordpress-theme.png')
  const ctaBadge = settings?.cta_footer?.badge || (settings as any)?.cta_badge || 'Daftar Sekarang'
  const ctaTitle = settings?.cta_footer?.title || (settings as any)?.cta_title || ''
  const ctaDescription = settings?.cta_footer?.description || (settings as any)?.cta_description || 'Bergabunglah dengan SMP Muhammadiyah Al Kautsar PK Kartasura dan rasakan pengalaman pendidikan yang berkualitas dengan berbagai program unggulan. Daftarkan diri Anda sekarang dan jadilah bagian dari generasi yang unggul dalam akademik dan berakhlak mulia.'
  const ctaPrimaryLabel = (settings as any)?.cta_primary_label || settings?.cta_footer?.primary?.label || 'Daftar Online'
  const ctaPrimaryUrl = (settings as any)?.cta_primary_url || settings?.cta_footer?.primary?.url || 'https://ppdb.smpam.site'
  const ctaSecondaryLabel = (settings as any)?.cta_secondary_label || settings?.cta_footer?.secondary?.label || 'Tentang Sekolah'
  const ctaSecondaryUrl = (settings as any)?.cta_secondary_url || settings?.cta_footer?.secondary?.url || '/profil'
  const contactInfo = (settings as any)?.contact_info || settings?.cta_footer?.contact_info || 'Hubungi kami untuk informasi lebih lanjut tentang pendaftaran dan program yang tersedia'

  useEffect(() => {
    let mounted = true
    infoPPDBApi.getSettings()
      .then((data) => { if (mounted) setSettings(data || null) })
      .catch((e: any) => { if (mounted) setError(e?.message || 'Gagal memuat Info PPDB') })
      .finally(() => { if (mounted) setIsLoading(false) })
    return () => { mounted = false }
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="">
        {/* IMG dengan Overlay untuk Desktop */}
        <div className="relative w-full md:h-screen h-64">
          {/* Desktop Image */}
          <Image 
            src={bannerDesktop}
            alt={heroTitle}
            fill
            className="object-cover hidden md:block"
            priority
            sizes="100vw"
            quality={75}
          />
          {/* Mobile Image - Height diperkecil untuk mobile */}
          <div className="relative w-full h-full md:hidden">
            <Image 
              src={bannerMobile}
              alt={heroTitle}
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
                      <div className="bg-gradient-to-r from-green-600 to-green-800 inline-flex p-5">
                        <h1 className="text-2xl md:text-3xl lg:text-2xl font-bold text-white mb-0 line-clamp-2" style={{ fontFamily: 'Philosopher, serif' }}>
                          {heroTitle}
                        </h1>
                      </div>
                    </div>
                    
                    {/* Subtitle Panel */}
                    <div className="bg-gradient-to-r from-green-700 to-green-900 p-4 opacity-90 inline-flex rounded-b-lg">
                      <p className="text-white text-sm md:text-lg font-semibold mb-0">
                        {heroSubtitle}
                      </p>
                    </div>
                  </div>
                  
                  {/* Right Side content removed per request */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DIV untuk Mobile - Tinggi disesuaikan dengan gambar */}
        <div className="w-full bg-gradient-to-r from-green-700 to-green-800 py-4 md:hidden">
          <div className="container mx-auto px-4">
            <div className="block">
              {/* Title Panel untuk Mobile */}
              <div className="bg-gradient-to-r from-green-600 to-green-800 inline-flex p-3">
                <h1 className="text-lg font-bold text-white mb-0" style={{ fontFamily: 'Philosopher, serif' }}>
                  {heroTitle}
                </h1>
              </div>
              
              {/* Subtitle Panel untuk Mobile */}
              <div className="bg-gradient-to-r from-green-700 to-green-900 mb-0 p-3 opacity-90 inline-flex">
                <div>
                  <p className="text-white text-xs font-semibold mb-0">
                    {heroSubtitle}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Mobile Program Options removed by request */}
          </div>
        </div>

        {/* Main Content */}
        <div id="ppdb-details" className="container mx-auto px-4 md:px-8 py-8 md:py-20">
          <div className="max-w-6xl mx-auto">
            
            {/* Introduction Section */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center bg-gradient-to-r from-green-100 to-emerald-100 rounded-full px-6 py-2 mb-6">
                <GraduationCap className="w-5 h-5 mr-2 text-green-500" />
                <span className="text-sm font-semibold text-gray-700">{introBadge}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight" style={{ fontFamily: 'Philosopher, serif' }}>
                {introTitle || (<>
                Bergabung dengan <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">SMP Muhammadiyah</span> Al Kautsar
                </>)}
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
                {introSubtitle}
              </p>
            </div>

            {/* Featured Image with Modern Design */}
            <div className="relative mb-16">
              <div className="relative group">
                {/* Floating background elements */}
                <div className="absolute -top-4 -left-4 w-32 h-32 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                <div className="absolute -bottom-4 -right-4 w-40 h-40 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div>
                
                {/* Main image container */}
                <div className="relative bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-sm p-4 rounded-3xl shadow-2xl border border-white/20">
                  <div className="relative overflow-hidden rounded-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-transparent to-blue-500/20"></div>
                    <Image
                      src={featuredImage}
                      alt={featuredOverlayTitle || 'PPDB SMP Muhammadiyah Al Kautsar'}
                      width={800}
                      height={500}
                      className="w-full h-96 object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    
                    {/* Glassmorphism overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-8 left-8 right-8">
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                          <h3 className="text-3xl font-bold text-white mb-3">{featuredOverlayTitle}</h3>
                          <p className="text-green-100 text-lg">{featuredOverlayDesc}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Corner badge */}
                    <div className="absolute top-6 right-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg transform translate-x-20 group-hover:translate-x-0 transition-transform duration-500">
                      {featuredBadge}
                    </div>
                  </div>
                </div>
                
                {/* Floating icons */}
                <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl shadow-xl flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -bottom-6 -left-6 w-14 h-14 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full shadow-xl flex items-center justify-center transform -rotate-12 group-hover:rotate-0 transition-transform duration-500">
                  <Star className="w-7 h-7 text-white" />
                </div>
              </div>
            </div>
            
            {/* Key Points */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {(() => {
                const defaults = [
                  { icon: FileText, color: 'bg-green-500', title: 'Pendaftaran Online', description: 'Sistem pendaftaran online yang mudah dan terintegrasi untuk memudahkan calon siswa dan orang tua dalam proses pendaftaran.' },
                  { icon: UserCheck, color: 'bg-blue-500', title: 'Seleksi Berkeadilan', description: 'Proses seleksi yang transparan dan berkeadilan dengan berbagai jalur masuk sesuai dengan kemampuan dan minat calon siswa.' },
                ]
                const points = (keyPoints && keyPoints.length ? keyPoints : []).slice(0, 2)
                const items = points.length ? points : defaults
                return items.map((p: any, idx: number) => {
                  const IconComp = p.icon ? (typeof p.icon === 'string' ? (getLucideIcon(p.icon) || defaults[idx % 2].icon) : defaults[idx % 2].icon) : (defaults[idx % 2].icon)
                  const color = idx % 2 === 0 ? 'bg-green-500' : 'bg-blue-500'
                  const title = p.title || defaults[idx % 2].title
                  const desc = p.description || defaults[idx % 2].description
                  return (
                    <div key={idx} className={`bg-gradient-to-br ${idx % 2 === 0 ? 'from-green-50 to-emerald-50 border border-green-100' : 'from-blue-50 to-cyan-50 border border-blue-100'} p-8 rounded-2xl hover:shadow-lg transition-all duration-300 group`}>
                      <div className="flex items-center mb-4">
                        <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform`}>
                          <IconComp className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800" style={{ fontFamily: 'Philosopher, serif' }}>{title}</h3>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  )
                })
              })()}
            </div>
            
            {/* Alur Pendaftaran Section */}
            <div className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Philosopher, serif' }}>
                  {alurTitleStr || (
                    <>Alur <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Pendaftaran</span></>
                  )}
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  {alurSubtitle}
                </p>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Image Section */}
                <div className="relative">
                  <div className="relative group">
                    {/* Background glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-500 to-blue-500 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                    
                    {/* 3D card container */}
                    <div className="relative bg-white/90 backdrop-blur-sm p-4 rounded-3xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
                      <div className="relative overflow-hidden rounded-2xl">
                        <Image
                          src={buildImageUrl(settings?.alur?.image, '/Programkhusus/google-logo-redesign-uhd-4k-wallpaper.jpg')}
                          alt={alurTitleStr || 'Alur Pendaftaran PPDB'}
                          width={400}
                          height={600}
                          className="w-full h-[600px] object-cover rounded-2xl transform group-hover:scale-110 transition-transform duration-700"
                        />
                        
                        {/* Modern overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-green-600/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-6 left-6 right-6">
                            <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30">
                              <div className="flex items-center space-x-3">
                                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="text-sm font-medium text-white">Proses Mudah & Cepat</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Floating badge */}
                        <div className="absolute -top-3 -right-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
                          MUDAH
                        </div>
                      </div>
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl opacity-60 blur-xl"></div>
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full opacity-60 blur-xl"></div>
                  </div>
                </div>
                
                {/* Steps Grid */}
                <div className="grid gap-6">
                  {(() => {
                    const defaults = [
                      { title: '1. Pendaftaran Online', description: 'Daftar melalui website resmi dengan mengisi formulir pendaftaran dan mengunggah dokumen yang diperlukan' },
                      { title: '2. Pembayaran Biaya', description: 'Lakukan pembayaran biaya pendaftaran sesuai dengan program yang dipilih melalui bank yang ditentukan' },
                      { title: '3. Tes Seleksi', description: 'Mengikuti tes seleksi sesuai jadwal yang telah ditentukan dengan materi tes akademik dan wawancara' },
                      { title: '4. Pengumuman Hasil', description: 'Pengumuman hasil seleksi akan diumumkan melalui website dan dapat dicek dengan nomor pendaftaran' },
                    ]
                    const items = (steps && steps.length ? steps : defaults) as Array<{ title?: string; description?: string }>
                    return items.map((s, i) => {
                      const bgGrad = [
                        'from-green-50 to-emerald-50 border-green-100',
                        'from-blue-50 to-cyan-50 border-blue-100',
                        'from-purple-50 to-indigo-50 border-purple-100',
                        'from-emerald-50 to-teal-50 border-emerald-100',
                      ][i % 4]
                      const iconGrad = [
                        'from-green-500 to-emerald-600',
                        'from-blue-500 to-cyan-600',
                        'from-purple-500 to-indigo-600',
                        'from-emerald-500 to-teal-600',
                      ][i % 4]
                      const TitleHover = [
                        'group-hover:text-green-600',
                        'group-hover:text-blue-600',
                        'group-hover:text-purple-600',
                        'group-hover:text-emerald-600',
                      ][i % 4]
                      const IconComp = [FileText, CreditCard, Calendar, CheckCircle][i % 4]
                      return (
                        <div key={i} className={`group bg-gradient-to-r ${bgGrad} p-6 rounded-2xl border hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer`}>
                          <div className="flex items-start space-x-4">
                            <div className={`w-12 h-12 bg-gradient-to-r ${iconGrad} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                              <IconComp className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <h3 className={`text-xl font-bold text-gray-800 mb-2 transition-colors ${TitleHover}`} style={{ fontFamily: 'Philosopher, serif' }}>{s?.title || defaults[i % 4].title}</h3>
                              <p className="text-gray-600 leading-relaxed">{s?.description || defaults[i % 4].description}</p>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  })()}
                </div>
              </div>
            </div>
            
            {/* Program Options Section */}
            <div className="mb-20">
              <div className="text-center mb-12">
                <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-green-100 rounded-full px-6 py-2 mb-6">
                  <Star className="w-5 h-5 mr-2 text-yellow-500" />
                  <span className="text-sm font-semibold text-gray-700">{programBadge}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Philosopher, serif' }}>
                  {programTitle || (
                    <>Pilihan <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">Program</span> Tersedia</>
                  )}
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  {programSubtitle}
                </p>
              </div>
              
              <div className="max-w-6xl mx-auto space-y-16">
                {/* Baris program non-Boarding dihapus sesuai permintaan */}
                {(() => {
                  const rows = programRows
                  const filtered = rows.filter(r => !(/full\s*day/i.test(r?.title || '')))
                  if (!filtered.length) return null
                  return filtered.map((row, idx) => {
                    const leftText = !(row.reverse)
                    return (
                      <div key={idx} className="grid lg:grid-cols-2 gap-8 items-center">
                        {leftText ? (
                          <div className="space-y-4">
                            <div className="inline-flex items-center bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full px-4 py-2">
                              <Heart className="w-5 h-5 mr-2 text-emerald-600" />
                              <span className="text-sm font-semibold text-emerald-700">{row.badge || 'Program'}</span>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-800" style={{ fontFamily: 'Philosopher, serif' }}>{row.title || 'Program'}</h3>
                            <p className="text-lg text-gray-600 leading-relaxed">{row.description || ''}</p>
                          </div>
                        ) : null}
                        <div>
                          <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl transform rotate-2 group-hover:rotate-0 transition-transform duration-300 opacity-20"></div>
                            <div className="relative bg-white p-3 rounded-2xl shadow-xl">
                              <Image
                                src={buildImageUrl(row.image, '/Programkhusus/photo-1553063085-dbbf64d936ea.jpeg')}
                                alt={row.title || 'Program'}
                                width={400}
                                height={300}
                                className="w-full h-64 object-cover rounded-xl"
                              />
                            </div>
                          </div>
                        </div>
                        {!leftText ? (
                          <div className="space-y-4">
                            <div className="inline-flex items-center bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full px-4 py-2">
                              <Heart className="w-5 h-5 mr-2 text-emerald-600" />
                              <span className="text-sm font-semibold text-emerald-700">{row.badge || 'Program'}</span>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-800" style={{ fontFamily: 'Philosopher, serif' }}>{row.title || 'Program'}</h3>
                            <p className="text-lg text-gray-600 leading-relaxed">{row.description || ''}</p>
                          </div>
                        ) : null}
                      </div>
                    )
                  })
                })()}

              </div>
            </div>
            
            {/* Call to Action Section */}
            <div className="relative">
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
                    <GraduationCap className="w-5 h-5 mr-2" />
                    <span className="text-sm font-medium">{ctaBadge}</span>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight" style={{ fontFamily: 'Philosopher, serif', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                    {ctaTitle || (
                      <>Siap Menjadi Bagian dari <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-300" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Keluarga Besar Al Kautsar</span>?</>
                    )}
                  </h2>
                  
                  <p className="text-xl text-green-100 mb-8 leading-relaxed max-w-3xl mx-auto" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                    {ctaDescription}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link 
                      href={ctaPrimaryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-white text-green-600 hover:bg-green-50 font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      <span className="flex items-center justify-center">
                        {ctaPrimaryLabel}
                        <FileText className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
                      </span>
                    </Link>
                    <Link 
                      href={ctaSecondaryUrl}
                      className="group border-2 border-white text-white hover:bg-white hover:text-green-600 font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
                    >
                      <span className="flex items-center justify-center">
                        {ctaSecondaryLabel}
                        <Star className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
                      </span>
                    </Link>
                  </div>
                  
                  {/* Contact Info */}
                  <div className="mt-8 pt-8 border-t border-white/20">
                    <p className="text-green-100 text-sm" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                      {contactInfo}
                    </p>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute top-8 left-8 w-16 h-16 bg-white/10 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute bottom-8 right-8 w-20 h-20 bg-green-300/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
              </div>
            </div>
            
            {/* WhatsApp Contact Section */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 md:p-24 border border-green-100">
              <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-4 items-center">
                  {/* QR Code */}
                  <div className="flex justify-center md:justify-start">
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-green-100">
                      <div className="bg-blue-600 text-white text-center py-3 px-6 rounded-t-xl mb-4">
                        <span className="text-sm font-semibold">scan QRcode WA Admin ALKA</span>
                      </div>
                      <div className="flex justify-center">
                        <Image
                           src="/qrcodesekolah.png"
                           alt="QR Code PPDB"
                           width={180}
                           height={180}
                           className="rounded-lg"
                         />
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="text-center md:text-left">
                    <div className="mb-6">
                      <div className="inline-flex items-center bg-green-100 rounded-full px-4 py-2 mb-4">
                        <svg className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787"/>
                        </svg>
                        <span className="text-sm font-semibold text-green-700">WhatsApp SMP Muhammadiyah Al-Kautsar PK Kartasura</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Philosopher, serif' }}>
                        Punya Pertanyaan Khusus Terkait PPDB INDEN / REGULER SMP Muhammadiyah Al-Kautsar PK Kartasura?
                      </h3>
                      <p className="text-lg text-gray-600 leading-relaxed mb-6">
                        Dapatkan informasi lengkap dan konsultasi gratis mengenai pendaftaran, program unggulan, dan berbagai kebutuhan spesifik untuk calon siswa baru SMP Muhammaadiyah Al-Kautsar PK Kartasura
                      </p>
                    </div>
                    
                    <Link 
                      href="https://wa.me/6285866499328?text=Halo,%20saya%20ingin%20bertanya%20tentang%20PPDB%20SMP%20Muhammadiyah%20Al%20-Kautsar%20PK%20Kartasura"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787"/>
                      </svg>
                      <span>Hubungi Admin PPDB SMP Muhammadiyah Al-Kautsar PK Kartasura</span>
                    </Link>
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

export default InfoPPDB