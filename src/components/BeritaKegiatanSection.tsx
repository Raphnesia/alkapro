'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ScrollReveal } from './ScrollReveal'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

interface Article {
  id: number
  title: string
  subtitle?: string
  content: string
  excerpt: string
  image: string
  category: string
  date: string
  author: string
  authorImage?: string
  tags?: string[]
  slug: string
  published_at: string
  type: 'news' | 'article'
}

interface Category {
  name: string
  count: number
}

const BeritaKegiatanSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('Semua')
  const [selectedType, setSelectedType] = useState<'all' | 'news' | 'article'>('all')
  const [articles, setArticles] = useState<Article[]>([])
  const [newsCategories, setNewsCategories] = useState<Category[]>([])
  const [articleCategories, setArticleCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(6)

  // Bagian useEffect yang diperbaiki - mengambil data dari kedua endpoint dengan semua halaman
  useEffect(() => {
  const fetchArticles = async () => {
  try {
        console.log('🔍 BeritaKegiatanSection: Fetching data...');
  
        // Fungsi untuk mengambil semua halaman dari endpoint
        const fetchAllPages = async (endpoint: string, type: 'news' | 'article') => {
          let allItems: any[] = []
          let currentPage = 1
          let hasMore = true
          
          while (hasMore) {
            try {
              const response = await fetch(`${endpoint}?page=${currentPage}`, { cache: 'no-store' })
              if (!response.ok) {
                console.error(`❌ ${type} page ${currentPage} response not ok:`, response.status)
                break
              }
              
              const data = await response.json()
              console.log(`📄 ${type} page ${currentPage} response:`, data)
              
              const items = Array.isArray(data?.data) ? data.data : (Array.isArray(data) ? data : [])
              
              if (items.length === 0) {
                hasMore = false
              } else {
                allItems = [...allItems, ...items]
                
                // Cek apakah ada halaman berikutnya - format API: current_page, last_page (bukan pagination.last_page)
                const lastPage = data?.last_page || data?.pagination?.last_page
                if (lastPage) {
                  hasMore = currentPage < lastPage
                  currentPage++
                } else {
                  // Jika tidak ada pagination info, coba halaman berikutnya
                  // Tapi batasi maksimal 10 halaman untuk menghindari infinite loop
                  if (currentPage >= 10) {
                    hasMore = false
                  } else {
                    currentPage++
                  }
                }
              }
            } catch (error) {
              console.error(`❌ Error fetching ${type} page ${currentPage}:`, error)
              hasMore = false
            }
          }
          
          console.log(`✅ ${type} total items fetched:`, allItems.length)
          return allItems
        }
  
        // Ambil semua data dari kedua endpoint - gunakan endpoint yang benar (tanpa v1 karena proxy sudah include v1)
        const [newsItems, articleItems] = await Promise.all([
          fetchAllPages('/api/proxy/news', 'news'),
          fetchAllPages('/api/proxy/articles', 'article')
        ])
  
  const stripHtmlTags = (html: string): string => {
    if (!html) return ''
    return html.replace(/<[^>]*>/g, '').trim()
  }
  
  const transformData = (items: any[], type: 'news' | 'article') => {
    return items.map((item: any) => {
      const contentText = stripHtmlTags(item.content || '')
      const excerpt = item.subtitle ? stripHtmlTags(item.subtitle) : 
                             (contentText.length > 150 ? 
                              contentText.substring(0, 150) + '...' : 
                              contentText) || 
                             'Belum ada deskripsi'
      
      return {
        id: item.id,
        title: item.title,
        subtitle: stripHtmlTags(item.subtitle || ''),
        content: item.content,
        excerpt: excerpt,
        image: item.image || '/placeholder.jpg',
        category: item.category || (type === 'news' ? 'Berita' : 'Artikel'),
        date: new Date(item.published_at).toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }),
        author: item.author || 'Admin',
        authorImage: '/pace.jpeg',
        tags: item.tags || [],
        slug: item.slug,
        published_at: item.published_at || new Date().toISOString(),
        type: type
      }
    })
  }
  
  let allData: Article[] = []
  
  // Transform news data
  if (newsItems && Array.isArray(newsItems) && newsItems.length > 0) {
    const transformedNews = transformData(newsItems, 'news')
    allData = [...allData, ...transformedNews]
    console.log('✅ News transformed:', transformedNews.length);
  }
  
  // Transform articles data
  if (articleItems && Array.isArray(articleItems) && articleItems.length > 0) {
    const transformedArticles = transformData(articleItems, 'article')
    allData = [...allData, ...transformedArticles]
    console.log('✅ Articles transformed:', transformedArticles.length);
  }
  
  // Sort by date - ambil semua data tanpa limit
  const sortedData = allData.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
  setArticles(sortedData)
  
  // Generate kategori dinamis dari data API
  const categoryMap: { [key: string]: string } = {
    'academic': 'Akademik',
    'achievement': 'Prestasi',
    'campus': 'Kampus',
    'international': 'Internasional',
    'perspective': 'Perspektif',
    'news': 'Berita',
    'announcement': 'Pengumuman',
    'other': 'Lainnya'
  }
  
  // Separate categories for news and articles - gunakan semua data
  const allNewsItems = sortedData.filter(item => item.type === 'news')
  const allArticleItems = sortedData.filter(item => item.type === 'article')
  
  const newsCategoryCounts = allNewsItems.reduce((acc: { [key: string]: number }, article: any) => {
    const category = categoryMap[article.category] || article.category
    acc[category] = (acc[category] || 0) + 1
    return acc
  }, {})
  
  const articleCategoryCounts = allArticleItems.reduce((acc: { [key: string]: number }, article: any) => {
    const category = categoryMap[article.category] || article.category
    acc[category] = (acc[category] || 0) + 1
    return acc
  }, {})
  
  const dynamicNewsCategories: Category[] = [
    { name: 'Semua', count: allNewsItems.length },
    ...Object.entries(newsCategoryCounts).map(([name, count]) => ({ name, count }))
  ]
  
  const dynamicArticleCategories: Category[] = [
    { name: 'Semua', count: allArticleItems.length },
    ...Object.entries(articleCategoryCounts).map(([name, count]) => ({ name, count }))
  ]
  
  setNewsCategories(dynamicNewsCategories)
  setArticleCategories(dynamicArticleCategories)
  
  } catch (error) {
    console.error('Error fetching articles:', error)
    // Jangan gunakan fallback data dummy, biarkan array kosong untuk menunjukkan error
    setArticles([])
    setNewsCategories([{ name: 'Semua', count: 0 }])
    setArticleCategories([{ name: 'Semua', count: 0 }])
  } finally {
    setLoading(false)
  }
}

fetchArticles()
}, [])

  const filteredArticles = () => {
    let filtered = articles
    
    // Filter by type first
    if (selectedType !== 'all') {
      filtered = filtered.filter(article => article.type === selectedType)
    }
    
    // Then filter by category
    if (selectedCategory !== 'Semua') {
      filtered = filtered.filter(article => {
        const categoryMap: { [key: string]: string } = {
          'academic': 'Akademik',
          'achievement': 'Prestasi',
          'campus': 'Kampus',
          'international': 'Internasional',
          'perspective': 'Perspektif',
          'news': 'Berita',
          'announcement': 'Pengumuman',
          'other': 'Lainnya'
        }
        const mappedCategory = categoryMap[article.category] || article.category
        return mappedCategory === selectedCategory
      })
    }
    
    return filtered
  }

  // Pagination logic
  const paginatedArticles = () => {
    const filtered = filteredArticles()
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filtered.slice(startIndex, endIndex)
  }

  const totalPages = Math.ceil(filteredArticles().length / itemsPerPage)

  const articlesListRef = React.useRef<HTMLDivElement>(null)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Scroll ke bagian artikel list, bukan ke paling atas halaman
    setTimeout(() => {
      if (articlesListRef.current) {
        articlesListRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }
  
  const currentCategories = selectedType === 'news' ? newsCategories : 
                           selectedType === 'article' ? articleCategories : 
                           [{ name: 'Semua', count: articles.length }]
  
  const handleTypeChange = (type: 'all' | 'news' | 'article') => {
    setSelectedType(type)
    setSelectedCategory('Semua') // Reset category when changing type
    setCurrentPage(1) // Reset to first page when changing type
  }

  // Reset page when category changes
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory])

  // Update routing berdasarkan jenis konten
  const getArticleUrl = (article: Article) => {
    return article.type === 'news' 
      ? `/berita/${article.slug}`
      : `/artikel/${article.slug}`
  }

  return (
    <section className="py-16 bg-gray-50 relative overflow-hidden">
      {/* Lottie Animation - Bottom Left (replacing illustration) */}
      <div className="absolute bottom-0 left-0 w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 opacity-60 pointer-events-none z-0">
        <DotLottieReact
          src="https://lottie.host/c09e2c74-8750-4482-b3fc-a29baf73fbb4/GSNo3qyFY4.lottie"
          loop
          autoplay
        />
      </div>
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Header */}
        <ScrollReveal delay={200}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Berita & Kegiatan Sekolah
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              SMP Muhammadiyah Al Kautsar PK Kartasura - Update terbaru seputar berita, kegiatan, prestasi, dan pengumuman sekolah
            </p>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
          </div>
        </ScrollReveal>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Kategori Sidebar */}
          <div className="lg:w-1/4">
            <ScrollReveal delay={300} direction="left">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 sticky top-24">
                {/* Type Selector */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">
                    Pilih Tipe
                  </h3>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleTypeChange('all')}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-300 flex justify-between items-center ${
                        selectedType === 'all'
                          ? 'bg-purple-600 text-white shadow-md'
                          : 'text-gray-600 hover:bg-purple-50 hover:text-purple-600'
                      }`}
                    >
                      <span className="font-medium">Semua</span>
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        selectedType === 'all'
                          ? 'bg-white/20 text-white'
                          : 'bg-gray-100 text-gray-500'
                      }`}>
                        {articles.length}
                      </span>
                    </button>
                    <button
                      onClick={() => handleTypeChange('news')}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-300 flex justify-between items-center ${
                        selectedType === 'news'
                          ? 'bg-red-600 text-white shadow-md'
                          : 'text-gray-600 hover:bg-red-50 hover:text-red-600'
                      }`}
                    >
                      <span className="font-medium">Berita</span>
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        selectedType === 'news'
                          ? 'bg-white/20 text-white'
                          : 'bg-gray-100 text-gray-500'
                      }`}>
                        {articles.filter(a => a.type === 'news').length}
                      </span>
                    </button>
                    <button
                      onClick={() => handleTypeChange('article')}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-300 flex justify-between items-center ${
                        selectedType === 'article'
                          ? 'bg-green-600 text-white shadow-md'
                          : 'text-gray-600 hover:bg-green-50 hover:text-green-600'
                      }`}
                    >
                      <span className="font-medium">Artikel</span>
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        selectedType === 'article'
                          ? 'bg-white/20 text-white'
                          : 'bg-gray-100 text-gray-500'
                      }`}>
                        {articles.filter(a => a.type === 'article').length}
                      </span>
                    </button>
                  </div>
                </div>
                
                {/* Category Selector */}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3">
                    {selectedType === 'news' ? 'Kategori Berita' : 
                     selectedType === 'article' ? 'Kategori Artikel' : 
                     'Kategori'}
                  </h3>
                  <div className="space-y-2">
                    {currentCategories.map((category, index) => (
                      <button
                        key={category.name}
                        onClick={() => setSelectedCategory(category.name)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex justify-between items-center group ${
                          selectedCategory === category.name
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                        }`}
                        style={{
                          animationDelay: `${400 + (index * 50)}ms`
                        }}
                      >
                        <span className="font-medium">{category.name}</span>
                        <span className={`text-sm px-2 py-1 rounded-full ${
                          selectedCategory === category.name
                            ? 'bg-white/20 text-white'
                            : 'bg-gray-100 text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-600'
                        }`}>
                          {category.count}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Artikel List */}
          <div className="lg:w-3/4" ref={articlesListRef}>
            <ScrollReveal delay={400} direction="right">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {selectedType === 'all' ? 
                    (selectedCategory === 'Semua' ? 'Semua Berita & Artikel' : selectedCategory) :
                    selectedType === 'news' ? 
                      (selectedCategory === 'Semua' ? 'Semua Berita' : `Berita ${selectedCategory}`) :
                      (selectedCategory === 'Semua' ? 'Semua Artikel' : `Artikel ${selectedCategory}`)
                  }
                </h3>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <p className="text-gray-600">
                    Menampilkan {filteredArticles().length} {selectedType === 'all' ? 'berita dan artikel' : 
                      selectedType === 'news' ? 'berita' : 'artikel'}
                    {selectedCategory !== 'Semua' ? ` dalam kategori ${selectedCategory}` : ''}
                    {totalPages > 1 && ` (Halaman ${currentPage} dari ${totalPages})`}
                  </p>
                  
                  {/* Items per page selector */}
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600">Tampilkan:</label>
                    <select
                      value={itemsPerPage}
                      onChange={(e) => {
                        setItemsPerPage(Number(e.target.value))
                        setCurrentPage(1)
                      }}
                      className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value={6}>6</option>
                      <option value={9}>9</option>
                      <option value={12}>12</option>
                      <option value={18}>18</option>
                      <option value={24}>24</option>
                    </select>
                    <span className="text-sm text-gray-600">per halaman</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {paginatedArticles().map((article, index) => (
                  <motion.article
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="border border-gray-200 rounded-lg overflow-hidden h-full bg-white hover:shadow-lg transition-all duration-300 group cursor-pointer"
                  >
                    <Link href={getArticleUrl(article)} className="block h-full">
                      {/* Image with gradient overlay */}
                      <div className="relative">
                        <div className="absolute h-[100px] bottom-[-1px] w-full z-[2]" style={{background: 'linear-gradient(rgba(255, 255, 255, 0) 50%, rgb(255, 255, 255) 100%)'}}></div>
                        <div className="h-[150px] min-h-[150px] w-full relative overflow-hidden">
                          <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            className="z-[1] object-cover h-[150px] min-h-[150px] w-full group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex flex-col gap-4 py-4 px-3 items-start">
                        {/* Category badge */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                            article.type === 'news' 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {article.type === 'news' ? 'Berita' : 'Artikel'}
                          </span>
                          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                            {article.category}
                          </span>
                        </div>
                        
                        <h3 className="font-bold text-black text-base leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {article.title}
                        </h3>
                        
                        <p className="text-sm text-black line-clamp-2 leading-relaxed">
                          {article.excerpt}
                        </p>
                        
                        <div className="flex items-center text-xs text-gray-400 mt-auto pt-2 border-t border-gray-100 w-full">
                          <div className="flex items-center gap-2">
                            <div className="relative w-6 h-6 rounded-full overflow-hidden">
                              <Image
                                src={article.authorImage || '/pace.jpeg'}
                                alt={article.author}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <span className="font-medium">{article.author}</span>
                          </div>
                          <span className="mx-2">•</span>
                          <span>{article.date}</span>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex flex-col items-center gap-4">
                <div className="flex items-center gap-2 flex-wrap justify-center">
                  {/* Previous button */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                      currentPage === 1
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Sebelumnya
                    </span>
                  </button>

                  {/* Page numbers */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    // Show first page, last page, current page, and pages around current
                    const showPage = 
                      page === 1 || 
                      page === totalPages || 
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    
                    if (!showPage) {
                      // Show ellipsis
                      if (page === currentPage - 2 || page === currentPage + 2) {
                        return (
                          <span key={page} className="px-2 text-gray-400">
                            ...
                          </span>
                        )
                      }
                      return null
                    }

                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                          currentPage === page
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-300'
                        }`}
                      >
                        {page}
                      </button>
                    )
                  })}

                  {/* Next button */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                      currentPage === totalPages
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    <span className="flex items-center gap-1">
                      Selanjutnya
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </button>
                </div>
                
                <p className="text-sm text-gray-500">
                  Menampilkan {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, filteredArticles().length)} dari {filteredArticles().length} {selectedType === 'all' ? 'berita dan artikel' : selectedType === 'news' ? 'berita' : 'artikel'}
                </p>
              </div>
            )}

            {filteredArticles().length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  {articles.length === 0 ? 'Tidak Ada Data' : 
                   selectedType === 'news' ? 'Tidak Ada Berita' : 
                   selectedType === 'article' ? 'Tidak Ada Artikel' : 
                   'Tidak Ada Konten'}
                </h3>
                <p className="text-gray-500">
                  {articles.length === 0 
                    ? 'Belum ada konten yang dipublikasikan. Silakan coba lagi nanti.' 
                    : selectedCategory !== 'Semua' 
                      ? `Tidak ada ${selectedType === 'news' ? 'berita' : selectedType === 'article' ? 'artikel' : 'konten'} dalam kategori ${selectedCategory}.`
                      : `Tidak ada ${selectedType === 'news' ? 'berita' : selectedType === 'article' ? 'artikel' : 'konten'} yang tersedia.`}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default BeritaKegiatanSection