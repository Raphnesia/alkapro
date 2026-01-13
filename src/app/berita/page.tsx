'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User, Clock, Search, Filter, ChevronRight, ChevronDown, ArrowUpRight } from 'lucide-react'
import { Header } from '@/components/Header'

interface BeritaItem {
  id: number
  title: string
  excerpt: string
  image: string
  category: string
  date: string
  author: string
  readTime: string
  slug: string
}

const BeritaList = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Semua')
  const [currentPage, setCurrentPage] = useState(1)
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null)
  const [beritaData, setBeritaData] = useState<BeritaItem[]>([])
  const [loading, setLoading] = useState(true)
  const itemsPerPage = 6

  // Helper: bangun URL gambar backend
  const buildImageUrl = (path: string): string => {
    if (!path) return '/image112.png'
    if (/^https?:\/\//i.test(path)) return path
    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://api.alkapro.id/api'
    const backendOrigin = apiBase.replace(/\/?api(?:\/v\d+)?$/i, '')
    const normalized = path.startsWith('/storage') ? path : `/storage/${path.replace(/^\/+/, '')}`
    return `${backendOrigin}${normalized}`
  }

  // Fetch data dari API
  // Tambahkan fungsi stripHtmlTags sebelum komponen BeritaList
  const stripHtmlTags = (html: string): string => { 
    if (!html) return ''; 
    return html.replace(/<[^>]*>/g, '').trim();
  };

  // Fetch semua halaman dari API
  useEffect(() => {
    const fetchBerita = async () => {
      try {
        console.log('🚀 useEffect berita berjalan!');
        
        // Fungsi untuk mengambil semua halaman dari endpoint
        const fetchAllPages = async (endpoint: string) => {
          let allItems: any[] = []
          let currentPage = 1
          let hasMore = true
          
          while (hasMore) {
            try {
              const response = await fetch(`${endpoint}?page=${currentPage}`, { cache: 'no-store' })
              if (!response.ok) {
                console.error(`❌ News page ${currentPage} response not ok:`, response.status)
                break
              }
              
              const data = await response.json()
              console.log(`📄 News page ${currentPage} response:`, data)
              
              const items = Array.isArray(data?.data) ? data.data : (Array.isArray(data) ? data : [])
              
              if (items.length === 0) {
                hasMore = false
              } else {
                allItems = [...allItems, ...items]
                
                // Cek apakah ada halaman berikutnya - format API: current_page, last_page
                const lastPage = data?.last_page
                console.log(`📊 News page ${currentPage}: last_page=${lastPage}, items=${items.length}`)
                if (lastPage) {
                  hasMore = currentPage < lastPage
                  currentPage++
                } else {
                  // Jika tidak ada pagination info, batasi maksimal 10 halaman
                  if (currentPage >= 10) {
                    hasMore = false
                  } else {
                    currentPage++
                  }
                }
              }
            } catch (error) {
              console.error(`❌ Error fetching news page ${currentPage}:`, error)
              hasMore = false
            }
          }
          
          console.log(`✅ News total items fetched:`, allItems.length)
          return allItems
        }
        
        // Ambil semua data dari endpoint news
        const list = await fetchAllPages('/api/proxy/news')
        
        if (Array.isArray(list) && list.length > 0) {
          console.log('🔄 Transforming data...');
          // Sort by date (terbaru dulu)
          const sortedList = list.sort((a: any, b: any) => {
            const dateA = new Date(a.published_at || a.created_at || 0).getTime()
            const dateB = new Date(b.published_at || b.created_at || 0).getTime()
            return dateB - dateA
          })
          
          const transformedData = sortedList.map((item: any) => {
            const contentText = stripHtmlTags(item.content || '');
            const excerpt = item.subtitle ? stripHtmlTags(item.subtitle) : 
                           (contentText.length > 150 ? 
                            contentText.substring(0, 150) + '...' : 
                            contentText) || 
                           'Belum ada deskripsi';
            
            return {
              id: item.id,
              title: item.title,
              excerpt: excerpt,
              image: buildImageUrl(item.image),
              category: item.category || 'general',
              date: new Date(item.published_at || item.created_at).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              }),
              author: item.author || 'Admin',
              readTime: '3 menit',
              slug: item.slug
            };
          });
          
          console.log('✅ Transformed data:', transformedData);
          setBeritaData(transformedData);
        } else {
          console.error('❌ Invalid API response structure or empty list');
          setBeritaData([]);
        }
      } catch (error) {
        console.error('❌ Error fetching berita:', error);
        setBeritaData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBerita();
  }, []);
  const navigationItems = [
    {
      name: 'Semua',
      hasSubmenu: false
    }
  ]

  // Filter berita berdasarkan pencarian dan kategori
  const filteredBerita = beritaData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    
    // Karena hanya ada "Semua", tidak perlu filter kategori
    const matchesCategory = selectedCategory === 'Semua'
    return matchesSearch && matchesCategory
  })

  // Pagination
  const totalPages = Math.ceil(filteredBerita.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentItems = filteredBerita.slice(startIndex, startIndex + itemsPerPage)

  const handleMenuClick = (itemName: string, hasSubmenu: boolean) => {
    if (hasSubmenu) {
      setExpandedMenu(expandedMenu === itemName ? null : itemName)
    } else {
      setSelectedCategory(itemName)
      setCurrentPage(1)
    }
  }

  const handleSubmenuClick = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Mobile Navigation Header */}
        <div className="block md:hidden sticky top-0 bg-gray-100 shadow-sm z-10">
          <div className="flex items-center p-4">
            <div className="text-lg font-semibold text-gray-800">
              Pusat Berita
            </div>
          </div>
        </div>

        {/* Main Content Section */}
        <section className="relative py-8 md:py-12 flex-1">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left Column - Navigation */}
              <div className="w-full md:w-1/4">
                <div className="hidden md:block pr-4">
                  <div className="text-right">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      Pusat Berita
                    </h2>
                    <div className="flex justify-end mb-6">
                      <div className="w-16 h-1 bg-yellow-400"></div>
                    </div>
                  </div>
                  
                  {/* Navigation Menu */}
                  <div className="space-y-3">
                    {navigationItems.map((item) => (
                      <div key={item.name} className="text-right">
                        <div 
                          className={`cursor-pointer text-lg font-medium transition-colors duration-200 ${
                            selectedCategory === item.name 
                              ? 'text-blue-600 relative' 
                              : 'text-gray-700 hover:text-blue-600'
                          }`}
                          onClick={() => handleMenuClick(item.name, item.hasSubmenu)}
                        >
                          <span className="inline-flex items-center gap-2">
                            {item.name}
                            {item.hasSubmenu && (
                              expandedMenu === item.name ? 
                                <ChevronDown size={16} /> : 
                                <ChevronRight size={16} />
                            )}
                          </span>
                          {/* Garis biru yang diperpendek */}
                          {selectedCategory === item.name && (
                            <div className="absolute bottom-0 right-0 w-8 h-0.5 bg-blue-600"></div>
                          )}
                        </div>
                        
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Content */}
              <div className="w-full md:w-3/4">
                {/* Search Bar */}
                <div className="mb-8">
                  <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Cari berita..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Category Title */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {selectedCategory}
                  </h3>
                  <div className="w-12 h-1 bg-yellow-400"></div>
                </div>

                {/* Loading State */}
                {loading ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                      <p className="text-gray-600">Memuat berita...</p>
                    </div>
                  </div>
                ) : currentItems.length > 0 ? (
                  <>
                    <div className="space-y-6">
                      {currentItems.map((item, index) => (
                        <Link key={item.id} href={`/berita/${item.slug}`} className="block">
                          {index === 0 ? (
                            // Card berita terbaru dengan layout overlay
                            <div className="w-full mb-4 relative group cursor-pointer">
                              {/* Main Image Container */}
                              <div className="relative overflow-hidden rounded-lg">
                                <Image
                                  src={item.image}
                                  alt={item.title}
                                  width={800}
                                  height={400}
                                  className="w-full h-64 md:h-80 object-cover object-center transition-transform duration-300 group-hover:scale-105"
                                  sizes="(max-width: 768px) 100vw, 75vw"
                                />
                                
                                {/* Arrow Link Button */}
                                <div className="absolute top-4 right-4 bg-yellow-400 text-blue-900 p-3 rounded-lg cursor-pointer z-10 transition-transform duration-300 group-hover:scale-110">
                                  <ArrowUpRight size={24} className="font-bold" />
                                </div>
                                
                                {/* Content Overlay */}
                                <div className="absolute bottom-0 left-0 right-0">
                                  {/* Title and Date Section */}
                                  <div className="bg-yellow-400 text-black mx-4 mb-4 p-4 rounded-lg">
                                    <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-4 leading-tight">
                                      {item.title}
                                    </h3>
                                    <div className="flex items-center text-sm font-bold">
                                      <Calendar size={16} className="mr-2" />
                                      <span>{item.date}</span>
                                    </div>
                                  </div>
                                  
                                  {/* Description Footer */}
                                  <div className="bg-blue-900 text-white px-4 py-4 text-sm md:text-base font-medium">
                                    <p className="leading-relaxed">
                                      {item.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between mt-3">
                                      <div className="flex items-center gap-4 text-xs">
                                        <div className="flex items-center gap-1">
                                          <User size={14} />
                                          <span>{item.author}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                          <Clock size={14} />
                                          <span>{item.readTime}</span>
                                        </div>
                                      </div>
                                      <div className="bg-yellow-400 text-blue-900 px-2 py-1 rounded text-xs font-bold">
                                        {item.category}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            // Card berita lainnya dengan layout horizontal sesuai referensi
                            <div className="bg-gray-100 rounded-lg w-full mb-3 relative group hover:shadow-md transition-all duration-300">
                              {/* Arrow Button */}
                              <div className="bg-yellow-400 text-blue-900 p-2 md:p-3 absolute top-0 right-0 z-10 cursor-pointer rounded-bl-lg rounded-tr-lg transition-transform duration-300 group-hover:scale-110">
                                <ArrowUpRight size={20} className="font-bold" />
                              </div>
                              
                              {/* Content Container */}
                              <div className="flex p-3">
                                {/* Image */}
                                <Image
                                  src={item.image}
                                  alt={item.title}
                                  width={120}
                                  height={120}
                                  className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-cover rounded-lg flex-shrink-0"
                                />
                                
                                {/* Content */}
                                <div className="pl-3 flex-1">
                                  {/* Title */}
                                  <div className="text-lg font-bold text-gray-800 mb-1 md:mb-2 leading-tight group-hover:text-blue-600 transition-colors duration-300">
                                    {item.title}
                                  </div>
                                  
                                  {/* Date */}
                                  <div className="flex flex-wrap mb-2 md:mb-3">
                                    <span className="mr-3 text-sm font-bold flex items-center text-gray-600">
                                      <Calendar size={14} className="mr-1" />
                                      {item.date}
                                    </span>
                                  </div>
                                  
                                  {/* Description */}
                                  <p className="text-sm text-gray-700 leading-relaxed mb-3 font-medium">
                                    {item.excerpt}
                                  </p>
                                  
                                  {/* SDGs Container */}
                                  <div className="flex items-center gap-2 flex-wrap">
                                    {/* Category Badge */}
                                    <div className="bg-yellow-400 text-blue-900 px-2 py-1 rounded text-xs font-bold">
                                      {item.category}
                                    </div>
                                    
                                    {/* Meta Info */}
                                    <div className="flex items-center gap-3 text-xs text-gray-500">
                                      <div className="flex items-center gap-1">
                                        <User size={12} />
                                        <span>{item.author}</span>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <Clock size={12} />
                                        <span>{item.readTime}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </Link>
                      ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="flex justify-center mt-12">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Sebelumnya
                          </button>
                          
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                              key={page}
                              onClick={() => setCurrentPage(page)}
                              className={`px-4 py-2 rounded-lg ${
                                currentPage === page
                                  ? 'bg-blue-600 text-white'
                                  : 'border border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              {page}
                            </button>
                          ))}
                          
                          <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Selanjutnya
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <Search size={64} className="mx-auto" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">Tidak ada berita tersedia</h3>
                    <p className="text-gray-500">Silakan cek kembali nanti atau hubungi admin</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        
        {/* Spacer untuk footer */}
        <div className="h-16 md:h-20"></div>
      </div>
    </>
  )
}

export default BeritaList