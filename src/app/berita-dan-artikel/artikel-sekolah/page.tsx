'use client'

import React, { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { postApi, Post } from '@/lib/api'

function stripHtmlTags(html: string): string {
  if (!html) return ''
  return html.replace(/<[^>]*>/g, '').substring(0, 150) + '...'
}

export default function ArtikelSekolahPage() {
  const [articles, setArticles] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  useEffect(() => {
    fetchArticles()
  }, [currentPage, selectedCategory])

  const fetchArticles = async () => {
    try {
      setLoading(true)
      console.log('Fetching articles from API...')
      
      // Gunakan postApi.getArticles() yang khusus untuk artikel
      const response = await postApi.getArticles(currentPage)
      console.log('API Response:', response)
      
      // Handle both direct array and paginated response formats
      let articlesData: Post[] = []
      let totalPagesCount = 1
      
      if (Array.isArray(response)) {
        articlesData = response
        totalPagesCount = 1
      } else if (response && response.data) {
        articlesData = response.data
        totalPagesCount = response.last_page || 1
      } else {
        console.error('Invalid response structure:', response)
        articlesData = []
        totalPagesCount = 1
      }
      
      console.log('Raw articles data:', articlesData)
      
      // Filter berdasarkan kategori jika dipilih (tidak perlu filter type karena sudah dari articles endpoint)
      if (selectedCategory !== 'all') {
        articlesData = articlesData.filter(article => 
          article.category === selectedCategory
        )
      }
      
      console.log('Filtered articles:', articlesData)
      
      setArticles(articlesData)
      setTotalPages(totalPagesCount)
    } catch (error) {
      console.error('Error fetching articles:', error)
      setArticles([])
      setTotalPages(1)
    } finally {
      setLoading(false)
    }
  }

  const categories = ['all', 'other']

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-4">
                  <div className="h-48 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col berita-page">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Link href="/berita-dan-artikel" className="text-blue-600 hover:text-blue-800 mr-2">
            <span>Berita dan Artikel</span>
          </Link>
          <span className="text-gray-500 mx-2">/</span>
          <span className="text-gray-700">Artikel Sekolah</span>
        </div>
        
        <h1 className="text-3xl font-bold text-primary mb-6">Artikel Sekolah</h1>
        
        <div className="prose max-w-none">
          <p className="text-lg mb-8">
            Artikel edukatif dan informatif seputar pendidikan, parenting, dan pengembangan karakter yang ditulis oleh guru dan staf sekolah.
          </p>
          
          {/* Filter Categories */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category === 'all' ? 'Semua' : category === 'other' ? 'Lainnya' : category}
              </button>
            ))}
          </div>
          
          {/* Artikel List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {articles && articles.length > 0 ? (
              articles.map((article) => (
                <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48 overflow-hidden">
                    <Image 
                      src={article.image || '/guru/default-teacher.jpg'} 
                      alt={article.title}
                      fill
                      className="object-cover object-center"
                    />
                    <div className="absolute top-0 right-0 bg-green-600 text-white text-xs font-bold px-3 py-1 m-2 rounded">
                      {article.category || 'Artikel'}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-primary mb-2 line-clamp-2">{article.title}</h3>
                    <p className="text-black text-sm mb-3 line-clamp-3">
                      {article.subtitle || stripHtmlTags(article.content || '')}
                    </p>
                    
                    <div className="flex items-center mb-3">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden mr-2">
                        <Image 
                          src={article.image || '/guru/default-teacher.jpg'} 
                          alt={article.author || 'Author'}
                          fill
                          className="object-cover object-center"
                        />
                      </div>
                      <div>
                        <p className="text-black text-sm font-medium">{article.author || 'Admin'}</p>
                        <p className="text-gray-500 text-xs">
                          {article.published_at 
                            ? new Date(article.published_at).toLocaleDateString('id-ID')
                            : 'Tanggal tidak tersedia'
                          }
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 text-xs">
                        {article.read_time ? `${article.read_time} menit baca` : 'Waktu baca tidak tersedia'}
                      </span>
                      <Link href={`/artikel/${article.slug}`} className="text-green-600 hover:text-green-800 font-medium text-sm inline-flex items-center">
                        Baca Selengkapnya
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-gray-500">
                  <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="text-lg font-medium mb-2">Tidak ada artikel</h3>
                  <p className="text-sm">Belum ada artikel yang dipublikasikan saat ini.</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Pagination */}
          {totalPages && totalPages > 1 && (
            <div className="flex justify-center">
              <nav className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  &laquo; Prev
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 rounded ${
                      currentPage === i + 1
                        ? 'bg-primary text-white font-medium'
                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  Next &raquo;
                </button>
              </nav>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}