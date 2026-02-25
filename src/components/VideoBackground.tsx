'use client'

import React from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

interface VideoBackgroundProps {
  videoSrc?: string
  backgroundImageUrl?: string
  className?: string
  children: React.ReactNode
}

export function VideoBackground({
  videoSrc,
  backgroundImageUrl,
  className = '',
  children,
}: VideoBackgroundProps) {
  // Helper function untuk membangun URL video yang benar
  const buildVideoUrl = (src?: string) => {
    if (!src) return undefined
    
    // Jika sudah full URL, gunakan langsung
    if (src.startsWith('http://') || src.startsWith('https://')) {
      return src
    }
    
    // Jika relative path dengan /storage/, gunakan langsung
    if (src.startsWith('/storage/')) {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://api.alkapro.id/api'
      const backendOrigin = apiBase.replace(/\/api.*$/, '')
      return `${backendOrigin}${src}`
    }
    
    // Jika hanya filename, tambahkan path storage lengkap untuk home/hero
    if (!src.includes('/')) {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://api.alkapro.id/api'
      const backendOrigin = apiBase.replace(/\/api.*$/, '')
      return `${backendOrigin}/storage/home/hero/${src}`
    }
    
    return src
  }

  const finalVideoSrc = buildVideoUrl(videoSrc)
  
  console.log('🔍 VideoBackground - Original src:', videoSrc)
  console.log('🔍 VideoBackground - Final URL:', finalVideoSrc)
  console.log('🔍 VideoBackground - Will show video?', !!finalVideoSrc)
  console.log('🔍 VideoBackground - Will show fallback?', !finalVideoSrc)

  return (
    <div className={`relative min-h-screen overflow-hidden ${className}`}>
      {/* Video Background */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        {finalVideoSrc ? (
          <video
            key={finalVideoSrc || 'fallback'}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            style={{ pointerEvents: 'none' }}
          >
            <source src={finalVideoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : backgroundImageUrl ? (
          <img src={backgroundImageUrl} alt="Background" className="w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800" />
        )}
      </div>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30 z-10"></div>
      
      {/* Lottie Animation - Top Left Corner */}
      <div className="absolute -top-4 md:-top-6 lg:-top-8 left-4 md:left-8 lg:left-12 w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 opacity-100 pointer-events-none z-15">
        <DotLottieReact
          src="https://lottie.host/22cb0415-1135-40f6-8a8c-de5f9ca93535/nj2ZWexE3D.lottie"
          loop
          autoplay
        />
      </div>
      
      {/* Lottie Animation - Top Right Corner */}
      <div className="absolute -top-4 md:-top-6 lg:-top-8 right-4 md:right-8 lg:right-12 w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 opacity-100 pointer-events-none z-15">
        <DotLottieReact
          src="https://lottie.host/22cb0415-1135-40f6-8a8c-de5f9ca93535/nj2ZWexE3D.lottie"
          loop
          autoplay
        />
      </div>
      
      {/* Content */}
      <div className="relative z-20">{children}</div>
    </div>
  )
}