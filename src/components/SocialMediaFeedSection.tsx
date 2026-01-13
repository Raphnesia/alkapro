'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Instagram, Play, Heart, MessageCircle, Share, Eye, RefreshCw } from 'lucide-react'
import { homeApi, InstagramApiPost, SocialSettings } from '@/lib/api'

interface TikTokPost {
  id: string
  video_description: string
  cover_image_url: string
  share_url: string
  view_count: number
  like_count: number
  comment_count: number
  share_count: number
  create_time: number
}

function SocialMediaFeedSection() {
  const [activeTab, setActiveTab] = useState<'instagram' | 'tiktok'>('instagram')
  const [instagramPosts, setInstagramPosts] = useState<InstagramApiPost[]>([])
  const [tiktokPosts, setTiktokPosts] = useState<TikTokPost[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [settings, setSettings] = useState<SocialSettings | null>(null)
  const [sectionTitle, setSectionTitle] = useState<string>('')
  const [sectionContent, setSectionContent] = useState<string>('')

  // TikTok API Configuration  (belum via backend)
  const TIKTOK_ACCESS_TOKEN = process.env.NEXT_PUBLIC_TIKTOK_ACCESS_TOKEN
  const TIKTOK_USER_ID = process.env.NEXT_PUBLIC_TIKTOK_USER_ID

  // Fetch Instagram Posts
  const fetchInstagramPosts = async () => {
    setLoading(true)
    setError(null)
    try {
      console.log('🔍 Fetching Instagram posts from backend...')
      
      // 1) Coba via backend
      const data = await homeApi.social.instagram()
      console.log('📱 Backend Instagram response:', data)
      
      // Check if backend has Instagram configured
      if (data && typeof data === 'object' && 'success' in data && !data.success) {
        const responseData = data as { success: boolean; message?: string }
        if (responseData.message === 'Instagram credentials not configured') {
          console.log('⚠️ Backend Instagram not configured, using local fallback...')
          throw new Error('Backend Instagram not configured')
        }
      }
      
      const list = Array.isArray(data) ? data : []
      if (list.length > 0) {
        console.log(`✅ Instagram posts loaded from backend: ${list.length} posts`)
        setInstagramPosts(list.slice(0, 8))
        return
      }

      console.log('⚠️ Backend returned empty data, trying local fallback...')
      
      // 2) Fallback: route API lokal (server-side)
      const res = await fetch('/api/instagram-feed', { cache: 'no-store' })
      if (!res.ok) {
        const errorText = await res.text()
        console.error('❌ Local Instagram API failed:', res.status, errorText)
        throw new Error(`Failed to fetch Instagram posts (local): ${res.status}`)
      }
      
      const json = await res.json()
      console.log('📱 Local Instagram API response:', json)
      
      const localData = Array.isArray(json?.data) ? json.data : (Array.isArray(json) ? json : [])
      if (localData.length > 0) {
        console.log(`✅ Instagram posts loaded from local API: ${localData.length} posts`)
        setInstagramPosts(localData.slice(0, 8))
      } else {
        console.log('⚠️ Both backend and local API returned empty data')
        setError('Tidak ada post Instagram yang tersedia')
      }
    } catch (err: any) {
      const errorMsg = err?.message || 'Unknown error'
      console.error('❌ Instagram API Error:', err)
      
      // If backend not configured, try local API directly
      if (errorMsg.includes('Backend Instagram not configured') || errorMsg.includes('Instagram credentials not configured')) {
        console.log('🔄 Trying local Instagram API as fallback...')
        try {
          const res = await fetch('/api/instagram-feed', { cache: 'no-store' })
          if (!res.ok) {
            throw new Error(`Local API failed: ${res.status}`)
          }
          
          const json = await res.json()
          const localData = Array.isArray(json?.data) ? json.data : (Array.isArray(json) ? json : [])
          
          if (localData.length > 0) {
            console.log(`✅ Instagram posts loaded from local API: ${localData.length} posts`)
            setInstagramPosts(localData.slice(0, 8))
            setError(null)
            return
          } else {
            setError('Instagram belum dikonfigurasi di backend dan tidak ada data lokal')
          }
        } catch (localErr: any) {
          setError(`Instagram belum dikonfigurasi: ${localErr.message}`)
        }
      } else {
        setError(`Error loading Instagram posts: ${errorMsg}`)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Muat settings untuk CTA follow URL (jika backend support)
    homeApi.social.settings()
      .then((s) => setSettings(s || null))
      .catch(() => {})

    // Muat judul dan konten section dari backend (home: social_media_feed)
    homeApi.byType('social_media_feed')
      .then((arr) => {
        const sec = arr?.[0]
        if (sec) {
          setSectionTitle(sec.title || '')
          setSectionContent(sec.content || '')
        }
      })
      .catch(() => {})
  }, [])

  // Fetch TikTok Posts
  const fetchTikTokPosts = async () => {
    if (!TIKTOK_ACCESS_TOKEN || !TIKTOK_USER_ID) {
      setError('TikTok API credentials not configured')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/tiktok-feed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_token: TIKTOK_ACCESS_TOKEN,
          user_id: TIKTOK_USER_ID
        })
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch TikTok posts')
      }
      
      const data = await response.json()
      setTiktokPosts(data.videos || [])
    } catch (err) {
      setError('Error loading TikTok posts')
      console.error('TikTok API Error:', err)
    } finally {
      setLoading(false)
    }
  }

  // Load posts on component mount and tab change
  useEffect(() => {
    if (activeTab === 'instagram') {
      fetchInstagramPosts()
    } else {
      fetchTikTokPosts()
    }
  }, [activeTab])

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return '1 hari yang lalu'
    if (diffDays < 7) return `${diffDays} hari yang lalu`
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} minggu yang lalu`
    return `${Math.ceil(diffDays / 30)} bulan yang lalu`
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <section className="py-24 bg-gradient-to-br from-green-900 via-teal-800 to-emerald-900 relative overflow-hidden">
      {/* Decorative Illustration */}
      <div className="shape-illustration top-right">
        <img src="/ilustrasi/puteri.png" alt="Female Student Illustration" />
      </div>
      
      {/* Modern Background Effects */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-green-500/20 to-emerald-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-teal-500/15 to-green-500/15 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Modern grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="modern-grid" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="url(#grid-gradient)" strokeWidth="0.5"/>
              </pattern>
              <linearGradient id="grid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10B981"/>
                <stop offset="100%" stopColor="#06B6D4"/>
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#modern-grid)"/>
          </svg>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => {
            // Use deterministic values based on index to avoid hydration mismatch
            const left = (i * 17 + 23) % 100;
            const top = (i * 13 + 37) % 100;
            const delay = (i * 0.3) % 2;
            const duration = 2 + (i * 0.2) % 2;
            
            return (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white/20 rounded-full animate-bounce"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  animationDelay: `${delay}s`,
                  animationDuration: `${duration}s`
                }}
              />
            );
          })}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Modern Section Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500/20 to-cyan-500/20 backdrop-blur-xl border border-white/20 text-white rounded-2xl text-sm font-medium mb-8 shadow-2xl">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
            <Instagram className="w-5 h-5 mr-2" />
            Ikuti Media Sosial Kami
            <div className="w-2 h-2 bg-cyan-400 rounded-full ml-3 animate-pulse"></div>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            {sectionTitle || (
              <>
            Tetap Terhubung dengan
            <br />
            <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
              Aktivitas Sekolah
            </span>
              </>
            )}
          </h2>
          
          {sectionContent ? (
            <div
              className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light"
              dangerouslySetInnerHTML={{ __html: sectionContent }}
            />
          ) : (
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
            Dapatkan update terbaru tentang kegiatan, prestasi, dan momen-momen berharga di 
            <span className="text-white font-medium"> SMA Islam Terpadu</span> melalui platform media sosial kami.
          </p>
          )}
        </motion.div>

        {/* Modern Tab Navigation */}
        <motion.div 
          className="flex justify-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-2 shadow-2xl border border-white/20">
            <button
              onClick={() => setActiveTab('instagram')}
              className={`px-10 py-5 rounded-2xl font-bold transition-all duration-500 flex items-center space-x-3 relative overflow-hidden group ${
                activeTab === 'instagram'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-2xl scale-105'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Instagram className="w-6 h-6 relative z-10" />
              <span className="relative z-10 text-lg">Instagram</span>
              {activeTab === 'instagram' && (
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-600/20 animate-pulse"></div>
              )}
            </button>
            
            <button
              onClick={() => setActiveTab('tiktok')}
              className={`px-10 py-5 rounded-2xl font-bold transition-all duration-500 flex items-center space-x-3 relative overflow-hidden group ${
                activeTab === 'tiktok'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-2xl scale-105'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Play className="w-6 h-6 relative z-10" />
              <span className="relative z-10 text-lg">TikTok</span>
              {activeTab === 'tiktok' && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-600/20 animate-pulse"></div>
              )}
            </button>
          </div>
        </motion.div>

        {/* Modern Refresh Button */}
        <div className="flex justify-center mb-12">
          <button
            onClick={() => activeTab === 'instagram' ? fetchInstagramPosts() : fetchTikTokPosts()}
            disabled={loading}
            className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white hover:bg-white/20 transition-all duration-500 disabled:opacity-50 shadow-2xl group"
          >
            <RefreshCw className={`w-5 h-5 mr-3 transition-transform duration-500 group-hover:scale-110 ${loading ? 'animate-spin' : ''}`} />
            <span className="font-medium">
              {loading ? 'Memuat...' : 'Refresh Feed'}
            </span>
          </button>
        </div>

        {/* Modern Error Message */}
        {error && (
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="inline-flex flex-col items-center px-6 py-4 bg-red-500/10 backdrop-blur-xl border border-red-500/20 text-red-300 rounded-2xl shadow-2xl max-w-2xl">
              <div className="w-2 h-2 bg-red-400 rounded-full mb-3 animate-pulse"></div>
              <p className="font-medium mb-2">{error}</p>
              <p className="text-sm text-red-400/80">
                Cek console browser untuk detail error. Pastikan backend API berjalan dengan baik.
              </p>
              <button 
                onClick={fetchInstagramPosts}
                className="mt-3 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg text-sm transition-colors"
              >
                Coba Lagi
              </button>
            </div>
          </motion.div>
        )}

        {/* Debug Info (hanya tampil di development) */}
        {process.env.NODE_ENV === 'development' && (
          <motion.div 
            className="text-center mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-300 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p>🔍 Debug Mode: Cek console untuk detail API calls</p>
            <p>Instagram Posts: {instagramPosts.length} | Loading: {loading ? 'Yes' : 'No'} | Error: {error ? 'Yes' : 'No'}</p>
          </motion.div>
        )}

        {/* Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {activeTab === 'instagram' ? (
            // Instagram Feed
            instagramPosts.length > 0 ? (
              instagramPosts.map((post) => (
                <motion.div
                  key={post.id}
                  variants={itemVariants}
                  className="bg-white/10 backdrop-blur-2xl rounded-3xl overflow-hidden shadow-2xl hover:shadow-green-500/25 border border-white/20 transition-all duration-500 group cursor-pointer hover:scale-105"
                  onClick={() => window.open(post.permalink, '_blank')}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url}
                      alt={post.caption || 'Instagram post'}
                      className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                    
                    {/* Modern Instagram Badge */}
                    <div className="absolute top-4 right-4">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-2xl shadow-2xl backdrop-blur-sm">
                        <Instagram className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    
                    {/* Enhanced Video Play Button */}
                    {post.media_type === 'VIDEO' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl border border-white/30 group-hover:scale-110 transition-all duration-500 shadow-2xl">
                          <Play className="w-8 h-8 text-white fill-white" />
                        </div>
                      </div>
                    )}
                    
                    {/* Floating engagement indicators */}
                    <div className="absolute bottom-4 left-4 flex items-center space-x-3">
                      <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30">
                        <Heart className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30">
                        <MessageCircle className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-white text-sm mb-4 line-clamp-3 leading-relaxed">
                      {post.caption || 'No caption'}
                    </p>
                    <div className="flex items-center justify-between text-gray-300 text-sm">
                      <span className="text-xs bg-white/10 px-3 py-1 rounded-full">{formatDate(post.timestamp)}</span>
                      <div className="flex items-center space-x-3">
                        <Share className="w-4 h-4 hover:text-white transition-colors cursor-pointer" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              !loading && (
                <div className="col-span-full text-center py-16">
                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 max-w-md mx-auto">
                    <Instagram className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-300 font-medium">Tidak ada postingan Instagram yang ditemukan.</p>
                  </div>
                </div>
              )
            )
          ) : (
            // TikTok Feed
            tiktokPosts.length > 0 ? (
              tiktokPosts.map((post) => (
                <motion.div
                  key={post.id}
                  variants={itemVariants}
                  className="bg-white/10 backdrop-blur-2xl rounded-3xl overflow-hidden shadow-2xl hover:shadow-cyan-500/25 border border-white/20 transition-all duration-500 group cursor-pointer hover:scale-105"
                  onClick={() => window.open(post.share_url, '_blank')}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={post.cover_image_url}
                      alt={post.video_description}
                      className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-500" />
                    
                    {/* Enhanced TikTok Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/20 backdrop-blur-md p-5 rounded-2xl border border-white/30 group-hover:scale-110 transition-all duration-500 shadow-2xl">
                        <Play className="w-10 h-10 text-white fill-white" />
                      </div>
                    </div>
                    
                    {/* Modern TikTok Badge */}
                    <div className="absolute top-4 right-4">
                      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-3 rounded-2xl shadow-2xl backdrop-blur-sm">
                        <Play className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    
                    {/* Floating stats */}
                    <div className="absolute bottom-4 left-4 flex items-center space-x-3">
                      <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30 flex items-center space-x-1">
                        <Eye className="w-4 h-4 text-white" />
                        <span className="text-white text-xs font-medium">{post.view_count?.toLocaleString() || 0}</span>
                      </div>
                      <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30 flex items-center space-x-1">
                        <Heart className="w-4 h-4 text-white" />
                        <span className="text-white text-xs font-medium">{post.like_count || 0}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-white font-semibold text-sm mb-4 line-clamp-2 leading-relaxed">
                      {post.video_description}
                    </h3>
                    <div className="flex items-center justify-between text-gray-300 text-sm">
                      <div className="bg-white/10 px-3 py-1 rounded-full text-xs">
                        TikTok Video
                      </div>
                      <Share className="w-4 h-4 hover:text-white transition-colors cursor-pointer" />
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              !loading && (
                <div className="col-span-full text-center py-16">
                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 max-w-md mx-auto">
                    <Play className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-300 font-medium">Tidak ada video TikTok yang ditemukan.</p>
                  </div>
                </div>
              )
            )
          )}
        </motion.div>

        {/* Modern Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-2xl rounded-3xl overflow-hidden shadow-2xl border border-white/20 animate-pulse">
                <div className="w-full h-72 bg-gradient-to-r from-gray-600/20 to-gray-400/20"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-400/20 rounded-full mb-3"></div>
                  <div className="h-4 bg-gray-400/20 rounded-full w-3/4 mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-3 bg-gray-400/20 rounded-full w-1/4"></div>
                    <div className="h-3 bg-gray-400/20 rounded-full w-1/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modern Call to Action */}
        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Jangan Sampai <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">Terlewat!</span>
            </h3>
            <p className="text-gray-300 mb-8 text-lg">
              Follow media sosial kami untuk mendapatkan update terbaru setiap hari
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={settings?.instagram_follow_url || "https://instagram.com/your_instagram_username"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-bold hover:shadow-2xl hover:shadow-green-500/25 transition-all duration-500 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <Instagram className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform relative z-10" />
                <span className="relative z-10">Follow Instagram</span>
              </a>
              
              <a
                href="https://tiktok.com/@your_tiktok_username"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl font-bold hover:shadow-2xl hover:shadow-cyan-600/25 transition-all duration-500 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <Play className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform relative z-10" />
                <span className="relative z-10">Follow TikTok</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default SocialMediaFeedSection