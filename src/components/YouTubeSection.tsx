'use client'

import React, { useState, useEffect } from 'react'
import { ScrollReveal } from './ScrollReveal'
import { homeApi, HomeSection } from '@/lib/api'

interface YouTubeVideo {
  id: string
  title: string
  description: string
  thumbnail: string
  publishedAt: string
  duration?: string
}

const YouTubeSection = () => {
  const [selectedVideo, setSelectedVideo] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [channelVideos, setChannelVideos] = useState<YouTubeVideo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [userInteracted, setUserInteracted] = useState(false)
  const [sectionTitle, setSectionTitle] = useState<string>('')
  const [sectionContent, setSectionContent] = useState<string>('')

  // Data video YouTube dari channel ALKAPRO TV 
  // Menggunakan channel embed untuk menampilkan video terbaru dari channel
  const [channelId, setChannelId] = useState('UC4pZd4s01MOQrTDvxNc1QlA') // default
  
  // Video placeholder - akan diganti dengan video dari channel
  const youtubeVideos: YouTubeVideo[] = [
    {
      id: 'channel_latest', // Menggunakan channel embed
      title: 'Video Terbaru ALKAPRO TV',
      description: 'Kumpulan video terbaru dari channel resmi ALKAPRO TV yang menampilkan kegiatan sekolah, pembelajaran, dan prestasi siswa.',
      thumbnail: '/image (10).png',
      publishedAt: 'Terbaru',
      duration: 'Live'
    }
  ]

  const filteredVideos = channelVideos.length > 0 ? channelVideos : youtubeVideos

  // Ambil konfigurasi YouTube dari backend jika ada
  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const sections = await homeApi.byType('youtube')
        const [yt] = sections as HomeSection[]
        const cfg = yt?.config_data || {}
        if (mounted) {
          if (cfg?.channel_id) setChannelId(cfg.channel_id)
          setSectionTitle(yt?.title || '')
          setSectionContent(yt?.content || '')
        }
      } catch (_) {}
    })()
    return () => { mounted = false }
  }, [])

  // Fetch videos from YouTube channel using RSS feed (no API key required)
  useEffect(() => {
    const fetchChannelVideos = async () => {
      try {
        setIsLoading(true)
        
        // Using RSS feed from YouTube channel (no API key needed)
        const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(rssUrl)}`
        
        const response = await fetch(proxyUrl)
        const xmlText = await response.text()
        
        // Parse XML manually for video data
        const parser = new DOMParser()
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml')
        const entries = xmlDoc.querySelectorAll('entry')
        
                 const videos: YouTubeVideo[] = Array.from(entries).slice(0, 6).map(entry => {
           const videoId = entry.querySelector('videoId')?.textContent || ''
           const title = entry.querySelector('title')?.textContent || ''
           const description = entry.querySelector('media\\:description, description')?.textContent || ''
           const publishedAt = entry.querySelector('published')?.textContent || ''
           
           return {
             id: videoId,
             title: title.length > 60 ? title.substring(0, 60) + '...' : title,
             description: description.length > 200 ? description.substring(0, 200) + '...' : description,
             thumbnail: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
             publishedAt: new Date(publishedAt).toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'short',
               year: 'numeric'
             })
           }
         })
        
        setChannelVideos(videos)
        setIsLoading(false)
      } catch (error) {
        console.log('Could not fetch channel videos, using fallback')
        setIsLoading(false)
      }
    }

    fetchChannelVideos()
  }, [channelId])

  // Auto-change featured video every 8 seconds (hanya jika user belum berinteraksi)
  useEffect(() => {
    if (!userInteracted && filteredVideos.length > 1) {
      const interval = setInterval(() => {
        setSelectedVideo(prev => (prev + 1) % filteredVideos.length)
      }, 8000)
      return () => clearInterval(interval)
    }
  }, [filteredVideos.length, userInteracted])

  const getYouTubeThumbnail = (videoId: string, quality: string = 'maxresdefault') => {
    if (videoId === 'channel_latest') {
      // Untuk channel, gunakan default thumbnail atau channel banner
      return `https://yt3.ggpht.com/channels/${channelId}/banner_6.jpg`
    }
    return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`
  }

  const getYouTubeEmbedUrl = (videoId: string) => {
    if (videoId === 'channel_latest') {
      // Embed channel playlist atau video terbaru
      return `https://www.youtube.com/embed/videoseries?list=UU${channelId.substring(2)}&autoplay=1&rel=0&modestbranding=1`
    }
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`
  }

  const getChannelEmbedUrl = () => {
    return `https://www.youtube.com/embed/videoseries?list=UU${channelId.substring(2)}&rel=0&modestbranding=1`
  }

  const getCurrentVideoEmbedUrl = () => {
    const currentVideo = filteredVideos[selectedVideo]
    if (!currentVideo || currentVideo.id === 'channel_latest') {
      return getChannelEmbedUrl()
    }
    return `https://www.youtube.com/embed/${currentVideo.id}?rel=0&modestbranding=1`
  }

  return (
    <div className="relative py-24 bg-gradient-to-br from-green-50 via-blue-50 to-teal-50 overflow-hidden">
      {/* Decorative Illustration */}
      <div className="shape-illustration top-right">
        <img src="/ilustrasi/lanang.png" alt="YouTube Video Illustration" />
      </div>
      
      {/* Islamic Pattern Background */}
      <div className="absolute inset-0">
        {/* Elegant geometric patterns */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-br from-green-400/20 to-emerald-300/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-300/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-br from-teal-400/15 to-green-300/20 rounded-full blur-3xl"></div>
        
        {/* Sophisticated overlay patterns */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white/30"></div>
        
        {/* Fresh Islamic Geometric Patterns */}
        <div className="absolute inset-0 opacity-[0.06]">
          {/* Ottoman Turkish Tulip Pattern */}
          <div className="absolute top-0 left-0 w-full h-full">
            <svg className="w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="ottoman-tulip" x="0" y="0" width="90" height="90" patternUnits="userSpaceOnUse">
                  {/* Traditional Ottoman tulip motif */}
                  <g transform="translate(45,45)">
                    {/* Tulip shape */}
                    <path 
                      d="M0,-35 Q-15,-25 -10,-10 Q-5,0 0,5 Q5,0 10,-10 Q15,-25 0,-35"
                      fill="currentColor"
                      className="text-emerald-500"
                      fillOpacity="0.4"
                    />
                    <path 
                      d="M0,-35 Q-15,-25 -10,-10 Q-5,0 0,5 Q5,0 10,-10 Q15,-25 0,-35"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="text-green-600"
                    />
                    
                    {/* Stem */}
                    <line x1="0" y1="5" x2="0" y2="25" stroke="currentColor" strokeWidth="2" className="text-green-500"/>
                    
                    {/* Decorative leaves */}
                    <path 
                      d="M-8,15 Q-15,10 -8,5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      className="text-teal-500"
                    />
                    <path 
                      d="M8,15 Q15,10 8,5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      className="text-teal-500"
                    />
                  </g>
                  
                  {/* Decorative corner elements */}
                  <circle cx="15" cy="15" r="3" fill="currentColor" className="text-emerald-300"/>
                  <circle cx="75" cy="15" r="3" fill="currentColor" className="text-teal-300"/>
                  <circle cx="15" cy="75" r="3" fill="currentColor" className="text-teal-300"/>
                  <circle cx="75" cy="75" r="3" fill="currentColor" className="text-emerald-300"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#ottoman-tulip)"/>
            </svg>
          </div>

          {/* Persian Paisley (Boteh) Pattern */}
          <div className="absolute top-0 right-0 w-full h-full">
            <svg className="w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="persian-paisley" x="0" y="0" width="80" height="100" patternUnits="userSpaceOnUse">
                  {/* Traditional Persian paisley/boteh */}
                  <g transform="translate(40,50)">
                    <path 
                      d="M0,-30 Q15,-35 25,-20 Q30,-5 20,10 Q5,25 -5,20 Q-15,10 -10,-5 Q-5,-20 0,-30"
                      fill="currentColor"
                      className="text-teal-500"
                      fillOpacity="0.3"
                    />
                    <path 
                      d="M0,-30 Q15,-35 25,-20 Q30,-5 20,10 Q5,25 -5,20 Q-15,10 -10,-5 Q-5,-20 0,-30"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      className="text-green-600"
                    />
                    
                    {/* Inner decorative pattern */}
                    <circle cx="5" cy="-15" r="4" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-emerald-400"/>
                    <circle cx="8" cy="0" r="2" fill="currentColor" className="text-teal-400"/>
                    <path 
                      d="M-2,-5 Q5,-8 8,-2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.8"
                      className="text-green-500"
                    />
                  </g>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#persian-paisley)"/>
            </svg>
          </div>

          {/* Andalusian Arch Pattern */}
          <div className="absolute bottom-0 left-0 w-full h-full">
            <svg className="w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="andalusian-arch" x="0" y="0" width="100" height="80" patternUnits="userSpaceOnUse">
                  {/* Traditional Andalusian horseshoe arch */}
                  <g transform="translate(50,40)">
                    {/* Main arch */}
                    <path 
                      d="M-30,20 Q-30,0 -20,-15 Q-10,-25 0,-25 Q10,-25 20,-15 Q30,0 30,20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-emerald-600"
                    />
                    <path 
                      d="M-25,20 Q-25,5 -15,-10 Q-8,-18 0,-18 Q8,-18 15,-10 Q25,5 25,20"
                      fill="currentColor"
                      className="text-teal-400"
                      fillOpacity="0.2"
                    />
                    
                    {/* Arch columns */}
                    <rect x="-32" y="20" width="4" height="15" fill="currentColor" className="text-green-500"/>
                    <rect x="28" y="20" width="4" height="15" fill="currentColor" className="text-green-500"/>
                    
                    {/* Decorative arch details */}
                    <circle cx="0" cy="-15" r="3" fill="currentColor" className="text-emerald-400"/>
                    <path 
                      d="M-15,-5 Q0,-12 15,-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      className="text-teal-500"
                    />
                  </g>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#andalusian-arch)"/>
            </svg>
          </div>

          {/* Mamluk Geometric Medallion */}
          <div className="absolute inset-0 transform rotate-30">
            <svg className="w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="mamluk-medallion" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                  {/* Traditional Mamluk circular medallion */}
                  <g transform="translate(60,60)">
                    {/* Outer circle */}
                    <circle cx="0" cy="0" r="40" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-green-500"/>
                    
                    {/* Inner geometric pattern */}
                    <g transform="rotate(0)">
                      <path 
                        d="M0,-25 L12,-12 L25,0 L12,12 L0,25 L-12,12 L-25,0 L-12,-12 Z"
                        fill="currentColor"
                        className="text-emerald-400"
                        fillOpacity="0.3"
                      />
                      <path 
                        d="M0,-25 L12,-12 L25,0 L12,12 L0,25 L-12,12 L-25,0 L-12,-12 Z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        className="text-teal-600"
                      />
                    </g>
                    
                    {/* Central rosette */}
                    <circle cx="0" cy="0" r="8" fill="currentColor" className="text-green-400"/>
                    <circle cx="0" cy="0" r="4" fill="currentColor" className="text-white"/>
                    
                    {/* Radiating lines */}
                    <g stroke="currentColor" strokeWidth="0.8" className="text-teal-500">
                      <line x1="0" y1="-15" x2="0" y2="-35"/>
                      <line x1="15" y1="0" x2="35" y2="0"/>
                      <line x1="0" y1="15" x2="0" y2="35"/>
                      <line x1="-15" y1="0" x2="-35" y2="0"/>
                    </g>
                  </g>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#mamluk-medallion)" opacity="0.4"/>
            </svg>
          </div>

          {/* Fatimid Interlace Pattern */}
          <div className="absolute inset-0 transform rotate-60">
            <svg className="w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="fatimid-interlace" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                  {/* Traditional Fatimid interlacing bands */}
                  <g transform="translate(40,40)">
                    {/* Interlacing geometric bands */}
                    <path 
                      d="M-30,-10 Q-10,-30 10,-10 Q30,10 10,30 Q-10,10 -30,-10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="text-emerald-500"
                    />
                    <path 
                      d="M-30,10 Q-10,30 10,10 Q30,-10 10,-30 Q-10,-10 -30,10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="text-teal-500"
                    />
                    
                    {/* Intersection decorations */}
                    <circle cx="0" cy="0" r="6" fill="currentColor" className="text-green-400"/>
                    <circle cx="0" cy="0" r="3" fill="currentColor" className="text-white"/>
                    
                    {/* Corner elements */}
                    <circle cx="-25" cy="-25" r="2" fill="currentColor" className="text-emerald-300"/>
                    <circle cx="25" cy="-25" r="2" fill="currentColor" className="text-teal-300"/>
                    <circle cx="-25" cy="25" r="2" fill="currentColor" className="text-teal-300"/>
                    <circle cx="25" cy="25" r="2" fill="currentColor" className="text-emerald-300"/>
                  </g>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#fatimid-interlace)" opacity="0.3"/>
            </svg>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Fresh Header Section */}
        <ScrollReveal delay={200}>
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm px-8 py-4 rounded-2xl mb-8 border border-green-200/30">
              <div className="relative">
                <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              </div>
              <span className="text-slate-700 font-bold text-base uppercase tracking-wider">ALKAPRO TV</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-6 leading-tight">
              {sectionTitle || (
                <>
              <span className="block">Video Dokumentasi</span>
              <span className="block bg-gradient-to-r from-green-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
                SMP Al Kautsar
              </span>
                </>
              )}
            </h2>
            
            {sectionContent ? (
              <div
                className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed"
                dangerouslySetInnerHTML={{ __html: sectionContent }}
              />
            ) : (
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Saksikan dokumentasi kegiatan sekolah, pembelajaran, dan prestasi siswa 
              <span className="text-slate-800 font-semibold"> SMP Muhammadiyah Al Kautsar PK Kartasura </span>
              melalui channel YouTube resmi ALKAPRO TV.
            </p>
            )}
          </div>
        </ScrollReveal>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Luxury Featured Video Player */}
          <ScrollReveal delay={400} className="lg:col-span-2">
            <div className="main-video-player bg-gradient-to-br from-white via-slate-50 to-white rounded-3xl shadow-2xl overflow-hidden border border-white/20 backdrop-blur-sm">
              <div className="relative aspect-video bg-gradient-to-br from-slate-900 to-black">
                {/* Tampilkan video yang dipilih atau channel embed */}
                <iframe
                  key={selectedVideo} // Force re-render when video changes
                  src={getCurrentVideoEmbedUrl()}
                  className="absolute inset-0 w-full h-full rounded-t-3xl"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={filteredVideos[selectedVideo]?.title || "ALKAPRO TV Channel Videos"}
                />
              </div>
              
              <div className="p-8">
                {filteredVideos[selectedVideo] && filteredVideos[selectedVideo].id !== 'channel_latest' ? (
                  // Tampilkan info video yang dipilih
                  <>
                    <h3 className="text-2xl font-bold text-slate-800 mb-4 leading-tight">
                      {filteredVideos[selectedVideo].title}
                    </h3>
                    
                    <p className="text-slate-600 leading-relaxed text-sm mb-6">
                      {filteredVideos[selectedVideo].description}
                    </p>
                    
                    <div className="flex items-center gap-6 text-sm text-slate-500">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                        </svg>
                        <span>{filteredVideos[selectedVideo].publishedAt}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"/>
                        </svg>
                        <span>ALKAPRO TV</span>
                      </div>
                      <a 
                        href={`https://www.youtube.com/watch?v=${filteredVideos[selectedVideo].id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        <span>Buka di YouTube</span>
                      </a>
                    </div>
                  </>
                ) : (
                  // Tampilkan info channel default
                  <>
                    <h3 className="text-2xl font-bold text-slate-800 mb-4 leading-tight">
                      Channel ALKAPRO TV
                    </h3>
                    
                    <p className="text-slate-600 leading-relaxed text-lg">
                      Kumpulan video terbaru dari channel resmi ALKAPRO TV yang menampilkan kegiatan sekolah, 
                      pembelajaran modern, prestasi siswa, dan kehidupan akademik di SMP Muhammadiyah Al Kautsar PK Kartasura.
                    </p>
                    
                    <div className="mt-6 flex items-center gap-4">
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"/>
                        </svg>
                        <span>Channel Resmi</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                        </svg>
                        <span>Update Terbaru</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </ScrollReveal>

                       {/* Video List */}
          <ScrollReveal delay={500} className="space-y-6">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-slate-800">Video Terbaru</h3>
              {userInteracted && (
                <button
                  onClick={() => setUserInteracted(false)}
                  className="text-xs text-slate-500 hover:text-green-600 transition-colors flex items-center gap-2"
                  title="Aktifkan auto-play berikutnya"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Auto-play</span>
                </button>
              )}
            </div>
            
            <div className="space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar">
              {isLoading ? (
                // Loading skeleton
                Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-md animate-pulse">
                    <div className="flex gap-4">
                      <div className="w-24 h-16 bg-slate-200 rounded-lg flex-shrink-0"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                        <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                filteredVideos.map((video, index) => (
                  <div
                    key={`${video.id}-${index}`}
                    onClick={() => {
                      setSelectedVideo(index)
                      setUserInteracted(true) // Hentikan auto-rotation
                      // Scroll ke main player untuk mobile
                      if (window.innerWidth < 1024) {
                        document.querySelector('.main-video-player')?.scrollIntoView({ 
                          behavior: 'smooth',
                          block: 'start'
                        })
                      }
                    }}
                    className={`group cursor-pointer bg-white rounded-2xl p-4 border transition-all duration-500 shadow-md ${
                      selectedVideo === index 
                        ? 'border-green-500 shadow-xl shadow-green-500/20 bg-gradient-to-br from-green-50 to-blue-50' 
                        : 'border-slate-200 hover:border-green-300 hover:shadow-lg hover:bg-gradient-to-br hover:from-green-50/50 hover:to-blue-50/50'
                    }`}
                  >
                    <div className="flex gap-4">
                      <div className="relative flex-shrink-0">
                        <img
                          src={video.thumbnail || `https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                          alt={video.title}
                          className="w-24 h-16 object-cover rounded-lg"
                          onError={(e) => {
                            e.currentTarget.src = '/image (10).png' // Fallback image
                          }}
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-slate-800 text-sm leading-tight mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
                          {video.title}
                        </h4>
                        
                        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                          </svg>
                          <span>{video.publishedAt || 'Baru-baru ini'}</span>
                        </div>
                        
                        {video.description && (
                          <p className="text-xs text-slate-500 line-clamp-2">
                            {video.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Channel Info */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200 mt-6">
              <h4 className="font-bold text-slate-800 text-lg mb-4">ALKAPRO TV</h4>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Channel resmi SMP Muhammadiyah Al Kautsar PK Kartasura yang menyajikan 
                konten edukatif, dokumentasi kegiatan sekolah, dan prestasi siswa.
              </p>
              
              <div className="flex flex-wrap gap-4 text-xs">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">Pembelajaran</span>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">Dokumentasi</span>
                <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full">Prestasi</span>
              </div>
            </div>

            {/* Subscribe Button */}
            <div className="mt-8">
              <a
                href="https://www.youtube.com/@ALKAPROTV"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-full bg-gradient-to-r from-green-600 via-green-500 to-blue-500 text-white px-8 py-6 rounded-2xl font-bold text-center block hover:from-green-700 hover:via-green-600 hover:to-blue-600 transition-all duration-500 shadow-xl hover:shadow-green-500/25 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <div className="relative flex items-center justify-center gap-4">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  <span className="text-lg">Subscribe ALKAPRO TV</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </a>
            </div>
          </ScrollReveal>
        </div>


      </div>

      <style jsx>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #ef4444 #f1f5f9;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #ef4444;
          border-radius: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #dc2626;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
      

    </div>
  )
}

export default YouTubeSection