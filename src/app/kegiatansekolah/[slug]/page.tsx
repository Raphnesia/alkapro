'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Header } from '@/components/Header'
import { getApiUrl, getImageUrl } from '@/lib/config'
import { activityApi, PaginatedResponse, SchoolActivity } from '@/lib/api'
import { config } from '@/lib/config'

interface ActivityDetail {
  id: number
  title: string
  slug: string
  description: string
  excerpt: string
  image: string
  activity_date?: string
  activity_time?: string
  date: string
  location?: string
  category: string
  participants?: string[]
  author: string
  type: 'prestasi' | 'ekstrakurikuler' | 'akademik' | 'sosial'
}

interface ActivityDetailProps {
  params: Promise<{ slug: string }>
}

const ShareButton = ({ icon, bg, size = 'normal' }: { icon: string; bg: string; size?: 'normal' | 'small' }) => {
  const sizeClasses = size === 'small' ? 'w-8 h-8 text-sm' : 'w-10 h-10'
  return (
    <button 
      className={`${bg} ${sizeClasses} rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity`}
      type="button"
    >
      <span className="font-bold">{icon}</span>
    </button>
  )
}

export default function ActivityDetailPage({ params }: ActivityDetailProps) {
  const [activity, setActivity] = useState<ActivityDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const resolved = React.use(params)
  const slug = resolved.slug

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        setLoading(true)
        setError(null)

        const res = await fetch(getApiUrl(`/activities/${slug}`))
        if (!res.ok) throw new Error('Gagal mengambil data kegiatan')
        const json = await res.json()
        const data = json?.data || json

        setActivity({
          id: data.id,
          title: data.title,
          slug: data.slug,
          description: data.description || '',
          excerpt: data.excerpt || '',
          image: data.image,
          activity_date: data.activity_date,
          activity_time: data.activity_time,
          date: data.date || data.activity_date || '',
          location: data.location,
          category: data.category || 'Lainnya',
          participants: Array.isArray(data.participants) ? data.participants : [],
          author: data.author || 'Admin',
          type: data.type || 'akademik',
        })
      } catch (e: any) {
        setError(e?.message || 'Terjadi kesalahan saat memuat kegiatan')
        setActivity(null)
      } finally {
        setLoading(false)
      }
    }

    if (slug) fetchActivity()
  }, [slug])

  const formatDate = (dateString: string) => {
    if (!dateString) return ''
    const parsed = new Date(dateString)
    if (!isNaN(parsed.getTime())) {
      return parsed.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    }
    return dateString
  }

  const activityData = activity ? {
    title: activity.title,
    subtitle: activity.excerpt || activity.location || '',
    bannerDesktop: getImageUrl(activity.image),
    bannerMobile: getImageUrl(activity.image),
    date: formatDate(activity.date),
    readTime: '3 Menit untuk membaca',
    author: activity.author,
    authorImage: '/pace.jpeg',
    category: activity.category,
    type: activity.type,
    content: activity.description,
    participants: activity.participants || [],
    location: activity.location,
  } : null

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Memuat kegiatan...</p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (error || !activityData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-600 mb-2">Kegiatan Tidak Ditemukan</h1>
            <p className="text-gray-500 mb-4">{error || 'Kegiatan yang Anda cari tidak tersedia'}</p>
            <a href="/kegiatansekolah" className="text-blue-600 hover:text-blue-800 underline">
              Kembali ke Kegiatan Sekolah
            </a>
          </div>
        </main>
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
        <div className="relative w-full h-screen">
          {/* Desktop Image */}
          <Image 
            src={activityData.bannerDesktop}
            alt={activityData.title}
            fill
            className="object-cover hidden md:block"
            priority
            sizes="100vw"
            quality={75}
          />
          
          {/* Mobile Image */}
          <Image 
            src={activityData.bannerMobile}
            alt={activityData.title}
            fill
            className="object-cover md:hidden"
            priority
            sizes="100vw"
            quality={75}
          />

          {/* Overlay Content untuk Desktop - Di dalam gambar */}
          <div className="absolute inset-0 hidden md:flex md:items-end">
            <div className="w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent">
              <div className="container mx-auto px-8 pb-16">
                <div className="max-w-3xl">
                  {/* Title Panel - Background Secondary */}
                  <div className="d-block">
                    <div className="bg-yellow-500 d-inline-flex p-5" style={{boxSizing: 'border-box'}}>
                      <h1 className="text-2xl md:text-3xl lg:text-2xl font-bold text-white mb-0 line-clamp-2" style={{padding: '0px !important'}}>
                        {activityData.title}
                      </h1>
                    </div>
                  </div>
                  
                  {/* Subtitle Panel - Background Primary */}
                  <div className="bg-blue-600 p-4 opacity-90 d-inline-flex rounded-b-lg" style={{boxSizing: 'border-box'}}>
                    <p className="text-white text-sm md:text-lg font-semibold mb-0">
                      {activityData.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Overlay Content untuk Mobile - Sederhana */}
          <div className="absolute inset-0 md:hidden flex items-end">
            <div className="w-full bg-gradient-to-t from-black/70 to-transparent">
              <div className="container mx-auto px-4 pb-8">
                <div className="max-w-full">
                  <h1 className="text-xl font-bold text-white mb-2">
                    {activityData.title}
                  </h1>
                  <p className="text-white text-sm opacity-90">
                    {activityData.subtitle}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Meta Info Section for Desktop */}
        <section className="hidden md:block bg-white py-6 mt-5">
          <div className="container mx-auto px-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-6 flex-grow">
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20">
                    <Image 
                      src={activityData.authorImage}
                      alt="Author" 
                      fill 
                      className="rounded-full object-cover border-3 border-gray-200" 
                      sizes="256px" 
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-600 text-xl">ditulis pada</span>
                    <span className="font-bold text-gray-900 text-2xl">{activityData.date}</span>
                    <span className="text-gray-600 text-xl">{activityData.readTime}</span>
                  </div>
                </div>
              </div>
              
              {/* Share buttons */}
              <div className="flex items-center gap-2">
                <ShareButton icon="𝕏" bg="bg-black" size="normal" />
                <ShareButton icon="f" bg="bg-[#1877F2]" size="normal" />
                <ShareButton icon="in" bg="bg-[#0077B5]" size="normal" />
                <ShareButton icon="🔗" bg="bg-gray-600" size="normal" />
              </div>
            </div>
          </div>
        </section>
        
        {/* DIV untuk Mobile - Di bawah gambar */}
        <div className="w-full bg-gradient-to-r from-blue-600 to-blue-900 py-6 md:hidden">
          <div className="container mx-auto px-4">
            <div className="d-block">
              {/* Title Panel - Background Secondary untuk Mobile */}
              <div className="bg-blue-700 d-inline-flex p-4 title-panel-scoped">
                <h1 className="text-xl font-bold text-white mb-0" style={{padding: '0px !important'}}>
                  {activityData.title}
                </h1>
              </div>
              
              {/* Subtitle Panel - Background Primary untuk Mobile - Langsung menyatu */}
              <div className="bg-blue-800 mb-0 p-4 opacity-90 d-inline-flex subtitle-panel-scoped">
                <div>
                  <p className="text-white text-sm font-semibold mb-0">
                    {activityData.subtitle}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Meta Info untuk Mobile */}
            <div className="flex flex-wrap items-center gap-3 text-white/80 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="relative w-6 h-6">
                  <Image 
                    src={activityData.authorImage}
                    alt="Author" 
                    fill 
                    className="rounded-full object-cover border border-white/30" 
                    sizes="24px" 
                  />
                </div>
                <span className="font-medium">{activityData.author}</span>
              </div>
              <span>•</span>
              <span>{activityData.date}</span>
              <span>•</span>
              <span>{activityData.readTime}</span>
            </div>
            
            {/* Share Buttons untuk Mobile */}
            <div className="flex items-center gap-3 mt-4">
              <span className="text-white/80 font-medium text-sm">Bagikan:</span>
              <div className="flex gap-2">
                <ShareButton icon="f" bg="bg-blue-600/80" size="small" />
                <ShareButton icon="𝕏" bg="bg-black/80" size="small" />
                <ShareButton icon="📱" bg="bg-green-600/80" size="small" />
                <ShareButton icon="🔗" bg="bg-gray-600/80" size="small" />
              </div>
            </div>
          </div>
        </div>

        {/* Content Section - Fixed Layout */}
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Kolom Kiri - Navigasi Kecil (Tidak ada section untuk kegiatan, jadi kosong/opsional) */}
              <aside className="lg:col-span-1">
                {/* Placeholder jika ingin menambahkan navigasi konten di masa depan */}
              </aside>

              {/* Kolom Kanan - Konten Utama */}
              <div className="lg:col-span-3">
                <article className="bg-white rounded-lg text-black shadow-sm p-6 md:p-8">
                  <div className="prose prose-lg max-w-none [&_*]:!text-black leading-relaxed">
                    <div 
                      className="text-black"
                      dangerouslySetInnerHTML={{ __html: activityData.content || '' }}
                    />
                  </div>
                </article>

                {/* TAG/INFO BAWAH */}
                {(activityData.participants.length > 0 || activityData.location) && (
                  <div className="mt-8 space-y-6 bg-white rounded-lg text-black shadow-sm p-6 md:p-8">
                    {activityData.location && (
                      <div className="text-gray-700"><span className="font-semibold">Lokasi:</span> {activityData.location}</div>
                    )}
                    {activityData.participants.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {activityData.participants.map((tag, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 