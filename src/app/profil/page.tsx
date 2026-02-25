'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { Header } from '@/components/Header'
import Image from 'next/image'
import { profilApi, ProfilSettings } from '@/lib/api'

export default function ProfilPage() {
  const [data, setData] = useState<ProfilSettings | null>(null)
  const [loading, setLoading] = useState(true)
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
  const buildImageUrl = (path?: string) => {
    if (!path) return ''
    if (/^https?:\/\//i.test(path)) return path
    if (path.startsWith('/storage')) return `${backendOrigin}${path}`
    const normalized = path.replace(/^\/+/, '')
    return `${backendOrigin}/storage/${normalized}`
  }

  useEffect(() => {
    let mounted = true
    profilApi.getSettings()
      .then((res) => { if (mounted) setData(res) })
      .catch((e: any) => { if (mounted) setError(e?.message || 'Gagal memuat profil') })
      .finally(() => { if (mounted) setLoading(false) })
    return () => { mounted = false }
  }, [])

  const title = data?.title || 'Profil SMP Muhammadiyah Al Kautsar PK Kartasura'
  const subtitle = data?.subtitle || 'Informasi lengkap tentang sekolah kami'
  const bannerDesktop = buildImageUrl(data?.banner_desktop) || '/guru/Adam-Muttaqien-M.Si_.jpg'
  const bannerMobile = buildImageUrl(data?.banner_mobile) || '/guru/Cindy-Trisnawati-S.Pd-M.Pd_.jpg'
  const description = data?.description || 'SMP Muhammadiyah Al Kautsar PK Kartasura merupakan lembaga pendidikan yang berkomitmen untuk mengembangkan potensi peserta didik secara holistik, menggabungkan keunggulan akademik dengan nilai-nilai keislaman dan karakter yang kuat.'

  return (
    <div className="min-h-screen flex flex-col light-page">
      <Header />
      
      {/* Main Content */}
      <main className="pt-0 flex-1">
        {/* IMG dengan Overlay untuk Desktop */}
        <div className="relative w-full md:h-screen h-64">
          {/* Desktop Image */}
          <Image 
            src={bannerDesktop}
            alt="banner-desktop"
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
              alt="banner-mobile"
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
                        {title}
                      </h1>
                    </div>
                  </div>
                  
                  {/* Subtitle Panel */}
                  <div className="bg-green-700 p-4 opacity-90 inline-flex rounded-b-lg" style={{boxSizing: 'border-box'}}>
                    <p className="text-white text-sm md:text-lg font-semibold mb-0">
                      {subtitle}
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
                  {title}
                </h1>
              </div>
              
              {/* Subtitle Panel untuk Mobile */}
              <div className="bg-green-800 mb-0 p-3 opacity-90 inline-flex subtitle-panel-scoped">
                <div>
                  <p className="text-white text-xs font-semibold mb-0">
                    {subtitle}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      
      </main>
      <main className="flex-grow container mx-auto px-4 py-8 bg-white">
        <h1 className="text-3xl font-bold text-primary mb-6">{title}</h1>
        
        <div className="prose max-w-none">
          <p className="text-lg mb-4">
            {description}
          </p>
          
          <p className="mb-4">
            Pada halaman profil ini, Anda dapat menemukan berbagai informasi mengenai sekolah kami, termasuk:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-primary mb-2">Pimpinan SMP</h3>
                <p className="text-gray-600 mb-4">Kenali jajaran pimpinan yang memimpin SMP Muhammadiyah Al Kautsar PK Kartasura.</p>
                <a href="/profil/pimpinansmp" className="text-blue-600 hover:text-blue-800 font-medium">Selengkapnya →</a>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-primary mb-2">Guru dan Tendik</h3>
                <p className="text-gray-600 mb-4">Profil tenaga pendidik dan kependidikan yang berkualitas dan berdedikasi.</p>
                <a href="/profil/guru" className="text-blue-600 hover:text-blue-800 font-medium">Selengkapnya →</a>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-primary mb-2">Sejarah Singkat</h3>
                <p className="text-gray-600 mb-4">Perjalanan sejarah pendirian dan perkembangan sekolah kami.</p>
                <a href="/profil/sejarah" className="text-blue-600 hover:text-blue-800 font-medium">Selengkapnya →</a>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-primary mb-2">Visi dan Misi</h3>
                <p className="text-gray-600 mb-4">Visi, misi, dan tujuan pendidikan yang menjadi landasan kami.</p>
                <a href="/profil/visi-misi" className="text-blue-600 hover:text-blue-800 font-medium">Selengkapnya →</a>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-primary mb-2">Struktur Organisasi</h3>
                <p className="text-gray-600 mb-4">Struktur organisasi sekolah yang menunjang sistem pendidikan kami.</p>
                <a href="/profil/struktur-organisasi" className="text-blue-600 hover:text-blue-800 font-medium">Selengkapnya →</a>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-primary mb-2">IPM</h3>
                <p className="text-gray-600 mb-4">Ikatan Pelajar Muhammadiyah sebagai wadah pengembangan kepemimpinan siswa.</p>
                <a href="/profil/ipm" className="text-blue-600 hover:text-blue-800 font-medium">Selengkapnya →</a>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-primary mb-2">Ekstrakurikuler</h3>
                <p className="text-gray-600 mb-4">Berbagai kegiatan ekstrakurikuler untuk pengembangan bakat dan minat siswa.</p>
                <a href="/profil/ekstrakurikuler" className="text-blue-600 hover:text-blue-800 font-medium">Selengkapnya →</a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}