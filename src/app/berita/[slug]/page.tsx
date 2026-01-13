"use client"

import React, { useEffect, useState } from 'react'
import { Header } from '@/components/Header'
import Image from 'next/image'
import DisqusComments from '@/components/DisqusComments'
import { Calendar } from 'lucide-react'

interface BeritaDetailProps {
  params: Promise<{ slug: string }>
}

interface NewsArticle {
  id: number
  title: string
  subtitle?: string
  content: string
  image: string
  category: string
  published_at: string
  author: string
  authorImage: string // Ditambahkan
  tags: string[]
  slug: string
  navigation_sections?: { 
    id: string
    title: string
    content: string
  }[]
}

const BeritaDetailSlug = ({ params }: BeritaDetailProps) => {
  const [article, setArticle] = useState<NewsArticle | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const resolvedParams = React.use(params)
  const slug = resolvedParams.slug

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        console.log('🔍 Fetching article detail for slug:', slug);
        
        // Gunakan proxy internal untuk menghindari Mixed Content error
        let response = await fetch(`/api/proxy/posts/${slug}`)
        
        // Jika direct endpoint gagal, coba fetch semua posts
        if (!response.ok) {
          console.log('⚠️ Direct endpoint gagal, coba fetch semua posts...');
          const allNewsResponse = await fetch('/api/proxy/posts')
          if (!allNewsResponse.ok) {
            throw new Error('Gagal mengambil data berita')
          }
          
          const data = await allNewsResponse.json()
          const newsList = data.data || []
          console.log('📰 All posts fetched:', newsList.length);
          
          // Find article by exact slug match
          const newsData = newsList.find((item: any) => item.slug === slug)
          
          if (!newsData) {
            console.error('❌ Article not found for slug:', slug);
            throw new Error('Artikel tidak ditemukan')
          }

          console.log('✅ Article found:', newsData.title);

                  // Tambahkan fungsi helper untuk strip HTML tags
        const stripHtmlTags = (html: string): string => {
          if (!html) return '';
          return html.replace(/<[^>]*>/g, '').trim();
        };
          
          // Update kedua setArticle call untuk menggunakan author_image
          setArticle({
            id: newsData.id,
            title: newsData.title,
            subtitle: stripHtmlTags(newsData.subtitle || ''),
            content: newsData.content,
            image: newsData.image || '/placeholder.jpg',
            category: newsData.category || 'Berita',
            published_at: newsData.published_at || new Date().toISOString(),
            author: newsData.author || 'Admin',
            authorImage: newsData.author_image || '/pace.jpeg',
            tags: Array.isArray(newsData.tags) ? newsData.tags : [],
            slug: newsData.slug,
            navigation_sections: newsData.navigation_sections || []
          })
        } else {
          // Direct endpoint worked
          const data = await response.json()
          const newsData = data.data || data
          console.log('✅ Direct endpoint worked:', newsData.title);
          
          const stripHtmlTags = (html: string): string => {
          if (!html) return '';
          return html.replace(/<[^>]*>/g, '').trim();
        };
          
          setArticle({
            id: newsData.id,
            title: newsData.title,
            subtitle: stripHtmlTags(newsData.subtitle || ''),
            content: newsData.content,
            image: newsData.image || '/placeholder.jpg',
            category: newsData.category || 'Berita',
            published_at: newsData.published_at || new Date().toISOString(),
            author: newsData.author || 'Admin',
            authorImage: newsData.author_image || '/pace.jpeg', // Added missing required authorImage property
            tags: Array.isArray(newsData.tags) ? newsData.tags : [],
            slug: newsData.slug,
            navigation_sections: newsData.navigation_sections || []
          })
        }
      } catch (err) {
        console.error('Error fetching article:', err)
        setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat memuat artikel')
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchArticle()
    }
  }, [slug])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  // Tambahkan optional chaining dan null checks
  const beritaData = article ? {
    id: article.id.toString(),
    title: article.title,
    subtitle: article.subtitle,
    content: article.content,
    bannerDesktop: article.image,
    bannerMobile: article.image,
    date: formatDate(article.published_at),
    readTime: '5 Menit untuk membaca',
    author: article.author
  } : null

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Memuat artikel...</p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (error || !beritaData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Calendar size={64} className="mx-auto" />
            </div>
            <h1 className="text-2xl font-bold text-gray-600 mb-2">Artikel Tidak Ditemukan</h1>
            <p className="text-gray-500 mb-4">{error || 'Artikel yang Anda cari tidak tersedia'}</p>
            <a href="/berita" className="text-blue-600 hover:text-blue-800 underline">
              Kembali ke Daftar Berita
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
            src={beritaData.bannerDesktop}
            alt="banner"
            fill
            className="object-cover hidden md:block"
            priority
            sizes="100vw"
            quality={75}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAGAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/AB8A"
          />
          
          {/* Mobile Image */}
          <Image 
            src={beritaData.bannerMobile}
            alt="banner"
            fill
            className="object-cover md:hidden"
            priority
            sizes="100vw"
            quality={75}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAGAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/AB8A"
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
                        {beritaData.title}
                      </h1>
                    </div>
                  </div>
                  
                  {/* Subtitle Panel - Background Primary */}
                  <div className="bg-blue-600 p-4 opacity-90 d-inline-flex rounded-b-lg" style={{boxSizing: 'border-box'}}>
                    <p className="text-white text-sm md:text-lg font-semibold mb-0">
                      {beritaData.subtitle}
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
                    {beritaData.title}
                  </h1>
                  <p className="text-white text-sm opacity-90">
                    {beritaData.subtitle}
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
                      src={article?.authorImage || '/pace.jpeg'} 
                      alt="Author" 
                      fill 
                      className="rounded-full object-cover border-3 border-gray-200" 
                      sizes="256px" 
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-600 text-xl">ditulis pada</span>
                    <span className="font-bold text-gray-900 text-2xl">{beritaData.date}</span>
                    <span className="text-gray-600 text-xl">{beritaData.readTime}</span>
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
                  {beritaData.title}
                </h1>
              </div>
              
              {/* Subtitle Panel - Background Primary untuk Mobile - Langsung menyatu */}
              <div className="bg-blue-800 mb-0 p-4 opacity-90 d-inline-flex subtitle-panel-scoped">
                <div>
                  <p className="text-white text-sm font-semibold mb-0">
                    {beritaData.subtitle}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Meta Info untuk Mobile */}
            <div className="flex flex-wrap items-center gap-3 text-white/80 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="relative w-6 h-6">
                  <Image 
                    src="/pace.jpeg" 
                    alt="Author" 
                    fill 
                    className="rounded-full object-cover border border-white/30" 
                    sizes="24px" 
                  />
                </div>
                <span className="font-medium">{beritaData.author}</span>
              </div>
              <span>•</span>
              <span>{beritaData.date}</span>
              <span>•</span>
              <span>{beritaData.readTime}</span>
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
              {/* Kolom Kiri - Navigasi Kecil */}
              <aside className="lg:col-span-1">
                {article?.navigation_sections && article.navigation_sections.length > 0 && (
                  <div className="bg-white rounded-lg sticky top-24 shadow-lg p-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-3">Navigasi Konten</h3>
                    <nav className="space-y-1">
                      {article.navigation_sections.map((section) => (
                        <a
                          key={section.id}
                          href={`#${section.id}`}
                          className="block px-2 py-1 text-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        >
                          {section.title}
                        </a>
                      ))}
                    </nav>
                  </div>
                )}
              </aside>

              {/* Kolom Kanan - Konten Berita Besar */}
              <div className="lg:col-span-3">
                <article className="bg-white rounded-lg text-black shadow-sm p-6 md:p-8">
                  <div className="max-w-none">
                    <div 
                      className="prose prose-lg [&_*]:!text-black"
                      dangerouslySetInnerHTML={{ __html: beritaData?.content || '' }}
                    />
                  </div>
                  {/* Content Berita */}
                  {article?.navigation_sections && article.navigation_sections.length > 0 && (
                  <div className="flex flex-wrap gap-2 text-black mb-6">
                    {article.navigation_sections.map((section) => (
                      <section key={section.id} id={section.id} className="bg-white rounded-lg p-6 md:p-8">
                        <h2 className="text-2xl font-bold text-black mb-4 relative pb-2">
                          {section.title} 
                          <span className="absolute bottom-0 left-0 w-16 h-1 bg-yellow-400"></span>
                        </h2>
                        <div 
                          className="prose max-w-none [&_*]:!text-black"
                          dangerouslySetInnerHTML={{ __html: section.content }}
                        />
                      </section>
                    ))}
                  </div>
                )}
                </article>

                {/* TAG BAWAH */}
                {article?.tags && Array.isArray(article.tags) && article.tags.length > 0 && (
                    <div className="mt-8 space-y-6 bg-white rounded-lg text-black shadow-sm p-6 md:p-8">
                      {article.tags.map((tag, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                          {tag}
                        </span>
                      ))}
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

export default BeritaDetailSlug

// Tambahkan di bagian atas file sebelum komponen utama
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