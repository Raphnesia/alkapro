'use client'

import React, { useState, useEffect } from 'react'
import { use } from 'react'
import Image from 'next/image'
import { Header } from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { Calendar } from 'lucide-react'

const ShareButton = ({ icon, bg, size = 'normal' }: { icon: string, bg: string, size?: 'small' | 'normal' }) => {
  const sizeClasses = size === 'small' ? 'w-8 h-8 text-xs' : 'w-10 h-10 text-sm'
  return (
    <button className={`${sizeClasses} ${bg} text-white rounded-full flex items-center justify-center font-bold hover:opacity-90 transition-opacity`}>
      {icon}
    </button>
  )
}

interface ArtikelData {
  id: number
  title: string
  subtitle: string
  content: string
  image: string
  date: string
  author: string
  authorImage: string
  readTime: string
  tags: string[]
  category: string
}

interface NavigationSection {
  id: string
  title: string
  content: string
}

const stripHtmlTags = (html: string): string => {
  if (!html) return ''
  return html.replace(/<[^>]*>/g, '').trim()
}

interface ArtikelDetailProps {
  params: Promise<{ slug: string }>
}

export default function ArtikelDetailSlug({ params }: ArtikelDetailProps) {
  const [artikelData, setArtikelData] = useState<ArtikelData | null>(null)
  const [navigationSections, setNavigationSections] = useState<NavigationSection[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { slug } = use(params)
  
  useEffect(() => {
    const fetchArtikel = async () => {
      try {
        if (!slug) {
          console.error('Slug is undefined or empty')
          throw new Error('Slug parameter tidak valid')
        }
        
        console.log('🔍 Fetching artikel detail for slug:', slug);
        
        // Gunakan proxy internal untuk menghindari Mixed Content error (sama seperti berita)
        let response = await fetch(`/api/proxy/articles/${slug}`)
        
        // Jika direct endpoint gagal, coba fetch semua articles
        if (!response.ok) {
          console.log('⚠️ Direct endpoint gagal, coba fetch semua articles...');
          console.log('❌ Direct endpoint response:', response.status, response.statusText);
          const allArticlesResponse = await fetch('/api/proxy/articles')
          if (!allArticlesResponse.ok) {
            console.error('❌ Failed to fetch all articles:', allArticlesResponse.status, allArticlesResponse.statusText);
            throw new Error('Gagal mengambil data artikel')
          }
          
          const data = await allArticlesResponse.json()
          console.log('📊 Raw API response:', data);
          const articlesList = data.data || []
          console.log('📰 All articles fetched:', articlesList.length);
          
          // Find article by exact slug match
          const article = articlesList.find((item: any) => item.slug === slug)
          
          if (!article) {
            console.error('❌ Article not found for slug:', slug);
            console.log('🔍 Available slugs:', articlesList.map((item: any) => item.slug));
            throw new Error('Artikel tidak ditemukan')
          }

          console.log('✅ Article found:', article.title);
          console.log('📝 Article data:', article);

          setArtikelData({
            id: article.id,
            title: article.title,
            subtitle: stripHtmlTags(article.subtitle || ''),
            content: article.content || '<p>Konten artikel sedang dipersiapkan...</p>',
            image: article.image || '/placeholder.jpg',
            date: new Date(article.published_at || article.created_at || Date.now()).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            }),
            author: article.author || 'Admin',
            authorImage: article.author_image || '/pace.jpeg',
            readTime: `${article.read_time || 3} menit`,
            tags: Array.isArray(article.tags) ? article.tags : [],
            category: article.category || 'artikel'
          })
          
          // Use navigation_sections from API if available, otherwise extract from content
          const apiSections = article.navigation_sections || []
          if (apiSections && apiSections.length > 0) {
            setNavigationSections(apiSections.map((section: any, index: number) => ({
              id: section.id || `section-${index}`,
              title: section.title || `Bagian ${index + 1}`,
              content: section.content || ''
            })))
          } else {
            // Generate navigation sections from content
            const sections = extractSections(article.content || '')
            setNavigationSections(sections)
          }
        } else {
          // Direct endpoint worked
          const data = await response.json()
          const article = data.data || data
          console.log('✅ Direct endpoint worked:', article.title);
          
          setArtikelData({
            id: article.id,
            title: article.title,
            subtitle: stripHtmlTags(article.subtitle || ''),
            content: article.content || '<p>Konten artikel sedang dipersiapkan...</p>',
            image: article.image || '/placeholder.jpg',
            date: new Date(article.published_at || article.created_at || Date.now()).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            }),
            author: article.author || 'Admin',
            authorImage: article.author_image || '/pace.jpeg',
            readTime: `${article.read_time || 3} menit`,
            tags: Array.isArray(article.tags) ? article.tags : [],
            category: article.category || 'artikel'
          })
          
          // Use navigation_sections from API if available, otherwise extract from content
          const apiSections = article.navigation_sections || []
          if (apiSections && apiSections.length > 0) {
            setNavigationSections(apiSections.map((section: any, index: number) => ({
              id: section.id || `section-${index}`,
              title: section.title || `Bagian ${index + 1}`,
              content: section.content || ''
            })))
          } else {
            const sections = extractSections(article.content || '')
            setNavigationSections(sections)
          }
        }
        

        
      } catch (error) {
        console.error('Error fetching artikel:', error)
        setError(error instanceof Error ? error.message : 'Terjadi kesalahan saat memuat artikel')
        setArtikelData(null)
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchArtikel()
    }
  }, [slug])

  const extractSections = (content: string): NavigationSection[] => {
    if (!content) return []
    
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = content
    const headings = tempDiv.querySelectorAll('h2, h3, h4')
    
    const sections: NavigationSection[] = []
    
    headings.forEach((heading, index) => {
      const sectionId = `section-${index}`
      const title = heading.textContent?.trim() || `Bagian ${index + 1}`
      
      // Find content between this heading and the next heading
      let content = ''
      let nextElement = heading.nextElementSibling
      const contentElements = []
      
      while (nextElement && !nextElement.matches('h2, h3, h4')) {
        contentElements.push(nextElement.outerHTML || nextElement.textContent || '')
        nextElement = nextElement.nextElementSibling
      }
      
      content = contentElements.join('')
      
      if (title && content.trim()) {
        sections.push({
          id: sectionId,
          title: title,
          content: content
        })
      }
    })
    
    return sections
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error || !artikelData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Calendar size={64} className="mx-auto" />
            </div>
            
            {/* Meta Info untuk Mobile */}
            <div className="flex flex-wrap items-center gap-3 text-white/80 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="relative w-6 h-6">
                  <Image 
                    src={artikelData?.authorImage || '/pace.jpeg'} 
                    alt="Author" 
                    fill 
                    className="rounded-full object-cover border border-white/30" 
                    sizes="24px" 
                  />
                </div>
                <span className="font-medium">{artikelData?.author}</span>
              </div>
              <span>•</span>
              <span>{artikelData?.date}</span>
              <span>•</span>
              <span>{artikelData?.readTime}</span>
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
            <h1 className="text-2xl font-bold text-gray-600 mb-2">Artikel Tidak Ditemukan</h1>
            <p className="text-gray-500 mb-4">{error || 'Artikel yang Anda cari tidak tersedia'}</p>
            <Link href="/artikel-sekolah" className="text-blue-600 hover:text-blue-800 underline">
              Kembali ke daftar artikel
            </Link>
          </div>
        </main>
        <Footer />
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
        <div className="relative w-full md:h-screen h-64 md:h-screen">
          {/* Desktop Image */}
          <Image 
            src={artikelData?.image || '/placeholder.jpg'}
            alt={artikelData?.title || 'Artikel'}
            fill
            className="object-cover hidden md:block"
            priority
            sizes="100vw"
            quality={75}
          />
          
          {/* Mobile Image */}
          <Image 
            src={artikelData?.image || '/placeholder.jpg'}
            alt={artikelData?.title || 'Artikel'}
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
                    <div className="bg-yellow-500 d-inline-flex p-5 title-panel-scoped" style={{boxSizing: 'border-box'}}>
                      <h1 className="text-2xl md:text-3xl lg:text-2xl font-bold text-white mb-0 line-clamp-2" style={{padding: '0px !important'}}>
                        {artikelData?.title}
                      </h1>
                    </div>
                  </div>
                  
                  {/* Subtitle Panel - Background Primary */}
                  <div className="bg-blue-600 p-4 opacity-90 d-inline-flex rounded-b-lg" style={{boxSizing: 'border-box'}}>
                    <p className="text-white text-sm md:text-lg font-semibold mb-0">
                      {artikelData?.subtitle}
                    </p>
                  </div>
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
                      src={artikelData?.authorImage || '/pace.jpeg'} 
                      alt="Author" 
                      fill 
                      className="rounded-full object-cover border-3 border-gray-200" 
                      sizes="256px" 
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-600 text-xl">ditulis pada</span>
                    <span className="font-bold text-gray-900 text-2xl">{artikelData?.date}</span>
                    <span className="text-gray-600 text-xl">{artikelData?.readTime}</span>
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
        
        {/* Mobile Overlay - Di bawah gambar dengan struktur yang sama seperti berita */}
        <div className="fe-wrapper-scoped position-relative position-md-absolute fe-section-banner-scoped row mx-0 w-100 no-gutters md:hidden">
          <div className="col col-12 col-lg-6">
            <div>
              <div className="d-block">
                  <div className="bg-blue-700 d-inline-flex p-4 title-panel-scoped">
                    <h1 className="fs-title-2 fw-700 font-title mb-0" style={{padding: '0px !important'}}>
                      {artikelData?.title}
                    </h1>
                  </div>
                </div>
                <div className="bg-blue-800 mb-0 p-4 opacity-9 d-inline-flex subtitle-panel-scoped">
                  <div>
                    <p className="text-white fs-subtitle-2 fw-600 mb-3">
                      {artikelData?.subtitle}
                    </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Meta Info dan Share Buttons untuk Mobile */}
        <div className="w-full bg-gradient-to-r from-blue-600 to-blue-900 py-6 md:hidden">
          <div className="container mx-auto px-4">
            {/* Meta Info untuk Mobile */}
            <div className="flex flex-wrap items-center gap-3 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <div className="relative w-6 h-6">
                  <Image 
                    src={artikelData?.authorImage || '/pace.jpeg'} 
                    alt="Author" 
                    fill 
                    className="rounded-full object-cover border border-white/30" 
                    sizes="24px" 
                  />
                </div>
                <span className="font-medium">{artikelData?.author}</span>
              </div>
              <span>•</span>
              <span>{artikelData?.date}</span>
              <span>•</span>
              <span>{artikelData?.readTime}</span>
            </div>
            
            {/* Share Buttons untuk Mobile */}
            <div className="flex items-center gap-3 mt-4">
              <span className="text-white/80 font-medium text-sm">Bagikan:</span>
              <div className="flex gap-2">
                <button className="bg-blue-600/80 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors">f</button>
                <button className="bg-black/80 hover:bg-black text-white px-3 py-1 rounded text-sm transition-colors">𝕏</button>
                <button className="bg-green-600/80 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors">📱</button>
                <button className="bg-gray-600/80 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm transition-colors">🔗</button>
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
                {navigationSections && navigationSections.length > 0 && (
                  <div className="bg-white rounded-lg sticky top-24 shadow-lg p-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-3">Navigasi Konten</h3>
                    <nav className="space-y-1">
                      {navigationSections.map((section) => (
                        <a
                          key={section.id}
                          href={`#${section.id}`}
                          className="block px-2 py-1 text-base text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        >
                          {section.title}
                        </a>
                      ))}
                    </nav>
                  </div>
                )}
              </aside>

              {/* Kolom Kanan - Konten Utama */}
              <div className="lg:col-span-3">
                <article className="bg-white rounded-lg shadow-lg p-6 md:p-8">
                  {/* Konten Artikel - Display sections if available, otherwise full content */}
                  {navigationSections.length > 0 ? (
                    <div className="space-y-8">
                      {navigationSections.map((section) => (
                        <section key={section.id} id={section.id} className="bg-white rounded-lg p-6 md:p-8">
                          <h2 className="text-2xl font-bold text-black mb-4 relative pb-2">
                            {section.title} 
                            <span className="absolute bottom-0 left-0 w-16 h-1 bg-yellow-400"></span>
                          </h2>
                          <div 
                            className="prose prose-lg max-w-none [&_*]:!text-black leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: section.content }}
                          />
                        </section>
                      ))}
                    </div>
                  ) : (
                    <div className="prose prose-lg max-w-none">
                      <div className="text-black leading-relaxed" dangerouslySetInnerHTML={{ __html: artikelData?.content || '' }}></div>
                    </div>
                  )}
                </article>

                {/* TAG BAWAH */}
                {artikelData?.tags && Array.isArray(artikelData.tags) && artikelData.tags.length > 0 && (
                    <div className="mt-8 space-y-6 bg-white rounded-lg text-black shadow-sm p-6 md:p-8">
                      <h3 className="text-lg font-bold text-gray-800 mb-3">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {artikelData.tags.map((tag, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}